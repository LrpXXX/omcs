<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="协议名称" prop="rfid">
        <el-input v-model.trim="formInline.rfid" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="" prop="desc">
        <el-input v-model.trim="formInline.desc" placeholder="请输入关键字"></el-input>
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
    <!-- 表单列 -->
    <common-table :table-data="tableData" :colum-obj="columObj" :page-obj="pageObj"></common-table>
    <el-dialog title="编辑协议" :visible.sync="openVislb">
        <el-card>
            <message></message>
        </el-card>
    </el-dialog>
  </div>
</template>

<script>
import message from "@/views/message/components/message.vue"
import commonTable from "@/components/common-table/index.vue";
export default {
  components: { commonTable, message },
  data() {
    return {
      openVislb: false,
      formInline: {},
      columObj: {
        columnData: [
          {
            text: true,
            prop: "title",
            label: "协议名称",
            width:"240",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "协议内容",
            align: "center",
          },
          {
            text: true,
            prop: "type",
            label: "状态",
            width:"240",
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
                label: "发布",
                // color: "red",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.ffzt === "待发布";
                },
              },
              {
                operation: "see",
                type: "text",
                label: "编辑",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                operation: "delete",
                type: "text",
                label: "删除",
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
      tableData: [
        { id: 1, title: "安全协议", main: "协议一式两份,协议双方各执一份,具有同等效力。 甲方: 年月日 乙方: 年月日 2023年保密协议承诺书(精)三 甲方: 乙方: 根据国家有关法律法规,本着平等、自愿...协议一式两份,协议双方各执一份,具有同等效力。 甲方: 年月日 乙方: 年月日 2023年保密协议承诺书(精)三 甲方: 乙方: 根据国家有关法律法规,本着平等、自愿...", type: "待发布" },
        { id: 2, title: "保密协议", main: "协议一式两份,协议双方各执一份,具有同等效力。 甲方: 年月日 乙方: 年月日 2023年保密协议承诺书(精)三 甲方: 乙方: 根据国家有关法律法规,本着平等、自愿...协议一式两份,协议双方各执一份,具有同等效力。 甲方: 年月日 乙方: 年月日 2023年保密协议承诺书(精)三 甲方: 乙方: 根据国家有关法律法规,本着平等、自愿...", type: "已发布" },
      ],
      pageObj: {
        total: 20,
      },
    };
  },
  methods: {
    onSerch() {},
    onSuReg() {},
    onAdd() {
      this.openVislb = true;
    },
  },
};
</script>

<style></style>
