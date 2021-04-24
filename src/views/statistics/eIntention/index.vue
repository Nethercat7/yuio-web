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
            size="mini"
            v-model="params.temp"
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
  getIntentionCityInfo,
  getIntentionWorkInfo,
} from "@/api/statistics/intention";

export default {
  name: "EmploymentIntention",
  components: { Bar, Radar },
  data() {
    return {
      cityList: [],
      cityIntentionPeople: [],
      workList: [],
      workIntentionPeople: [],
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
      //获取意向城市选择信息
      getIntentionCityInfo(this.params).then((resp) => {
        resp.obj.forEach((element) => {
          this.cityList.push(element.city);
          this.cityIntentionPeople.push(element.people);
        });
      });
      //获取意向岗位选择信息
      getIntentionWorkInfo(this.params).then((resp) => {
        let data = [];
        resp.obj.forEach((element) => {
          this.workList.push({ name: element.type, max: resp.obj[0].people });
          data.push(element.people);
        });
        this.workIntentionPeople.push({
          value: data,
          name: "意向工作岗位统计",
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
      if (r) {
        this.params = {};
        this.params.grade = new Date().getFullYear() - 4;
      }
      this.cityList = [];
      this.cityIntentionPeople = [];
      this.workList = [];
      this.workIntentionPeople = [];
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