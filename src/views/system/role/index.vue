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
        >
          <el-table-column label="名称" prop="name"></el-table-column>
          <el-table-column
            label="创建时间"
            prop="create_time"
          ></el-table-column>
          <el-table-column
            label="状态"
            prop="status"
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
                @confirm="handleDelete(scope.row.id)"
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
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="0">正常</el-radio>
            <el-radio :label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="操作权限">
          <el-select v-model="value" @change="handlePermsSelect">
            <el-option :value="0" label="全部权限"></el-option>
            <el-option :value="1" label="自定义权限">自定义权限</el-option>
          </el-select>
          <el-tree
            v-if="customize"
            :data="perms"
            :props="defaultProps"
            show-checkbox
            default-expand-all
            ref="tree"
            node-key="perms_id"
            @check-change="handleNodeClick"
          ></el-tree>
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
import Pager from "@/components/pager";
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
      form: { perms: 1 },
      customize: false,
      value: 0,
      defaultProps: {
        children: "children",
        label: "perms_name",
      },
      perms: [],
    };
  },
  methods: {
    getData() {
      api.getRoles().then((resp) => {
        this.tableData = resp.obj;
        this.tableDataBak = resp.obj;
        this.total = resp.obj.length;
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
        data.code.toLowerCase().includes(this.keyword.toLowerCase());
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
        api.addRole(this.form).then((resp) => {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
          if (resp.code === 0) this.getData();
        });
      } else {
        api.updRole(this.form).then((resp) => {
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
    handleDelete(id) {
      api.delRole(id).then((resp) => {
        if (resp.code === 0) {
          this.getData();
        }
        this.$message({
          message: resp.msg,
          type: resp.type,
        });
      });
    },
    handleNodeClick() {
      this.form.perms = this.$refs.tree.getCheckedKeys();
    },
    handlePermsSelect() {
      if (this.value === 1) {
        this.customize = true;
        this.form.perms = [];
      } else {
        this.customize = false;
        this.form.perms = 1;
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>