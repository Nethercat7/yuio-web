<template>
  <div>
    <!-- <el-row class="mb-20">
      <el-col :span="24" style="text-align: right">
        <el-card class="top-tools">
          <el-select size="mini" style="margin-right:20px">
            <el-option label="2021届"></el-option>
            <el-option label="2020届"></el-option>
            <el-option label="2022届"></el-option>
            <el-option label="2023届"></el-option>
          </el-select>
          <el-cascader
            size="mini"
            v-model="value"
            :options="options"
            clearable
            @change="handleChange"
            :props="cascaderProps"
            style="margin-right: 20px"
            filterable
            :show-all-levels="false"
            ref="cascader"
          ></el-cascader>
          <el-button size="mini" type="success">切换</el-button>
          <el-button size="mini" type="danger">重置</el-button>
        </el-card>
      </el-col>
    </el-row> -->

    <el-row class="mb-20">
      <el-card>
        <el-col :span="12">
          <Bar
            id="work-cityies"
            :data="workCityPeople"
            :name="workCityName"
            title="就业城市统计"
            suffix="人"
          ></Bar>
        </el-col>
        <el-col :span="12">
          <p>xxx就业人数一共有:{{totalPeople}}人</p>
          <p>大多数人选择的前三位城市是：</p>
          <ol>
            <li>{{workCityName[0]}}</li>
            <li>{{workCityName[1]}}</li>
            <li>{{workCityName[2]}}</li>
          </ol>
        </el-col>
      </el-card>
    </el-row>

<!--     <el-row class="mb-20">
      <el-card>
        <el-col :span="12">
          <radar
            id="job"
            :data="jobPeople"
            :indicator="jobName"
            title="工作岗位"
          ></radar>
        </el-col>
        <el-col :span="12">
          <p>xxx中大部分人选择从事的岗位是：xxx，有x%的人选择了该岗位</p> 
        </el-col>
      </el-card>
    </el-row> -->

    <!-- <el-row>
      <el-card>
        <el-col :span="12">
          <bar
            id="bar-1"
            :data="unemploylmentPeople"
            :name="intend"
            title="未就业的学生接下来的打算"
            horizontal
          ></bar>
        </el-col>
        <el-col :span="12">
          <p>xxx中未就业的学生一共有xxx名</p>
          <p>x%的学生接下来打算xxx</p>
        </el-col>
      </el-card>
    </el-row> -->
  </div>
</template>

<script>
import Bar from "@/components/charts/bar";
//import radar from "@/components/charts/radar";
import api from "@/api/api";

export default {
  name: "EmploymentStatus",
  components: { Bar},
  data() {
    return {
      workCityPeople:[],
      workCityName:[],
      totalPeople:0
    }
  },
  methods: {
    getData(){
      api.getEmploymentCityInfo().then(resp=>{
        let data=resp.obj;
        data.forEach(element => {
          this.workCityPeople.push(element.people);
          this.workCityName.push(element.city);
          this.totalPeople+=element.people
        });
      })
    },
    handleChange() {
      console.log(this.$refs.cascader.getCheckedNodes(true));
    },
  },
  mounted(){
    this.getData();
  }
};
</script>

<style>

</style>