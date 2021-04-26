<template>
  <div :id="id" :style="{ width: width, height: height }"></div>
</template>

<script>
import * as echarts from "echarts";
import resize from "@/utils/chartResize";

export default {
  name: "RadarChart",
  mixins: [resize],
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
      default: null,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  methods: {
    initial() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.setOptions(this.data);
    },
    setOptions({ name, data } = {}) {
      this.chart.setOption({
        title: {
          text: this.title,
        },
        radar: {
          indicator: name,
        },
        series: [
          {
            name: this.title,
            type: "radar",
            data: data,
          },
        ],
        tooltip: {
          trigger: "item",
        },
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
    this.initial();
  },
};
</script>

<style>
</style>