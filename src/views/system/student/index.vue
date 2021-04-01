<template>
  <div>
    <el-row class="card">
      <!-- 选项卡 -->
      <el-col :span="12">
        <el-button size="mini" @click="openDialog('add')" type="success"
          >添加</el-button
        >
        <el-button size="mini" type="primary">导入</el-button>
        <el-button size="mini" type="warning">导出</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-autocomplete
          v-model="keyword"
          placeholder="请输入内容"
          size="mini"
          style="margin-right: 10px"
          :trigger-on-focus="false"
          :fetch-suggestions="searchSuggestions"
          value-key="student_name"
        ></el-autocomplete>
        <el-button size="mini" type="success" @click="handleSearch"
          >搜索</el-button
        >
        <el-button size="mini" type="danger" @click="resetResult"
          >重置</el-button
        >
      </el-col>
    </el-row>
    <el-row class="card">
      <!-- 表格 -->
      <el-col :span="24">
        <el-table
          ref="table"
          :data="
            tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          :row-class-name="tableRowClassName"
        >
          <!-- 表格展开行 -->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form
                label-position="left"
                inline
                label-suffix=":"
                class="demo-table-expand"
              >
                <el-form-item label="姓名">
                  <span>{{ props.row.student_name }}</span>
                </el-form-item>
                <el-form-item label="学号">
                  <span>{{ props.row.student_code }}</span>
                </el-form-item>
                <el-form-item label="性别">
                  <span>{{ props.row.student_gender_display }}</span>
                </el-form-item>
                <el-form-item label="电话号码">
                  <span>{{ props.row.student_phone }}</span>
                </el-form-item>
                <el-form-item label="所属院系">
                  <span>{{ props.row.student_college_name }}</span>
                </el-form-item>
                <el-form-item label="所属专业">
                  <span>{{ props.row.student_major_name }}</span>
                </el-form-item>
                <el-form-item label="所属年级">
                  <span>{{ props.row.student_grade }}</span>
                </el-form-item>
                <el-form-item label="状态">
                  <span>{{ props.row.student_status_display }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="student_name"
            sortable
            width="100px"
          >
          </el-table-column>
          <el-table-column label="学号" prop="student_code" sortable>
          </el-table-column>
          <el-table-column
            label="所属院系"
            prop="student_college_name"
            sortable
          >
          </el-table-column>
          <el-table-column label="所属专业" prop="student_major_name" sortable>
          </el-table-column>
          <el-table-column
            label="所属年级"
            prop="student_grade"
            sortable
            width="150  px"
          >
          </el-table-column>
          <el-table-column label="所属班级" prop="student_class_name" sortable>
          </el-table-column>
          <el-table-column label="状态" prop="student_status_display" sortable>
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
                @confirm="handleDelete(scope.row.student_id)"
              >
                <el-button slot="reference" size="mini" type="danger"
                  >删除</el-button
                >
              </el-popconfirm>
              <el-dropdown>
                <el-button size="mini" type="primary">更多</el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <span @click="resetPwd()">重置密码</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          layout="total,sizes,prev, pager, next,jumper"
          :total="total"
          @current-change="changePage"
          :current-page="currentPage"
          :hide-on-single-page="true"
          @size-change="changeSize"
          :page-size="pageSize"
          style="margin-top: 10px; text-align: center"
        >
        </el-pagination>
      </el-col>
    </el-row>
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
          <el-input v-model="form.student_name"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="form.student_code"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.student_gender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="form.student_phone"></el-input>
        </el-form-item>
        <el-form-item label="所属院系">
          <el-select
            v-model="form.student_college_id"
            placeholder="请选择"
            @change="handleChange(form.student_college_id, 'college')"
          >
            <el-option
              v-for="item in colleges"
              :key="item.college_id"
              :label="item.college_name"
              :value="item.college_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属专业">
          <el-select
            v-model="form.student_major_id"
            placeholder="请选择"
            @change="handleChange(form.student_major_id, 'major')"
          >
            <el-option
              v-for="item in majors"
              :key="item.major_id"
              :label="item.major_name"
              :value="item.major_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属年级">
          <el-select v-model="form.student_grade" placeholder="请选择">
            <el-option
              v-for="item in grade"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属班级">
          <el-select
            v-model="form.student_class_id"
            placeholder="请选择"
            @change="handleChange(form.student_class_id, 'class')"
          >
            <el-option
              v-for="item in classes"
              :key="item.class_id"
              :label="item.class_name"
              :value="item.class_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.student_status">
            <el-radio :label="0">正常</el-radio>
            <el-radio :label="1">休学</el-radio>
            <el-radio :label="2">退学</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            v-model="form.student_desciption"
          ></el-input>
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
import api from "@/api/api";

export default {
  name: "studentManagement",
  data() {
    return {
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
      majors: [],
      grade: [],
      classes: [],
    };
  },
  methods: {
    getColleges() {
      api.getColleges().then((resp) => {
        this.colleges = resp.data;
      });
    },
    getMajors() {
      api.getMajors().then((resp) => {
        this.majors = resp.data;
      });
    },
    getClasses() {
      api.getClasses().then((resp) => {
        this.classes = resp.data;
      });
    },
    getStudents() {
      api.getStudents().then((resp) => {
        let data = resp.data;
        this.total = resp.data.length;
        //状态码转文字
        for (let i = 0; i < data.length; i++) {
          if (data[i].student_gender === 0) {
            data[i].student_gender_display = "男";
          } else if (data[i].student_gender === 1) {
            data[i].student_gender_display = "女";
          }

          if (data[i].student_status === 0) {
            data[i].student_status_display = "正常";
          } else if (data[i].student_status === 1) {
            data[i].student_status_display = "休学";
          } else if (data[i].student_status === 2) {
            data[i].student_status_display = "退学";
          }
        }
        this.tableDataBak = data;
        this.tableData = data;
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
        api.addStudent(this.form).then((resp) => {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
          if (resp.code === 1) this.getStudents();
        });
      } else {
        api.updStudent(this.form).then((resp) => {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
          if (resp.code === 1) this.getStudents();
        });
      }
      this.form = {};
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
    tableRowClassName({ row }) {
      if (row.student_status != 0) {
        return "warning-row";
      }
    },
    handleDelete(id) {
      api.delStudent(id).then((resp) => {
        if (resp.code === 1) {
          this.getStudents();
        }
        this.$message({
          message: resp.msg,
          type: resp.type,
        });
      });
    },
    //页面切换控制器
    changePage(val) {
      this.currentPage = val;
    },
    changeSize(val) {
      this.pageSize = val;
    },
    searchSuggestions(queryString, cb) {
      var restaurants = this.tableDataBak;
      var results = queryString
        ? restaurants.filter(this.createFilter())
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSearch() {
      //搜索前先恢复备份的完整数据，然后在进行搜索。防止在当前搜索结果中进行第二次搜索找不到数据。
      this.tableData = this.tableDataBak;
      this.tableData = this.tableData.filter(this.createFilter());
      this.total = this.tableData.length;
    },
    createFilter() {
      return (data) =>
        data.student_name.toLowerCase().includes(this.keyword.toLowerCase()) ||
        data.student_code.toLowerCase().includes(this.keyword.toLowerCase());
    },
    resetResult() {
      this.tableData = this.tableDataBak;
      this.total = this.tableData.length;
      this.keyword = "";
    },
    handleChange(val, type) {
      if (type === "college") {
        let college = this.colleges.filter((data) =>
          data.college_id.includes(val)
        )[0];
        this.form.student_college_name = college.college_name;
      } else if (type === "major") {
        let major = this.majors.filter((data) =>
          data.major_id.includes(val)
        )[0];
        this.form.student_major_name = major.major_name;
      } else if (type === "class") {
        let cls = this.classes.filter((data) => data.class_id.includes(val))[0];
        this.form.student_class_name = cls.class_name;
      }
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
    resetPwd() {
      this.$confirm("此操作将会重置的登录密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "成功重置",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
  mounted() {
    this.getColleges();
    this.getMajors();
    this.getGrade();
    this.getClasses();
    this.getStudents();
    console.log(this.$route)
  },
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>