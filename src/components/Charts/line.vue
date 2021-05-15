<template>
  <div :id="id" :style="{ width: width, height: height }"></div>
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
    data: {
      type: Object,
      default: null,
    },
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    suffix: {
      type: String,
      default: "",
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
          text: this.title,
          subtext: this.subtitle,
          left: "center",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: name,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            interval: "auto",
            formatter: "{value}" + this.suffix,
          },
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