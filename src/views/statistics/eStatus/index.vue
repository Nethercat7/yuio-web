<template>
  <div>
    <el-row>
      <el-card>
        <el-col :span="12">
          <estatus
            :id="work - cityies"
            :data="data"
            :name="name"
            title="工作城市"
            suffix="人"
          ></estatus>
        </el-col>
        <el-col :span="12">
          <p>xxx就业人数一共有:xxx人</p>
          <p>大多数人选择的前三位城市是：</p>
          <ol>
            <li>xxx</li>
            <li>xxx</li>
            <li>xxx</li>
          </ol>
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import estatus from "@/components/charts/bar";

export default {
  name: "EmploymentStatus",
  components: { estatus },
  data() {
    return {
      data: [34, 54, 67, 90, 12,56,78,12,34,59,22,34,78,76],
      name: ["北京", "上海", "广东", "深圳", "桂林","南宁","柳州","武汉","长沙","三亚","杭州",'黑龙江','哈尔滨','兰州'],
    };
  },
};
</script>

<style>
</style>