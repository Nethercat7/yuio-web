<template>
  <el-row class="card">
    <el-col :span="12">
      <el-button size="mini" type="success">添加</el-button>
      <el-button size="mini" type="primary">导入</el-button>
      <el-button size="mini" type="warning">导出</el-button>
    </el-col>
    <el-col :span="12" style="text-align: right">
      <el-autocomplete
        placeholder="请输入内容"
        size="mini"
        style="margin-right: 10px"
        :trigger-on-focus="false"
        value-key="student_name"
      ></el-autocomplete>
      <el-button size="mini" type="success">搜索</el-button>
      <el-button size="mini" type="danger">重置</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Toolbar",
};
</script>

<style>
/* 
v-model="keyword"
:fetch-suggestions="searchSuggestions"
 */
</style>