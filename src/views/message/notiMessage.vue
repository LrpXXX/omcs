<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="标题" prop="rfid">
        <el-input v-model.trim="formInline.rfid"></el-input>
      </el-form-item>
      <el-form-item label="时间" >
        <el-col :span="11">
          <el-date-picker type="date" placeholder="开始时间" v-model="formInline.date1" style="width: 100%"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="结束时间" v-model="formInline.date2" style="width: 100%"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSerch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSuReg">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表单列 -->
    <common-table :table-data="tableData" :page-obj="pageObj" :colum-obj="columObj"></common-table>
  </div>
</template>

<script>
import commonTable from "@/components/common-table/index.vue";
export default {
  components: { commonTable },
  data() {
    return {
      formInline: {},
      pageObj: {},
      tableData: [{id:1,time:"2020-09-28 15:30:14",type:'预约通知',main:`预约申请被驳回,预约单号XXXXXXXXXXX`}],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "time",
            label: "时间",
            width: "300",
            align: "center",
          },
          {
            text: true,
            prop: "type",
            label: "类型",
            width: "200",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "内容",
            align: "center",
          },
        ],
      },
    };
  },
  methods: {
    onSerch() {},
    onSuReg() {},
  },
};
</script>

<style></style>
