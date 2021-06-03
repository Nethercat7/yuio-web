<template>
  <el-container>
    <el-aside style="width: auto">
      <el-menu
        class="menu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="collapse"
        :default-active="catalogActive"
      >
        <!-- 图标 -->
        <div>
          <el-row style="height: 60px">
            <el-image
              class="logo"
              :src="require('@/assets/logo.png')"
              alt="Logo"
              fit="contain"
            />
          </el-row>
        </div>
        <!-- 目录 -->
        <el-menu-item
          v-for="menu in children"
          :key="menu.id"
          :index="menu.url"
          @click="$router.push(menu.url)"
        >
          <i :class="menu.icon"></i>
          <span slot="title">{{ menu.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header" style="padding: 0; height: atuo">
        <el-menu
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="menuActive"
        >
          <!-- 折叠按钮 -->
          <li class="collapse" @click="switchCollapse">
            <span :class="collapseIcon"></span>
          </li>

          <!-- 菜单 -->
          <el-menu-item
            v-for="menu in menus"
            :key="menu.id"
            :index="menu.url"
            @click="setChildren(menu.children)"
          >
            <template slot="title">
              <i :class="menu.icon"></i>
              <span>{{ menu.name }}</span>
            </template>
          </el-menu-item>

          <!-- 个人资料 -->
          <el-submenu index="1" style="float: right">
            <template slot="title">{{ subject.name }}</template>
            <el-menu-item index="1-1" @click="$router.push('/profile')"
              >个人资料</el-menu-item
            >
            <el-menu-item index="1-2" @click="exit">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main id="content">
        <router-view :screenWidth="screenWidth"></router-view>
      </el-main>
      <el-footer class="footer">
        <el-row type="flex" justify="center">
          <el-col :xs="24" :lg="12">
            <span class="text-center" style="font-size: 85%"
              >Copyright © 2021 by
              <a
                href="https://gitee.com/nethercat7"
                style="color: #fff; text-decoration: none"
                target="_blank"
                >Nethercat7</a
              ></span
            >
          </el-col>
        </el-row>
      </el-footer>
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
      collapse: false,
      collapseIcon: "el-icon-s-fold",
      menuActive: "",
      catalogActive: "",
      screenWidth: document.body.clientWidth,
      screenHeight: document.body.clientHeight,
    };
  },
  methods: {
    getData() {
      getMenus(this.type, this.id).then((resp) => {
        this.menus = resp.obj;
        this.children = resp.obj[0].children;
        //设置菜单和目录默认激活状态
        this.catalogActive = this.$route.path;
        this.menuActive = this.$route.matched[0].path;
        //因为目录是菜单点击之后传入的参数设置的，在开始会默认传入第一个菜单的值，所以要循环遍历与当前的路由URL比较，然后传入当前菜单的值。
        this.menus.forEach((element) => {
          if (element.url == this.menuActive) {
            this.setChildren(element.children);
          }
        });
      });
    },
    exit() {
      delSubject();
      this.$router.push("/login");
    },
    setChildren(params) {
      this.children = params;
    },
    switchCollapse() {
      if (this.collapse) {
        this.collapse = false;
        this.collapseIcon = "el-icon-s-fold";
      } else {
        this.collapse = true;
        this.collapseIcon = "el-icon-s-unfold";
      }
    },
    //动态切换侧边栏折叠状态
    adapter() {
      if (this.screenWidth <= 768) {
        if (!this.collapse) {
          this.collapse = true;
          this.collapseIcon = "el-icon-s-unfold";
        }
      } else {
        if (this.collapse) {
          this.collapse = false;
          this.collapseIcon = "el-icon-s-fold";
        }
      }
    },
  },
  watch: {
    //监听路由变化设置目录的激活状态
    $route(to) {
      this.catalogActive = to.path;
      this.menuActive = to.matched[0].path;
    },
    //监听窗口变化
    screenWidth() {
      this.adapter();
    },
  },
  mounted() {
    //如果Token为空的话就跳转到登录页面
    if (localStorage.getItem("token") == null) {
      this.$router.push("/login");
    } else {
      this.subject = getSubject();
      this.id = getSubjectId();
      this.type = getSubjectType();
      this.getData();
    }
    //设置侧边栏在初始化时的折叠状态
    if (this.screenWidth < 768) {
      this.adapter();
    }
    //返回窗口宽高
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth;
        this.screenHeight = document.body.clientHeight;
      })();
    };
  },
};
</script>

<style>
.collapse {
  display: inline;
  float: left;
  padding: 0px 15px;
}
.collapse:hover {
  cursor: pointer;
  background-color: #434a50;
}
</style>