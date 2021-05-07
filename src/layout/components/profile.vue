<template>
  <div>
    <el-card>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-tabs tab-position="left" style="height: 100%">
            <el-tab-pane label="个人资料">
              <el-form
                ref="profile"
                v-model="profile"
                label-suffix=":"
                label-width="100px"
              >
                <el-form-item label="名称">
                  <span>{{ profile.name }}</span>
                </el-form-item>
                <el-form-item :label="isUser ? '工号' : '学号'">
                  <span>{{ profile.code }}</span>
                </el-form-item>
                <el-form-item label="性别">
                  <span>{{ profile.genderText }}</span>
                </el-form-item>
                <el-form-item label="电话号码">
                  <span>{{ profile.phone }}</span>
                </el-form-item>
                <el-form-item label="电子邮箱">
                  <span>{{ profile.email }}</span>
                </el-form-item>
                <template v-if="!isUser">
                  <el-form-item label="所属院系"></el-form-item>
                  <el-form-item label="所属专业"></el-form-item>
                  <el-form-item label="所属班级"></el-form-item>
                  <el-form-item label="所属年级"></el-form-item>
                </template>
              </el-form>
            </el-tab-pane>

            <el-tab-pane label="修改资料">
              <el-form
                ref="form"
                :model="profile"
                :rules="rules"
                label-suffix=":"
                label-width="100px"
              >
                <el-form-item label="性别" prop="gender">
                  <el-radio-group v-model="profile.gender">
                    <el-radio
                      v-for="item in genderList"
                      :key="item.id"
                      :label="item.value"
                      >{{ item.label }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                  <el-input v-model="profile.phone"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                  <el-input v-model="profile.email"></el-input>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item style="text-align: center">
                  <el-button type="primary" @click="submit()">提交</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <el-tab-pane label="修改密码">
              <el-form
                ref="pass"
                :model="pwd"
                :rules="rules"
                label-suffix=":"
                label-width="100px"
              >
                <el-form-item label="旧密码" prop="oldPwd">
                  <el-input
                    placeholder="请输入旧密码"
                    v-model="pwd.oldPwd"
                    type="password"
                  ></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPwd">
                  <el-input
                    placeholder="请输入密码"
                    v-model="pwd.newPwd"
                    type="password"
                  ></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="repeat">
                  <el-input
                    placeholder="请再次输入密码"
                    v-model="pwd.repeat"
                    type="password"
                  ></el-input>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item style="text-align: center">
                  <el-button type="primary" @click="changePwd">提交</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getUserById, updUserProfile, changeUserPwd } from "@/api/system/user";
import { getSubjectId, getSubjectType, delSubject } from "@/utils/storage";
import {
  validateEmail,
  validatePhone,
  validatePassword,
} from "@/utils/validator";

export default {
  name: "Profile",
  data() {
    return {
      profile: {},
      genderList: [],
      isUser: true,
      type: "",
      id: 0,
      pwd: {
        id: getSubjectId(),
      },
      rules: {
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        email: [{ required: false, validator: validateEmail, trigger: "blur" }],
        phone: [{ required: false, validator: validatePhone, trigger: "blur" }],
        oldPwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 30 个字符",
            trigger: "blur",
          },
          { validator: validatePassword, trigger: "blur" },
        ],
        newPwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 30 个字符",
            trigger: "blur",
          },
          { validator: validatePassword, trigger: "blur" },
        ],
        repeat: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: this.validateRepeat, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async getData() {
      if (this.type == "usr") {
        await getUserById(this.id).then((resp) => {
          this.profile = resp.obj;
        });
      }
      //获取字典数据
      this.getDictData("sys_user_gender").then((resp) => {
        this.genderList = resp.obj;
        resp.obj.forEach((element) => {
          if (this.profile.gender == element.value) {
            this.profile.genderText = element.label;
          }
        });
      });
    },
    submit() {
      if (this.type == "usr") {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            updUserProfile(this.profile).then((resp) => {
              if (resp.status == null) {
                this.$message({
                  message: resp.msg,
                  type: resp.type,
                });
              }
              if (resp.code == 0) {
                this.getData();
              }
            });
          } else {
            return false;
          }
        });
      }
    },
    changePwd() {
      this.$refs["pass"].validate((valid) => {
        if (valid) {
          if (this.type == "usr") {
            changeUserPwd(this.pwd).then((resp) => {
              if (resp.status == null) {
                this.$message({
                  message: resp.msg,
                  type: resp.type,
                });
              }
              if (resp.code == 0) {
                delSubject();
                this.$router.push("/login");
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    validateRepeat(rule, value, callback) {
      if (value != this.pwd.newPwd) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    },
  },
  created() {
    this.id = getSubjectId();
    this.type = getSubjectType();
    this.getData();
  },
};
</script>

<style>
</style>