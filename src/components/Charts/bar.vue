<template>
  <div :id="id" :style="{ width: width, height: height, margin: margin }"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "BarChart",
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
    name: {
      type: Array,
      default: null,
    },
    data: {
      type: Array,
      default: null,
    },
    showName: {
      type: Boolean,
      default: true,
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
      default: "",
    },
    suffix: {
      type: String,
      default: "",
    },
    interval: {
      type: Number,
      default: 0,
    },
    rotate: {
      type: Number,
      default: 0,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      yAxis: {
        type: "value",
        axisLabel: {
          show: true,
          interval: "auto",
          //formatter: this.showPercentage ? "{value}%" : "{value}",
          formatter: "{value}" + this.suffix,
        },
      },
      xAxis: {
        show: this.showName,
        type: "category",
        data: this.name,
        axisLabel: {
          interval: this.interval,
          rotate: this.rotate,
        },
      },
    };
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
        xAxis: this.horizontal ? this.yAxis : this.xAxis,
        yAxis: this.horizontal ? this.xAxis : this.yAxis,
        tooltip: {
          show: this.showTooltip,
          trigger: "axis",
          //formatter: this.showPercentage ? "{b}:{c}%" : "{b}:{c}",
          formatter: "{b}： {c}" + this.suffix,
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