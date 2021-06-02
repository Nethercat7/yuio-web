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
            >确定</el-button
          >
          <el-button size="mini" type="danger" @click="getData(true)"
            >重置</el-button
          >
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mb-20" :shadow="cardShadow">
      <el-row class="mb-20">
        <el-col :span="12">
          <el-button size="mini" type="warning" @click="handleOutput('city')"
            >导出当前数据</el-button
          >
          <ScatterMap
            id="intention-city"
            :data="cityData"
            title="意向城市人数分布"
            height="700px"
          ></ScatterMap>
        </el-col>
        <el-col :span="12">
          <el-table :data="city" stripe height="700">
            <el-table-column type="index"></el-table-column>
            <el-table-column
              label="城市名称"
              prop="city_name"
            ></el-table-column>
            <el-table-column
              label="总人数"
              prop="total_people"
              sortable
            ></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>

    <el-card :shadow="cardShadow">
      <el-row class="mb-20">
        <el-col :span="12">
          <el-button size="mini" type="warning" @click="handleOutput('work')"
            >导出当前数据</el-button
          >
          <Radar
            id="intention-work"
            :data="workData"
            title="意向岗位人数分布"
            height="700px"
          ></Radar>
        </el-col>
        <el-col :span="12">
          <el-row :gutter="24">
            <el-col :span="8">
              <h3 style="text-align: center">总排行</h3>
              <el-table :data="work.total_rank" stripe height="700">
                <el-table-column type="index"> </el-table-column>
                <el-table-column
                  label="岗位名称"
                  prop="work_name"
                ></el-table-column>
                <el-table-column
                  label="总人数"
                  prop="total_people"
                  sortable
                ></el-table-column>
              </el-table>
            </el-col>
            <el-col :span="8">
              <h3 style="text-align: center">女生排行</h3>
              <el-table :data="work.female_rank" stripe height="700">
                <el-table-column type="index"> </el-table-column>
                <el-table-column
                  label="岗位名称"
                  prop="work_name"
                ></el-table-column>
                <el-table-column
                  label="总人数"
                  prop="total_people"
                  sortable
                ></el-table-column>
              </el-table>
            </el-col>
            <el-col :span="8">
              <h3 style="text-align: center">男生排行</h3>
              <el-table :data="work.male_rank" stripe height="700">
                <el-table-column type="index"> </el-table-column>
                <el-table-column
                  label="岗位名称"
                  prop="work_name"
                ></el-table-column>
                <el-table-column
                  label="总人数"
                  prop="total_people"
                  sortable
                ></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Radar from "@/components/charts/radar";
import ScatterMap from "@/components/charts/scatterMap";
import { getGrade, getCompleteOrg } from "@/api/system/sys";
import {
  getIntentionCityInfo,
  getIntentionWorkInfo,
} from "@/api/statistics/intention";
import { convertData } from "@/utils/yuio";
import { outputCityInfo, outputWorkInfo } from "@/api/statistics/output";

export default {
  name: "EmploymentIntention",
  components: { Radar, ScatterMap },
  data() {
    return {
      cityData: [],
      workData: {
        name: [],
        data: [],
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
        org_id: "500291302093488128",
        temp: "500291302093488128",
      },
      city: [],
      work: {},
    };
  },
  methods: {
    getData(r) {
      this.reset(r);
      //获取意向城市选择信息
      getIntentionCityInfo(this.params).then((resp) => {
        let data = resp.obj;
        let cities = [];
        cities = data.map((item) => {
          return {
            name: item.city_name,
            value: item.total_people,
          };
        });
        this.cityData = convertData(cities);
        this.city = data;
      });
      //获取意向岗位选择信息
      getIntentionWorkInfo(this.params).then((resp) => {
        let data = resp.obj.results;
        //格式化数据
        let peoples = [];
        data.forEach((element) => {
          this.workData.name.push({
            name: element.work_name,
            max: resp.max,
          });
          peoples.push(element.total_people);
        });
        this.workData.data.push({ value: peoples, name: "就业岗位" });
        this.work = resp.obj;
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
      if (r) {
        this.params.org_id = "500291302093488128";
        this.params.temp = "500291302093488128";
      }
      this.workData = {
        name: [],
        data: [],
      };
      this.gradeList = [];
    },
    setParams() {
      let arr = this.$refs.cascader.getCheckedNodes()[0];
      this.params.org_id = arr.value;
    },
    getOrg() {
      getCompleteOrg(this.params.grade).then((resp) => {
        this.orgList = resp.obj;
      });
    },
    handleOutput(type) {
      if (type == "city") {
        outputCityInfo(this.city).then((resp) => {
          if (!resp.status) this.fileDownloader(resp, "意向城市人数分布.xlsx");
        });
      } else if (type == "work") {
        outputWorkInfo(this.work).then((resp) => {
          if (!resp.status) this.fileDownloader(resp, "意向岗位人数分布.xlsx");
        });
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>