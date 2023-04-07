<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="姓名" prop="rfid">
        <el-input v-model.trim="formInline.rfid"></el-input>
      </el-form-item>
      <el-form-item label="用戶名" prop="rfid">
        <el-input v-model.trim="formInline.rfid"></el-input>
      </el-form-item>
      <el-form-item label="所属组织" prop="ffzt">
        <el-select v-model.trim="formInline.ffzt" placeholder="所属组织">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="启用" value="启用"></el-option>
          <el-option label="禁用" value="禁用"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属状态" prop="ffzt">
        <el-select v-model.trim="formInline.ffzt" placeholder="所属状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="启用" value="启用"></el-option>
          <el-option label="禁用" value="禁用"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="ffzt">
        <el-select v-model.trim="formInline.ffzt" placeholder="请选择">
          <el-option label="全部" value="全部"></el-option>
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
    <!-- 新增/编辑-->
    <el-dialog title="新增/编辑系统配置" :visible.sync="saveVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" enctype="multipart/form-data">
        <el-form-item label="姓名" prop="receivePerson">
          <el-input v-model="ruleForm.receivePerson" placeholder="填写还样人员"></el-input>
        </el-form-item>
        <el-form-item label="所属组织" prop="receiveContactNumber">
          <el-input v-model="ruleForm.receiveContactNumber" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="所属角色" prop="receiveIdentityNum">
          <el-input v-model="ruleForm.receiveIdentityNum" placeholder="请填写管理费率"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="destination">
          <el-input v-model="ruleForm.destination" placeholder="请填写税率"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="receiveTrailer">
          <el-input v-model="ruleForm.receiveTrailer"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="receiveTrailer">
          <el-input v-model="ruleForm.receiveTrailer"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="receiveTrailer">
          <el-input v-model="ruleForm.receiveTrailer"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="ffzt">
          <el-radio-group v-model="ruleForm.ffzt">
            <el-radio :label="3">是</el-radio>
            <el-radio :label="6">否</el-radio>
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
import {User} from "@/service/api/auth/user";
import {decryptData} from "@/service/zdk/dataDES";
export default {
  components: { commonTale },
  data() {
    return {
      saveVisible: false,
      formInline: {},
      tableData: [
        {
          id: 1,
          title: "admin",
          main: "为了向您提供稳定和更优质的服务，我们计划在2018年6月29日0点—2点",
          time: "2015-09-27 14:30:21",
          system: "admin",
          ffzt: "启用",
        },
        {
          id: 2,
          title: "rolea",
          main: "为了向您提供稳定和更优质的服务，我们计划在2018年6月29日0点—2点",
          time: "2015-09-27 14:30:21",
          system: "admin",
          ffzt: "禁用",
        },
      ],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "userName",
            label: "姓名",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "用户名",
            align: "center",
          },
          {
            text: true,
            prop: "time",
            label: "所属组织",
            align: "center",
          },
          {
            text: true,
            prop: "system",
            label: "所属角色",
            align: "center",
          },
          {
            text: true,
            prop: "tel",
            label: "联系电话",
            align: "center",
          },
          {
            text: true,
            prop: "emil",
            label: "邮箱",
            align: "center",
          },
          {
            text: true,
            prop: "ffzt",
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
                label: "启用",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.ffzt === "启用";
                },
              },
              {
                operation: "editOpen",
                type: "text",
                label: "禁用",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.ffzt === "禁用";
                },
              },
              {
                operation: "reset",
                type: "text",
                label: "重置密码",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
            ],
          },
        ],
      },
      ruleForm: {},
      rules: {},
      pageObj: {
        position:'right',
        total: 20,
      },
    };
  },
  methods: {
    onSerch() {},
    onSuReg() {},
    onAdd() {
      this.saveVisible = true;
    },
    // 操作列
    rowOperation(row,$index,now){
      switch (now) {
        case 'editOpen':
          this.saveVisible=true;
          this.ruleForm=JSON.parse(JSON.stringify(row))
          break;

        default:
          break;
      }
    },
    submitForm(fromName){
      this.saveVisible=false
    },
    resetForm(fromName){
      this.saveVisible=false
    },
  //  查询角色分页查询
    async getTableList(data){
      try {
        const  res=await  User.getList(data)
        console.log(res)
         const  data=decryptData(res)
        console.log(data)

      }catch (e) {
        console.log(e)
      }
    }
  },
  created() {
    this.getTableList()
  }
};
</script>

<style></style>
