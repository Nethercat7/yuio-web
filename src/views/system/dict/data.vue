<template>
  <div>
    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <el-col :span="24">
          <el-button type="success" size="mini" @click="openDialog(0)"
            >添加</el-button
          >
        </el-col>
      </el-row>
    </el-card>

    <!-- 表单 -->
    <el-dialog
      :title="type === 0 ? '添加字典数据' : '修改字典数据'"
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
        <el-form-item label="标签">
          <el-input v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item label="键值">
          <el-input v-model="form.value"></el-input>
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
    <el-card :shadow="cardShadow">
      <el-row>
        <el-col :span="24">
          <el-table
            :data="
              tableData.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
          >
            <el-table-column label="标签" prop="label"></el-table-column>
            <el-table-column label="类型" prop="type"></el-table-column>
            <el-table-column label="键值" prop="value"></el-table-column>
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
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {
  addDictData,
  getDictData,
  delDictData,
  updDictData,
} from "@/api/system/dict/data";
import Pager from "@/components/pager";

export default {
  name: "DictData",
  components: { Pager },
  data() {
    return {
      form: {
        type: this.$route.query.type,
      },
      dialogVisible: false,
      type: null,
      tableData: [],
      shadow: "never",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dictType: null,
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
        addDictData(this.form).then((resp) => {
          if (resp.code === 0) this.getData();
          if (resp.status == null) {
            this.$message({
              message: resp.msg,
              type: resp.type,
            });
          }
        });
      } else {
        updDictData(this.form).then((resp) => {
          if (resp.code === 0) this.getData();
          if (resp.status == null) {
            this.$message({
              message: resp.msg,
              type: resp.type,
            });
          }
        });
        this.dialogVisible = false;
      }
      this.form = {};
      this.form.type = this.$route.query.type;
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
      getDictData(this.dictType).then((resp) => {
        this.tableData = resp.obj;
        this.total = resp.obj.length;
      });
      //获取数据字典
      this.getDictData("sys_uvsl_status").then((resp) => {
        this.statusOptions = resp.obj;
      });
    },
    deleteData(id) {
      delDictData(id).then((resp) => {
        if (resp.code === 0) this.getData();
        if (resp.status == null) {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
        }
      });
    },
    statusFormatter(row) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
  },
  mounted() {
    this.dictType = this.$route.query.type;
    this.getData();
  },
};
</script>

<style>
</style>