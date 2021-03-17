<template>
  <div>
    <el-row class="card">
      <!-- 选项卡 -->
      <el-col :lg="12" :md="24">
        <el-button size="mini" @click="openDialog('add')" type="success"
          >添加</el-button
        >
        <el-button size="mini" type="primary">导入</el-button>
        <el-button size="mini" type="warning">导出</el-button>
      </el-col>
    </el-row>
    <el-row class="card">
      <!-- 表格 -->
      <el-col :span="24">
        <el-table :data="collegeData" :row-class-name="tableRowClassName">
          <el-table-column label="院系名称" prop="college_name" sortable>
          </el-table-column>
          <el-table-column label="院系编号" prop="college_code" sortable>
          </el-table-column>
          <el-table-column label="毕业生数量" prop="college_students" sortable>
          </el-table-column>
          <el-table-column label="状态" prop="college_status_display" sortable>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
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
          <el-input type="textarea" v-model="form.college_remark"></el-input>
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
      bak: [],
      collegeData: [
        {
          college_name: "经济与管理学院",
          college_code: "JG",
          college_students: 777,
          college_status: 0,
          college_status_display: "",
        },
        {
          college_name: "电子工程学院",
          college_code: "DZ",
          college_students: 123,
          college_status: 0,
          college_status_display: "",
        },
        {
          college_name: "外国语学院",
          college_code: "WY",
          college_students: 453,
          college_status: 1,
          college_status_display: "",
        },
      ],
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
      let colleges = this.collegeData;
      for (let i = 0; i < colleges.length; i++) {
        if (colleges[i].college_status == 0) {
          colleges[i].college_status_display = "正常";
        } else {
          colleges[i].college_status_display = "禁用";
        }
      }
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