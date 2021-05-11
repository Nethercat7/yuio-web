<template>
  <div>
    <!-- 选项卡 -->
    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <el-col :span="12">
          <el-button size="mini" @click="openDialog('add')" type="success"
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
          >
            <el-table-column label="班级名称" prop="name" sortable>
            </el-table-column>
            <el-table-column label="所属院系" prop="college_name" sortable>
            </el-table-column>
            <el-table-column label="所属专业" prop="major_name" sortable>
            </el-table-column>
            <el-table-column label="所属年级" prop="grade" sortable>
            </el-table-column>
            <el-table-column
              label="状态"
              prop="status"
              sortable
              :formatter="statusFormatter"
            >
            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="openDialog('upd', scope.row)"
                  type="info"
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

    <!-- 表单 -->
    <el-dialog
      :title="type == 'add' ? '添加班级' : '修改班级'"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="closeDialog"
    >
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="班级名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属专业" prop="major_id">
          <el-cascader
            v-model="form.major_id"
            :options="colleges"
            :props="cascaderProps"
            :show-all-levels="false"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="所属年级" prop="grade">
          <el-select v-model="form.grade" placeholder="请选择">
            <el-option
              v-for="item in grade"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
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
  addClass,
  getClasses,
  delClass,
  updClass,
  getClassByKeyword,
  uploadClassesExcel,
  outputClasses,
} from "@/api/system/class";
import { getCollegeAndMajor } from "@/api/system/sys";

export default {
  name: "classManagement",
  components: { Pager },
  data() {
    return {
      dialogVisible2: false,
      tableData: [],
      tableDataBak: [],
      keyword: "",
      dialogVisible: false,
      type: "",
      form: {},
      currentPage: 1,
      pageSize: 10,
      total: 0,
      colleges: [],
      grade: [],
      cascaderProps: {
        value: "id",
        label: "name",
        emitPath: false,
      },
      statusOptions: [],
      rules: {
        name: [
          { required: true, message: "请输入班级名称", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
        major_id: [
          { required: true, message: "请选择一个专业", trigger: "change" },
        ],
        grade: [
          { required: true, message: "请选择一个年级", trigger: "change" },
        ],
        status: [
          { required: true, message: "请选择一个状态", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    getData() {
      this.keyword = "";
      //获取班级
      getClasses().then((resp) => {
        this.tableDataBak = resp.obj;
        this.total = resp.obj.length;
        let data = resp.obj;
        this.tableData = data;
      });
      //获取学院和专业
      getCollegeAndMajor().then((resp) => {
        this.colleges = resp.obj;
      });
      //获取年级
      this.getGrade();
      //获取数据字典
      this.getDictData("sys_uvsl_status").then((resp) => {
        this.statusOptions = resp.obj;
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
            addClass(this.form).then((resp) => {
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
            updClass(this.form).then((resp) => {
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
        })
        .catch(() => {});
    },
    handleDelete(id) {
      delClass(id).then((resp) => {
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
    getGrade() {
      let date = new Date().getFullYear();
      let dateArr = []; //用于存放今年往后十年的年份
      for (let i = 0; i < 10; i++) {
        dateArr.push(date);
        date--;
      }
      this.grade = dateArr;
    },
    statusFormatter(row) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    search() {
      getClassByKeyword(this.keyword).then((resp) => {
        this.total = resp.obj.length;
        this.tableData = resp.obj;
      });
    },
    output() {
      outputClasses().then((resp) => {
        this.fileDownloader(resp, "班级数据.xlsx");
      });
    },
    getTemplate(type) {
      this.getExcelTemplate("class", type).then((resp) => {
        this.fileDownloader(resp, "班级导入模板." + type);
      });
    },
    uploadFile(data) {
      //Add file data
      var formData = new FormData();
      formData.append("file", data.file);
      //Send Request
      uploadClassesExcel(formData).then((resp) => {
        if (resp.status == null) {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
        }
        this.dialogVisible2 = false;
        formData = null;
        this.getData();
      });
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