<template>
  <div>
    <el-row class="mb-20">
      <el-col :span="24" style="text-align: right">
        <el-card class="top-tools">
          <el-select
            size="mini"
            style="margin-right: 20px"
            v-model="params.grade"
            @change="getOrg"
          >
            <el-option
              v-for="item in gradeList"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
          <el-cascader
            v-model="params.temp"
            size="mini"
            :options="orgList"
            clearable
            :props="cascaderProps"
            style="margin-right: 20px"
            filterable
            :show-all-levels="false"
            ref="cascader"
            @change="setParams"
          ></el-cascader>
          <el-button size="mini" type="success" @click="getData()"
            >切换</el-button
          >
          <el-button size="mini" type="danger" @click="getData(true)"
            >重置</el-button
          >
        </el-card>
      </el-col>
    </el-row>

    <el-row class="mb-20">
      <el-card>
        <el-col :span="12">
          <Bar
            id="empl-city"
            :data="cityData"
            title="就业城市统计"
            suffix="人"
          ></Bar>
        </el-col>
        <el-col :span="12"> </el-col>
      </el-card>
    </el-row>

    <el-row class="mb-20">
      <el-card>
        <el-col :span="12">
          <Radar id="empl-work" :data="workData" title="工作岗位"></Radar>
        </el-col>
        <el-col :span="12"> </el-col>
      </el-card>
    </el-row>

    <el-row>
      <el-card>
        <el-col :span="12">
          <Bar
            id="plan"
            :data="planData"
            title="未就业的学生接下来的打算"
            horizontal
            suffix="人"
          ></Bar>
        </el-col>
        <el-col :span="12"> </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import Bar from "@/components/charts/bar";
import Radar from "@/components/charts/radar";
import { getGrade, getCompleteOrg } from "@/api/system/sys";
import {
  getEmplCityInfo,
  getEmplWorkInfo,
  getStudentPlan,
} from "@/api/statistics/status";

export default {
  name: "EmploymentStatus",
  components: {
    Bar,
    Radar,
  },
  data() {
    return {
      cityData: {
        series: [],
      },
      workData: {
        name: [],
        data: [],
      },
      planData: {
        series: [],
      },
      gradeList: [],
      orgList: [],
      cascaderProps: {
        label: "name",
        value: "id",
        checkStrictly: true,
      },
      params: {
        grade: new Date().getFullYear() - 4,
      },
    };
  },
  methods: {
    getData(r) {
      this.reset(r);
      //获取就业城市选择信息
      getEmplCityInfo(this.params).then((resp) => {
        let cityList = [];
        let peopleList = [];
        resp.obj.forEach((element) => {
          cityList.push(element.city);
          peopleList.push(element.people);
        });
        this.cityData.name = cityList;
        this.cityData.series.push({ data: peopleList, type: "bar" });
      });
      //获取就业岗位选择信息
      getEmplWorkInfo(this.params).then((resp) => {
        let workList = [];
        let peopleList = [];
        resp.obj.forEach((element) => {
          workList.push({ name: element.type, max: resp.obj[0].people });
          peopleList.push(element.people);
        });
        this.workData.name = workList;
        this.workData.data.push({ value: peopleList, name: "就业岗位" });
      });
      //获取未就业学生计划信息
      getStudentPlan(this.params).then((resp) => {
        let planList = [];
        let popleList = [];
        resp.obj.forEach((element) => {
          planList.push(element.plan);
          popleList.push(element.people);
        });
        //字典转换
        this.getDictData("stats_stdnt_plan").then((resp) => {
          this.planData.name = this.selectDictLabels(resp.obj, planList);
          this.planData.series.push({ data: popleList, type: "bar" });
        });
      });
      //获取年级信息
      getGrade().then((resp) => {
        this.gradeList = resp.obj;
      });
      //获取学院信息
      this.getOrg();
    },
    reset(r) {
      this.cityData = {
        series: [],
      };
      this.workData = {
        name: [],
        data: [],
      };
      this.planData = {
        series: [],
      };
      if (r) {
        this.params = {};
        this.params.grade = new Date().getFullYear() - 4;
      }
    },
    setParams() {
      let arr = this.$refs.cascader.getCheckedNodes()[0].path;
      this.params.college_id = arr[0];
      this.params.major_id = arr[1];
      this.params.class_id = arr[2];
    },
    getOrg() {
      getCompleteOrg(this.params.grade).then((resp) => {
        this.orgList = resp.obj;
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>