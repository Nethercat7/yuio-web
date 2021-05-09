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
            >切换</el-button
          >
          <el-button size="mini" type="danger" @click="getData(true)"
            >重置</el-button
          >
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mb-20" :shadow="cardShadow" style="max-height: 800px">
      <el-row class="mb-20">
        <el-col :span="12">
          <ScatterMap
            id="intention-city"
            :data="cityData"
            title="意向城市人数分布"
            height="700px"
          ></ScatterMap>
        </el-col>
        <el-col :span="12">
          <el-table
            :data="city"
            :default-sort="{ prop: 'total_people', order: 'descending' }"
            style="height:700px;overflow: auto"
          >
            <el-table-column type="index"></el-table-column>
            <el-table-column
              label="城市名称"
              prop="city_name"
            ></el-table-column>
            <el-table-column
              label="总人数"
              prop="total_people"
            ></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>

    <el-card :shadow="cardShadow">
      <el-row class="mb-20">
        <el-col :span="12">
          <Radar
            id="intention-work"
            :data="workData"
            title="意向工作岗位统计"
          ></Radar>
        </el-col>
        <el-col :span="12" class="analysis">
          <ul v-if="work.most">
            <li>
              最多人想从事的工作岗位是：{{ work.most.work_name }}，一共有{{
                work.most.total_people
              }}人选择，在全部就业岗位中占比{{ work.most.empl_rate }}%。
            </li>
            <li>
              最多女生想从事的工作岗位是：{{
                work.female_most.work_name
              }}，一共有{{ work.female_most.total_people }}人选择，其次是：{{
                work.female_second.work_name
              }}，一共有{{ work.female_second.total_people }}人选择。
            </li>
            <li>
              最多男生想从事的工作岗位是：{{
                work.male_most.work_name
              }}，一共有{{ work.male_most.total_people }}人选择，其次是：{{
                work.male_second.work_name
              }}，一共有{{ work.male_second.total_people }}人选择。
            </li>
          </ul>
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
        this.params = {};
        this.params.grade = new Date().getFullYear() - 4;
      }
      this.workData = {
        name: [],
        data: [],
      };
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