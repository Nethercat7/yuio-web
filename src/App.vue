<template>
  <div id="app">
    <el-container style="min-height: 100vh">
      <el-aside style="width:200px">Aside</el-aside>
      <el-container>
        <el-header> Header </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  margin: 0;
}
</style>
