<template>
  <div>
    <!-- 自身就业率比较 -->
    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <el-col :span="12">
          <Pie
            id="rate-compare"
            :data="rateData"
            title="就业率比较"
            :subTitle="subTitle"
            :showLegend="false"
          ></Pie>
        </el-col>
        <el-col :span="12">
          <div>
            <el-select
              size="mini"
              v-model="params.grades"
              multiple
              clearable
              collapse-tags
            >
              <el-option
                v-for="item in gradeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-cascader
              ref="cascader"
              size="mini"
              v-model="params.temp"
              :options="orgList"
              :props="cascaderProps"
              @change="setOrgParams"
            ></el-cascader>
            <el-button size="mini" type="success" @click="submit"
              >提交</el-button
            >
            <el-button size="mini" type="danger" @click="reset">重置</el-button>
          </div>
          <el-divider></el-divider>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getGrade, getCollegeAndMajor } from "@/api/system/sys";
import { getSelfCompare } from "@/api/compare/rate";
import Pie from "@/components/charts/pie";

export default {
  name: "EmploymentRateCompare",
  components: { Pie },
  data() {
    return {
      params: {
        grades: [],
      },
      gradeList: [],
      orgList: [],
      cascaderProps: {
        label: "name",
        value: "id",
        checkStrictly: true,
      },
      rateData: [],
      subTitle: "",
      grades: [],
    };
  },
  methods: {
    async getData() {
      //获取年级
       getGrade().then((resp) => {
        this.gradeList = resp.obj;
      });
      //获取完整的学校组织信息
      getCollegeAndMajor().then((resp) => {
        this.orgList = resp.obj;
      });
    },
    setOrgParams() {
      //判断是选择还是清空
      if (this.$refs.cascader.getCheckedNodes().length != 0) {
        let arr = this.$refs.cascader.getCheckedNodes()[0].path;
        this.params.college_id = arr[0];
        this.params.major_id = arr[1];
      } else {
        this.params.college_id = null;
        this.params.major_id = null;
      }
    },
    submit() {
      this.getSelf();
    },
    reset() {
      //恢复初始状态
      this.params = {};
      this.subTitle="";
      this.rateData=[];
    },
    //获取就业率
    getSelf() {
      getSelfCompare(this.params).then((resp) => {
        //图表数据初始化
        this.rateData = [];
        //格式化
        for (let i = 0; i < resp.obj.grades.length; i++) {
          this.rateData.push({
            value: resp.obj.rates[i],
            name: resp.obj.grades[i] + "届",
          });
          this.subTitle = resp.obj.type;
        }
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
</style>