<template>
  <div>
    <!-- 各届总就业率对比 -->
    <el-row class="mb-20">
      <el-card>
        <el-col :span="12">
          <Pie id="schoolCompare" :data="data" title="各届就业率对比" suffix="%"></Pie>
        </el-col>
        <el-col :span="12">
          <div style="text-align:right">
            <el-select
              v-model="value"
              multiple
              collapse-tags
              style="margin-right: 20px"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-button size="mini" type="success">筛选</el-button>
          </div>
          <el-divider></el-divider>
        </el-col>
      </el-card>
    </el-row>
    <!-- 各学院就业率对比 -->
    <el-row>
      <el-card>
        <el-col :span="12">
          <LineChart id="collegeCompare" :seriesName="collegeName" :seriesData="collegeData" suffix="%" title="经济与管理学院往届就业率对比"></LineChart>
        </el-col>
        <el-col :span="12">
          <div style="text-align:right">
            <el-select
              v-model="value"
              multiple
              collapse-tags
              style="margin-right: 20px"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>

            <el-select
              v-model="value"
              multiple
              collapse-tags
              style="margin-right: 20px"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-button size="mini" type="success">筛选</el-button>
          </div>
          <el-divider></el-divider>
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import Pie from "@/components/charts/pie";
import LineChart from  "@/components/charts/line";

export default {
  name: "EmploymentRateCompare",
  components: {
    Pie,
    LineChart
  },
  data() {
    return {
      data: [
        { value: 100, name: "2021届" },
        { value: 95, name: "2020届" },
        { value: 90, name: "2019届" },
        { value: 85, name: "2018届" },
        { value: 80, name: "2017届" },
      ],
      options: [
        {
          value: "2021",
          label: "2021",
        },
        {
          value: "2020",
          label: "2020",
        },
        {
          value: "2019",
          label: "2019",
        },
        {
          value: "2018",
          label: "2018",
        },
        {
          value: "2017",
          label: "2017",
        },
      ],
      value: [],
      collegeName:['2021','2020','2019','2018','2016','2015','2014'],
      collegeData:[85,67,77,95,82,97,87]
    };
  },
};
</script>

<style>
</style>