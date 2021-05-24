<template>
  <div>
    <el-card :shadow="cardShadow">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :lg="12">
          <el-form label-suffix=":" :key="key">
            <el-form-item label="学号">
              <span>{{ student.code }}</span>
            </el-form-item>
            <el-form-item label="姓名">
              <span>{{ student.name }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ student.gender_text }}</span>
            </el-form-item>
            <el-form-item label="电话号码">
              <span>{{ student.phone }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{ student.status_text }}</span>
            </el-form-item>

            <el-form-item label="所属学院">
              <span v-text="student.college.name">院系名称</span>
            </el-form-item>
            <el-form-item label="所属专业">
              <span v-text="student.major.name">专业名称</span>
            </el-form-item>
            <el-form-item label="所属年级">
              <span v-text="student.grade"></span>
            </el-form-item>
            <el-form-item label="所属班级">
              <span v-text="student.class.name">班级名称</span>
            </el-form-item>
            <el-form-item label="学生备注">
              <span>{{ student.remark }}</span>
            </el-form-item>

            <el-form-item label="就业信息填写">
              <span>{{ student.empl_write_text }}</span>
            </el-form-item>
            <!-- 填写了就业信息的才显示下面的数据 -->
            <template v-if="student.empl_write == '1'">
              <el-form-item label="是否落实工作单位">
                <span>{{ student.empl_status_text }}</span>
              </el-form-item>
              <el-form-item label="接下来的打算">
                <span>{{ student.empl_plan_text }}</span>
              </el-form-item>

              <template v-if="student.empl_info.status == '1'">
                <el-form-item label="单位名称">
                  <span>{{ student.empl_info.company }}</span>
                </el-form-item>
                <el-form-item label="岗位类型">
                  <span>{{ student.work.name }}</span>
                </el-form-item>
                <el-form-item label="单位所在城市">
                  <span>{{ student.city.name }}</span>
                </el-form-item>
                <el-form-item label="协议状况">
                  <span>{{ student.empl_protocol_text }}</span>
                </el-form-item>
              </template>

              <el-form-item
                v-if="
                  student.empl_info.status == '0' ||
                  student.empl_info.protocol == '0'
                "
                label="预计签约日期"
              >
                <span>{{ student.empl_info.date }}</span>
              </el-form-item>
              <el-form-item label="是否下载就业APP">
                <span
                  v-text="student.empl_info.app == '0' ? '未下载' : '已下载'"
                ></span>
              </el-form-item>
              <el-form-item label="就业信息备注">
                <span>{{ student.empl_info.remark }}</span>
              </el-form-item>
            </template>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getStudentById } from "@/api/system/student";

export default {
  name: "StudentProfile",
  data() {
    return {
      student: {},
      key: 0, //强制组件重新渲染
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getStudentById(this.$route.query.id).then((resp) => {
        this.student = resp.obj;
        this.convertDict();
      });
    },
    convertDict() {
      this.getDictData("sys_user_gender").then((resp) => {
        this.student.gender_text = this.selectDictLabel(
          resp.obj,
          this.student.gender
        );
        this.key += 1;
      });
      this.getDictData("sys_uvsl_status").then((resp) => {
        this.student.status_text = this.selectDictLabel(
          resp.obj,
          this.student.status
        );
        this.key += 1;
      });
      this.getDictData("sys_write_status").then((resp) => {
        this.student.empl_write_text = this.selectDictLabel(
          resp.obj,
          this.student.empl_write
        );
        this.key += 1;
      });
      this.getDictData("sys_empl_status").then((resp) => {
        this.student.empl_status_text = this.selectDictLabel(
          resp.obj,
          this.student.empl_info.status
        );
        this.key += 1;
      });
      this.getDictData("stats_stdnt_plan").then((resp) => {
        this.student.empl_plan_text = this.selectDictLabel(
          resp.obj,
          this.student.empl_info.plan
        );
        this.key += 1;
      });
      this.getDictData("sys_protocol_status").then((resp) => {
        this.student.empl_protocol_text = this.selectDictLabel(
          resp.obj,
          this.student.empl_info.protocol
        );
        this.key += 1;
      });
    },
  },
};
</script>

<style>
</style>