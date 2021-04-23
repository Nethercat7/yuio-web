<template>
  <el-container>
    <Aside></Aside>
    <el-container>
      <el-header class="header">
        <span>{{subject.name}}</span>
        <el-button size="mini" type="primary" @click="exit">退出</el-button>
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
import {getSubject,delSubject} from "@/utils/storage";

export default {
  name: "Layout",
  components: { Aside },
  data() {
    return {
      subject:{}
    };
  },
  methods:{
    exit(){
      delSubject();
      this.$router.push("/login")
    }
  },
  mounted() {
    this.subject=getSubject();
  },
};
</script>

<style>
</style>