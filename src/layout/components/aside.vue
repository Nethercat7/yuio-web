<template>
  <el-aside style="width: auto">
    <el-menu
      class="menu"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!-- 图表 -->
      <div>
        <img class="logo" src="../../assets/logo.png" alt="Logo" />
      </div>
      <!-- 目录 -->
      <el-submenu v-for="menu in menus" :key="menu.id" :index="menu.id">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{ menu.name }}</span>
        </template>
        <el-menu-item
          v-for="children in menu.children"
          :key="children.id"
          @click="$router.push(children.url)"
        >
          {{ children.name }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import { getMenus } from "@/api/system/sys";
import { getSubjectId, getSubjectType } from "@/utils/storage";

export default {
  name: "Aside",
  data() {
    return {
      menus: [],
      id: 0,
      type: "",
    };
  },
  methods: {
    getData() {
      getMenus(this.type, this.id).then((resp) => {
        this.menus = resp.obj;
      });
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