<template>
  <div>
    <el-row class="mb-20">
      <el-col :span="24">
        <el-card :shadow="shadow" class="top-tools">
          <el-button type="success" size="mini" @click="openDialog(0)"
            >添加</el-button
          >
        </el-card>
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
            <el-radio
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
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
    <el-row>
      <el-col :span="24">
        <el-card :shadow="shadow">
          <el-table
            :data="
              tableData.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
          >
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="类型" prop="type"></el-table-column>
            <el-table-column
              label="状态"
              prop="status"
              :formatter="statusFormatter"
            ></el-table-column>
            <el-table-column label="备注" prop="remark"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="openDialog('upd', scope.row)"
                  >编辑</el-button
                >
                <el-popconfirm
                  title="删除后将无法恢复，确定删除吗？"
                  style="padding: 7px 15px"
                  icon="el-icon-info"
                  icon-color="red"
                  @confirm="deleteData(scope.row.id)"
                >
                  <el-button type="danger" size="mini" slot="reference"
                    >删除</el-button
                  >
                </el-popconfirm>
                <el-button
                  type="info"
                  size="mini"
                  @click="
                    $router.push({
                      name: 'DictData',
                      query: { type: scope.row.type },
                    })
                  "
                  >查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页器 -->
          <Pager
            :total="total"
            :currentPage="currentPage"
            :page.sync="currentPage"
            :size.sync="pageSize"
          ></Pager>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  addDictType,
  getDict,
  delDict,
  updDictType,
} from "@/api/system/dict/type";
import Pager from "@/components/pager";

export default {
  name: "DictType",
  components: { Pager },
  data() {
    return {
      form: {},
      dialogVisible: false,
      type: null,
      tableData: [],
      shadow: "never",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      statusOptions: [],
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
          if (resp.code === 0) this.getData();
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
        });
      } else {
        updDictType(this.form).then((resp) => {
          if (resp.code === 0) this.getData();
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
        });
        this.dialogVisible = false;
      }
      this.form = {};
    },
    closeDialog() {
      this.$confirm("编写的数据将丢失，确认关闭吗？")
        .then(() => {
          this.dialogVisible = false;
          this.form = {};
        })
        .catch(() => {});
    },
    getData() {
      getDict().then((resp) => {
        this.tableData = resp.obj;
        this.total = resp.obj.length;
      });
      //获取数据字典
      this.getDictData("sys_uvsl_status").then((resp) => {
        this.statusOptions = resp.obj;
      });
    },
    deleteData(id) {
      delDict(id).then((resp) => {
        if (resp.code === 0) this.getData();
        this.$message({
          message: resp.msg,
          type: resp.type,
        });
      });
    },
    statusFormatter(row) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>