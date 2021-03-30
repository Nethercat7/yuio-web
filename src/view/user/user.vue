<template>
  <div>
    <Toolbar></Toolbar>
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
          <el-table-column label="姓名" prop="user_name"></el-table-column>
          <el-table-column label="账号" prop="user_account"></el-table-column>
          <el-table-column label="性别" prop="user_gender"></el-table-column>
          <el-table-column label="电话号码" prop="user_phone"></el-table-column>
          <el-table-column label="状态" prop="user_status"></el-table-column>
          <el-table-column label="操作" fixed="right" width="250px">
            <template>
              <el-button size="mini" type="info">编辑</el-button>
              <el-popconfirm
                title="删除后将无法恢复，确定删除吗？"
                style="padding: 7px 15px"
                icon="el-icon-info"
                icon-color="red"
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
        <Pager :total="totalPage" :currentPage="currentPage" :page.sync="currentPage" :size.sync="pageSize"></Pager>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Toolbar from "@/components/Toolbar";
import Pager from "@/components/Pager";
import api from "../../api/api";

export default {
  name: "userManagement",
  components: { Toolbar,Pager},
  data() {
    return {
      tableData: [],
      totalPage: 0,
      currentPage: 1,
      pageSize: 10,
    };
  },
  methods: {
    getData() {
      api.getUsers().then((resp) => {
        let data = resp.data;
        this.tableData = data;
        this.totalPage = data.length;
      });
    }
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>