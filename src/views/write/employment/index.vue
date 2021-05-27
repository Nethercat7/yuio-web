<template>
  <div>
    <el-card :shadow="cardShadow">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :lg="12">
          <el-form :model="params" ref="form" :rules="rules">
            <h3>就业意向填写</h3>
            <el-divider></el-divider>
            <el-form-item label="意向的工作地点" prop="intention_cities">
              <el-cascader
                v-model="params.intention_cities"
                :options="cityList"
                :props="cascaderProps2"
                collapse-tags
                :show-all-levels="false"
                clearable
                filterable
              ></el-cascader>
            </el-form-item>
            <el-form-item label="意向的工作岗位" prop="intention_works">
              <el-cascader
                v-model="params.intention_works"
                :options="workList"
                :props="cascaderProps2"
                collapse-tags
                :show-all-levels="false"
                clearable
                filterable
              ></el-cascader>
            </el-form-item>

            <h3>就业情况填写</h3>
            <el-divider></el-divider>
            <el-form-item label="是否就业" prop="status">
              <el-radio-group v-model="params.status">
                <el-radio label="0">否</el-radio>
                <el-radio label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <div v-if="params.status === '1'">
              <el-form-item label="单位名称" prop="company">
                <el-input
                  placeholder="请输入单位名称"
                  style="width: 300px"
                  v-model="params.company"
                ></el-input>
              </el-form-item>
              <el-form-item label="所在城市" prop="city_id">
                <el-cascader
                  v-model="params.city_id"
                  :options="cityList"
                  :props="cascaderProps"
                  clearable
                  :show-all-levels="false"
                  filterable
                ></el-cascader>
              </el-form-item>
              <el-form-item label="岗位类型" prop="work_id">
                <el-cascader
                  v-model="params.work_id"
                  :options="workList"
                  :props="cascaderProps"
                  clearable
                  :show-all-levels="false"
                  filterable
                ></el-cascader>
              </el-form-item>
              <el-form-item label="协议状况" prop="protocol">
                <el-select v-model="params.protocol">
                  <el-option
                    v-for="item in protocolList"
                    :key="item.id"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="params.protocol == '2'" label="上传三方协议">
                <span
                  v-text="
                    params.protocol_file ? '已上传三方协议' : '未上传三方协议'
                  "
                ></span>
                <el-upload
                  ref="upload"
                  action
                  :limit="1"
                  :auto-upload="false"
                  :on-change="setFile"
                  :on-remove="removeFile"
                  :on-exceed="handleExceed"
                >
                  <el-button
                    size="small"
                    type="primary"
                    style="margin-top: 20px; text-align: center"
                    v-text="params.protocol_file ? '重新上传' : '点击上传'"
                  ></el-button>
                </el-upload>
              </el-form-item>
            </div>
            <el-form-item
              v-if="params.status == '0' || params.protocol == '0'"
              label="预计签约月份"
              prop="date"
            >
              <el-date-picker
                v-model="params.date"
                type="month"
                placeholder="请选择"
                format="yyyy年M月"
                value-format="yyyy年M月"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="是否下载就业APP" prop="app">
              <el-select v-model="params.app">
                <el-option value="0" label="否">否</el-option>
                <el-option value="1" label="是">是</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="接下来打算" prop="plan">
              <el-select v-model="params.plan">
                <el-option
                  v-for="item in planList"
                  :key="item.id"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="params.remark" style="width: 300px"></el-input>
            </el-form-item>

            <el-divider></el-divider>
            <div class="text-center">
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
import { addEmplInfo, updEmplInfo } from "@/api/write/empl";
import { getSubjectId, getSubjectCode } from "@/utils/storage";
import { getStudentById } from "@/api/system/student";
import { getEmplInfo } from "@/api/write/empl";

export default {
  name: "EmploymentStatusWrite",
  data() {
    return {
      params: {
        student_code: getSubjectCode(),
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
      //就业意向选择器
      cascaderProps2: {
        value: "id",
        label: "name",
        emitPath: false,
        multiple: true,
        checkStrictly: true,
      },
      update: false,
      rules: {
        status: [
          { required: true, message: "请选择就业状态", trigger: "change" },
        ],
        company: [
          { required: true, message: "请输入就业单位名称", trigger: "blur" },
        ],
        city_id: [
          { required: true, message: "请选择就业城市", trigger: "change" },
        ],
        work_id: [
          { required: true, message: "请选择就业岗位", trigger: "change" },
        ],
        protocol: [
          { required: true, message: "请选择协议状况", trigger: "change" },
        ],
        plan: [
          { required: true, message: "请选择接下来的计划", trigger: "change" },
        ],
        intention_cities: [
          { required: true, message: "请选择意向就业城市", trigger: "change" },
        ],
        intention_works: [
          { required: true, message: "请选择意向就业岗位", trigger: "change" },
        ],
        date: [
          { required: true, message: "请选择预计签约月份", trigger: "change" },
        ],
        app: [{ required: true, message: "请选择", trigger: "change" }],
      },
      protocolFile: null,
      users: [],
      student: {},
    };
  },
  methods: {
    getData() {
      //获取学生信息
      getStudentById(getSubjectId()).then((resp) => {
        this.student = resp.obj;
      });
      //获取城市
      getCities().then((resp) => {
        this.cityList = resp.obj;
        this.cityList.forEach((element) => {
          if (element.level == 0 && element.direct == 0) {
            element.disabled = true;
          }
        });
      });
      //获取岗位
      getWorks().then((resp) => {
        this.workList = resp.obj;
        this.workList.forEach((element) => {
          if (element.level == 0) {
            element.disabled = true;
          }
        });
      });
      //获取协议状况
      this.getDictData("sys_protocol_status").then((resp) => {
        this.protocolList = resp.obj;
      });
      //获取计划
      this.getDictData("stats_stdnt_plan").then((resp) => {
        this.planList = resp.obj;
      });
      //获取就业情况填写信息
      this.getEmplWriteInfo();
    },
    getEmplWriteInfo() {
      getEmplInfo(this.params.student_code).then((resp) => {
        if (resp.code === 0) {
          this.update = true;
          this.params = resp.obj;
        }
      });
    },
    submit() {
      if (
        this.params.protocol == "2" &&
        !this.params.protocol_file &&
        this.protocolFile == null
      ) {
        this.$message({
          message: "请上传三方协议文件",
          type: "error",
        });
        return false;
      }
      this.$refs["form"].validate((valid) => {
        if (valid) {
          var formData = new FormData();
          //格式化表单其他数据
          formData.append(
            "params",
            new Blob([JSON.stringify(this.params)], {
              type: "application/json",
            })
          );

          if (this.protocolFile) {
            //添加三方协议文件
            formData.append("file", this.protocolFile.raw);
          }

          if (!this.update) {
            addEmplInfo(formData).then((resp) => {
              if (resp.status == null) {
                if (resp.code == 0) {
                  this.update = true;
                }
                this.$message({
                  message: resp.msg,
                  type: resp.type,
                });
              }
            });
          } else {
            updEmplInfo(formData).then((resp) => {
              if (resp.status == null) {
                this.$message({
                  message: resp.msg,
                  type: resp.type,
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    setFile(file) {
      this.protocolFile = file;
    },
    removeFile() {
      this.protocolFile = null;
    },
    handleExceed() {
      this.$message({
        message: "超出可上传的文件数量限制",
        type: "error",
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
.el-upload button {
  margin-top: 0 !important;
}
@media screen and (max-width: 425px) {
  .el-main {
    padding: 0;
  }
}
</style>