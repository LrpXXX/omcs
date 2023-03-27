<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="标题" prop="rfid">
        <el-input v-model.trim="formInline.rfid"></el-input>
      </el-form-item>
      <el-form-item label="发放状态" prop="ffzt">
        <el-select v-model.trim="formInline.ffzt" placeholder="发放状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已发放" value="已发放"></el-option>
          <el-option label="未发放" value="未发放"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间" prop="time">
        <el-date-picker v-model="formInline.time" type="date" placeholder="选择日期"></el-date-picker>
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
      <TreList/>
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
export default {
  components: { commonTale, TreList },
  data() {
    return {
      formInline: {},
      tableData: [
        {
          id: 1,
          title: "升级系统维护通知",
          main: "为了向您提供稳定和更优质的服务，我们计划在2018年6月29日0点—2点",
          time: "2015-09-27 14:30:21",
          system: "admin",
          ffzt: "草稿",
        },
        {
          id: 2,
          title: "升级系统维护通知",
          main: "为了向您提供稳定和更优质的服务，我们计划在2018年6月29日0点—2点",
          time: "2015-09-27 14:30:21",
          system: "admin",
          ffzt: "已发布",
        },
      ],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "title",
            label: "角色名称",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "角色描述",
            align: "center",
          },
          {
            text: true,
            prop: "time",
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
                  return true;
                },
              },
              {
                operation: "see",
                type: "text",
                label: "启用",
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
      openTree: false,
      pageObj: {
        total: 20,
      },
      saveVisble:false,
      ruleForm:{},
      rules:{
        roleName:[{required:true,message:'请输入角色名称',tigger:'blur'}],
        roleDesc:[{required:true,message:'请输入角色名称',tigger:'blur'}],
        roleType:[{required:true,message:'请选择状态',tigger:'change'}]
      }
    };
  },
  methods: {
    rowOperation(row, $index, now) {
      switch (now) {
        case "editClose":
          this.openTree = true;
          break;
        case 'editOpen':
          this.saveVisble=true
          break
          case 'see':
            this.$router.push('/auth/system')
            break;
        default:
          break;
      }
    },
    onSerch() {},
    onSuReg() {},
    onAdd() {
      this.saveVisble=true
    },
    submitForm(fromName){
      this.$refs[fromName].validate().then(valid=>{
        if(valid){
          this.saveVisble=false
        }
      })
    },
    resetForm(fromName){
      this.$refs[fromName].resetField()
      this.saveVisble=false
    }
  },
};
</script>

<style></style>
