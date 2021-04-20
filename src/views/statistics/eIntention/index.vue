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
            :data="cityIntentionPeople"
            :name="cityList"
            title="意向工作城市统计"
            suffix="人"
          ></Bar>
        </el-col>
        <el-col :span="12"> </el-col>
      </el-card>
    </el-row>

    <el-row class="mb-20">
      <el-card>
        <el-col :span="12">
          <Radar
            id="work"
            :data="workIntentionPeople"
            :indicator="workList"
            title="意向工作岗位统计"
          ></Radar>
        </el-col>
        <el-col :span="12">
          
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import Bar from "@/components/charts/bar";
import Radar from "@/components/charts/radar";
import api from "@/api/api";

export default {
  name: "EmploymentIntention",
  components: { Bar, Radar },
  data() {
    return {
      cityList: [],
      cityIntentionPeople: [],
      workList:[],
      workIntentionPeople:[]
    };
  },
  methods: {
    getData() {
      api.getIntentionCityInfo().then((resp) => {
        resp.obj.forEach((element) => {
          this.cityList.push(element.city);
          this.cityIntentionPeople.push(element.people);
        });
      });
      api.getIntentionWorkInfo().then(resp=>{
        let data=[];
        resp.obj.forEach(element => {
          this.workList.push({name:element.work,max:resp.obj[0].people})
          data.push(element.people);
        });
        this.workIntentionPeople.push({value:data,name:'意向工作岗位统计'})
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
.top-tools .el-card__body {
  padding: 10px !important;
}
</style>