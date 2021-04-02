<template>
  <div>
    <el-row class="card">
      <el-col :span="12">
        <EmploymentRate
          :data="data"
          :xData="xData"
          :percentage="true"
          title="各学院就业率"
          subTitle="2021届"
          :showX="true"
          width="100%"
        ></EmploymentRate>
      </el-col>
      <el-col :span="12">
        <EmploymentRate
          :data="data1"
          :xData="xData"
          title="各学院就业人数"
          subTitle="2021届"
          :showX="true"
          width="100%"
          id="cc"
        ></EmploymentRate>
      </el-col>
    </el-row>
    <el-row class="card">
      <el-col :span="24">
        <el-table :data="tableData">
          <el-table-column
            prop="name"
            label="学院名称"
          ></el-table-column>
          <el-table-column
            prop="total_people"
            label="总人数"
          ></el-table-column>
          <el-table-column
            prop="employment_people"
            label="就业人数"
          ></el-table-column>
          <el-table-column
            prop="unemployment_people"
            label="未就业人数"
          ></el-table-column>
          <el-table-column
            prop="employment_rate"
            label="就业率"
          ></el-table-column>
          <el-table-column label="操作">
            <el-button size="mini" type="info">查看详情</el-button>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EmploymentRate from "@/components/Charts/bar";
export default {
  components: { EmploymentRate },
  data() {
    return {
      xData: [
        "经济与管理学院",
        "马克思学院",
        "计算机学院",
        "体育学院",
        "艺术学院",
        "汽车学院",
        "电子信息工程学院",
      ],
      data: [90, 95, 89, 93, 86, 92, 97],
      data1: [120, 200, 150, 80, 70, 110, 130],
      tableData: [{
        name:'经济与管理学院',
        total_people:377,
        employment_people:300,
        unemployment_people:77,
        employment_rate:'90%'
      }]
    };
  },
};
</script>

<style>
</style>