<template>
  <div>
    <!-- Menu -->
    <el-row>
      <el-col :span="24">
        <el-menu mode="horizontal">
          <el-menu-item index="1" @click="$router.push('/collect/eStatus')"
            >就业情况填写</el-menu-item
          >
        </el-menu>
      </el-col>
    </el-row>

    <!-- Content -->
    <el-row style="padding-top: 20px">
      <el-col :span="12" :offset="6" :xs="{ span: 24, offset: 0 }" class="card">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import cityes from "@/data/json"
import api from "@/api/api"

export default {
  name: "Container",
  data(){
    return{
      cityList:cityes
    }
  },
  methods:{
    add(){
      this.cityList.forEach(element => {
        api.cityInitial(element);
      });
    },
    get(){
      api.getCities().then(resp=>{
        console.log(resp);
      })
    }
  },
  mounted(){
  }
};
</script>

<style>
</style>