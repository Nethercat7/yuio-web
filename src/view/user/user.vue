<template>
  <div>
    <Toolbar></Toolbar>
    <el-row class="card">
      <el-col :span="24">
        <el-table ref="table" :data="tableData">
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
    </el-row>
  </div>
</template>

<script>
import Toolbar from "@/components/Toolbar";
import api from "../../api/api";

export default {
  name: "userManagement",
  components: { Toolbar },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    getData() {
      api.getUsers().then((resp) => {
        let data = resp.data;
        this.tableData = data;
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