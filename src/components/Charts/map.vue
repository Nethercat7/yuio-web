<template>
  <div :id="id" :style="{ width: width, height: height }"></div>
</template>

<script>
import * as echarts from "echarts";
import chinaGeo from "@/data/geo";

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
    name:{
      type:String,
      default:null
    }
  },
  data() {
    return {
      chart: null,
    };
  },
  methods: {
    initial() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.setOptions();
    },
    setOptions() {
      this.chart.setOption({
        title: {
          text: "Map",
        },
        tooltip: {
          trigger: "item",
        },
        geo: {
          map: "china",
        },
        series: [
          {
            name: "One",
            type: "map",
            map: "china",
            roam: this.roam,
            zoom: this.zoom,
            data: this.data,
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
    echarts.registerMap("china", { geoJSON: chinaGeo });
    this.initial();
  },
};
</script>

<style>
</style>