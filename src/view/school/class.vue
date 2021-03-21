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
          <el-table-column label="班级名称" prop="class_name" sortable>
          </el-table-column>
          <el-table-column label="班级编号" prop="class_code" sortable>
          </el-table-column>
          <el-table-column label="毕业生数量" prop="class_students" sortable>
          </el-table-column>
          <el-table-column label="所属院系" prop="class_college_name" sortable>
          </el-table-column>
          <el-table-column label="所属专业" prop="class_major_name" sortable>
          </el-table-column>
          <el-table-column label="所属年级" prop="class_grade" sortable>
          </el-table-column>
          <el-table-column label="状态" prop="class_status_display" sortable>
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
                @confirm="handleDelete(scope.row.class_id)"
              >
                <el-button slot="reference" size="mini" type="danger"
                  >删除</el-button
                >
              </el-popconfirm>
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
      :title="type == 'add' ? '添加班级' : '修改班级'"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="closeDialog"
    >
      <el-form ref="form" :model="form">
        <el-form-item label="名称">
          <el-input v-model="form.class_name"></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="form.class_code"></el-input>
        </el-form-item>
        <el-form-item label="所属院系">
          <el-select
            v-model="form.class_college_id"
            placeholder="请选择"
            @change="handleChange(form.class_college_id)"
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
            v-model="form.class_major_id"
            placeholder="请选择"
            @change="handleChange(form.class_major_id)"
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
          <el-select v-model="form.class_grade" placeholder="请选择">
            <el-option
              v-for="item in grade"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.class_status">
            <el-radio :label="0">启用</el-radio>
            <el-radio :label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.class_desciption"></el-input>
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
  name: "classManagement",
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
        //对接后台API后删除
        this.getClasses(this.majors);
      });
    },
    getClasses(params) {
      api.getClasses(params).then((resp) => {
        this.tableDataBak = resp.data;
        this.total = resp.total;
        let data = resp.data;
        for (let i = 0; i < data.length; i++) {
          data[i].value = data[i].class_name;
          if (data[i].class_status == 0) {
            data[i].class_status_display = "正常";
          } else {
            data[i].class_status_display = "禁用";
          }
        }
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
        api.addClass(this.form).then((resp) => {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
          if (resp.code === 1) this.getClasses();
        });
      } else {
        console.log(this.colleges);
        api.updClass(this.form).then((resp) => {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
          if (resp.code === 1) this.getClasses();
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
      if (row.class_status == 1) {
        return "warning-row";
      }
    },
    handleDelete(id) {
      api.delClass(id).then((resp) => {
        if (resp.code === 1) {
          this.getClasses();
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
      this.tableData = this.tableDataBak;
      this.tableData = this.tableData.filter(this.createFilter());
      this.total = this.tableData.length;
    },
    createFilter() {
      return (data) =>
        data.major_name.toLowerCase().includes(this.keyword.toLowerCase()) ||
        data.major_code.toLowerCase().includes(this.keyword.toLowerCase());
    },
    resetResult() {
      this.tableData = this.tableDataBak;
      this.keyword = "";
    },
    handleChange(val) {
      let college = this.colleges.filter((data) =>
        data.college_id.includes(val)
      );
      let major = this.majors.filter((data) => data.major_id.includes(val));
      if (college.length === 0) {
        this.form.class_major_name = major[0].major_name;
      } else {
        this.form.class_college_name = college[0].college_name;
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
  },
  mounted() {
    this.getColleges();
    this.getMajors();
    this.getGrade();
  },
};
</script>

<style>
.card {
  border-radius: 6px;
  box-shadow: 1px 1px 3px rgb(0 0 0 / 20%);
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
}
.element-right {
  display: inline;
  text-align: right;
}
.el-table .warning-row {
  background-color: oldlace;
}

.el-table .success-row {
  background-color: #f0f9eb;
}
</style>