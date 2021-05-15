<template>
  <div>
    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <el-col :span="24" style="text-align: right">
          <span>就业情况查询：</span>
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
            >确定</el-button
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
          <ScatterMap
            id="empl-city"
            :data="cityData"
            title="就业城市人数分布"
            roam
            height="700px"
          ></ScatterMap>
        </el-col>
        <el-col :span="12">
          <el-table
            :data="city"
            :default-sort="{ prop: 'total_people', order: 'descending' }"
            height="700"
            stripe
          >
            <el-table-column type="index"> </el-table-column>
            <el-table-column
              prop="city_name"
              label="城市名称"
            ></el-table-column>
            <el-table-column
              prop="total_people"
              label="总人数"
              sortable
            ></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <el-col :span="12">
          <Radar
            id="empl-work"
            :data="workData"
            title="就业岗位人数分布"
            height="700px"
          ></Radar>
        </el-col>
        <el-col :span="12">
          <!-- <el-button size="mini" type="success">切换至就业行业统计</el-button>
          <el-divider></el-divider> -->
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

    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <el-col :span="12">
          <Bar
            id="empl-plan"
            :data="emplPlanData"
            title="已就业学生的计划"
            horizontal
            suffix="人"
            height="700px"
          ></Bar>
        </el-col>
        <el-col :span="12">
          <el-row :gutter="24">
            <el-col :span="8">
              <h3 style="text-align: center">总排行</h3>
              <el-table :data="emplPlan.total_rank" stripe height="700">
                <el-table-column type="index"> </el-table-column>
                <el-table-column
                  label="计划名称"
                  prop="plan"
                  :formatter="planFormatter"
                ></el-table-column>
                <el-table-column
                  label="总人数"
                  prop="total_people"
                ></el-table-column>
              </el-table>
            </el-col>
            <el-col :span="8">
              <h3 style="text-align: center">女生排行</h3>
              <el-table :data="emplPlan.female_rank" stripe height="700">
                <el-table-column type="index"> </el-table-column>
                <el-table-column
                  label="计划名称"
                  prop="plan"
                  :formatter="planFormatter"
                ></el-table-column>
                <el-table-column
                  label="总人数"
                  prop="total_people"
                ></el-table-column>
              </el-table>
            </el-col>
            <el-col :span="8">
              <h3 style="text-align: center">男生排行</h3>
              <el-table :data="emplPlan.male_rank" stripe height="700">
                <el-table-column type="index"> </el-table-column>
                <el-table-column
                  label="计划名称"
                  prop="plan"
                  :formatter="planFormatter"
                ></el-table-column>
                <el-table-column
                  label="总人数"
                  prop="total_people"
                ></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>

    <el-card :shadow="cardShadow">
      <el-row>
        <el-col :span="12">
          <Bar
            id="unempl-plan"
            :data="unEmplPlanData"
            title="未就业学生的计划"
            horizontal
            suffix="人"
            height="700px"
          ></Bar>
        </el-col>
        <el-col :span="12">
          <el-row :gutter="24">
            <el-col :span="8">
              <h3 style="text-align: center">总排行</h3>
              <el-table :data="unEmplPlan.total_rank" stripe height="700">
                <el-table-column type="index"> </el-table-column>
                <el-table-column
                  label="计划名称"
                  prop="plan"
                  :formatter="planFormatter"
                ></el-table-column>
                <el-table-column
                  label="总人数"
                  prop="total_people"
                ></el-table-column>
              </el-table>
            </el-col>
            <el-col :span="8">
              <h3 style="text-align: center">女生排行</h3>
              <el-table :data="unEmplPlan.female_rank" stripe height="700">
                <el-table-column type="index"> </el-table-column>
                <el-table-column
                  label="计划名称"
                  prop="plan"
                  :formatter="planFormatter"
                ></el-table-column>
                <el-table-column
                  label="总人数"
                  prop="total_people"
                ></el-table-column>
              </el-table>
            </el-col>
            <el-col :span="8">
              <h3 style="text-align: center">男生排行</h3>
              <el-table :data="unEmplPlan.male_rank" stripe height="700">
                <el-table-column type="index"> </el-table-column>
                <el-table-column
                  label="计划名称"
                  prop="plan"
                  :formatter="planFormatter"
                ></el-table-column>
                <el-table-column
                  label="总人数"
                  prop="total_people"
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
import Bar from "@/components/charts/bar";
import Radar from "@/components/charts/radar";
import ScatterMap from "@/components/charts/scatterMap";
import { convertData } from "@/utils/yuio";
import { getGrade, getCompleteOrg } from "@/api/system/sys";
import {
  getEmplCityInfo,
  getEmplWorkInfo,
  getUnEmplStudentPlan,
  getEmplStudentPlan,
} from "@/api/statistics/status";

export default {
  name: "EmploymentStatus",
  components: {
    Bar,
    Radar,
    ScatterMap,
  },
  data() {
    return {
      cityData: [],
      workData: {
        name: [],
        data: [],
      },
      unEmplPlanData: {
        series: [],
      },
      emplPlanData: {
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
      city: [],
      work: {},
      emplPlan: {},
      unEmplPlan: {},
      planList: [],
      // industryData: {
      //   name: [],
      //   data: [],
      // },
    };
  },
  methods: {
    getData(r) {
      this.reset(r);
      //获取就业城市选择信息
      getEmplCityInfo(this.params).then((resp) => {
        let data = resp.obj;
        //格式化数据
        let cities = data.map((item) => {
          return {
            name: item.city_name,
            value: item.total_people,
          };
        });
        this.cityData = convertData(cities);
        this.city = data;
      });
      //获取就业岗位选择信息
      getEmplWorkInfo(this.params).then((resp) => {
        let data = resp.obj.results;
        // //格式化行业数据
        // let peoples1 = [];
        // data.forEach((element) => {
        //   this.industryData.name.push({
        //     name: element.work_name,
        //     max: resp.obj.max,
        //   });
        //   peoples1.push(element.total_people);
        //   this.industryData.data.push({
        //     value: peoples1,
        //     name: "就业行业人数分布",
        //   });
        // });
        //格式化岗位数据
        let peoples2 = [];
        data.forEach((element) => {
          this.workData.name.push({
            name: element.work_name,
            max: resp.obj.max,
          });
          peoples2.push(element.total_people);
          this.workData.data.push({
            value: peoples2,
            name: "就业岗位人数分布",
          });
        });

        this.work = resp.obj;
      });
      //获取未就业学生计划信息
      getUnEmplStudentPlan(this.params).then((resp) => {
        let data = resp.obj.results;
        let planList = [];
        let peoples = [];
        data.forEach((element) => {
          planList.push(element.plan);
          peoples.push(element.total_people);
        });
        this.unEmplPlan = resp.obj;
        //字典转换
        this.getDictData("stats_stdnt_plan").then((resp) => {
          this.planList = resp.obj;
          this.unEmplPlanData.name = this.selectDictLabels(resp.obj, planList);
          this.unEmplPlanData.series.push({ data: peoples, type: "bar" });
        });
      });
      //获取就业学生计划信息
      getEmplStudentPlan(this.params).then((resp) => {
        let data = resp.obj.results;
        let planList = [];
        let peoples = [];
        data.forEach((element) => {
          planList.push(element.plan);
          peoples.push(element.total_people);
        });
        this.emplPlan = resp.obj;
        //字典转换
        this.getDictData("stats_stdnt_plan").then((resp) => {
          this.emplPlanData.name = this.selectDictLabels(resp.obj, planList);
          this.emplPlanData.series.push({ data: peoples, type: "bar" });
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
      //this.cityData = [];
      // this.industryData = {
      //   name: [],
      //   data: [],
      // };
      this.workData = {
        name: [],
        data: [],
      };
      this.emplPlanData = {
        series: [],
      };
      this.unEmplPlanData = {
        series: [],
      };
      if (r) {
        this.params = {
          grade: new Date().getFullYear() - 4,
        };
      }
      this.gradeList = [];
    },
    setParams() {
      let arr = this.$refs.cascader.getCheckedNodes()[0].pathNodes;
      this.params.college_id = arr[0].value;
      this.params.major_id = arr[1].value;
      this.params.class_id = arr[2].value;
    },
    getOrg() {
      getCompleteOrg(this.params.grade).then((resp) => {
        this.orgList = resp.obj;
      });
    },
    planFormatter(row) {
      return this.selectDictLabel(this.planList, row.plan);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>