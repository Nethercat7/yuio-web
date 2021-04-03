<template>
  <div :id="id" :style="{ width: width, height: height, margin: margin }"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: {
    id: {
      type: String,
      default: "main",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "500px",
    },
    margin: {
      type: String,
      default: "auto",
    },
    showTooltip: {
      type: Boolean,
      default: true,
    },
    xData: {
      type: Array,
      default: null,
    },
    data: {
      type: Array,
      default: null,
    },
    showX: {
      type: Boolean,
      default: true,
    },
    percentage: {
      type: Boolean,
      default: false,
    },
    showTop: {
      type: Boolean,
      default: false,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "Title",
    },
    subTitle: {
      type: String,
      default: null,
    },
  },
  methods: {
    inital() {
      var chartDom = document.getElementById(this.id);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          show: this.showTitle,
          text: this.title,
          subtext: this.subTitle,
          left: "center",
        },
        xAxis: {
          show: this.showX,
          type: "category",
          data: this.xData,
          axisLabel: {
            interval: 0,
            rotate: -15,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            interval: "auto",
            formatter: this.percentage ? "{value}%" : "{value}",
          },
        },
        tooltip: {
          show: this.showTooltip,
          trigger: "axis",
          formatter: this.percentage ? "{b}:{c}%" : "{b}:{c}",
        },
        series: [
          {
            data: this.data,
            type: "bar",
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
  watch: {
    data() {
      this.inital();
    },
  },
  mounted() {
    this.inital();
  },
};
</script>

<style>
</style>