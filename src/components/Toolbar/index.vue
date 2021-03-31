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
        :value-key="valueKey"
        v-model="keyword"
        :fetch-suggestions="searchSuggestions"
      ></el-autocomplete>
      <el-button size="mini" type="success" @click="handleSearch"
        >搜索</el-button
      >
      <el-button size="mini" type="danger" @click="handleReset">重置</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Toolbar",
  props: {
    valueKey: {
      type: String,
      default: "value",
    },
    arr: {
      type: Array,
    },
    backup: {
      type: Array,
    },
  },
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    searchSuggestions(queryString, cb) {
      let restaurants = this.backup;
      let results = queryString
        ? restaurants.filter(this.createFilter())
        : restaurants;
      cb(results);
    },
    handleSearch() {
      //搜索前先恢复备份的完整数据，然后在进行搜索。防止在当前搜索结果中进行第二次搜索找不到数据。
      //this.arr = this.backup;
      let data = this.arr;
      data = data.filter(this.createFilter());
      this.$emit("result", data);
    },
    createFilter() {
      return (data) =>
        data.user_name.toLowerCase().includes(this.keyword.toLowerCase()) ||
        data.user_account.toLowerCase().includes(this.keyword.toLowerCase());
    },
    handleReset() {
      this.$emit("update:arr", this.backup);
    },
  },
};
</script>

<style>
</style>