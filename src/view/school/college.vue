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
            collegeData.filter(
              (data) =>
                !search ||
                data.college_name
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                data.college_code.toLowerCase().includes(search.toLowerCase())
            )
          "
          :row-class-name="tableRowClassName"
        >
          <el-table-column label="院系名称" prop="college_name" sortable>
          </el-table-column>
          <el-table-column label="院系编号" prop="college_code" sortable>
          </el-table-column>
          <el-table-column label="毕业生数量" prop="college_students" sortable>
          </el-table-column>
          <el-table-column
            label="状态"
            prop="college_status_display"
            sortable
            :filters="statusList"
            :filter-method="filterHandler"
          >
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <!-- eslint-disable-next-line -->
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入院系名称或编号进行搜索"
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
          <el-input v-model="form.college_name"></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="form.college_code"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.college_status">
            <el-radio :label="0">启用</el-radio>
            <el-radio :label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.college_description"></el-input>
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
import api from "@/api/api";
export default {
  name: "collegeManagement",
  data() {
    return {
      dialogVisible: false,
      type: "",
      form: {
        college_name: "",
        college_code: "",
        college_status: "",
        college_remark: "",
      },
      collegeData: [],
      search: "",
      statusList: [],
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
    tableRowClassName({ row }) {
      if (row.college_status == 1) {
        return "warning-row";
      }
    },
    deleteRow(index) {
      this.collegeData.splice(index, 1);
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
    getCollegeData() {
      api.getCollege().then((resp) => {
        let data = resp.data.data;
        let temp=[]
        for (let i = 0; i < data.length; i++) {
          //将状态码转换为文本
          if (data[i].college_status === 0) {
            data[i].college_status_display = "正常";
          } else {
            data[i].college_status_display = "禁用";
          }
          //添加状态过滤器
          if (!temp.includes(data[i].college_status_display)) {
            temp.push(data[i].college_status_display);
            this.statusList.push({
              text: data[i].college_status_display,
              value: data[i].college_status_display,
            });
          }
        }
        this.collegeData = data;
      });
    },
  },
  created() {
    this.getCollegeData();
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