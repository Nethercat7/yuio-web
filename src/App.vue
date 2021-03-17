<template>
  <div id="app">
    <el-container style="min-height: 100vh">
      <el-aside style="width: auto">
        <el-menu
          class="menu"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="collapsed"
          :default-openeds="['2']"
        >
          <div>
            <img class="logo" src="./assets/logo.png" alt="Logo" />
          </div>
          <el-menu-item index="1" @click="$router.push('/')">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>基本信息管理</span>
            </template>
            <el-menu-item index="2-1" @click="$router.push('/school/college')">院系管理</el-menu-item>
            <el-menu-item index="2-2" @click="$router.push('/school/major')">专业管理</el-menu-item>
          </el-submenu>

          <el-menu-item index="3" @click="$router.push('/test')">
            <i class="el-icon-menu"></i>
            <span slot="title">测试模块</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <el-button :icon="collapsed?'el-icon-s-unfold':'el-icon-s-fold'" @click="toggleCollapsed"></el-button>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer class="footer">Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    }
  },
};
</script>

<style>
body {
  margin: 0;
  background-color: #f3f3f4;
}
.menu {
  width: 200px;
  min-height: 100vh;
  border-right: 0 !important;
}
.header,
.footer {
  background-color: #545c64;
  color: #fff;
  line-height: 60px;
}
.logo {
  margin: auto;
  height: 60px;
  display: block;
}
</style>
