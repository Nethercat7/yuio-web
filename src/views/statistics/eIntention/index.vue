<template>
  <div>
    <el-row class="mb-20">
      <el-col :span="24" style="text-align: right">
        <el-card class="top-tools">
          <el-select
            size="mini"
            style="margin-right: 20px"
            v-model="form.grade"
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
            v-model="form.id"
            :options="orgList"
            clearable
            :props="cascaderProps"
            style="margin-right: 20px"
            filterable
            :show-all-levels="false"
            ref="cascader"
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
import api from "@/api/api";

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
        emitPath: false,
      },
      form: {
        grade: new Date().getFullYear() - 4,
      },
    };
  },
  methods: {
    getData(r) {
      this.reset(r);
      if (r) this.form.grade = new Date().getFullYear() - 4;
      api.getIntentionCityInfo(this.form).then((resp) => {
        resp.obj.forEach((element) => {
          this.cityList.push(element.city);
          this.cityIntentionPeople.push(element.people);
        });
      });
      api.getIntentionWorkInfo(this.form).then((resp) => {
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
      api.getGrade().then((resp) => {
        this.gradeList = resp.obj;
      });
      //获取学院信息
      api.getFullOrg().then((resp) => {
        this.orgList = resp.obj;
      });
    },
    reset(r) {
      if (r) this.form.id = null;
      this.cityList = [];
      this.cityIntentionPeople = [];
      this.workList = [];
      this.workIntentionPeople = [];
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
.top-tools .el-card__body {
  padding: 10px !important;
}
</style>