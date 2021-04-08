<template>
  <el-aside style="width: auto">
    <el-menu
      class="menu"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-openeds="['2', '3','4']"
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
         <el-menu-item index="2-0" @click="$router.push('/system/org')"
          >组织管理</el-menu-item
        >
        <el-menu-item index="2-1" @click="$router.push('/system/college')"
          >院系管理</el-menu-item
        >
        <el-menu-item index="2-2" @click="$router.push('/system/major')"
          >专业管理</el-menu-item
        >
        <el-menu-item index="2-3" @click="$router.push('/system/class')"
          >班级管理</el-menu-item
        >
        <el-menu-item index="2-4" @click="$router.push('/system/student')"
          >学生管理</el-menu-item
        >
        <el-menu-item index="2-5" @click="$router.push('/system/user')"
          >用户管理</el-menu-item
        >
        <el-menu-item index="2-6" @click="$router.push('/system/role')"
          >角色管理</el-menu-item
        >
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item index="3-1" @click="$router.push('/statistics/eRate')"
          >就业率统计</el-menu-item
        >
        <el-menu-item index="3-2" @click="$router.push('/statistics/eStatus')"
          >就业情况统计</el-menu-item
        >
        <el-menu-item
          index="3-3"
          @click="$router.push('/statistics/eIntention')"
          >就业意向统计</el-menu-item
        >
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据对比</span>
        </template>
        <el-menu-item index="4-1" @click="$router.push('/compare/eRate')"
          >就业率对比</el-menu-item
        >
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