<template>
  <div>
    <el-row class="card">
      <!-- 选项卡 -->
      <el-col :span="24">
        <el-button size="mini" @click="openDialog('add')" type="success"
          >添加</el-button
        >
        <el-button size="mini" type="primary">导入</el-button>
        <el-button size="mini" type="warning">导出</el-button>
        <el-button size="mini" type="danger" @click="clearFilter"
          >重置筛选</el-button
        >
      </el-col>
    </el-row>
    <el-row class="card">
      <!-- 表格 -->
      <el-col :span="24">
        <el-table
          ref="table"
          :data="
            tableData.filter(
              (data) =>
                !search ||
                data.major_name.toLowerCase().includes(search.toLowerCase()) ||
                data.major_code.toLowerCase().includes(search.toLowerCase())
            )
          "
          :row-class-name="tableRowClassName"
        >
          <el-table-column label="专业名称" prop="major_name" sortable>
          </el-table-column>
          <el-table-column label="专业编号" prop="major_code" sortable>
          </el-table-column>
          <el-table-column label="毕业生数量" prop="major_students" sortable>
          </el-table-column>
          <el-table-column
            label="所属院系"
            prop="major_college"
            sortable
            :filters="collegeFilter"
            :filter-method="filterHandler"
          >
          </el-table-column>
          <el-table-column
            label="状态"
            prop="major_status_display"
            sortable
            :filters="statusFilter"
            :filter-method="filterHandler"
          >
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <!-- eslint-disable-next-line -->
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入专业名称或编号进行搜索"
              />
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="openDialog('upd', scope.row)"
                type="info"
                >编辑</el-button
              >
              <el-popconfirm
                title="删除后将无法恢复，确定删除吗？"
                style="padding: 7px 15px"
                icon="el-icon-info"
                icon-color="red"
                @confirm="deleteRow(scope.$index)"
              >
                <el-button slot="reference" size="mini" type="danger"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 表单 -->
    <el-dialog
      :title="type == 'add' ? '添加院系' : '修改院系'"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="closeDialog"
    >
      <el-form ref="form" :model="form">
        <el-form-item label="名称">
          <el-input v-model="form.major_name"></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="form.major_code"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.major_status">
            <el-radio :label="0">启用</el-radio>
            <el-radio :label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.major_remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="submitDialog()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "majorManagement",
  data() {
    return {
      dialogVisible: false,
      type: "",
      form: {
        major_name: "",
        major_code: "",
        major_status: "",
        major_remark: "",
      },
      tableData: [
        {
          major_name: "信息管理与信息系统",
          major_code: "XG",
          major_students: 173,
          major_status: 0,
          major_status_display: "",
          major_college: "经济与管理学院",
        },
        {
          major_name: "计算机应用技术",
          major_code: "JY",
          major_students: 123,
          major_status: 0,
          major_status_display: "",
          major_college: "电子信息工程学院",
        },
        {
          major_name: "国际贸易",
          major_code: "GM",
          major_students: 110,
          major_status: 1,
          major_status_display: "",
          major_college: "经济与管理学院",
        },
        {
          major_name: "汽车维修工程",
          major_code: "QX",
          major_students: 129,
          major_status: 0,
          major_status_display: "",
          major_college: "机械学院",
        },
        {
          major_name: "室内设计",
          major_code: "SN",
          major_students: 70,
          major_status: 1,
          major_status_display: "",
          major_college: "艺术学院",
        },
        {
          major_name: "幼儿教育",
          major_code: "YJ",
          major_students: 89,
          major_status: 0,
          major_status_display: "",
          major_college: "职教学院",
        },
      ],
      search: "",
      statusFilter: [],
      collegeFilter: [],
    };
  },
  methods: {
    openDialog(type, row) {
      this.dialogVisible = true;
      if (type == "add") {
        this.type = type;
      } else {
        this.type = type;
        this.form = JSON.parse(JSON.stringify(row));
      }
    },
    submitDialog() {
      if (this.type == "add") {
        console.log(this.form);
        this.collegeData.push(this.form);
        this.$message({
          message: "添加成功",
          type: "success",
        });
      } else {
        console.log(this.form);
        this.$message({
          message: "修改成功",
          type: "success",
        });
      }
      this.form = {};
      this.dialogVisible = false;
      this.parseData();
    },
    closeDialog() {
      this.$confirm("编写的数据将丢失，确认关闭吗？")
        .then(() => {
          this.dialogVisible = false;
          this.form = {};
        })
        .catch(() => {});
    },
    parseData() {
      let data = this.tableData;
      let temp = [];//存放已添加进筛选条件中的数据
      for (let i = 0; i < data.length; i++) {
        if (data[i].major_status == 0) {
          data[i].major_status_display = "正常";
        } else {
          data[i].major_status_display = "禁用";
        }
        //挑选数组中未被添加进筛选条件的数据
        if (!temp.includes(data[i].major_status_display)) {
          temp.push(data[i].major_status_display);
          this.statusFilter.push({
            text: data[i].major_status_display,
            value: data[i].major_status_display,
          });
        }
        if (!temp.includes(data[i].major_college)) {
          temp.push(data[i].major_college);
          this.collegeFilter.push({
            text: data[i].major_college,
            value: data[i].major_college,
          });
        }
      }
    },
    tableRowClassName({ row }) {
      if (row.major_status == 1) {
        return "warning-row";
      }
    },
    deleteRow(index) {
      this.tableData.splice(index, 1);
      this.$message({
        message: "成功删除",
        type: "success",
      });
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    clearFilter() {
      this.$refs.table.clearFilter();
    },
  },
  mounted() {
    this.parseData();
  },
};
</script>

<style>
.card {
  border-radius: 6px;
  box-shadow: 1px 1px 3px rgb(0 0 0 / 20%);
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
}
.el-table .warning-row {
  background-color: oldlace;
}

.el-table .success-row {
  background-color: #f0f9eb;
}
</style>