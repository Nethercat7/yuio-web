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
          >
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="账号" prop="code"></el-table-column>
            <el-table-column
              label="性别"
              prop="gender"
              :formatter="genderFormatter"
            ></el-table-column>
            <el-table-column label="电话号码" prop="phone"></el-table-column>
            <el-table-column
              label="状态"
              prop="status"
              :formatter="statusFormatter"
            ></el-table-column>
            <el-table-column
              label="创建时间"
              prop="create_time"
            ></el-table-column>
            <el-table-column label="操作" fixed="right" width="250px">
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
                <el-dropdown>
                  <el-button size="mini" type="primary">更多</el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <span @click="resetPwd(scope.row.id)">重置密码</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
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
      :title="type == 'add' ? '添加用户' : '修改用户'"
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
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="form.phone"></el-input>
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
        <el-form-item label="角色">
          <el-select
            v-model="form.roles"
            multiple
            filterable
            placeholder="请选择"
            collapse-tags
          >
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
            @click="download('xlsx')"
            >下载此模板。</span
          >
        </div>
        <div slot="tip" class="el-upload__tip">
          如果您的Excel版本低于2007，<span
            class="download"
            @click="download('xls')"
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
  addUser,
  getUsers,
  delUser,
  updUser,
  getUserByKeyword,
  outputUsers,
  uploadUsersExcel,
} from "@/api/system/user";
import { getRoles } from "@/api/system/role";
import { resetPwd } from "@/api/system/sys";
import { validatePhone } from "@/utils/validator";

export default {
  name: "userManagement",
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
      roles: [],
      genderOptions: [],
      statusOptions: [],
      rules: {
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
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
        code: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
        gender: [
          { required: true, message: "请选择一个性别", trigger: "change" },
        ],
        phone: [{ required: false, validator: validatePhone, trigger: "blur" }],
      },
    };
  },
  methods: {
    getData() {
      this.keyword = "";
      getUsers().then((resp) => {
        this.tableData = resp.obj;
        this.tableDataBak = resp.obj;
        this.total = resp.obj.length;
      });
      getRoles().then((resp) => {
        this.roles = resp.obj;
      });
      //获取字典数据
      this.getDictData("sys_user_gender").then((resp) => {
        this.genderOptions = resp.obj;
      });
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
            addUser(this.form).then((resp) => {
              if (resp.status == null) {
                this.$message({
                  message: resp.msg,
                  type: resp.type,
                });
              }
              if (resp.code === 0) {
                this.form = {};
                this.getData();
                this.$refs["form"].resetFields();
              }
            });
          } else {
            updUser(this.form).then((resp) => {
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
      delUser(id).then((resp) => {
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
    resetPwd(id) {
      this.$confirm("此操作将会重置的登录密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.reset = {
            isUser: true,
            key: id,
          };
          resetPwd(this.reset).then((resp) => {
            if (resp.status == null) {
              this.$message({
                type: resp.type,
                message: resp.msg,
              });
            }
          });
        })
        .catch(() => {
          return null;
        });
    },
    genderFormatter(row) {
      return this.selectDictLabel(this.genderOptions, row.gender);
    },
    statusFormatter(row) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    search() {
      getUserByKeyword(this.keyword).then((resp) => {
        this.total = resp.obj.length;
        this.tableData = resp.obj;
      });
    },
    output() {
      outputUsers(this.outputOptions).then((resp) => {
        this.fileDownloader(resp, "用户数据.xlsx");
      });
    },
    uploadFile(data) {
      //Add file data
      var formData = new FormData();
      formData.append("file", data.file);
      //Send Request
      uploadUsersExcel(formData).then((resp) => {
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
    download(type) {
      this.getExcelTemplate("user", type).then((resp) => {
        this.fileDownloader(resp, "用户数据上传模板." + type);
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>