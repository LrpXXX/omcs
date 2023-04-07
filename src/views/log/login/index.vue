<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="用户名称" prop="name" class="first-input">
        <el-input v-model.trim="formInline.name"></el-input>
      </el-form-item>
      <el-form-item label="登录方式" prop="method">
        <el-select v-model.trim="formInline.method" placeholder="请选择">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="pc" value="0"></el-option>
          <el-option label="小程序" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="登录时间">
        <el-date-picker v-model="formInline.loginTime" type="date" placeholder="请选择"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSerch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSuReg">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表单列表 -->
    <commonTable :table-data="tableData" :colum-obj="columObj" :page-obj="pageObj"></commonTable>
  </div>
</template>

<script>
import commonTable from "@/components/common-table/index.vue";
import loginService from '@/service/api/log/login';
import { isNumber } from '@/common/is';
export default {
  components: { commonTable },
  data() {
    return {
      formInline: {},
      tableData: [],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "name",
            label: "用户名称",
            align: "center",
          },
          {
            text: true,
            prop: "account",
            label: "登录账号",
            align: "center",
          },
          {
            text: true,
            prop: "loginIp",
            label: "IP地址",
            align: "center",
          },
           {
            text: true,
            prop: "loginTime",
            label: "登录时间",
            align: "center",
          },
           {
            text: true,
            prop: "method",
            label: "登录方式",
            align: "center",
          },
           {
            text: true,
            prop: "loginSystem",
            label: "登录系统",
            align: "center",
          },
           {
            text: true,
            prop: "logoutTime",
            label: "退出时间",
            align: "center",
          },
        ],
      },
      pageObj: {
        total: 10,
      },
      condition: []
    };
  },
  created(){
    this.initLoginLog();
  },
  methods: {
    initLoginLog(condition) {
      let parmary = {
        pageNum: this.pageObj.pageIndex,
        pageSize: this.pageObj.pageSize,
        condition: JSON.stringify(condition)
      };
      loginService
        .getLogByPage(parmary)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.tableData = res.data.records;
            this.pageObj = {
              pageIndex: res.data.current,
              pageSize: res.data.size,
              total: res.data.total,
            };
          } else {
            this.$message.error("系统故障!");
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    onSerch(pageIndex, pageSize) {
      if (!isNumber(pageIndex)) {
        // 防止出现有数据却查的第二页导致没数据的情况
        this.pageObj.pageIndex = 1;
      }
      if(this.formInline.name != undefined && this.formInline.name != ""){
        let name = {
          column: "name",
          type: "like",
          value: this.formInline.name
        }
        this.condition.push(name);
      }
      if(this.formInline.method != undefined && this.formInline.method != "" && this.formInline.method != "全部"){
        let method = {
          column: "method",
          type: "eq",
          value: this.formInline.method
        }
        this.condition.push(method);
      }
      if(this.formInline.loginTime != undefined && this.formInline.loginTime != ""){
        let loginTime = {
          column: "login_time",
          type: "ge",
          value: this.formInline.loginTime
        }
        this.condition.push(loginTime);
      }
      this.initLoginLog(this.condition);
      // 重置条件数组
      this.condition = [];
    },
    onSuReg() {
      this.formInline = {};
      this.initLoginLog();
    },
    //页码变化
    handleCurrentChange(e) {
      this.pageObj.pageIndex = e;
      this.onSerch(e);
    },
    //条数变化
    handleSizeChange(e) {
      this.pageObj.pageSize = e;
      this.pageObj.pageIndex = 1;
      this.onSerch(1, e);
    }
  },
};
</script>

<style>
  .first-input {
    margin-left: 20px;
  }
</style>

