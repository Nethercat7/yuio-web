<template>
  <div>
    {{currentPage}}
    <Pager :total='1000' :currentPage="currentPage" :page.sync='currentPage' :size.sync='size'></Pager>
  </div>
</template>

<script>
import Pager from '@/components/Pager'
  export default {
    name:'test',
    components:{
      Pager
    },
    data(){
      return{
        currentPage:1,
        size:10
      }
    }
  }
</script>