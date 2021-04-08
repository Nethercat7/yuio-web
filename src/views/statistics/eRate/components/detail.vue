<template>
  <div>
    <el-row class="mb-20" :gutter="24">
      <el-col :span="6">
        <el-card class="text-center">
          <div slot="header">
            <span>毕业生数</span>
          </div>
          <div></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="text-center">
          <div slot="header">
            <span>就业人数</span>
          </div>
          <div></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="text-center">
          <div slot="header">
            <span>未就业人数</span>
          </div>
          <div></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="text-center">
          <div slot="header">
            <span>就业率</span>
          </div>
          <div></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24"
        ><el-card>
          <el-table>
            <el-table-column label="姓名"></el-table-column>
            <el-table-column label="专业"></el-table-column>
            <el-table-column label="状态"></el-table-column>
            <el-table-column label="后续规划"></el-table-column>
          </el-table> </el-card
      ></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "EmploymentRateDetail",
  data() {
    return {
      data: [],
    };
  },
};
</script>

<style>
</style>