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

    <el-card class="mb-20" :shadow="cardShadow" style="max-height: 800px">
      <el-row>
        <el-col :span="12">
          <ScatterMap
            id="empl-city"
            :data="cityData"
            title="毕业生就业去向"
            roam
            height="700px"
          ></ScatterMap>
        </el-col>
        <el-col :span="12">
          <el-table
            :data="city"
            :default-sort="{ prop: 'total_people', order: 'descending' }"
            style="overflow: auto"
          >
            <el-table-column type="index"> </el-table-column>
            <el-table-column
              prop="city_name"
              label="城市名称"
            ></el-table-column>
            <el-table-column
              prop="total_people"
              label="总人数"
            ></el-table-column>
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
          <ul v-if="work.most">
            <li>
              最多人选择的工作岗位是：{{ work.most.work_name }}，一共有{{
                work.most.total_people
              }}人选择，在全部就业岗位中占比{{ work.most.empl_rate }}%。
            </li>
            <li>
              最多女生选择的工作岗位是：{{
                work.female_most.work_name
              }}，一共有{{ work.female_most.total_people }}人选择，其次是：{{
                work.female_second.work_name
              }}，一共有{{ work.female_second.total_people }}人选择。
            </li>
            <li>
              最多男生选择的工作岗位是：{{ work.male_most.work_name }}，一共有{{
                work.male_most.total_people
              }}人选择，其次是：{{ work.male_second.work_name }}，一共有{{
                work.male_second.total_people
              }}人选择。
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
        <el-col :span="12" class="analysis">
          <ul v-if="plan.most">
            <li>
              最多人选择的计划是：{{ plan.most.plan }}，一共有{{
                plan.most.total_people
              }}人选择。
            </li>
            <li>
              最多女生选择的计划是：{{ plan.female_most.plan }}，一共有{{
                plan.female_most.total_people
              }}人选择，其次是：{{ plan.female_second.plan }}，一共有{{
                plan.female_second.total_people
              }}人选择。
            </li>
            <li>
              最多男生选择的计划是：{{ plan.male_most.plan }}，一共有{{
                plan.male_most.total_people
              }}人选择，其次是：{{ plan.male_second.plan }}，一共有{{
                plan.male_second.total_people
              }}人选择。
            </li>
          </ul>
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
  getStudentPlan,
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
      city: [],
      work: {},
      plan: {},
    };
  },
  methods: {
    getData(r) {
      this.reset(r);
      //获取就业城市选择信息
      getEmplCityInfo(this.params).then((resp) => {
        let data = resp.obj.results;
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
        this.plan = resp.obj;
        //字典转换
        this.getDictData("stats_stdnt_plan").then((resp) => {
          this.planData.name = this.selectDictLabels(resp.obj, planList);
          this.planData.series.push({ data: peoples, type: "bar" });
          this.plan.most.plan = this.selectDictLabel(
            resp.obj,
            this.plan.most.plan
          );
          this.plan.female_most.plan = this.selectDictLabel(
            resp.obj,
            this.plan.female_most.plan
          );
          this.plan.female_second.plan = this.selectDictLabel(
            resp.obj,
            this.plan.female_second.plan
          );
          this.plan.male_most.plan = this.selectDictLabel(
            resp.obj,
            this.plan.male_most.plan
          );
          this.plan.male_second.plan = this.selectDictLabel(
            resp.obj,
            this.plan.male_second.plan
          );
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