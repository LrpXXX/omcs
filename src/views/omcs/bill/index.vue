<template>
  <div>
    <!-- 账单管理搜索框 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="姓名" prop="title" class="first-input">
        <el-input v-model.trim="formInline.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="title" class="phone">
        <el-input v-model.trim="formInline.phone" placeholder="请输入标题"></el-input>
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
        <el-button type="primary">导出</el-button>
        <el-button type="primary" @click="onAdd">新增合并账单</el-button>
      </el-form-item>
    </el-form>
    <commonTable
      :tableData="tableData"
      :columObj="columObj"
      :pageObj="pageObj"
      @rowOperation="rowOperation"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></commonTable>
    <el-dialog title="新增合并账单" :visible.sync="openVisible" width="80vw">
      <!-- 关闭dialog弹窗 -->
      <edit @onSerch="onserche" @closeDialog="closeHandle"></edit>
    </el-dialog>
    <el-dialog :visible.sync="seeVisible">
      <eidt-name  @closeSeeDialog="closeSee"></eidt-name>
  </el-dialog>
  </div>
</template>

<script>
import commonTable from "@/components/common-table";
import edit from "@/views/omcs/bill/components/edit.vue";
import seeTable  from "@/views/omcs/bill/components/seeTable.vue"
export default {
  components: {
    commonTable,
    edit,
    'eidt-name':seeTable
  },
  data() {
    return {
      formInline: {},
      pageObj: {
        total: 10,
        pageIndex: 1,
        pageSize: 10,
      },
      tableData: [
        { id: 1, title: "射门东西", main: "xcxcxzc", isState: "8000" },
        { id: 2, title: "射门东西", main: "xcxcxzc", isState: "8000" },
      ],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "title",
            label: "账单号",
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
            label: "关联预约单数量",
            width: "80",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "起止时间",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "场地使用费（元）",
            width: "150",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "固定设备使用费（元）",
            width: "180",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "停车费（元）",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "其他费用（元）",
            width: "150",
            align: "center",
          },
          {
            text: true,
            prop: "isState",
            label: "费用合计（元）",
            width: "240",
            align: "center",
          },
          {
            isOperation: true,
            fixed: "right",
            label: "操作",
            width: "200",
            align: "center",
            sortable: false,
            operation: [
              {
                operation: "editOpen",
                type: "text",
                label: "查看",
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
      openVisible: false,
      seeVisible: false,
    };
  },
  methods: {
    rowOperation(row, $index, now) {
      switch (now) {
        case "editOpen":
          this.seeVisible = true;
          break;

        default:
          break;
      }
    },
    handleSizeChange(e) {
      console.log(e);
      this.$set(this.pageObj, "pageSize", e);
    },
    handleCurrentChange(e) {
      console.log(e);
      this.$set(this.pageObj, "pageIndex", e);
    },
    onserche(pageNum = 1, pageSize = 10) {
      console.log(pageNum, pageSize, "子组件调用二零嘛");
    },
    onAdd() {
      this.openVisible = true;
    },
    onSuReg() {},
    onSerch() {},
    closeHandle() {
      this.openVisible = false;
    },
    closeSee() {
      this.seeVisible = false;
    },
  },
};
</script>

<style scoped lang="scss">
.editForm {
  width: 80vw;
}
</style>
