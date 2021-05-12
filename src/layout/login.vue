<template>
  <div>
    <el-row>
      <el-col :span="7" class="login">
        <div class="login-form">
          <el-form label-suffix=":">
            <el-form-item label="账号">
              <el-input v-model="form.key"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="登录类型">
              <el-radio-group v-model="form.isUser">
                <el-radio :label="true">管理员</el-radio>
                <el-radio :label="false">学生</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-col :span="12" style="text-align: right">
                  <el-button type="primary" @click="login()">登录</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="17">
        <el-row type="flex" justify="center">
          <el-col span="12">
            <h1 style="text-align: center">系统介绍</h1>
            <el-divider></el-divider>
            <p>
              “高校毕业生就业情况统计系统”通过互联网设备来收集毕业生就业情况数据，并且将这些收集到的数据加以统计和分析再用数据可视化的形式呈现出来，使管理者可以更加及时、快速地了解应届和往届各学院各专业的毕业生就业情况、工作意向、工作职位等信息，方便引进相关用人单位以及向相关用人单位推荐毕业生等决策，大幅度地提升工作效率。
            </p>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col span="12">
            <h1 style="text-align: center">技术选型</h1>
            <el-divider></el-divider>
            <el-row>
              <el-col span="12">
                <h3>前端</h3>
                <ul>
                  <li>
                    UI框架：<a href="https://element.eleme.cn/#/zh-CN"
                      >Element UI</a
                    >
                  </li>
                  <li>JS框架：<a href="https://cn.vuejs.org/">Vue.js</a></li>
                  <li>
                    可视化图表：<a
                      href="https://echarts.apache.org/zh/index.html"
                      >Apache ECharts</a
                    >
                  </li>
                  <li>
                    异步请求：<a href="http://www.axios-js.com/docs/">Axios</a>
                  </li>
                </ul>
              </el-col>
              <el-col span="12">
                <h3>后台</h3>
                <ul>
                  <li>
                    核心框架：<a href="https://spring.io/projects/spring-boot/"
                      >Spring Boot</a
                    >
                  </li>
                  <li>
                    安全框架：<a href="https://shiro.apache.org/"
                      >Apache Shiro</a
                    >
                  </li>
                  <li>
                    持久层框架：<a
                      href="https://mybatis.org/mybatis-3/zh/index.html#"
                      >Mybatis</a
                    >
                  </li>
                  <li>
                    表格处理：<a href="https://www.yuque.com/easyexcel"
                      >EasyExcel</a
                    >
                  </li>
                  <li>鉴权：<a href="https://jwt.io/">Json Web Token</a></li>
                </ul>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col span="12">
            <h1 style="text-align: center">系统默认角色</h1>
             <el-divider></el-divider>
             <ul>
               <li>系统管理员：具有用户、角色、权限、字典管理模块的全部权限。</li>
               <li>管理员：具有院系、专业、班级、学生、城市、岗位管理模块的全部权限。</li>
               <li>用户：具有就业率、就业情况、就业意向统计模块的全部权限。</li>
               <li>学生：仅具有数据填写模块的全部权限。</li>
               <li style="color:red">演示账号：super，密码：asd123，登录类型：管理员</li>
             </ul>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { doLogin } from "@/api/system/sys";
import { setSubject, getSubject } from "@/utils/storage";

export default {
  name: "Login",
  data() {
    return {
      form: {
        isUser: true,
      },
    };
  },
  methods: {
    login() {
      doLogin(this.form).then((resp) => {
        if (resp.code === 0) {
          setSubject(resp.obj);
          if (getSubject().type == "usr") {
            this.$router.push("/");
          } else {
            this.$router.push("/write/employment");
          }
        } else if (resp.status != 500) {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
        }
      });
    },
  },
};
</script>

<style>
.login {
  min-height: 100vh;
  background-color: white;
}
.login-form {
  width: 70%;
  margin: auto;
  padding-top: 50%;
}
</style>