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
          <el-button size="mini" type="danger" @click="getData(true)">重置</el-button>
        </el-card>
      </el-col>
    </el-row>

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
        <el-col :span="12"> </el-col>
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
      planList: [],
      unEmploymentPeople: [],
      gradeList: [],
      orgList: [],
      cascaderProps: {
        label: "name",
        value: "id",
        checkStrictly: true,
        emitPath: false,
      },
      form: {
        id: "500291302093488128",
      },
    };
  },
  methods: {
    getData(r) {
      if(r) this.reset(true);
      let date = new Date();
      this.form.grade = date.getFullYear() - 4;
      api.getEmploymentCityInfo(this.form).then((resp) => {
        let data = resp.obj;
        data.forEach((element) => {
          this.workCityPeople.push(element.people);
          this.workCityName.push(element.city);
          this.totalPeople += element.people;
        });
      });
      api.getEmploymentWorkInfo(this.form).then((resp) => {
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
      api.getUnEmploymentStudentPlan(this.grade).then((resp) => {
        resp.obj.forEach((element) => {
          this.planList.push(element.plan);
          this.unEmploymentPeople.push(element.people);
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
      this.workCityPeople = [];
      this.workCityName = [];
      this.totalPeople = 0;
      this.workTypePeople = [];
      this.workTypeName = [];
      this.workName = "";
      this.rateList = [];
      this.planList = [];
      this.unEmploymentPeople = [];
      if(r) this.form.id=null;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>