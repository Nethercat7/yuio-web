<template>
  <div :id="id" :style="{ width: width, height: height, margin: margin }"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "PieChart",
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
    subTitle: {
      type: String,
      default: "",
    },
    data: {
      type: Array,
      default: null,
    },
    switchable: {
      type: Boolean,
      default: false,
    },
    suffix: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      legend: {
        orient: "vertical",
        left: "left",
      },
    };
  },
  methods: {
    initial() {
      var chartDom = document.getElementById(this.id);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: this.title,
          subtext: this.subTitle,
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}：{c}" + this.suffix,
        },
        legend: this.switchable ? this.legend : null,
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            data: this.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
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