<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="操作类型" prop="operateType" class="first-input">
        <el-select v-model.trim="formInline.operateType" placeholder="请选择">
          <el-option label="添加" value="添加"></el-option>
          <el-option label="编辑" value="编辑"></el-option>
          <el-option label="删除" value="删除"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作时间">
        <el-date-picker v-model="formInline.ts" type="date" placeholder="请选择"></el-date-picker>
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
import operateService from '@/service/api/log/operate'
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
            prop: "operatePerson",
            label: "操作人员",
            align: "center",
          },
          {
            text: true,
            prop: "operateAccount",
            label: "操作账号",
            align: "center",
          },
          {
            text: true,
            prop: "operateType",
            label: "操作类型",
            align: "center",
          },
          {
            text: true,
            prop: "operateContent",
            label: "操作内容",
            align: "center",
          },
          {
            text: true,
            prop: "ts",
            label: "操作时间",
            align: "center",
          }
        ],
      },
      pageObj: {
        total: 10,
      },
      condition: []
    };
  },
  created(){
    this.initOperate();
  },
  methods: {
    initOperate(condition) {
      let parmary = {
        pageNum: this.pageObj.pageIndex,
        pageSize: this.pageObj.pageSize,
        condition: JSON.stringify(condition)
      };
      operateService
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
      if(this.formInline.ts != undefined && this.formInline.ts != ""){
        let ts = {
          column: "ts",
          type: "ge",
          value: this.formInline.ts
        }
        this.condition.push(ts);
      }
      if(this.formInline.operateType != undefined && this.formInline.operateType != "" && this.formInline.operateType != "全部"){
        let operateType = {
          column: "operate_type",
          type: "eq",
          value: this.formInline.operateType
        }
        this.condition.push(operateType);
      }
      this.initOperate(this.condition);
      // 重置条件数组
      this.condition = [];
    },
    onSuReg() {
      this.formInline = {};
      this.initOperate();
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
    },
  },
};
</script>

<style>
  .first-input {
    margin-left: 20px;
  }
</style>

