<template>
  <div>
    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
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
            :row-class-name="tableRowClassName"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            row-key="id"
          >
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="标识" prop="mark"></el-table-column>
            <el-table-column label="请求地址" prop="url"></el-table-column>
            <el-table-column label="图标" prop="icon"></el-table-column>
            <el-table-column
              label="类型"
              prop="type"
              :formatter="typeFormatter"
            ></el-table-column>
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
      :title="type == 'add' ? '新增菜单' : '修改菜单'"
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
        <el-form-item label="标识">
          <el-input v-model="form.mark"></el-input>
        </el-form-item>
        <el-form-item label="请求地址">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.type">
            <el-radio
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
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
        <el-form-item label="上级菜单">
          <el-cascader
            v-model="form.pid"
            :options="tableData"
            :props="cascaderProps"
            filterable
            clearable
            ref="cascader"
            :show-all-levels="false"
          ></el-cascader>
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
import { addPerms, getPerms, delPerms, updPerms } from "@/api/system/perms";

export default {
  name: "menuManagement",
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
      cascaderProps: {
        value: "id",
        label: "name",
        checkStrictly: true,
        emitPath: false,
      },
      statusOptions: [],
      typeOptions: [],
    };
  },
  methods: {
    getData() {
      getPerms().then((resp) => {
        this.tableData = resp.obj;
        this.tableDataBak = resp.obj;
        this.total = resp.obj.length;
      });
      //获取字典
      this.getDictData("sys_uvsl_status").then((resp) => {
        this.statusOptions = resp.obj;
      });
      this.getDictData("sys_menu_type").then((resp) => {
        this.typeOptions = resp.obj;
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
        addPerms(this.form).then((resp) => {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
          if (resp.code === 0) {
            this.getData();
            this.form = {};
          }
        });
      } else {
        updPerms(this.form).then((resp) => {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
          if (resp.code === 0) this.getData();
        });
      }
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
      delPerms(id).then((resp) => {
        if (resp.code === 0) {
          this.getData();
        }
        this.$message({
          message: resp.msg,
          type: resp.type,
        });
      });
    },
    statusFormatter(row) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    typeFormatter(row) {
      return this.selectDictLabel(this.typeOptions, row.type);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>