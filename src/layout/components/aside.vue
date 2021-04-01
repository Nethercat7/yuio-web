<template>
  <el-aside style="width: auto">
    <el-menu
      class="menu"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-openeds="['2']"
    >
      <div>
        <img class="logo" src="../../assets/logo.png" alt="Logo" />
      </div>
      <el-menu-item index="1" @click="$router.push('/')">
        <i class="el-icon-menu"></i>
        <span slot="title">仪表盘</span>
      </el-menu-item>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="2-1" @click="$router.push('/system/college')"
          >院系管理</el-menu-item
        >
        <el-menu-item index="2-2" @click="$router.push('/system/major')"
          >专业管理</el-menu-item
        >
        <el-menu-item index="2-3" @click="$router.push('/system/class')"
          >班级管理</el-menu-item
        >
        <el-menu-item index="2-4" @click="$router.push('/system/student')">学生管理</el-menu-item>
        <el-menu-item index="2-5" @click="$router.push('/system/user')">用户管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "Aside",
};
</script>

<style>
</style>