<template>
  <div>
    <el-card :shadow="cardShadow">
      <el-row>
        <el-form label-suffix=":">
          <el-col :span="12">
            <el-form-item label="学号">
              <span>{{ subject.code }}</span>
            </el-form-item>
            <el-form-item label="姓名">
              <span>{{ subject.name }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ subject.gender }}</span>
            </el-form-item>
            <el-form-item label="电话号码">
              <span>{{ subject.phone }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{ subject.status }}</span>
            </el-form-item>
            <el-form-item label="所属学院">
              <span>{{ subject.college_name }}</span>
            </el-form-item>
            <el-form-item label="所属专业">
              <span>{{ subject.major_name }}</span>
            </el-form-item>
            <el-form-item label="所属年级">
              <span>{{ subject.grade }}</span>
            </el-form-item>
            <el-form-item label="所属班级">
              <span>{{ subject.class_name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="就业信息填写">
              <span>{{ subject.empl_write }}</span>
            </el-form-item>
            <!-- 填写了就业信息的才显示下面的数据 -->
            <el-form-item label="是否落实工作单位">
              <span>{{ subject.empl_status }}</span>
            </el-form-item>
            <!-- 未就业展示的信息 -->
            <el-form-item label="接下来的打算">
              <span>{{ subject.empl_plan }}</span>
            </el-form-item>
            <el-form-item label="单位名称">
              <span>{{ subject.empl_company }}</span>
            </el-form-item>
            <el-form-item label="岗位类型">
              <span>{{ subject.empl_work_name }}</span>
            </el-form-item>
            <el-form-item label="单位所在城市">
              <span>{{ subject.empl_city_name }}</span>
            </el-form-item>
            <el-form-item label="协议状况">
              <span>{{ subject.empl_protocol }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ subject.remark }}</span>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "StudentProfile",
  data() {
    return {
      subject: "",
    };
  },
  mounted() {
    this.subject = JSON.parse(this.$route.query.obj);
    console.log(this.subject);
  },
};
</script>

<style>
</style>