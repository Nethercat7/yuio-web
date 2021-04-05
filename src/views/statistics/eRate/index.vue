<template>
  <div>
    <el-row class="card" :gutter="24">
      <el-col :span="6">
        <el-card class="text-center">
          <div slot="header">
            <span>毕业生总人数</span>
          </div>
          <div>{{ total.school_total_people }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="text-center">
          <div slot="header">
            <span>各学院就业人数</span>
          </div>
          <div>{{ total.school_employment_people }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="text-center">
          <div slot="header">
            <span>各学院未就业人数</span>
          </div>
          <div>{{ total.school_unemployment_people }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="text-center">
          <div slot="header">
            <span>总就业率</span>
          </div>
          <div>{{ total.school_employment_rate }}%</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="card">
      <el-card>
        <el-col :span="12">
          <EmploymentRate
            id="e-rate"
            :data="data"
            :name="name"
            showPercentage
            title="各学院就业率"
            subTitle="2021届"
            :showName="true"
            width="100%"
            suffix="%"
          ></EmploymentRate>
        </el-col>
        <el-col :span="12">
          <EmploymentRate
            id="e-people"
            :data="data1"
            :name="name"
            title="各学院就业人数"
            subTitle="2021届"
            :showName="true"
            width="100%"
            suffix="人"
          ></EmploymentRate>
        </el-col>
      </el-card>
    </el-row>

    <el-row>
      <el-card>
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
            <el-table-column label="操作">
              <template slot="header">
                <el-button size="mini" type="success">导出</el-button>
              </template>
              <el-button size="mini" type="info">查看详情</el-button>
            </el-table-column>
          </el-table>
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import EmploymentRate from "@/components/charts/bar";
import api from "../../../api/api";

export default {
  components: { EmploymentRate },
  data() {
    return {
      name: [],
      data: [],
      data1: [],
      tableData: [
        {
          college_name: "经济与管理学院",
          total_people: 377,
          employment_people: 300,
          unemployment_people: 77,
          employment_rate: "90%",
        },
      ],
      total: {},
    };
  },
  methods: {
    getData() {
      api.getERate().then((resp) => {
        for (let i = 0; i < resp.data.length; i++) {
          if (!resp.data[i].school) {
            this.name.push(resp.data[i].college_name);
            this.data.push(resp.data[i].employment_rate);
            this.data1.push(resp.data[i].employment_people);
          }
        }
        this.tableData = resp.data;
        api.getERateTotal().then((resp) => {
          this.total = resp.data;
        });
      });
    },
    formatterRate(row) {
      return row.employment_rate + "%";
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>