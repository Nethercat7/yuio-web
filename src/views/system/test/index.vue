<template>
  <div>
    <el-row :gutter="24" class="mb-20">
      <el-col :span="6">
        <el-card :shadow="cardShadow"> </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :shadow="cardShadow"> </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :shadow="cardShadow"> </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :shadow="cardShadow"> </el-card>
      </el-col>
    </el-row>

    <el-card :shadow="cardShadow" class="mb-20">
      <div style="width: 100%; height: 300px"></div>
    </el-card>

    <el-card :shadow="cardShadow">
      <div style="width: 100%; height: 300px"></div>
    </el-card>
  </div>
</template>
<script>
export default {};
</script>
<style>
.one .el-col {
  height: 200px;
}
</style>