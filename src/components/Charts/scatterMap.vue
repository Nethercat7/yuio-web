<template>
  <div :id="id" :style="{ width: width, height: height }"></div>
</template>

<script>
import * as echarts from "echarts";
import geo from "@/data/geo";

export default {
  name: "MapChart",
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
    roam: {
      type: Boolean,
      default: false,
    },
    zoom: {
      type: Number,
      default: 1.2,
    },
    data: {
      type: Array,
      default: null,
    },
    name: {
      type: String,
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
    setOptions(data) {
      this.chart.clear();
      this.chart.setOption({
        title: {
          text: this.title,
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        geo: {
          map: "china",
          roam: this.roam,
          zoom: this.zoom,
        },
        series: [
          {
            name: this.name,
            type: "scatter",
            coordinateSystem: "geo",
            data: data,
            symbolSize: function (val) {
              if (val[2] > 100) {
                return val[2] / 10;
              }
              return 10;
            },
            encode: {
              value: 2,
            },
          },
        ],
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
    echarts.registerMap("china", { geoJSON: geo });
    this.initial();
  },
};
</script>

<style>
</style>