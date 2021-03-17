<template>
  <div></div>
</template>

<script>
import api from '@/api/api'
export default {
  name: "test",
  methods:{
    test(){
      api.getCollege({id:1,name:'niklaus'}).then(resp=>{
        console.log(resp.data);
      })
    }
  },
  mounted(){
    this.test();
  }
};
</script>

<style>
</style>