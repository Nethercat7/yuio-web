<template>
  <div>
    <!-- 选项卡 -->
    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <el-col :span="12">
          <el-button size="mini" @click="openDialog('add')" type="success"
            >添加</el-button
          >
          <el-button size="mini" type="primary">导入</el-button>
          <el-button size="mini" type="warning">导出</el-button>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-input
            v-model="keyword"
            placeholder="请输入内容"
            size="mini"
            style="width: 200px; margin-right: 10px"
          ></el-input>
          <el-button size="mini" type="success" @click="search">搜索</el-button>
          <el-button size="mini" type="danger" @click="getData">重置</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 表格 -->
    <el-card :shadow="cardShadow">
      <el-row>
        <el-col :span="24">
          <el-table
            ref="table"
            :data="
              tableData.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
          >
            <el-table-column label="专业名称" prop="name" sortable>
            </el-table-column>
            <el-table-column label="所属院系" prop="college_name" sortable>
            </el-table-column>
            <el-table-column
              label="状态"
              prop="status"
              sortable
              :formatter="statusFormatter"
            >
            </el-table-column>
            <el-table-column
              label="创建时间"
              prop="create_time"
            ></el-table-column>
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
                  @confirm="delMajor(scope.row.id)"
                >
                  <el-button slot="reference" size="mini" type="danger"
                    >删除</el-button
                  >
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页器 -->
          <el-col :span="24">
            <Pager
              :total="total"
              :currentPage="currentPage"
              :page.sync="currentPage"
              :size.sync="pageSize"
            ></Pager>
          </el-col>
        </el-col>
      </el-row>
    </el-card>

    <!-- 表单 -->
    <el-dialog
      :title="type == 'add' ? '添加专业' : '修改专业'"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="closeDialog"
    >
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="专业名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属院系" prop="college_id">
          <el-select v-model="form.college_id" placeholder="请选择">
            <el-option
              v-for="item in colleges"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
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
  </div>
</template>

<script>
import Pager from "@/components/pager";
import {
  addMajor,
  getMajors,
  delMajor,
  updMajor,
  getMajorByKeyword,
} from "@/api/system/major";
import { getColleges } from "@/api/system/college";

export default {
  name: "majorManagement",
  components: { Pager },
  data() {
    return {
      tableData: [],
      keyword: "",
      dialogVisible: false,
      type: "",
      form: {},
      currentPage: 1,
      pageSize: 10,
      total: 0,
      colleges: [],
      statusOptions: [],
      rules: {
        name: [
          { required: true, message: "请输入专业名称", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
        college_id: [
          { required: true, message: "请选择一个院系", trigger: "change" },
        ],
        status: [
          { required: true, message: "请选择一个状态", trigger: "change" },
        ],
      },
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
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.type == "add") {
            addMajor(this.form).then((resp) => {
              if (resp.status == null) {
                this.$message({
                  message: resp.msg,
                  type: resp.type,
                });
              }
              if (resp.code === 0) {
                this.getData();
                this.form = {};
                this.$refs["form"].resetFields();
              }
            });
          } else {
            updMajor(this.form).then((resp) => {
              if (resp.status == null) {
                this.$message({
                  message: resp.msg,
                  type: resp.type,
                });
              }
              if (resp.code === 0) this.getData();
            });
          }
        } else {
          return false;
        }
      });
    },
    closeDialog() {
      this.$confirm("编写的数据将丢失，确认关闭吗？")
        .then(() => {
          this.dialogVisible = false;
          this.form = {};
          this.$refs["form"].resetFields();
        })
        .catch(() => {});
    },
    delMajor(id) {
      delMajor(id).then((resp) => {
        if (resp.code === 0) {
          this.getData();
        }
        if (resp.status == null) {
          this.$message({
            message: resp.msg,
            type: resp.type,
          });
        }
      });
    },
    getData() {
      getMajors().then((resp) => {
        this.total = resp.obj.length;
        this.tableData = resp.obj;
      });
      //获取院系信息
      getColleges().then((resp) => {
        this.colleges = resp.obj;
      });
      //获取数据字典
      this.getDictData("sys_uvsl_status").then((resp) => {
        this.statusOptions = resp.obj;
      });
    },
    handelChange() {
      let college = this.colleges.filter((data) =>
        data.college_id.includes(this.form.college_id)
      );
      this.form.college_name = college[0].college_name;
    },
    statusFormatter(row) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    search() {
      getMajorByKeyword(this.keyword).then((resp) => {
        this.total = resp.obj.length;
        this.tableData = resp.obj;
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>