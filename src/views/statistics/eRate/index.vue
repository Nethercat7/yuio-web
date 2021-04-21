<template>
  <div>
    <el-row class="mb-20">
      <el-col :span="24" style="text-align: right">
        <el-card class="top-tools" shadow="never">
          <el-select size="mini" style="margin-right: 20px" v-model="grade">
            <el-option
              v-for="item in gradeList"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
          <el-button size="mini" type="success" @click="getData()"
            >切换</el-button
          >
          <el-button size="mini" type="danger" @click="getData(true)"
            >重置</el-button
          >
        </el-card>
      </el-col>
    </el-row>

    <el-row class="mb-20" :gutter="24">
      <el-col :span="6">
        <el-card class="text-center" shadow="never">
          <div slot="header">
            <span>毕业生总人数</span>
          </div>
          <div>{{ total.total_people }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="text-center" shadow="never">
          <div slot="header">
            <span>各学院就业人数</span>
          </div>
          <div>{{ total.employment_people }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="text-center" shadow="never">
          <div slot="header">
            <span>各学院未就业人数</span>
          </div>
          <div>{{ total.unemployment_people }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="text-center" shadow="never">
          <div slot="header">
            <span>总就业率</span>
          </div>
          <div>{{ total.employment_rate }}%</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="mb-20">
      <el-card shadow="never">
        <el-col :span="12">
          <Bar
            id="e-rate"
            :data="collegeEmploymentRate"
            :name="collegeName"
            title="各学院就业率"
            width="100%"
            suffix="%"
            :rotate="-15"
          ></Bar>
        </el-col>
        <el-col :span="12">
          <Bar
            id="e-people"
            :data="collegeEmploymentPeople"
            :name="collegeName"
            title="各学院就业人数"
            width="100%"
            suffix="人"
            :rotate="-15"
          ></Bar>
        </el-col>
      </el-card>
    </el-row>

    <el-row>
      <el-card shadow="never">
        <el-col :span="24">
          <el-table :data="tableData">
            <el-table-column
              type="selection"
              width="55"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="college_name"
              label="学院名称"
            ></el-table-column>
            <el-table-column
              prop="total_people"
              label="总人数"
            ></el-table-column>
            <el-table-column
              prop="employment_people"
              label="就业人数"
            ></el-table-column>
            <el-table-column
              prop="unemployment_people"
              label="未就业人数"
            ></el-table-column>
            <el-table-column
              prop="employment_rate"
              label="就业率"
              :formatter="formatterRate"
            ></el-table-column>
          </el-table>
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import Bar from "@/components/charts/bar";
import api from "../../../api/api";

export default {
  name: "EmploymentRate",
  components: { Bar },
  data() {
    return {
      total: {},
      collegeName: [],
      collegeEmploymentRate: [],
      collegeEmploymentPeople: [],
      tableData: [],
      gradeList: [],
      grade: new Date().getFullYear() - 4,
    };
  },
  methods: {
    getData(r) {
      this.reset(r);
      let date = new Date();
      if (r) this.grade = date.getFullYear() - 4;
      //学校总就业信息
      api.getTotalEmploymentInfo(this.grade).then((resp) => {
        this.total = resp.obj;
      });
      //各院系总就业信息
      api.getCollegeEmploymentInfo(this.grade).then((resp) => {
        this.collegeName = resp.obj.college_name;
        this.collegeEmploymentRate = resp.obj.college_employment_rate;
        this.collegeEmploymentPeople = resp.obj.college_employment_people;
        this.tableData = resp.obj.data;
      });
      //获取年级信息
      api.getGrade().then((resp) => {
        this.gradeList = resp.obj;
      });
    },
    formatterRate(row) {
      return row.employment_rate + "%";
    },
    reset() {
      this.total = {};
      this.collegeName = [];
      this.collegeEmploymentRate = [];
      this.collegeEmploymentPeople = [];
      this.tableData = [];
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>