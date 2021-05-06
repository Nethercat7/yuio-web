<template>
  <el-input size="mini" :keyword="keyword" :data="data"></el-input>
</template>

<script>
export default {
  name: "Search",
  props: {
    keyword: {
      type: String,
      default: "",
    },
    data: {
      type: Array,
      default: null,
    },
  },
  methods: {
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
  },
};
</script>

<style>
</style>