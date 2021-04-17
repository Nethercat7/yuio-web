<template>
  <div>
    <el-row>
      <el-col :span="7" class="login">
        <div class="login-form">
          <el-form label-suffix=":">
            <el-form-item label="学号">
              <el-input v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.pwd" type="password"></el-input>
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
import api from "@/api/api";
import storage from "@/utils/storage";

export default {
  name: "Login",
  data() {
    return {
      form: {},
      remember: false,
    };
  },
  methods: {
    login() {
      api.studentLogin(this.form).then((resp) => {
        storage.set("token",resp.obj)
        console.log(storage.get('token'));
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