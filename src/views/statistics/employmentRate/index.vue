<template>
  <div>
    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <el-col :span="24" style="text-align: right">
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
        </el-col>
      </el-row>
    </el-card>

    <el-row :gutter="24" class="mb-20">
      <el-col :span="6">
        <el-card class="text-center" :shadow="cardShadow">
          <div slot="header">
            <span>毕业生总人数</span>
          </div>
          <div>{{ total.total_people }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="text-center" :shadow="cardShadow">
          <div slot="header">
            <span>各学院就业人数</span>
          </div>
          <div>{{ total.empl_people }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="text-center" :shadow="cardShadow">
          <div slot="header">
            <span>各学院未就业人数</span>
          </div>
          <div>{{ total.un_empl_people }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="text-center" :shadow="cardShadow">
          <div slot="header">
            <span>总就业率</span>
          </div>
          <div>{{ total.empl_rate }}%</div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <!-- 就业率 -->
        <el-col :span="24">
          <Bar
            id="empl-rate"
            :data="rateData"
            title="各学院就业率"
            width="100%"
            suffix="%"
          ></Bar>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <!-- 就业人数 -->
        <el-col :span="12">
          <Bar
            id="empl-people"
            :data="emplData"
            title="各学院就业人数"
            width="100%"
            suffix="人"
            horizontal
          ></Bar>
        </el-col>

        <!-- 未就业人数 -->
        <el-col :span="12">
          <Bar
            id="un-empl-people"
            :data="unEmplData"
            title="各学院未就业人数"
            width="100%"
            suffix="人"
            horizontal
          ></Bar>
        </el-col>
      </el-row>
    </el-card>

    <el-card :shadow="cardShadow">
      <el-row>
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
              prop="empl_people"
              label="就业人数"
            ></el-table-column>
            <el-table-column
              prop="un_empl_people"
              label="未就业人数"
            ></el-table-column>
            <el-table-column
              prop="empl_rate"
              label="就业率"
              :formatter="formatterRate"
            ></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Bar from "@/components/charts/bar";
import { getGrade } from "@/api/system/sys";
import { getEmplInfo, getCollegeEmplInfo } from "@/api/statistics/rate";

export default {
  name: "EmploymentRate",
  components: { Bar },
  data() {
    return {
      rateData: {
        series: [],
      },
      emplData: {
        series: [],
      },
      unEmplData: {
        series: [],
      },
      total: {},
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
      getEmplInfo(this.grade).then((resp) => {
        this.total = resp.obj;
      });
      //各院系总就业信息
      getCollegeEmplInfo(this.grade).then((resp) => {
        //格式化图表数据
        let data = resp.obj;
        let names = [];
        let emplRate = [];
        let emplPeople = [];
        let unEmplPeople = [];
        data.forEach((element) => {
          names.push(element.college_name);
          emplRate.push(element.empl_rate);
          emplPeople.push(element.empl_people);
          unEmplPeople.push(element.un_empl_people);
        });
        this.rateData.name = names;
        this.rateData.series.push({ data: emplRate, type: "bar" });
        this.emplData.name = names;
        this.emplData.series.push({ data: emplPeople, type: "bar" });
        this.unEmplData.name = names;
        this.unEmplData.series.push({ data: unEmplPeople, type: "bar" });
        //图表数据
        this.tableData = data;
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
    },
    formatterRate(row) {
      return row.empl_rate + "%";
    },
    reset() {
      this.rateData = {
        series: [],
      };
      this.emplData = {
        series: [],
      };
      this.unEmplData = {
        series: [],
      };
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>