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
            prop="college_name"
            label="学院名称"
          ></el-table-column>
          <el-table-column prop="total_people" label="总人数"></el-table-column>
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
import api from "../../../api/api";
export default {
  components: { EmploymentRate },
  data() {
    return {
      xData: [],
      data: [],
      data1: [],
      tableData: [
        {
          college_name: "经济与管理学院",
          total_people: 377,
          employment_people: 300,
          unemployment_people: 77,
          employment_rate: "90%",
        },
      ],
    };
  },
  methods: {
    getData() {
      api.getERate().then((resp) => {
        for(let i=0;i<resp.data.length;i++){
          if(!resp.data[i].school){
            this.xData.push(resp.data[i].college_name);
            this.data.push(resp.data[i].employment_rate);
            this.data1.push(resp.data[i].employment_people);
          }
        }
        this.tableData=resp.data;
      });
    },
  },
  mounted(){
    this.getData();
  }
};
</script>

<style>
</style>