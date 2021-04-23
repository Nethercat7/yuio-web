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
          value-key="name"
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
          <el-table-column label="专业名称" prop="name" sortable>
          </el-table-column>
          <el-table-column label="所属院系" prop="college_name" sortable>
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
                @confirm="delMajor(scope.row.id)"
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
      :title="type == 'add' ? '添加专业' : '修改专业'"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="closeDialog"
    >
      <el-form ref="form" :model="form">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属院系">
          <el-select
            v-model="form.college_id"
            placeholder="请选择"
            @change="handelChange"
          >
            <el-option
              v-for="item in colleges"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
          <el-input type="textarea" v-model="form.desciption"></el-input>
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
  name: "majorManagement",
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
      statusOptions: [],
    };
  },
  methods: {
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
        api.addMajor(this.form).then((resp) => {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
          if (resp.code === 0) this.getMajors();
        });
      } else {
        api.updMajor(this.form).then((resp) => {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
          if (resp.code === 0) this.getMajors();
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
      if (row.status == 1) {
        return "warning-row";
      }
    },
    delMajor(id) {
      api.delMajor(id).then((resp) => {
        if (resp.code === 0) {
          this.getMajors();
        }
        this.$message({
          message: resp.msg,
          type: resp.type,
        });
      });
    },
    getMajors() {
      api.getMajors().then((resp) => {
        this.tableDataBak = resp.obj;
        this.total = resp.obj.length;
        let data = resp.obj;
        this.tableData = data;
      });
      //获取院系信息
      api.getColleges().then((resp) => {
        this.colleges = resp.obj;
      });
      //获取数据字典
      this.getDictData("sys_uvsl_status").then((resp) => {
        this.statusOptions = resp.obj;
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
        data.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
        data.code.toLowerCase().includes(this.keyword.toLowerCase());
    },
    resetResult() {
      this.tableData = this.tableDataBak;
      this.keyword = "";
      this.total = this.tableData.length;
    },
    handelChange() {
      let college = this.colleges.filter((data) =>
        data.college_id.includes(this.form.college_id)
      );
      this.form.college_name = college[0].college_name;
    },
    statusFormatter(row) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
  },
  mounted() {
    this.getMajors();
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