<template>
  <el-container>
    <Aside></Aside>
    <el-container>
      <el-header class="header"></el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer class="footer"></el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "./components/aside";

export default {
  name: "Layout",
  components: { Aside },
};
</script>

<style>
</style>