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
                <el-col :span="12">
                  <el-checkbox v-model="remember">记住我</el-checkbox>
                </el-col>
                <el-col :span="12" style="text-align: right">
                  <el-button type="primary" @click="login()">登录</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="17"></el-col>
    </el-row>
  </div>
</template>

<script>
import { doLogin } from "@/api/system/sys";
import { setSubject } from "@/utils/storage";

export default {
  name: "Login",
  data() {
    return {
      form: {
        isUser: true,
      },
      remember: false,
    };
  },
  methods: {
    login() {
      doLogin(this.form).then((resp) => {
        if (resp.code === 0) {
          setSubject(resp.obj);
          this.$router.push("/");
        } else {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
        }
      });
    },
  }
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