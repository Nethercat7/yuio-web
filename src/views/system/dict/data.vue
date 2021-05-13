<template>
  <div>
    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <el-col :span="12">
          <el-button type="success" size="mini" @click="openDialog(0)"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="dialogVisible2 = true"
            >导入</el-button
          >
          <el-button type="warning" size="mini" @click="output">导出</el-button>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-input
            v-model="keyword"
            placeholder="请输入内容"
            size="mini"
            style="width: 200px; margin-right: 10px"
          ></el-input>
          <el-button size="mini" type="success" @click="search">搜索</el-button>
          <el-button size="mini" type="danger" @click="getData">重置</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 表单 -->
    <el-dialog
      :title="type === 0 ? '添加字典数据' : '修改字典数据'"
      :visible.sync="dialogVisible"
      :before-close="closeDialog"
    >
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        label-suffix=":"
        label-width="90px"
        :rules="rules"
      >
        <el-form-item label="标签" prop="label">
          <el-input v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item label="键值" prop="value">
          <el-input v-model="form.value"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="submitDialog()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 表格 -->
    <el-card :shadow="cardShadow">
      <el-row>
        <el-col :span="24">
          <el-table
            :data="
              tableData.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
          >
            <el-table-column label="标签" prop="label"></el-table-column>
            <el-table-column label="类型" prop="type"></el-table-column>
            <el-table-column label="键值" prop="value"></el-table-column>
            <el-table-column
              label="状态"
              prop="status"
              :formatter="statusFormatter"
            ></el-table-column>
            <el-table-column label="备注" prop="remark"></el-table-column>
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="openDialog('upd', scope.row)"
                  >编辑</el-button
                >
                <el-popconfirm
                  title="删除后将无法恢复，确定删除吗？"
                  style="padding: 7px 15px"
                  icon="el-icon-info"
                  icon-color="red"
                  @confirm="deleteData(scope.row.id)"
                >
                  <el-button type="danger" size="mini" slot="reference"
                    >删除</el-button
                  >
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页器 -->
          <Pager
            :total="total"
            :currentPage="currentPage"
            :page.sync="currentPage"
            :size.sync="pageSize"
          ></Pager>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog title="上传数据" :visible.sync="dialogVisible2">
      <el-upload
        class="upload-demo"
        ref="upload"
        action
        :auto-upload="false"
        :http-request="uploadFile"
        accept=".xls,.xlsx"
        :limit="1"
      >
        <el-button slot="trigger" size="small" type="primary"
          >选取文件</el-button
        >
        <div slot="tip" class="el-upload__tip">
          请使用本系统提供的模板进行填写导入，否者导入会出现错误。
        </div>
        <div slot="tip" class="el-upload__tip">
          如果您的Excel版本为2007及以上，<span
            class="download"
            @click="getTemplate('xlsx')"
            >下载此模板。</span
          >
        </div>
        <div slot="tip" class="el-upload__tip">
          如果您的Excel版本低于2007，<span
            class="download"
            @click="getTemplate('xls')"
            >下载此模板。</span
          >
        </div>
      </el-upload>
      <ImportText />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="upload">上传</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ImportText from "../components/importText";
import {
  addDictData,
  getDictData,
  delDictData,
  updDictData,
  getDictDataByKeyword,
  uploadDictDataExcel,
  outputDictData,
} from "@/api/system/dict/data";
import Pager from "@/components/pager";

export default {
  name: "DictData",
  components: { Pager, ImportText },
  data() {
    return {
      dialogVisible2: false,
      form: {
        type: this.$route.query.type,
      },
      dialogVisible: false,
      type: null,
      tableData: [],
      shadow: "never",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dictType: null,
      statusOptions: [],
      keyword: "",
      rules: {
        label: [{ required: true, message: "请输入字典标签", trigger: "blur" }],
        value: [{ required: true, message: "请输入字典键值", trigger: "blur" }],
        status: [
          { required: true, message: "请选择一个状态", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    openDialog(type, row) {
      this.dialogVisible = true;
      if (type === 0) {
        this.type = type;
      } else {
        this.type = type;
        this.form = JSON.parse(JSON.stringify(row));
      }
    },
    submitDialog() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.type === 0) {
            addDictData(this.form).then((resp) => {
              if (resp.code === 0) {
                this.getData();
                this.form = {};
                this.$refs["form"].resetFields();
              }
              if (resp.status == null) {
                this.$message({
                  message: resp.msg,
                  type: resp.type,
                });
              }
            });
          } else {
            updDictData(this.form).then((resp) => {
              if (resp.code === 0) this.getData();
              if (resp.status == null) {
                this.$message({
                  message: resp.msg,
                  type: resp.type,
                });
              }
            });
          }
          this.form.type = this.$route.query.type;
        }
      });
    },
    closeDialog() {
      this.$confirm("编写的数据将丢失，确认关闭吗？")
        .then(() => {
          this.dialogVisible = false;
          this.form = {};
          this.$refs["form"].resetFields();
        })
        .catch(() => {});
    },
    getData() {
      this.keyword = "";
      getDictData(this.dictType).then((resp) => {
        this.tableData = resp.obj;
        this.total = resp.obj.length;
      });
      //获取数据字典
      this.getDictData("sys_uvsl_status").then((resp) => {
        this.statusOptions = resp.obj;
      });
    },
    deleteData(id) {
      delDictData(id).then((resp) => {
        if (resp.code === 0) this.getData();
        if (resp.status == null) {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
        }
      });
    },
    statusFormatter(row) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    search() {
      if (!this.keyword == "") {
        getDictDataByKeyword(this.keyword).then((resp) => {
          this.total = resp.obj.length;
          this.tableData = resp.obj;
        });
      }
    },
    output() {
      outputDictData().then((resp) => {
        this.fileDownloader(resp, "字典类型数据.xlsx");
      });
    },
    getTemplate(type) {
      this.getExcelTemplate("dict_data", type).then((resp) => {
        this.fileDownloader(resp, "字典数据导入模板." + type);
      });
    },
    uploadFile(data) {
      //Add file data
      var formData = new FormData();
      formData.append("file", data.file);
      //Send Request
      uploadDictDataExcel(formData).then((resp) => {
        if (resp.status == null) {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
        }
        this.dialogVisible2 = false;
        this.$refs.upload.clearFiles();
        this.getData();
      });
    },
    upload() {
      this.$refs.upload.submit();
    },
  },
  mounted() {
    this.dictType = this.$route.query.type;
    this.getData();
  },
};
</script>

<style>
</style>