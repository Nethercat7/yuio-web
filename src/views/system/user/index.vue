<template>
  <div>
    <el-row class="card">
      <el-col :span="12">
        <el-button size="mini" type="success" @click="openDialog('add')"
          >添加</el-button
        >
        <el-button size="mini" type="primary">导入</el-button>
        <el-button size="mini" type="warning">导出</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-autocomplete
          placeholder="请输入内容"
          size="mini"
          style="margin-right: 10px"
          :trigger-on-focus="false"
          value-key="user_name"
          v-model="keyword"
          :fetch-suggestions="searchSuggestions"
        ></el-autocomplete>
        <el-button size="mini" type="success" @click="handleSearch"
          >搜索</el-button
        >
        <el-button size="mini" type="danger" @click="handleReset"
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
          <el-table-column label="姓名" prop="user_name"></el-table-column>
          <el-table-column label="账号" prop="user_account"></el-table-column>
          <el-table-column
            label="性别"
            prop="user_gender_display"
          ></el-table-column>
          <el-table-column label="电话号码" prop="user_phone"></el-table-column>
          <el-table-column
            label="状态"
            prop="user_status_display"
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
                @confirm="handleDelete(scope.row.user_id)"
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
          <el-input v-model="form.user_name"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="form.user_account"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.user_gender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="form.user_phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="form.user_email"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.user_status">
            <el-radio :label="0">正常</el-radio>
            <el-radio :label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.user_role" multiple filterable placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.role_id"
              :label="item.role_name"
              :value="item.role_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.user_desciption"></el-input>
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
import api from "../../../api/api";

export default {
  name: "userManagement",
  components: { Pager },
  data() {
    return {
      tableData: [],
      tableDataBak: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      keyword: "",
      dialogVisible: false,
      type: "",
      form: {},
      roles:[]
    };
  },
  methods: {
    getData() {
      api.getUsers().then((resp) => {
        let data = resp.data;
        //将性别和状态数据字典转换为文字
        for (let i = 0; i < data.length; i++) {
          if (data[i].user_gender === 0) {
            data[i].user_gender_display = "男";
          } else {
            data[i].user_gender_display = "女";
          }

          if (data[i].user_status === 0) {
            data[i].user_status_display = "正常";
          } else {
            data[i].user_status_display = "停用";
          }
        }
        this.tableData = data;
        this.tableDataBak = data;
        this.total = data.length;
      });
      //获取角色
      api.getRoles().then(resp=>{
        this.roles=resp.data;
      })
    },
    searchSuggestions(queryString, cb) {
      let restaurants = this.tableDataBak;
      let results = queryString
        ? restaurants.filter(this.createFilter())
        : restaurants;
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
        data.user_name.toLowerCase().includes(this.keyword.toLowerCase()) ||
        data.user_account.toLowerCase().includes(this.keyword.toLowerCase());
    },
    handleReset() {
      this.tableData = this.tableDataBak;
      this.total = this.tableData.length;
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
        api.addUser(this.form).then((resp) => {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
          if (resp.code === 1) this.getData();
        });
      } else {
        api.updUser(this.form).then((resp) => {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
          if (resp.code === 1) this.getData();
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
      if (row.user_status != 0) {
        return "warning-row";
      }
    },
    handleDelete(id) {
      api.delUser(id).then((resp) => {
        if (resp.code === 1) {
          this.getData();
        }
        this.$message({
          message: resp.msg,
          type: resp.type,
        });
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