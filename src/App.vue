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

.card {
  border-radius: 6px;
  box-shadow: 1px 1px 3px rgb(0 0 0 / 20%);
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
}

.mb-20 {
  margin-bottom: 20px;
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
