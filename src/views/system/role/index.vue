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
          value-key="role_name"
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
          <el-table-column label="名称" prop="role_name"></el-table-column>
          <el-table-column label="代号" prop="role_code"></el-table-column>
          <el-table-column
            label="创建时间"
            prop="role_create_time"
          ></el-table-column>
          <el-table-column
            label="状态"
            prop="role_status_display"
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
      :title="type == 'add' ? '添加角色' : '修改角色'"
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
        <el-form-item label="名称">
          <el-input v-model="form.user_name"></el-input>
        </el-form-item>
        <el-form-item label="代号">
          <el-input v-model="form.user_account"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.user_status">
            <el-radio :label="0">正常</el-radio>
            <el-radio :label="1">停用</el-radio>
          </el-radio-group>
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
import Pager from "@/components/Pager";
import api from "../../../api/api";

export default {
  name: "roleManagement",
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
    };
  },
  methods: {
    getData() {
      api.getRoles().then((resp) => {
        let data = resp.data;
        //状态数据字典转换为文字
        for (let i = 0; i < data.length; i++) {
          if (data[i].role_status === 0) {
            data[i].role_status_display = "正常";
          } else {
            data[i].role_status_display = "停用";
          }
        }
        this.tableData = data;
        this.tableDataBak = data;
        this.total = data.length;
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
        data.role_name.toLowerCase().includes(this.keyword.toLowerCase()) ||
        data.role_code.toLowerCase().includes(this.keyword.toLowerCase());
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
      if (row.role_status != 0) {
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