<template>
  <div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="预约单号">
          <el-input v-model="formInline.fuid" placeholder="预约单号"></el-input>
        </el-form-item>
        <el-form-item label="车辆VIM">
          <el-input v-model="formInline.vim" placeholder="车辆VIM"></el-input>
        </el-form-item>
        <el-form-item label="底盘号">
          <el-input v-model="formInline.carcode" placeholder="底盘号"></el-input>
        </el-form-item>
        <el-form-item label="预约状态">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="待受理" value="souli"></el-option>
            <el-option label="待送样" value="songyang"></el-option>
            <el-option label="待发卡" value="faka"></el-option>
            <el-option label="实验中" value="shiyan"></el-option>
            <el-option label="已完成" value="suss"></el-option>
            <el-option label="已取消" value="exit"></el-option>
            <el-option label="已驳回" value="bohui"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="formInline.name" placeholder="客户名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSuReg">重置</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <commonTable
      :tableData="tableDataWach"
      :columObj="columObj"
      :pageObj="pageObj"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></commonTable>
  </div>
</template>

<script>
import commonTable from "@/components/common-table";
export default {
  components: { commonTable },
  data() {
    return {
      tableData: [
        {
          id: "1",
          name: "张三",
          tel: "1536288040",
          card: "5003",
          cage: 10,
          cartype: "C1",
          aeng: "待审核",
          cam: "试验场",
          px: "代培训",
          yxsj: "2022.10.05",
          jszt: "不可驾驶",
          jsdj: "",
          cdfj: "12",
        },
        {
          id: "2",
          name: "李四",
          tel: "1536288140",
          card: "5023",
          cage: 2,
          cartype: "C2",
          aeng: "未通过",
          cam: "柳汽",
          px: "通过",
          yxsj: "2022.10.05",
          jszt: "可驾驶",
          jsdj: "一级",
          cdfj: "12",
        },
        {
          id: "3",
          name: "王五",
          tel: "1536288240",
          card: "5033",
          cage: 1,
          cartype: "B1",
          aeng: "已通过",
          cam: "长安",
          px: "不通过",
          yxsj: "2022.10.05",
          jszt: "不可驾驶",
          jsdj: "",
          cdfj: "",
        },
        {
          id: "4",
          name: "赵六",
          tel: "1536288840",
          card: "5043",
          cage: 8,
          cartype: "A1",
          aeng: "已冻结",
          cam: "东风",
          px: "代培训",
          yxsj: "2022.10.05",
          jszt: "不可驾驶",
          jsdj: "",
          cdfj: "",
        },
      ],
      columObj: {
        //column列,columType(列类型,可选text(默认为普通文字模式),input(input可编辑框),switch(switch开关),image(图片),operation(操作按钮))
        //prop(参数),label(列名),width(宽度),align(对齐方式),sortable(是否支持排序)
        columnData: [
          {
            text: true,
            prop: "id",
            editRow: undefined,
            label: "ID",
            width: "",
            align: "center",
          },
          {
            text: true,
            prop: "name",
            label: "姓名",
            width: "",
            align: "center",
            editRow: undefined,
          },
          {
            text: true,
            prop: "tel",
            label: "联系电话",
            width: "",
            align: "center",
          },
          {
            text: true,
            prop: "card",
            label: "身份证号码",
            width: "",
            align: "center",
          },
          {
            text: true,
            prop: "cage",
            label: "驾驶年龄",
            width: "",
            align: "center",
          },
          {
            text: true,
            editRow: undefined,
            prop: "cartype",
            label: "准驾车型",
            width: "",
            align: "center",
          },
          {
            text: true,
            editRow: undefined,
            prop: "aeng",
            label: "人员状态",
            width: "",
            align: "center",
          },
          {
            text: true,
            editRow: undefined,
            prop: "cam",
            label: "人员所属",
            width: "",
            align: "center",
          },
          {
            text: true,
            editRow: undefined,
            prop: "px",
            label: "培训状态",
            width: "",
            align: "center",
          },
          {
            text: true,
            editRow: undefined,
            prop: "yxsj",
            label: "培训有效期",
            width: "",
            align: "center",
          },
          {
            text: true,
            editRow: undefined,
            prop: "jszt",
            label: "驾驶状态",
            width: "",
            align: "center",
          },
          {
            text: true,
            editRow: undefined,
            prop: "yxsj",
            label: "驾驶等级",
            width: "",
            align: "center",
          },
          {
            text: true,
            editRow: undefined,
            prop: "cdfj",
            label: "场地分数",
            width: "",
            align: "center",
          },
          //如果为操作列,则需要填写需要的操作按钮,类型为Object。operation(操作类型,可选edit,delete,see),type(按钮样式,参考el—botton类型),label(按钮文字)icon(参考el-icon),color(字体颜色)
          {
            isOperation: true,
            fixed: "right",
            label: "操作",
            width: "480",
            align: "center",
            sortable: false,
            operation: [
              {
                operation: "edit",
                type: "text",
                label: "完善信息",
                icon: "",
                // color: "red",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
              {
                operation: "edit",
                type: "text",
                label: "编辑",
                // color: "red",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  console.log(row, $index);
                  return true;
                },
              },
              {
                operation: "edit",
                type: "text",
                label: "审核",
                icon: "",
                // color: "red",
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
              {
                operation: "see",
                type: "text",
                label: "查看",
                icon: "",
                color: "",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true;
                },
              },
            ],
          },
        ],
      },
      pageObj: {
        position: "right", //分页组件位置
        total: 100,
        pageIndex: 1,
        pageSize: 10,
      },
      formInline: {
        fuid: "",
        region: "",
      },
    };
  },
  computed:{
    tableDataWach(){
      return this.tableData
    }
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    // 添加数据
    onSubAdd() {
      this.$router.push("/system/userInfo");
    },
    // 重置搜索框
    onSuReg(){

    },
    rowOperation(row, $index, now) {
      switch (now) {
        case "see":
          break;
        case "edit":
        this.$router.push('/system/userInfo')
          break;
        case "delete":
          this.tableData=this.tableData.filter(item=>item.id!==row.id)
          break;
        default:
          break;
      }
      console.log(row, $index, now);
    },
    // 点击行
    rowClick(row, column, event) {
      this.$emit("rowClick", row, column, event);
    },
    // 条数变化
    handleSizeChange(e) {
      this.$emit("handleSizeChange", e);
    },
    // 页码变化
    handleCurrentChange(e) {
      this.$emit("handleCurrentChange", e);
    },
  },

};
</script>

<style lang="scss">
.search {
  margin: 10px auto;
  white-space:nowrap;
}
</style>
