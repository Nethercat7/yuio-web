<template>
  <div>
    <el-card :shadow="cardShadow">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form :model="params">
            <h3>就业情况</h3>
            <el-divider></el-divider>
            <el-form-item label="是否就业">
              <el-radio-group v-model="params.status">
                <el-radio label="0">否</el-radio>
                <el-radio label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <div v-if="params.status === '1'">
              <el-form-item label="单位名称">
                <el-input
                  placeholder="请输入单位名称"
                  style="width: 300px"
                  v-model="params.company"
                ></el-input>
              </el-form-item>
              <el-form-item label="所在城市">
                <el-cascader
                  v-model="params.work_city"
                  :options="cityList"
                  :props="cascaderProps"
                  clearable
                ></el-cascader>
              </el-form-item>
              <el-form-item label="岗位类型">
                <el-cascader
                  v-model="params.work_type"
                  :options="workList"
                  :props="cascaderProps"
                  clearable=""
                ></el-cascader>
              </el-form-item>
              <el-form-item label="协议状况">
                <el-select v-model="params.protocol">
                  <el-option
                    v-for="item in protocolList"
                    :key="item.id"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div v-if="params.status === '0'">
              <el-form-item label="接下来打算">
                <el-select v-model="params.plan">
                  <el-option
                    v-for="item in planList"
                    :key="item.id"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <h3>就业意向</h3>
            <el-divider></el-divider>
            <el-form-item label="意向的工作地点">
              <el-cascader
                v-model="params.intention_city"
                :options="cityList"
                :props="cascaderProps"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="意向的工作岗位">
              <el-cascader
                v-model="params.intention_work"
                :options="workList"
                :props="cascaderProps"
              ></el-cascader>
            </el-form-item>
            <el-divider></el-divider>
            <div>
              <el-button type="primary" @click="submit">提交</el-button>
            </div>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getCities } from "@/api/system/city";
import { getWorks } from "@/api/system/work";
import { addEmplInfo, getEmplInfo, updEmplInfo } from "@/api/write/empl";
import { getSubjectId } from "@/utils/storage";

export default {
  name: "EmploymentStatusWrite",
  data() {
    return {
      params: {
        student_id: getSubjectId(),
        status: "0",
      },
      cityList: [],
      workList: [],
      protocolList: [],
      planList: [],
      cascaderProps: {
        value: "id",
        label: "name",
        emitPath: false,
      },
      update: false,
    };
  },
  methods: {
    getData() {
      //获取城市
      getCities().then((resp) => {
        this.cityList = resp.obj;
      });
      //获取岗位
      getWorks().then((resp) => {
        this.workList = resp.obj;
      });
      //获取协议状况
      this.getDictData("sys_protocol_status").then((resp) => {
        this.protocolList = resp.obj;
      });
      //获取计划
      this.getDictData("stats_stdnt_plan").then((resp) => {
        this.planList = resp.obj;
      });
      //获取已填写的内容
      getEmplInfo(this.params.student_id).then((resp) => {
        if (resp.code === 0) {
          this.update = true;
          this.params = resp.obj;
        }
      });
    },
    submit() {
      if (!this.update) {
        addEmplInfo(this.params).then((resp) => {
          if (resp.status == null) {
            this.$message({
              message: resp.msg,
              type: resp.type,
            });
          }
        });
      } else {
        updEmplInfo(this.params).then((resp) => {
          if (resp.status == null) {
            this.$message({
              message: resp.msg,
              type: resp.type,
            });
          }
        });
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
</style>