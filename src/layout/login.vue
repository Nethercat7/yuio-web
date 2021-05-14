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
                <el-radio :label="true">职工</el-radio>
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
          <el-col :span="12">
            <h1 style="text-align: center">系统默认角色</h1>
            <el-divider></el-divider>
            <ul>
              <li>
                系统管理员：具有用户、角色、权限、字典管理模块的全部权限。
              </li>
              <li>
                管理员：具有院系、专业、班级、学生、城市、岗位管理模块的全部权限。
              </li>
              <li>用户：具有就业率、就业情况、就业意向统计模块的全部权限。</li>
              <li>学生：仅具有数据填写模块的全部权限。</li>
            </ul>
            <h1 style="text-align: center">Demo演示</h1>
            <el-divider></el-divider>
            <ul>
              <li style="color: red">
                演示账号：super，密码：asd123，登录类型：职工。
              </li>
              <li style="color: red">
                演示账号非实际学生用户，请勿提交就业信息数据。
              </li>
              <li>职工用户以工号作为登录账号，学生用户以学号作为登录账号。</li>
              <li>所有新添加的用户默认初始密码都是：123456</li>
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
            this.$router.push("/introduction");
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