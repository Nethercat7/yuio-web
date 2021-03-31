<template>
  <el-pagination
    layout="total,sizes,prev, pager, next,jumper"
    :total="total"
    :current-page="currentPage"
    @current-change="handlePageChange"
    @size-change="handleSizeChange"
    style="margin-top: 10px; text-align: center"
  >
  </el-pagination>
</template>

<script>
export default {
  name: "Pager",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {};
  },
  methods: {
    handlePageChange(val) {
      this.$emit("update:page", val);
    },
    handleSizeChange(val) {
      this.$emit("update:size", val);
    },
  },
};
</script>

<style>
</style>