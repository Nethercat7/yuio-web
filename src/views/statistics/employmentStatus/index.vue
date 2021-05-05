<template>
  <div>
    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <el-col :span="24" style="text-align: right">
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
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <el-col :span="12">
          <Bar
            id="empl-city"
            :data="cityData"
            title="就业城市统计"
            suffix="人"
          ></Bar>
        </el-col>
        <el-col :span="12"> </el-col>
      </el-row>
    </el-card>

    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <el-col :span="12">
          <Radar id="empl-work" :data="workData" title="工作岗位"></Radar>
        </el-col>
        <el-col :span="12"> </el-col>
      </el-row>
    </el-card>

    <el-card :shadow="cardShadow">
      <el-row>
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
      </el-row>
    </el-card>
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
        let data = resp.obj;
        //格式化数据
        let cities = [];
        let peoples = [];
        data.forEach((element) => {
          cities.push(element.city_name);
          peoples.push(element.total_people);
        });
        this.cityData.name = cities;
        this.cityData.series.push({ data: peoples, type: "bar" });
      });
      //获取就业岗位选择信息
      getEmplWorkInfo(this.params).then((resp) => {
        let data = resp.obj;
        //格式化数据
        let works = [];
        let peoples = [];
        data.forEach((element) => {
          works.push(element.work_name);
          peoples.push(element.total_people);
        });
        let max = Math.max.apply(null, peoples);
        works.forEach((element) => {
          this.workData.name.push({ name: element, max: max });
        });
        this.workData.data.push({ value: peoples, name: "就业岗位" });
      });
      //获取未就业学生计划信息
      getStudentPlan(this.params).then((resp) => {
        let planList = [];
        let peoples = [];
        resp.obj.forEach((element) => {
          planList.push(element.plan);
          peoples.push(element.total_people);
        });
        //字典转换
        this.getDictData("stats_stdnt_plan").then((resp) => {
          this.planData.name = this.selectDictLabels(resp.obj, planList);
          this.planData.series.push({ data: peoples, type: "bar" });
        });
      });
      //获取年级信息
      getGrade().then((resp) => {
        resp.obj.forEach((element) => {
          this.gradeList.push({
            label: element + 4 + "届",
            value: element,
          });
        });
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
        this.params = {
          grade: new Date().getFullYear() - 4,
        };
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