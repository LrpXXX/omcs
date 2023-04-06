<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="角色名称" prop="rfid">
        <el-input v-model.trim="formInline.rfid"></el-input>
      </el-form-item>
      <el-form-item label="发放状态" prop="ffzt">
        <el-select v-model.trim="formInline.ffzt" placeholder="发放状态">
          <el-option label="启用" value="启用"></el-option>
          <el-option label="禁用" value="禁用"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSerch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSuReg">重置</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="onAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <commonTale :tableData="tableData" :columObj="columObj" :pageObj="pageObj" @rowOperation="rowOperation"></commonTale>
    <!-- 属性接口权限 -->
    <el-dialog title="权限配置" :visible.sync="openTree">
      <TreList />
    </el-dialog>
    <!-- 新增/编辑角色管理 -->
    <el-dialog title="新增/编辑角色管理" :visible.sync="saveVisble">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" enctype="multipart/form-data">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="ruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="ruleForm.roleDesc"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="roleType">
          <el-radio-group v-model="ruleForm.roleType">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认预约</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import commonTale from "@/components/common-table/index.vue";
import TreList from "./TreList.vue";
import { Role } from "@/service/api/auth/role";
import { Message } from "element-ui";
export default {
  components: { commonTale, TreList },
  data() {
    return {
      formInline: {},
      tableData: [],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "roleName",
            label: "角色名称",
            align: "center",
          },
          {
            text: true,
            prop: "roleDescription",
            label: "角色描述",
            align: "center",
          },
          {
            text: true,
            prop: "roleState",
            label: "状态",
            align: "center",
          },
          {
            isOperation: true,
            fixed: "right",
            label: "操作",
            width: "300",
            align: "center",
            sortable: false,
            operation: [
              {
                operation: "editOpen",
                type: "text",
                label: "编辑",
                // color: "red",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                operation: "editClose",
                type: "text",
                label: "权限设置",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                operation: "see",
                type: "text",
                label: "用户清单",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                operation: "delet",
                type: "text",
                label: "禁用",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.roleState === "启用";
                },
              },
              {
                operation: "delet",
                type: "text",
                label: "启用",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.roleState === "禁用";
                },
              },
            ],
          },
        ],
      },
      openTree: false,
      pageObj: {
        total: 20,
      },
      saveVisble: false,
      ruleForm: {},
      rules: {
        roleName: [{ required: true, message: "请输入角色名称", tigger: "blur" }],
        roleDesc: [{ required: true, message: "请输入角色描述", tigger: "blur" }],
        roleType: [{ required: true, message: "请选择状态", tigger: "change" }],
      },
    };
  },
  methods: {
    rowOperation(row, $index, now) {
      switch (now) {
        case "editClose":
          this.openTree = true;
          break;
        case "editOpen":
          {
            this.saveVisble = true;
            let { id, roleState, roleName, roleDescription } = JSON.parse(JSON.stringify(row));
            console.log(roleState);
            this.ruleForm = {
              id,
              roleName,
              roleDesc: roleDescription,
              roleType: roleState,
            };
          }
          break;
        case "see":
          this.$router.push("/auth/user");
          break;
        case "delet":
          {
            const data = {
              id: row.id,
              roleState: row.roleState === "启用" ? 0:1,
            };
            this.RoleUpate(data);
          }
          break;
        default:
          break;
      }
    },
    onSerch() {
      let condition = [{ column: "roleName", type: "like", value: this.formInline.rfid }];
      if (this.formInline.ffzt) {
        condition = [{ column: "roleState", type: "eq", value: this.formInline.ffzt === "禁用" ? 0 : 1 }];
      }
      const data = {
        condition: JSON.stringify(condition),
        pageNum: 1,
        pageSize: 10,
      };
      console.log(data)
      this.getTableList(data);
      this.formInline={}
    },
    onSuReg() {
      this.getTableList();
      this.formInline = {};
    },
    onAdd() {
      this.saveVisble = true;
    },
    submitForm(fromName) {
      this.$refs[fromName].validate().then((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          //有id就是修改
          if (this.ruleForm.id) {
            const data = {
              id: this.ruleForm.id,
              roleDescription: this.ruleForm.roleDesc,
              roleName: this.ruleForm.roleName,
              roleState: this.ruleForm.roleType === "启用" ? 1 : 0,
            };
            this.RoleUpate(data);
            this.saveVisble = false;
          } else {
            const data = {
              roleDescription: this.ruleForm.roleDesc,
              roleName: this.ruleForm.roleName,
              roleState: this.ruleForm.roleType === "启用" ? 1 : 0,
            };
            this.RoleAdd(data);
            this.saveVisble = false;
          }
        }
      });
    },
    resetForm(fromName) {
      this.$refs[fromName].resetField();
      this.saveVisble = false;
    },
    //  查询角色分页查询
    async getTableList(data) {
      try {
        const res = await Role.getList(data);
        console.log(res);
        if (res.code === 200) {
          this.tableData = res.data.records.map((item) => {
            item.roleState === "1" ? (item.roleState = "启用") : (item.roleState = "禁用");
            return item;
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    //  新增角色信息
    async RoleAdd(data) {
      try {
        const res = await Role.add(data);
        if (res.code === 200) {
          Message.success("角色新增成功");
          this.ruleForm = {};
          this.getTableList();
        }
      } catch (e) {
        console.log(e);
      }
    },
    //  修改角色信息
    async RoleUpate(data) {
      try {
        const res = await Role.update(data);
        if (res.code === 200) {
          Message.success("角色修改成功");
          this.getTableList();
          this.ruleForm = {};
        }
      } catch (e) {
        console.log(e);
      }
    },
  },

  created() {
    this.getTableList();
  },
};
</script>

<style></style>
