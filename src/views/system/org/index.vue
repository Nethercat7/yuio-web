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
          value-key="org_name"
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
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          row-key="org_id"
        >
          <el-table-column label="组织名称" prop="org_name" sortable>
          </el-table-column>
          <el-table-column label="组织编号" prop="org_code" sortable>
          </el-table-column>
          <el-table-column label="毕业生数量" prop="org_students" sortable>
          </el-table-column>
          <el-table-column label="状态" prop="org_status_display" sortable>
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
                @confirm="deleteRow(scope.row.org_id)"
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
      :title="type == 'add' ? '添加院系' : '修改院系'"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="closeDialog"
    >
      <el-form ref="form" :model="form">
        <el-form-item label="名称">
          <el-input v-model="form.org_name"></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="form.org_code"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.org_status">
            <el-radio :label="0">启用</el-radio>
            <el-radio :label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.org_description"></el-input>
        </el-form-item>
        <el-form-item label="上级组织">
          <el-cascader
            v-model="form.org_pid"
            :options="tableData"
            :props="cascaderProps"
            filterable
            clearable
            ref="cascader"
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
import api from "@/api/api";
export default {
  name: "collegeManagement",
  data() {
    return {
      tableData: [],
      tableDataBak: [],
      dialogVisible: false,
      type: "",
      form: {},
      currentPage: 1,
      pageSize: 10,
      total: 0,
      keyword: "",
      cascaderProps: {
        value: "org_id",
        label: "org_name",
        checkStrictly: true,
      },
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
      //添加级联选择器选中的Pid
      let node = this.$refs.cascader.getCheckedNodes();
      if (node.length != 0) {
        this.form.org_pid = node[0].value;
      } else {
        this.form.org_pid = "0";
      }
      if (this.type == "add") {
        api.addOrg(this.form).then((resp) => {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
          if (resp.code === 0) this.getData();
        });
      } else {
        api.updOrg(this.form).then((resp) => {
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
    deleteRow(id) {
      api.delOrg(id).then((resp) => {
        this.$message({
          message: resp.msg,
          type: resp.type,
        });
        if (resp.code === 0) this.getData();
      });
    },
    getData() {
      api.getOrg().then((resp) => {
        this.tableDataBak = resp.obj;
        this.total = resp.obj.length;
        let data = resp.obj;
        for (let i = 0; i < data.length; i++) {
          //将状态码转换为文本
          if (data[i].org_status === 0) {
            data[i].org_status_display = "正常";
          } else {
            data[i].org_status_display = "禁用";
          }
        }
        this.tableData = data;
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
      console.log(results);
      cb(results);
    },
    handleSearch() {
      this.tableData = this.tableDataBak;
      this.tableData = this.tableData.filter(this.createFilter());
      this.total = this.tableData.length;
    },
    createFilter() {
      return (data) =>
        data.org_name.toLowerCase().includes(this.keyword.toLowerCase()) ||
        data.org_code.toLowerCase().includes(this.keyword.toLowerCase());
    },
    resetResult() {
      this.tableData = this.tableDataBak;
      this.total = this.tableData.length;
      this.keyword = "";
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>