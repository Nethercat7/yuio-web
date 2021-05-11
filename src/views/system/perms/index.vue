<template>
  <div>
    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <el-col :span="12">
          <el-button size="mini" type="success" @click="openDialog('add')"
            >添加</el-button
          >
          <el-button size="mini" type="primary" @click="dialogVisible2 = true"
            >导入</el-button
          >
          <el-button size="mini" type="warning" @click="output">导出</el-button>
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

    <!-- 表格 -->
    <el-card :shadow="cardShadow">
      <el-row>
        <el-col :span="24">
          <el-table
            ref="table"
            :data="
              tableData.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            row-key="id"
          >
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="标识" prop="mark"></el-table-column>
            <el-table-column label="请求地址" prop="url"></el-table-column>
            <el-table-column label="图标" prop="icon"></el-table-column>
            <el-table-column
              label="类型"
              prop="type"
              :formatter="typeFormatter"
            ></el-table-column>
            <el-table-column
              label="状态"
              prop="status"
              :formatter="statusFormatter"
            ></el-table-column>
            <el-table-column
              label="创建时间"
              prop="create_time"
            ></el-table-column>
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="info"
                  @click="openDialog('upd', scope.row)"
                  >编辑</el-button
                >
                <el-popconfirm
                  title="删除后将无法恢复，确定删除吗？"
                  style="padding: 7px 15px"
                  icon="el-icon-info"
                  icon-color="red"
                  @confirm="handleDelete(scope.row.id)"
                >
                  <el-button slot="reference" size="mini" type="danger"
                    >删除</el-button
                  >
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <!-- 分页器 -->
        <el-col :span="24">
          <Pager
            :total="total"
            :currentPage="currentPage"
            :page.sync="currentPage"
            :size.sync="pageSize"
          ></Pager>
        </el-col>
      </el-row>
    </el-card>

    <!-- 表单 -->
    <el-dialog
      :title="type == 'add' ? '新增菜单' : '修改菜单'"
      :visible.sync="dialogVisible"
      :before-close="closeDialog"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="left"
        label-suffix=":"
        label-width="90px"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="标识" prop="mark">
          <el-input v-model="form.mark"></el-input>
        </el-form-item>
        <el-form-item label="请求地址">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
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
        <el-form-item label="上级菜单">
          <el-cascader
            v-model="form.pid"
            :options="tableData"
            :props="cascaderProps"
            filterable
            clearable
            ref="cascader"
            :show-all-levels="false"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="submitDialog()">确 定</el-button>
      </span>
    </el-dialog>

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
          请使用本系统提供的模板进行填写导入，否者可能会出现导入错误等情况。
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="upload">上传</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pager from "@/components/pager";
import {
  addPerms,
  getPerms,
  delPerms,
  updPerms,
  getPermsByKeyword,
  outputPerms,
  uploadPermsExcel,
} from "@/api/system/perms";

export default {
  name: "menuManagement",
  components: { Pager },
  data() {
    return {
      dialogVisible2: false,
      tableData: [],
      tableDataBak: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      keyword: "",
      dialogVisible: false,
      type: "",
      form: {},
      cascaderProps: {
        value: "id",
        label: "name",
        checkStrictly: true,
        emitPath: false,
      },
      statusOptions: [],
      typeOptions: [],
      rules: {
        name: [
          { required: true, message: "请输入权限名称", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
        status: [
          { required: true, message: "请选择一个状态", trigger: "change" },
        ],
        mark: [
          { required: true, message: "请输入标识符", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
        type: [
          { required: true, message: "请选择一个类型", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    getData() {
      this.keyword = "";
      getPerms().then((resp) => {
        this.tableData = resp.obj;
        this.tableDataBak = resp.obj;
        this.total = resp.obj.length;
      });
      //获取字典
      this.getDictData("sys_uvsl_status").then((resp) => {
        this.statusOptions = resp.obj;
      });
      this.getDictData("sys_menu_type").then((resp) => {
        this.typeOptions = resp.obj;
      });
    },
    openDialog(type, row) {
      this.dialogVisible = true;
      if (type == "add") {
        this.type = type;
      } else {
        this.type = type;
        this.form = JSON.parse(JSON.stringify(row));
      }
    },
    submitDialog() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.type == "add") {
            addPerms(this.form).then((resp) => {
              if (resp.status == null) {
                this.$message({
                  message: resp.msg,
                  type: resp.type,
                });
              }
              if (resp.code === 0) {
                this.getData();
                this.form = {};
                this.$refs["form"].resetFields();
              }
            });
          } else {
            updPerms(this.form).then((resp) => {
              if (resp.status == null) {
                this.$message({
                  message: resp.msg,
                  type: resp.type,
                });
              }
              if (resp.code === 0) this.getData();
            });
          }
        } else {
          return false;
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
    handleDelete(id) {
      delPerms(id).then((resp) => {
        if (resp.code === 0) {
          this.getData();
        }
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
    typeFormatter(row) {
      return this.selectDictLabel(this.typeOptions, row.type);
    },
    search() {
      getPermsByKeyword(this.keyword).then((resp) => {
        this.total = resp.obj.length;
        this.tableData = resp.obj;
      });
    },
    output() {
      outputPerms().then((resp) => {
        this.fileDownloader(resp, "系统权限数据.xlsx");
      });
    },
    getTemplate(type) {
      this.getExcelTemplate("perms", type).then((resp) => {
        this.fileDownloader(resp, "权限数据导入模板." + type);
      });
    },
    uploadFile(data) {
      //Add file data
      var formData = new FormData();
      formData.append("file", data.file);
      //Send Request
      uploadPermsExcel(formData);
    },
    upload() {
      this.$refs.upload.submit();
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>