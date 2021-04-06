<template>
  <div>
    <el-row class="mb-20">
      <el-col :span="24" style="text-align: right">
        <el-card class="top-tools">
          <el-cascader
            size="mini"
            v-model="value"
            :options="options"
            clearable
            @change="handleChange"
            :props="cascaderProps"
            style="margin-right: 20px"
            filterable
            :show-all-levels="false"
            ref="cascader"
          ></el-cascader>
          <el-button size="mini" type="success">切换</el-button>
          <el-button size="mini" type="danger">重置</el-button>
        </el-card>
      </el-col>
    </el-row>
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
    <el-row class="mb-20">
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
          <p>xxx中大部分人选择从事的岗位是：xxx，有x%的人选择了该岗位</p>
        </el-col>
      </el-card>
    </el-row>

    <el-row>
      <el-card>
        <el-col :span="12">
          <bar id="bar-1" :data="unemploylmentPeople" :name="intend" title="未就业人数打算" horizontal></bar> 
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
      cascaderProps: {
        value: "id",
        label: "labela",
        checkStrictly: true,
      },
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
      value: ["123213213213", "213213213", "2132132132"],
      options: [
        {
          id: "123213213213",
          labela: "广西科技大学",
          children: [
            {
              id: "213213213",
              labela: "经济与管理学院",
              children: [
                {
                  id: "2132132132",
                  labela: "信息管理与信息系统",
                },
              ],
            },
          ],
        },
      ],
      unemploylmentPeople: [10,20,30,40,50,60,70],
      intend:['继续找工作','考公务员','考研','研究生复试','考三支一扶','考西部计划志愿者','考选调生']
    };
  },
  methods: {
    handleChange() {
      console.log(this.$refs.cascader.getCheckedNodes(true));
    },
  },
};
</script>

<style>
.top-tools .el-card__body {
  padding: 10px !important;
}
</style>