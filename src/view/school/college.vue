<template>
  <div>
    <!-- 选项卡 -->
    <div class="card">
      <el-button size="mini" @click="openDialog('add')">添加</el-button>
      <el-button size="mini">导入</el-button>
      <el-button size="mini">导出</el-button>
    </div>
    <!-- 表格 -->
    <div class="card">
      <el-table :data="collegeData">
        <el-table-column label="院系名称" prop="college_name">
        </el-table-column>
        <el-table-column label="院系编号" prop="college_code">
        </el-table-column>
        <el-table-column label="学生数量" prop="college_students">
        </el-table-column>
        <el-table-column label="状态" prop="college_status_display">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="openDialog('upd', scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      collegeData: [
        {
          college_name: "经济与管理学院",
          college_code: "JG",
          college_students: 777,
          college_status: 0,
          college_status_display: "正常",
        },
        {
          college_name: "电子工程学院",
          college_code: "DZ",
          college_students: 123,
          college_status: 0,
          college_status_display: "正常",
        },
        {
          college_name: "外国语学院",
          college_code: "WY",
          college_students: 453,
          college_status: 1,
          college_status_display: "禁用",
        },
      ],
    };
  },
  methods: {
    openDialog(type, index, row) {
      this.dialogVisible = true;
      if (type == "add") {
        this.type = type;
      } else {
        this.type = type;
        this.form = row;
      }
    },
    submitDialog() {
      if (this.type == "add") {
        console.log(this.form);
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
    },
    closeDialog() {
      this.$confirm("编写的数据将丢失，确认关闭吗？").then(() => {
        this.dialogVisible = false;
        this.form = {};
      }).catch(()=>{
          
      });
    },
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
</style>