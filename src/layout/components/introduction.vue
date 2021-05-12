<template>
  <div>
    <el-card :shadow="cardShadow">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <h1>系统介绍</h1>
          <el-divider></el-divider>
          <p>
            “高校毕业生就业情况统计系统”通过互联网设备来收集毕业生就业情况数据，并且将这些收集到的数据加以统计和分析再用数据可视化的形式呈现出来，使管理者可以更加及时、快速地了解应届和往届各学院各专业的毕业生就业情况、工作意向、工作职位等信息，方便引进相关用人单位以及向相关用人单位推荐毕业生等决策，大幅度地提升工作效率。在这个互联网信息技术与教育行业不断发展的年代，以后每年的高校招生数量与毕业生数量会一直呈现上升趋势，面对越来越多的高校毕业生，使用互联网收集毕业生的就业情况数据，再以数据可视化的形式更加科学、高效地统计与分析数据将会成为这个大数据时代的主流。以后每年的高校招生数量与毕业生数量会一直呈现上升趋势，面对越来越多的高校毕业生，使用互联网收集毕业生的就业情况数据，再以数据可视化的形式更加科学、高效地统计与分析数据将会成为这个大数据时代的主流。
          </p>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="12">
          <h1>技术选型</h1>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="12">
              <h3>前端</h3>
              <ul>
                <li>
                  UI框架：<a
                    href="https://element.eleme.cn/#/zh-CN"
                    target="_blank"
                    >Element UI</a
                  >
                </li>
                <li>
                  JS框架：<a href="https://cn.vuejs.org/" target="_blank"
                    >Vue.js</a
                  >
                </li>
                <li>
                  可视化图表：<a
                    href="https://echarts.apache.org/zh/index.html"
                    target="_blank"
                    >Apache ECharts</a
                  >
                </li>
                <li>
                  异步请求：<a
                    href="http://www.axios-js.com/docs/"
                    target="_blank"
                    >Axios</a
                  >
                </li>
              </ul>
            </el-col>
            <el-col :span="12">
              <h3>后台</h3>
              <ul>
                <li>
                  核心框架：<a
                    href="https://spring.io/projects/spring-boot/"
                    target="_blank"
                    >Spring Boot</a
                  >
                </li>
                <li>
                  安全框架：<a href="https://shiro.apache.org/" target="_blank"
                    >Apache Shiro</a
                  >
                </li>
                <li>
                  持久层框架：<a
                    href="https://mybatis.org/mybatis-3/zh/index.html#"
                    target="_blank"
                    >Mybatis</a
                  >
                </li>
                <li>
                  表格处理：<a
                    href="https://www.yuque.com/easyexcel"
                    target="_blank"
                    >EasyExcel</a
                  >
                </li>
                <li>
                  鉴权：<a href="https://jwt.io/" target="_blank"
                    >Json Web Token</a
                  >
                </li>
              </ul>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="12">
          <h3>系统功能结构</h3>
          <el-divider></el-divider>
          <el-image
            :src="require('@/assets/系统功能模块结构图ver01.png')"
            fit="contain"
          ></el-image>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Introduction",
};
</script>

<style>
</style>