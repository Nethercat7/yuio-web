<template>
  <el-container>
    <Aside></Aside>
    <el-container>
      <el-header class="header">
        <el-menu
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="float: right"
        >
          <el-submenu index="1">
            <template slot="title">{{subject.name}}</template>
            <el-menu-item index="1-1" @click="$router.push('/profile')">个人资料</el-menu-item>
            <el-menu-item index="1-2" @click="exit">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer class="footer"></el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "./components/aside";
import { getSubject, delSubject } from "@/utils/storage";

export default {
  name: "Layout",
  components: { Aside },
  data() {
    return {
      subject: {},
    };
  },
  methods: {
    exit() {
      delSubject();
      this.$router.push("/login");
    },
  },
  mounted() {
    this.subject = getSubject();
  },
};
</script>

<style>
</style>