<template>
  <div>
    <el-row class="card">
      <el-col :span="24">
        <el-button type="success" size="mini" @click="openDialog(0)"
          >添加</el-button
        >
      </el-col>
    </el-row>

    <!-- 表单 -->
    <el-dialog
      :title="type === 0 ? '添加字典类型' : '修改字典类型'"
      :visible.sync="dialogVisible"
      :before-close="closeDialog"
    >
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        label-suffix=":"
        label-width="90px"
      >
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio label="0">正常</el-radio>
            <el-radio label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="submitDialog()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 表格 -->
    <el-table :data="tableData">
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="类型" prop="type"></el-table-column>
      <el-table-column label="状态" prop="status"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" size="mini">编辑</el-button>
        <el-button type="danger" size="mini">删除</el-button>
        <el-button type="info" size="mini">查看</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { addDictType,getDict } from "@/api/system/dict/type";

export default {
  name: "DictType",
  data() {
    return {
      form: {},
      dialogVisible: false,
      type: null,
      tableData:[]
    };
  },
  methods: {
    openDialog(type, row) {
      this.dialogVisible = true;
      if (type === 0) {
        this.type = type;
      } else {
        this.type = type;
        this.form = JSON.parse(JSON.stringify(row));
      }
    },
    submitDialog() {
      if (this.type === 0) {
        addDictType(this.form).then((resp) => {
          if (resp.code === 0);
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
        });
        this.form={};
      } else {
        //do se
      }
    },
    closeDialog() {
      this.$confirm("编写的数据将丢失，确认关闭吗？")
        .then(() => {
          this.dialogVisible = false;
          this.form = {};
        })
        .catch(() => {});
    },
    getData(){
      getDict().then(resp=>{
        this.tableData=resp.obj;
      })
    }
  },
  mounted(){
    this.getData();
  }
};
</script>

<style>
</style>