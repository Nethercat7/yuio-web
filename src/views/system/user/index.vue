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
          value-key="name"
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

    <!-- 表单 -->
    <el-dialog
      :title="type == 'add' ? '添加用户' : '修改用户'"
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
        <el-form-item label="账号">
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
        <el-form-item label="电话号码">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="form.email"></el-input>
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
        <el-form-item label="角色">
          <el-select
            v-model="form.roles"
            multiple
            filterable
            placeholder="请选择"
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
  </div>
</template>

<script>
import Pager from "@/components/pager";
import api from "../../../api/api";
import { addUser, getUsers, delUser, updUser } from "@/api/system/user";

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
      roles: [],
      genderOptions: [],
      statusOptions: [],
    };
  },
  methods: {
    getData() {
      getUsers().then((resp) => {
        this.tableData = resp.obj;
        this.tableDataBak = resp.obj;
        this.total = resp.obj.length;
      });
      api.getRoles().then((resp) => {
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
        data.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
        data.account.toLowerCase().includes(this.keyword.toLowerCase());
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
        addUser(this.form).then((resp) => {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
          if (resp.code === 0) this.getData();
        });
      } else {
        updUser(this.form).then((resp) => {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
          if (resp.code === 0) this.getData();
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
      if (row.status != 0) {
        return "warning-row";
      }
    },
    handleDelete(id) {
      delUser(id).then((resp) => {
        if (resp.code === 0) {
          this.getData();
        }
        this.$message({
          message: resp.msg,
          type: resp.type,
        });
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
          api.resetPwd(this.reset).then((resp) => {
            this.$message({
              type: resp.type,
              message: resp.msg,
            });
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
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>