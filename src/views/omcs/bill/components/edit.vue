<template>
  <div>
    <el-form :model="formInline" :inline="true">
      <el-form-item label="预约单号" prop="title" class="first-input">
        <el-input v-model.trim="formInline.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="客户名称" prop="title" class="phone">
        <el-input v-model.trim="formInline.phone" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="任务编号" prop="title" class="phone">
        <el-input v-model.trim="formInline.phone" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="发布状态" prop="publishState">
        <el-select v-model.trim="formInline.publishState" placeholder="发布状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已发布" value="1"></el-option>
          <el-option label="未发布" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSerch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSerch">重置</el-button>
      </el-form-item>
    </el-form>
    <commonTable :tableData="tableData" :pageObj="pageObj" :columObj="columObj" :key="tableData.id"></commonTable>
    <div class="flex-grop">
      <el-button type="primary" @click="mergin">确认合并</el-button>
      <el-button @click="mergin">取消</el-button>
    </div>
  </div>
</template>

<script>
import commonTable from "@/components/common-table";
export default {
  name: "edit",
  components: {
    commonTable,
  },
  data() {
    return {
      formInline: {},
      pageObj: {
        total: 10,
        pageSize: 10,
        pageIndex: 1,
      },
      tableData: [
        { id: 1, title: "射门东西", main: "xcxcxzc", isState: "8000" },
        { id: 2, title: "射门东西", main: "xcxcxzc", isState: "8000" },
      ],
      columObj: {
        selection:true,
        selectionData:[],
        columnData: [
          {
            text: true,
            prop: "title",
            label: "预约单号",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "客户名称",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "任务编号",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "车辆VIN/底盘号",
            width: "80",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "预约状态",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "预约时间",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "场地使用费",
            width: "150",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "固定设备使用费",
            width: "180",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "停车费",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "其他费用",
            width: "150",
            align: "center",
          },
          {
            text: true,
            prop: "isState",
            label: "费用合计",
            width: "240",
            align: "center",
          },
        ],
      },
    };
  },
  methods: {
    mergin() {
      this.$emit("closeDialog");
    },
    onSerch() {
      this.$emit("onserche",this.formInline);
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-grop {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
