<template>
 <div>
     <el-card :shadow="cardShadow">
         <el-row type="flex" justify="center">
             <el-col :span="12">
                 <h1>为什么会被拒绝访问？</h1>
                 <el-divider></el-divider>
                 <ul>
                     <li>您所拥有的角色没有访问该功能的权限，请与系统管理员联系。</li>
                 </ul>
             </el-col>
         </el-row>
     </el-card>
 </div>
</template>

<script>
export default {
    name:"Error"
}
</script>

<style>

</style>