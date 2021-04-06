<template>
  <div>
    <el-row class="mb-20">
      <el-card>
        <el-col :span="12">
          <bar
            id="work-cityies"
            :data="data"
            :name="name"
            title="就业城市统计"
            suffix="人"
          ></bar>
        </el-col>
        <el-col :span="12">
          <p>xxx就业人数一共有:xxx人</p>
          <p>大多数人选择的前三位城市是：</p>
          <ol>
            <li>xxx</li>
            <li>xxx</li>
            <li>xxx</li>
          </ol>
        </el-col>
      </el-card>
    </el-row>
    <el-row>
      <el-card>
        <el-col :span="12">
          <radar
            id="job"
            :data="jobPeople"
            :indicator="jobName"
            title="工作岗位"
          ></radar>
        </el-col>
        <el-col :span="12">
          <p>xxx中大部分人选择从事的岗位是：xxx</p>
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import bar from "@/components/charts/bar";
import radar from "@/components/charts/radar";

export default {
  name: "EmploymentStatus",
  components: { bar, radar },
  data() {
    return {
      data: [34, 54, 67, 90, 12, 56, 78, 12, 34, 59, 22, 34, 78, 76],
      name: [
        "北京",
        "上海",
        "广东",
        "深圳",
        "桂林",
        "南宁",
        "柳州",
        "武汉",
        "长沙",
        "三亚",
        "杭州",
        "黑龙江",
        "哈尔滨",
        "兰州",
      ],
      jobName: [
        {
          name: "后端开发",
          max: 700,
        },
        {
          name: "前端开发",
          max: 700,
        },
        {
          name: "电商运营",
          max: 700,
        },
        {
          name: "大数据算法",
          max: 700,
        },
        {
          name: "数据挖掘",
          max: 700,
        },
        {
          name: "机器学习",
          max: 700,
        },
      ],
      jobPeople: [{ value: [100, 200, 300, 400, 500, 600], name: "工作岗位" }],
    };
  },
};
</script>

<style>
</style>