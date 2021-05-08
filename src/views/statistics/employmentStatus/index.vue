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
        <el-col :span="12">
          <el-table :data="cityTableData">
            <el-table-column label="城市" prop="city_name"></el-table-column>
            <el-table-column label="人数" prop="total_people"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <el-col :span="12">
          <Radar id="empl-work" :data="workData" title="就业岗位"></Radar>
        </el-col>
        <el-col :span="12" class="analysis">
          <ul>
            <li>
              最多人选择的工作岗位是：{{ work.most.work_name }}，一共有{{
                work.most.total_people
              }}人选择，在全部就业岗位中占比{{work.most.empl_rate}}%。
            </li>
            <li>
              最多女生选择的工作岗位是：{{
                work.female_most.work_name
              }}，一共有{{ work.female_most.total_people }}人选择，其次是：{{work.female_second.work_name}}，一共有{{work.female_second.total_people}}人选择。
            </li>
            <li>
              最多男生选择的工作岗位是：{{ work.male_most.work_name }}，一共有{{
                work.male_most.total_people
              }}人选择，其次是：{{work.male_second.work_name}}，一共有{{work.male_second.total_people}}人选择。
            </li>
          </ul>
        </el-col>
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
      cityTableData: [],
      work: {},
    };
  },
  methods: {
    getData(r) {
      this.reset(r);
      //获取就业城市选择信息
      getEmplCityInfo(this.params).then((resp) => {
        let data = resp.obj.results;
        //格式化数据
        let cities = [];
        let peoples = [];
        data.forEach((element) => {
          cities.push(element.city_name);
          peoples.push(element.total_people);
        });
        this.cityData.name = cities;
        this.cityData.series.push({ data: peoples, type: "bar" });
        this.cityTableData = data;
      });
      //获取就业岗位选择信息
      getEmplWorkInfo(this.params).then((resp) => {
        let data = resp.obj.results;
        let most = resp.obj.most;
        //格式化数据
        let peoples = [];
        data.forEach((element) => {
          this.workData.name.push({
            name: element.work_name,
            max: most.total_people,
          });
          peoples.push(element.total_people);
        });
        this.workData.data.push({ value: peoples, name: "就业岗位" });
        this.work = resp.obj;
      });
      //获取未就业学生计划信息
      getStudentPlan(this.params).then((resp) => {
        let data = resp.obj.results;
        let planList = [];
        let peoples = [];
        data.forEach((element) => {
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
      this.gradeList = [];
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
.analysis li {
  padding-bottom: 20px;
}
</style>