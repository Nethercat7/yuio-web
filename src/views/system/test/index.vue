<template>
  <div>
    <el-button @click="download">Download</el-button>
  </div>
</template>
<script>
import { output } from "@/api/tool/excel";

export default {
  name: "Test",
  methods: {
    download() {
      output().then((resp) => {
        this.fileDownloader(resp,"测试.xlsx");
      });
    },
  },
};
</script>
<style>
</style>