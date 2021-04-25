<template>
  <div class="grid-content bg-purple">
    <bar-chart id="sb" :chartData="barChartData" />
  </div>
</template>
<script>
// 引入组件
import BarChart from "@/components/charts/testChart";

export default {
  // 注册局部组件
  components: {
    BarChart,
  },
  data() {
    return {
      // 柱状图数据
      barChartData: {
        days: ["11.21", "11.22", "11.23", "11.24", "11.25", "11.26", "11.27"],
        data1: [100, 120, 161, 134, 105, 160, 165],
        data2: [120, 82, 91, 154, 162, 140, 145],
      },
    };
  },
};
</script>
<style>
</style>