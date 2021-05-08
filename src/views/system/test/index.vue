<template>
  <el-card>
    <MapChart id="map" height="700px" :data="data"></MapChart>
  </el-card>
</template>
<script>
import MapChart from "@/components/charts/scatterMap";
import { getEmplCityInfo } from "@/api/statistics/status";
import coord from "@/data/coord";

export default {
  name: "Test",
  components: { MapChart },
  data() {
    return {
      data: [],
    };
  },
  methods: {
    getData() {
      getEmplCityInfo({ grade: 2017 }).then((resp) => {
        let data = resp.obj.results;
        this.data = data.map((item) => {
          return {
            name: item.city_name,
            value: item.total_people,
          };
        });
        this.data = this.convertData(this.data);
        console.log(this.data);
      });
    },
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = coord[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
          });
        }
      }
      return res;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style>
</style>