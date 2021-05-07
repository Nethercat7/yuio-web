<template>
  <el-container>
    <el-aside style="width: auto">
      <el-menu
        class="menu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- 图表 -->
        <div>
          <img class="logo" src="../assets/logo.png" alt="Logo" />
        </div>
        <!-- 目录 -->
        <el-menu-item
          v-for="menu in children"
          :key="menu.id"
          :index="menu.id"
          @click="$router.push(menu.url)"
        >
          <template slot="title">
            <i :class="menu.icon"></i>
            <span>{{ menu.name }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <el-menu
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="active"
        >
          <el-menu-item
            v-for="menu in menus"
            :key="menu.id"
            :index="menu.id"
            @click="setChildren(menu.children)"
          >
            <template slot="title">
              <i :class="menu.icon"></i>
              <span>{{ menu.name }}</span>
            </template>
          </el-menu-item>

          <el-submenu index="1" style="float: right">
            <template slot="title">{{ subject.name }}</template>
            <el-menu-item index="1-1" @click="$router.push('/profile')"
              >个人资料</el-menu-item
            >
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
import {
  getSubject,
  delSubject,
  getSubjectId,
  getSubjectType,
} from "@/utils/storage";
import { getMenus } from "@/api/system/sys";

export default {
  name: "Layout",
  data() {
    return {
      subject: {},
      menus: [],
      id: 0,
      type: "",
      children: [],
      active: "",
    };
  },
  methods: {
    getData() {
      getMenus(this.type, this.id).then((resp) => {
        this.menus = resp.obj;
        this.active = resp.obj[0].id;
        this.children = resp.obj[0].children;
      });
    },
    exit() {
      delSubject();
      this.$router.push("/login");
    },
    setChildren(params) {
      this.children = params;
    },
  },
  created() {
    this.subject = getSubject();
    this.id = getSubjectId();
    this.type = getSubjectType();
    this.getData();
  },
};
</script>

<style>
</style>