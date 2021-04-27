<template>
  <div :id="id" :style="{ width: width, height: height }"></div>
</template>

<script>
import * as echarts from "echarts";
import resize from '@/utils/chartResize'

export default {
  name: "BarChart",
  mixins:[resize],
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
    data: {
      type: Object,
      default: null,
    },
    showTooltip: {
      type: Boolean,
      default: true,
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
      chart: null,
    };
  },
  methods: {
    inital() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.setOptions(this.data);
    },
    setOptions({ name, series } = {}) {
      this.chart.setOption({
        title: {
          show: this.showTitle,
          text: this.title,
          subtext: this.subTitle,
          left: "center",
        },
        grid: {
          top: 35,
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: this.horizontal
          ? {
              type: "value",
              axisLabel: {
                show: this.showName,
                interval: "auto",
                formatter: "{value}" + this.suffix,
              },
            }
          : {
              show: this.showName,
              type: "category",
              data: name,
              axisLabel: {
                interval: this.interval,
                rotate: this.rotate,
              },
            },
        yAxis: this.horizontal
          ? {
              show: this.showName,
              type: "category",
              data: name,
              axisLabel: {
                interval: this.interval,
                rotate: this.rotate,
              },
            }
          : {
              type: "value",
              axisLabel: {
                show: this.showName,
                interval: "auto",
                formatter: "{value}" + this.suffix,
              },
            },
        tooltip: {
          show: this.showTooltip,
          trigger: "axis",
          formatter: "{b}： {c}" + this.suffix,
        },
        series: series,
      });
    },
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    this.inital();
  },
};
</script>

<style>
</style>