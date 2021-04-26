<template>
  <div>
    <el-card class="mb-20 search-bar" :shadow="cardShadow">
      <el-row>
        <el-col :span="24">
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
            <span class="label">专业</span>
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
            <el-select v-model="params.employment" size="mini" clearable>
              <el-option value="0" label="未就业"></el-option>
              <el-option value="1" label="已就业"></el-option>
            </el-select>
          </div>
          <div>
            <span class="label">填写情况</span>
            <el-select v-model="params.write" size="mini" clearable>
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
          <el-button size="mini" type="primary">导入</el-button>
          <el-button size="mini" type="warning">导出</el-button>
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
            <el-table-column label="姓名" prop="name" sortable>
            </el-table-column>
            <el-table-column label="学号" prop="code" sortable>
            </el-table-column>
            <el-table-column label="所属院系" prop="college_name" sortable>
            </el-table-column>
            <el-table-column label="所属专业" prop="major_name" sortable>
            </el-table-column>
            <el-table-column label="所属年级" prop="grade" sortable>
            </el-table-column>
            <el-table-column label="所属班级" prop="class_name" sortable>
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
              prop="write"
              sortable
              :formatter="writeFormatter"
            ></el-table-column>
            <el-table-column
              label="就业情况"
              prop="employment"
              sortable
              :formatter="emplFormatter"
            ></el-table-column>
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
                      <span @click="resetPwd(scope.row.id)">重置密码</span>
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
        label-position="left"
        label-suffix=":"
        label-width="90px"
      >
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属年级">
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
        <el-form-item label="所属班级">
          <el-cascader
            v-model="form.container"
            :options="orgList"
            :props="cascaderProps"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="状态">
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
  </div>
</template>

<script>
import Pager from "@/components/pager";
import {
  addStudent,
  delStudent,
  updStudent,
  getWithEStatusInfo,
} from "@/api/system/student";
import { resetPwd, getCompleteOrg, getGrade } from "@/api/system/sys";

export default {
  name: "studentManagement",
  components: { Pager },
  data() {
    return {
      tableData: [],
      tableDataBak: [],
      keyword: "",
      dialogVisible: false,
      type: "",
      form: {
        grade: new Date().getFullYear() - 4,
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      cascaderProps: {
        value: "id",
        label: "name",
      },
      reset: {},
      //选择框数据
      gradeList: [], //搜索用
      gradeList2: [], //添加数据用
      orgList: [],
      orgProps: {
        label: "name",
        value: "id",
        checkStrictly: true,
        //emitPath: false,
      },
      params: {
        grade: new Date().getFullYear() - 4,
      },
      statusOptions: [],
      genderOptions: [],
      writeOptions: [],
      emplOptions: [],
    };
  },
  methods: {
    getData(r) {
      let grade = new Date().getFullYear() - 4;
      if (r) {
        this.params = {};
        this.params.grade = grade;
      }
      this.form = {};
      this.form.grade = grade;
      this.keyword = "";
      this.currentPage = 1;
      //获取学生信息
      getWithEStatusInfo(this.params).then((resp) => {
        this.total = resp.obj.length;
        this.tableDataBak = resp.obj;
        this.tableData = resp.obj;
      });
      //获取院系、专业和班级信息
      this.getOrg();
      getGrade().then((resp) => {
        this.gradeList = resp.obj;
        this.gradeList2 = resp.obj;
      });
      //获取数据字典
      this.getDictData("sys_stdnt_status").then((resp) => {
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
      if (this.type == "add") {
        addStudent(this.form).then((resp) => {
          if (resp.status != 500) {
            this.$message({
              message: resp.msg,
              type: resp.type,
            });
          }
          if (resp.code === 0) this.getData();
        });
      } else {
        updStudent(this.form).then((resp) => {
          if (resp.status != 500) {
            this.$message({
              message: resp.msg,
              type: resp.type,
            });
          }
          if (resp.code === 0) this.getData();
        });
      }
      this.dialogVisible = false;
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
      delStudent(id).then((resp) => {
        if (resp.code === 0) {
          this.getData();
        }
        if (resp.status != 500) {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
        }
      });
    },
    //页面切换控制器
    changePage(val) {
      this.currentPage = val;
    },
    changeSize(val) {
      this.pageSize = val;
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
            if (resp.status != 500) {
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
        let arr = this.$refs.cascader.getCheckedNodes()[0].path;
        this.params.college_id = arr[0];
        this.params.major_id = arr[1];
        this.params.class_id = arr[2];
      } else {
        this.params.college_id = null;
        this.params.major_id = null;
        this.params.class_id = null;
      }
    },
    getOrg(query) {
      getCompleteOrg(query ? this.params.grade : this.form.grade).then(
        (resp) => {
          this.orgList = resp.obj;
        }
      );
    },
    statusFormatter(row) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    genderFormatter(row) {
      return this.selectDictLabel(this.genderOptions, row.gender);
    },
    writeFormatter(row) {
      return this.selectDictLabel(this.writeOptions, row.write);
    },
    emplFormatter(row) {
      return this.selectDictLabel(this.emplOptions, row.employment);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
.search-bar div {
  display: inline-block;
  margin-right: 10px;
  padding-bottom: 5px;
}
.search-bar .label {
  font-size: 14px;
  color: #303133;
  margin-right: 10px;
}
</style>