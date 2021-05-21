<template>
  <div>
    <div slot="tip" class="el-upload__tip">
      <b>导入前注意事项</b>
    </div>

    <div slot="tip" class="el-upload__tip">
      <span
        >部分字段请按照下面的模板选择填写，否者导入可能会出错</span
      >
      <ul>
        <li>性别：女、男</li>
        <li>状态：正常、禁用</li>
        <li>权限类型：菜单、目录、按钮</li>
      </ul>
    </div>

    <div slot="tip" class="el-upload__tip">
      <span
        >在填写上级ID时，请保证上级ID是真实存在于数据库中并对应着某条数据。</span
      >
    </div>

    <div slot="tip" class="el-upload__tip">
      <span
        >填写所属院系、专业、年级、班级等信息时请保证这些数据已经存在于系统中并且名字正确无误。</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ImportText",
};
</script>

<style>
</style>