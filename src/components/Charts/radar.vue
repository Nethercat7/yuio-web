<template>
  <div :id="id" :style="{ width: width, height: height, margin: margin }"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "RadarChart",
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
    indicator: {
      type: Array,
      default: null,
    },
    data: {
      type: Array,
      default: null,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    subTitle: {
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
          show: this.showTitle,
          text: this.title,
          subtext: this.subTitle,
        },
        tooltip: {},
        /*         legend: {
          data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"],
        }, */
        radar: {
          // shape: 'circle',
          axisName: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          indicator: this.indicator,
        },
        series: [
          {
            /*             name: "预算 vs 开销（Budget vs spending）", */
            type: "radar",
            // areaStyle: {normal: {}},
            data: this.data,
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