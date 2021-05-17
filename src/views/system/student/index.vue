<template>
  <div>
    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <el-col :span="24" class="search-bar">
          <div>
            <span class="label">年级</span>
            <el-select
              size="mini"
              v-model="params.grade"
              @change="getOrg(true)"
            >
              <el-option
                v-for="item in gradeList"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </div>
          <div>
            <span class="label">专业班级</span>
            <el-cascader
              size="mini"
              v-model="params.temp"
              :options="orgList"
              :props="orgProps"
              filterable
              :show-all-levels="false"
              ref="cascader"
              @change="setParams"
              clearable
            ></el-cascader>
          </div>
          <div>
            <span class="label">就业情况</span>
            <el-select v-model="params.empl_status" size="mini" clearable>
              <el-option value="0" label="未就业"></el-option>
              <el-option value="1" label="已就业"></el-option>
            </el-select>
          </div>
          <div>
            <span class="label">填写情况</span>
            <el-select v-model="params.empl_write" size="mini" clearable>
              <el-option value="0" label="未填写"></el-option>
              <el-option value="1" label="已填写"></el-option>
            </el-select>
          </div>
          <div>
            <span class="label"> 姓名</span>
            <el-input
              v-model="params.name"
              style="width: 200px"
              size="mini"
            ></el-input>
          </div>
          <!-- 按钮 -->
          <div>
            <el-button size="mini" type="success" @click="getData()"
              >搜索</el-button
            >
            <el-button size="mini" type="danger" @click="getData(true)"
              >重置</el-button
            >
          </div>
        </el-col>
        <el-col :span="24">
          <el-button size="mini" @click="openDialog('add')" type="success"
            >添加</el-button
          >
          <el-button size="mini" type="primary" @click="dialogVisible2 = true"
            >导入</el-button
          >
          <el-button size="mini" type="warning" @click="output">导出</el-button>
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
            :row-class-name="color"
          >
            <el-table-column label="姓名" prop="name" sortable>
            </el-table-column>
            <el-table-column label="学号" prop="code" sortable>
            </el-table-column>
            <el-table-column label="所属专业" prop="major_name" sortable>
            </el-table-column>
            <el-table-column
              label="状态"
              prop="status"
              sortable
              :formatter="statusFormatter"
            >
            </el-table-column>
            <el-table-column
              label="就业信息填写"
              prop="empl_write"
              sortable
              :formatter="writeFormatter"
            ></el-table-column>
            <el-table-column
              label="就业情况"
              prop="empl_status"
              sortable
              :formatter="emplFormatter"
            ></el-table-column>
            <el-table-column
              label="协议情况"
              prop="empl_protocol"
              :formatter="protocolFormatter"
              sortable
            >
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="250px">
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
                <el-dropdown>
                  <el-button size="mini" type="primary">更多</el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <span
                        @click="
                          $router.push({
                            name: 'StudentProfile',
                            query: { id: scope.row.id },
                          })
                        "
                        >查看资料</span
                      >
                    </el-dropdown-item>

                    <el-dropdown-item>
                      <span @click="resetPwd(scope.row.id)">重置密码</span>
                    </el-dropdown-item>

                    <el-dropdown-item v-if="scope.row.empl_protocol_file">
                      <span @click="downProtocol(scope.row)">下载三方协议</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
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
      :title="type == 'add' ? '添加学生信息' : '修改学生信息'"
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
        <el-form-item label="学号" prop="code">
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
        <el-form-item label="所属年级" prop="grade">
          <el-select
            v-model="form.grade"
            placeholder="请选择"
            @change="getOrg(false)"
          >
            <el-option
              v-for="item in gradeList2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属班级" prop="class_id">
          <el-cascader
            ref="cascader2"
            v-model="form.class_id"
            :options="orgList2"
            :props="cascaderProps"
            :show-all-levels="false"
            @change="getTutor"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="指导老师" prop="teacher_code">
          <el-select v-model="form.teacher_code" multiple>
            <el-option
              v-for="item in users"
              :key="item.id"
              :value="item.code"
              :label="item.name"
            ></el-option>
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
        <ImportText />
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="upload">上传</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ImportText from "../components/importText";
import Pager from "@/components/pager";
import {
  addStudent,
  delStudent,
  updStudent,
  getStudents,
  outputStudents,
  uploadStudentsExcel,
  downloadProtocol,
} from "@/api/system/student";
import { resetPwd, getCompleteOrg, getGrade } from "@/api/system/sys";
import { validateWaN } from "@/utils/validator";
import { getUsersByCollege } from "@/api/system/user";

export default {
  name: "studentManagement",
  components: { Pager, ImportText },
  data() {
    return {
      fileList: [],
      dialogVisible2: false,
      tableData: [],
      keyword: "",
      dialogVisible: false,
      type: "",
      form: {},
      currentPage: 1,
      pageSize: 10,
      total: 0,
      cascaderProps: {
        value: "id",
        label: "name",
        emitPath: false,
      },
      reset: {},
      //选择框数据
      gradeList: [], //搜索用
      gradeList2: [], //添加数据用
      orgList: [],
      orgList2: [],
      orgProps: {
        label: "name",
        value: "id",
        checkStrictly: true,
      },
      params: {
        grade: new Date().getFullYear() - 4,
      },
      statusOptions: [],
      genderOptions: [],
      writeOptions: [],
      emplOptions: [],
      protocolOptions: [],
      rules: {
        name: [
          { required: true, message: "请输入学生名称", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
        class_id: [
          { required: true, message: "请选择一个班级", trigger: "change" },
        ],
        grade: [
          { required: true, message: "请选择一个年级", trigger: "change" },
        ],
        status: [
          { required: true, message: "请选择一个状态", trigger: "change" },
        ],
        code: [
          { required: true, message: "请输入学号", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
          {
            validator: validateWaN,
            trigger: "blur",
          },
        ],
        gender: [
          { required: true, message: "请选择一个性别", trigger: "change" },
        ],
      },
      users: [],
    };
  },
  methods: {
    getData(r) {
      let grade = new Date().getFullYear() - 4;
      if (r) {
        this.params = {};
        this.params.grade = grade;
      }
      this.keyword = "";
      this.currentPage = 1;
      //获取学生信息
      getStudents(this.params).then((resp) => {
        this.total = resp.obj.length;
        this.tableData = resp.obj;
      });
      //获取院系、专业和班级信息
      this.getOrg(true);
      getGrade().then((resp) => {
        //格式化
        let grade = [];
        resp.obj.forEach((element) => {
          grade.push({
            label: element + "级",
            value: element,
          });
        });
        this.gradeList = grade;
        this.gradeList2 = grade;
      });
      //获取数据字典
      this.getDictData("sys_uvsl_status").then((resp) => {
        this.statusOptions = resp.obj;
      });
      this.getDictData("sys_user_gender").then((resp) => {
        this.genderOptions = resp.obj;
      });
      this.getDictData("sys_write_status").then((resp) => {
        this.writeOptions = resp.obj;
      });
      this.getDictData("sys_empl_status").then((resp) => {
        this.emplOptions = resp.obj;
      });
      this.getDictData("sys_protocol_status").then((resp) => {
        this.protocolOptions = resp.obj;
      });
    },
    openDialog(type, row) {
      this.dialogVisible = true;
      if (type == "add") {
        this.type = type;
      } else {
        this.type = type;
        this.form = JSON.parse(JSON.stringify(row));
        this.getOrg(false);
      }
    },
    submitDialog() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.type == "add") {
            addStudent(this.form).then((resp) => {
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
            updStudent(this.form).then((resp) => {
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
      delStudent(id).then((resp) => {
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
          let reset = {
            isUser: false,
            key: id,
          };
          resetPwd(reset).then((resp) => {
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
    //设置级联选择器选择的院系、专业和班级ID
    setParams() {
      //判断是选择还是清空
      if (this.$refs.cascader.getCheckedNodes().length != 0) {
        let arr = this.$refs.cascader.getCheckedNodes()[0];
        this.params.org_id = arr.value;
      } else {
        this.params.org_id = null;
      }
    },
    getOrg(query) {
      if (query) {
        getCompleteOrg(this.params.grade).then((resp) => {
          this.orgList = resp.obj;
        });
      } else {
        getCompleteOrg(this.form.grade).then((resp) => {
          this.orgList2 = resp.obj;
        });
      }
    },
    statusFormatter(row) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    genderFormatter(row) {
      return this.selectDictLabel(this.genderOptions, row.gender);
    },
    writeFormatter(row) {
      return this.selectDictLabel(this.writeOptions, row.empl_write);
    },
    emplFormatter(row) {
      return this.selectDictLabel(this.emplOptions, row.empl_status);
    },
    protocolFormatter(row) {
      return this.selectDictLabel(this.protocolOptions, row.empl_protocol);
    },
    //表格上色
    color({ row }) {
      if (row.empl_status == "0") {
        return "un_empl";
      } else if (row.empl_status == "1") {
        if (row.empl_protocol == "0") {
          return "un_sign";
        } else if (row.empl_protocol == "1") {
          return "signed";
        } else if (row.empl_protocol == "2") {
          return "finlish";
        }
      } else if (row.empl_write == "0") {
        return "un_write";
      }
    },
    output() {
      outputStudents(this.params).then((resp) => {
        this.fileDownloader(resp, "学生数据.xlsx");
      });
    },
    uploadFile(data) {
      //Add file data
      var formData = new FormData();
      formData.append("file", data.file);
      //Send Request
      uploadStudentsExcel(formData).then((resp) => {
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
    download(type) {
      this.getExcelTemplate("student", type).then((resp) => {
        this.fileDownloader(resp, "学生数据上传模板." + type);
      });
    },
    //下载三方协议
    downProtocol(row) {
      downloadProtocol(row.id).then((resp) => {
        if (resp.size != 0) {
          let filename =
            row.college_name +
            "_" +
            row.major_name +
            "_" +
            row.class_name +
            "_" +
            row.name +
            "_三方协议.pdf";
          this.fileDownloader(resp, filename);
        } else {
          this.$message({
            message: "文件不存在",
            type: "error",
          });
        }
      });
    },
    getTutor() {
      let collegeId = this.$refs.cascader2.getCheckedNodes()[0].path[0];
      getUsersByCollege(collegeId).then((resp) => {
        this.users = resp.obj;
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
.search-bar > div {
  display: inline-block;
  margin-right: 10px;
  padding-bottom: 20px;
}
.search-bar .label {
  font-size: 14px;
  color: #303133;
  margin-right: 10px;
}
</style>