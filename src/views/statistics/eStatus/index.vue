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
            :data="workCityPeople"
            :name="workCityName"
            title="就业城市统计"
            suffix="人"
          ></Bar>
        </el-col>
        <el-col :span="12">
        </el-col>
      </el-card>
    </el-row>

    <el-row class="mb-20">
      <el-card>
        <el-col :span="12">
          <Radar
            id="job"
            :data="workTypePeople"
            :indicator="workTypeName"
            title="工作岗位"
          ></Radar>
        </el-col>
        <el-col :span="12"> </el-col>
      </el-card>
    </el-row>

    <el-row>
      <el-card>
        <el-col :span="12">
          <Bar
            id="bar-1"
            :data="unEmploymentPeople"
            :name="planList"
            title="未就业的学生接下来的打算"
            horizontal
          ></Bar>
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
  name: "EmploymentStatus",
  components: { Bar, Radar },
  data() {
    return {
      workCityPeople: [],
      workCityName: [],
      totalPeople: 0,
      workTypePeople: [],
      workTypeName: [],
      workName: "",
      rateList: [],
      planList:[],
      unEmploymentPeople:[]
    };
  },
  methods: {
    getData() {
      api.getEmploymentCityInfo().then((resp) => {
        let data = resp.obj;
        data.forEach((element) => {
          this.workCityPeople.push(element.people);
          this.workCityName.push(element.city);
          this.totalPeople += element.people;
        });
      });
      api.getEmploymentWorkInfo().then((resp) => {
        let data = resp.obj;
        let values = [];
        data.forEach((element) => {
          values.push(element.people);
          //计算选择率
          this.rateList.push(
            (
              ((this.totalPeople - (this.totalPeople - element.people)) /
                this.totalPeople) *
              100
            ).toFixed(2)
          );
          this.workTypeName.push({ name: element.type, max: data[0].people });
        });
        this.workTypePeople.push({ value: values, name: "就业岗位统计" });
        this.workName = this.workTypeName[0].name;
      });
      api.getUnEmploymentStudentPlan().then(resp=>{
        resp.obj.forEach(element => {
          this.planList.push(element.plan)
          this.unEmploymentPeople.push(element.people)
        });
      })
    },
    handleChange() {
      console.log(this.$refs.cascader.getCheckedNodes(true));
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>