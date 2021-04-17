<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form ref="form" v-model="form" label-suffix=":">
          <div>
            <span>姓名:{{ subject.name }}</span>
            <span style="padding-left: 20px">学号:{{ subject.code }}</span>
          </div>

          <el-divider></el-divider>
          <h3>就业意向</h3>
          <el-form-item label="意向城市">
            <el-cascader
              v-model="form.intention_city"
              :options="cityiesList"
              :props="cProps"
              filterable
              clearable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="意向岗位">
            <el-cascader
              v-model="form.intention_work"
              :options="jobList"
              :props="jProps"
              filterable
              clearable
            ></el-cascader>
          </el-form-item>
          <el-divider></el-divider>
          <h3>就业情况</h3>
          <el-form-item label="是否落实工作单位">
            <el-radio-group v-model="form.employment">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="form.employment">
            <el-form-item label="单位名称">
              <el-input v-model="form.company"></el-input>
            </el-form-item>
            <el-form-item label="所在城市">
              <el-cascader
                v-model="form.work_city"
                :options="cityiesList"
                :props="cProps"
                filterable
                clearable
              ></el-cascader>
            </el-form-item>
            <el-form-item label="岗位类型">
              <el-cascader
                v-model="form.work_type"
                :options="jobList"
                :props="jProps"
                filterable
                clearable
              ></el-cascader>
            </el-form-item>
            <el-form-item label="目前状态">
              <el-select v-model="form.status">
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
          <template v-if="!form.employment">
            <el-form-item label="接下来规划">
              <el-select v-model="form.plan">
                <el-option
                  v-for="item in planList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
          <el-button type="primary" @click="submit()">提交</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import cityies from "@/data/cityies";
import plan from "@/data/plan";
import job from "@/data/job";
import storage from "@/utils/storage";
import api from "@/api/api";

export default {
  name: "EStatusCollect",
  data() {
    return {
      form: {
        employment: true,
      },
      cityiesList: cityies,
      cProps: {
        value: "name",
        label: "name",
        children: "cityList",
        emitPath: false,
      },
      planList: plan,
      jobList: job,
      jProps: {
        value: "name",
        label: "name",
        children: "children",
        emitPath: false,
      },
      subject: {},
      status: [
        {
          value: 0,
          label: "已签约未交三方",
        },
        {
          value: 1,
          label: "未签约未交三方",
        },
        {
          value: 2,
          label: "已签约已交三方",
        },
      ],
    };
  },
  methods: {
    submit() {
      api.saveEmploymentStatus(this.form).then(resp=>{
        this.$message({
            message: resp.msg,
            type: resp.type,
          });
      })
    },
  },
  mounted() {
    this.subject = storage.getSubject();
    this.form.student_id = this.subject.id;
  },
};
</script>

<style>
</style>