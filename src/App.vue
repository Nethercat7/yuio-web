<template>
  <div id="app">
    <router-view></router-view>
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
    },
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
  height: 100%;
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

.element-right {
  display: inline;
  text-align: right;
}

.text-center {
  display: block;
  text-align: center;
}

.top-tools .el-card__body {
  padding: 10px !important;
}

/* 滚动条样式
::-webkit-scrollbar 定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸
::-webkit-scrollbar-track 定义滚动条轨道 内阴影+圆角
::-webkit-scrollbar-thumb 定义滑块 内阴影+圆角
 */

::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #c8c8c8;
}

.mb-20 {
  margin-bottom: 20px;
}

.download {
  color: #0000ee;
}

.download:hover {
  cursor: pointer;
  text-decoration: underline;
}

/* 
表格行颜色样式
 */
.el-table .un_empl {
  background-color: #f8e3c4;
}

.el-table .un_sign {
  background-color: #faf6cf;
}

.el-table .signed {
  background-color: #e9e9eb;
}

.el-table .finlish {
  background-color: #e1f3d8;
}

.el-table .un_write {
  background-color: #fde2e2;
}
</style>
