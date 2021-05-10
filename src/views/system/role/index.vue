<template>
  <div>
    <el-card class="mb-20" :shadow="cardShadow">
      <el-row>
        <el-col :span="12">
          <el-button size="mini" type="success" @click="openDialog('add')"
            >添加</el-button
          >
          <el-button size="mini" type="primary">导入</el-button>
          <el-button size="mini" type="warning" @click="output">导出</el-button>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-autocomplete
            placeholder="请输入内容"
            size="mini"
            style="margin-right: 10px"
            :trigger-on-focus="false"
            value-key="name"
            v-model="keyword"
          ></el-autocomplete>
          <el-button size="mini" type="success">搜索</el-button>
          <el-button size="mini" type="danger">重置</el-button>
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
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column
              label="创建时间"
              prop="create_time"
            ></el-table-column>
            <el-table-column
              label="状态"
              prop="status"
              :formatter="statusFormatter"
            ></el-table-column>
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="info"
                  @click="openDialog('upd', scope.row)"
                  >编辑</el-button
                >
                <el-popconfirm
                  title="删除后将无法恢复，确定删除吗？"
                  style="padding: 7px 15px"
                  icon="el-icon-info"
                  icon-color="red"
                  @confirm="handleDelete(scope.row.id)"
                >
                  <el-button slot="reference" size="mini" type="danger"
                    >删除</el-button
                  >
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <!-- 分页器 -->
        <el-col :span="24">
          <Pager
            :total="total"
            :currentPage="currentPage"
            :page.sync="currentPage"
            :size.sync="pageSize"
          ></Pager>
        </el-col>
      </el-row>
    </el-card>

    <!-- 表单 -->
    <el-dialog
      :title="type == 'add' ? '添加角色' : '修改角色'"
      :visible.sync="dialogVisible"
      :before-close="closeDialog"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="left"
        label-suffix=":"
        label-width="90px"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
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
        <el-form-item label="操作权限">
          <div class="perms-box">
            <el-tree
              :data="perms"
              :props="defaultProps"
              show-checkbox
              ref="tree"
              node-key="id"
              @check-change="handleNodeClick"
            ></el-tree>
          </div>
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
import { addRole, getRoles, delRole, updRole,outputRoles } from "@/api/system/role";
import { getPerms } from "@/api/system/perms";

export default {
  name: "roleManagement",
  components: { Pager },
  data() {
    return {
      tableData: [],
      tableDataBak: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      keyword: "",
      dialogVisible: false,
      type: "",
      form: { perms: [] },
      defaultProps: {
        children: "children",
        label: "name",
      },
      perms: [],
      statusOptions: [],
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
        status: [
          { required: true, message: "请选择一个状态", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    getData() {
      getRoles().then((resp) => {
        this.tableData = resp.obj;
        this.tableDataBak = resp.obj;
        this.total = resp.obj.length;
      });
      //获取字典
      this.getDictData("sys_uvsl_status").then((resp) => {
        this.statusOptions = resp.obj;
      });
    },
    async openDialog(type, row) {
      this.dialogVisible = true;
      this.form.perms = [];
      //获取权限
      await getPerms().then((resp) => {
        this.perms = resp.obj;
      });
      if (type == "add") {
        this.type = type;
      } else {
        this.type = type;
        this.form = JSON.parse(JSON.stringify(row));
        this.$nextTick(() => {
          let perms = row.perms;
          perms.forEach((element) => {
            let node = this.$refs.tree.getNode(element);
            if (node.isLeaf) {
              this.$refs.tree.setChecked(node, true);
            }
          });
        });
      }
    },
    submitDialog() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.type == "add") {
            addRole(this.form).then((resp) => {
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
            updRole(this.form).then((resp) => {
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
    handleDelete(id) {
      delRole(id).then((resp) => {
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
    //设置被选中的权限
    handleNodeClick() {
      this.form.perms = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
    },
    statusFormatter(row) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    output(){
      outputRoles().then(resp=>{
        this.fileDownload(resp,"角色数据.xlsx");
      })
    }
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
.perms-box {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  outline: 0;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  min-height: 20px;
  max-height: 200px;
  overflow: auto;
}
</style>