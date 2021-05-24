<template>
  <div>
    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <el-col :span="12">
          <el-button size="mini" type="warning" @click="output"
            >导出当前</el-button
          >
        </el-col>
        <el-col :span="12" style="text-align: right">
          <span>毕业届别：</span>
          <el-select
            size="mini"
            style="margin-right: 20px"
            v-model="params.grade"
          >
            <el-option
              v-for="item in gradeList"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>

          <span>院系专业：</span>
          <el-cascader
            ref="cascader"
            :options="orgList"
            :props="cascader"
            size="mini"
            style="margin-right: 20px"
            @change="setParam"
            v-model="params.temp"
            :show-all-levels="false"
          >
          </el-cascader>
          <el-button size="mini" type="success" @click="getData()"
            >确定</el-button
          >
          <el-button size="mini" type="danger" @click="getData(true)"
            >重置</el-button
          >
        </el-col>
      </el-row>
    </el-card>

    <el-row :gutter="24" class="mb-20">
      <el-col :span="5">
        <el-card class="text-center" :shadow="cardShadow">
          <div slot="header">
            <span>{{ type }}总人数</span>
          </div>
          <div>{{ total.total_people }}</div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="text-center" :shadow="cardShadow">
          <div slot="header">
            <span>{{ type }}就业人数</span>
          </div>
          <div>{{ total.empl_people }}</div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="text-center" :shadow="cardShadow">
          <div slot="header">
            <span>{{ type }}未就业人数</span>
          </div>
          <div>{{ total.un_empl_people }}</div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="text-center" :shadow="cardShadow">
          <div slot="header">
            <span>{{ type }}已交三方人数</span>
          </div>
          <div>{{ total.protocol_number }}</div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="text-center" :shadow="cardShadow">
          <div slot="header">
            <span>{{ type }}就业率</span>
          </div>
          <div>{{ total.empl_rate }}%</div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <el-col :span="24">
          <el-table
            :data="
              tableData.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            :default-sort="{ prop: 'empl_rate', order: 'descending' }"
          >
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column
              prop="total_people"
              :label="type + '总人数'"
              sortable
            ></el-table-column>
            <el-table-column
              prop="empl_people"
              :label="type + '就业人数'"
              sortable
            ></el-table-column>
            <el-table-column
              prop="un_empl_people"
              :label="type + '未就业人数'"
              sortable
            ></el-table-column>
            <el-table-column
              prop="protocol_number"
              :label="type + '已交三方人数'"
              sortable
            ></el-table-column>
            <el-table-column
              prop="empl_rate"
              :label="type + '就业率'"
              :formatter="formatterRate"
              sortable
            ></el-table-column>
          </el-table>
          <Pager
            :total="totalPage"
            :currentPage="currentPage"
            :page.sync="currentPage"
            :size.sync="pageSize"
          ></Pager>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <!-- 就业率 -->
        <el-col :span="24">
          <Bar
            id="empl-rate"
            :data="rateData"
            title="就业率"
            width="100%"
            suffix="%"
          ></Bar>
        </el-col>
      </el-row>
    </el-card>

    <el-card :shadow="cardShadow">
      <el-row>
        <!-- 就业人数 -->
        <el-col :span="12">
          <Bar
            id="empl-people"
            :data="emplData"
            :title="type + '就业人数'"
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
            :title="type + '未就业人数'"
            width="100%"
            suffix="人"
            horizontal
          ></Bar>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Bar from "@/components/charts/bar";
import { getGrade } from "@/api/system/sys";
import { getEmplInfo, outputRates } from "@/api/statistics/rate";
import { getCollegeAndMajor } from "@/api/system/sys";
import Pager from "@/components/pager";

export default {
  name: "EmploymentRate",
  components: { Bar, Pager },
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
      params: {
        grade: new Date().getFullYear() - 4,
        org_id: "500291302093488128",
        temp: "500291302093488128",
        type: "college",
      },
      orgList: [],
      cascader: {
        label: "name",
        value: "id",
        checkStrictly: true,
      },
      currentPage: 1,
      pageSize: 10,
      totalPage: 0,
      type: "",
    };
  },
  methods: {
    getData(flag) {
      this.reset(flag);
      getEmplInfo(this.params).then((resp) => {
        this.total = resp.obj;
        this.tableData = resp.obj.results;
        this.totalPage = resp.obj.results.length;

        let names = [];
        let emplRate = [];
        let emplPeople = [];
        let unEmplPeople = [];
        resp.obj.results.forEach((element) => {
          names.push(element.name);
          emplRate.push(element.empl_rate);
          emplPeople.push(element.empl_people);
          unEmplPeople.push(element.un_empl_people);
        });
        this.rateData.name = names;
        this.rateData.series.push({ data: emplRate, type: "line" });
        this.emplData.name = names;
        this.emplData.series.push({ data: emplPeople, type: "bar" });
        this.unEmplData.name = names;
        this.unEmplData.series.push({ data: unEmplPeople, type: "bar" });

        if (resp.obj.level == 1) {
          this.type = "院系";
        } else if (resp.obj.level == 2) {
          this.type = "专业";
        } else {
          this.type = "班级";
        }
      });
      if (this.gradeList.length == 0) {
        //获取年级信息
        getGrade().then((resp) => {
          resp.obj.forEach((element) => {
            this.gradeList.push({
              label: element + 4 + "届",
              value: element,
            });
          });
        });
      }
      //获取班级和专业信息
      getCollegeAndMajor().then((resp) => {
        this.orgList = resp.obj;
      });
    },
    formatterRate(row) {
      return row.empl_rate + "%";
    },
    setParam() {
      let arr = this.$refs.cascader.getCheckedNodes()[0];
      this.params.org_id = arr.value;
      if (arr.level == 1) {
        this.params.type = "college";
      } else {
        this.params.type = "major";
      }
    },
    reset(flag) {
      this.rateData = {
        series: [],
      };
      this.emplData = {
        series: [],
      };
      this.unEmplData = {
        series: [],
      };
      if (flag) {
        this.params.id = null;
        this.params.type = "college";
        this.params.org_id = "500291302093488128";
        this.params.temp = "500291302093488128";
      }
    },
    output() {
      outputRates(this.params).then((resp) => {
        this.fileDownloader(resp, "就业率数据.xlsx");
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>