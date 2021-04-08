<template>
  <div :id="id" :style="{ width: width, height: height, margin: margin }"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineChart",
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
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    seriesName: {
      type: Array,
      default: null,
    },
    seriesData: {
      type: Array,
      default: null,
    },
    suffix: {
      type: String,
      default: "",
    },
  },
  methods: {
    initial() {
      var chartDom = document.getElementById(this.id);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: this.title,
          subtext: this.subtitle,
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b}： {c}" + this.suffix,
        },
        xAxis: {
          type: "category",
          data: this.seriesName,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            interval: "auto",
            formatter: "{value}" + this.suffix,
          },
        },
        series: [
          {
            data: this.seriesData,
            type: "line",
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
  mounted() {
    this.initial();
  },
};
</script>

<style>
</style>