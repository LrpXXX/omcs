<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="类型名称" prop="ffzt">
        <el-select v-model.trim="formInline.ffzt" placeholder="发放状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已发放" value="已发放"></el-option>
          <el-option label="未发放" value="未发放"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请输入关键字" prop="rfid">
        <el-input v-model.trim="formInline.rfid"></el-input>
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
    <commonTable :pageObj="pageObj" :tableData="tabelData" :columObj="columObj" @rowOperation="rowOperation" />
    <!-- 新增/编辑表单数据 -->
    <el-dialog title="编辑/添加车辆数据" :visible.sync="openVisble" >
      <el-form :model="rulFrom" :rules="rules" ref="rulFrom" label-width="100px">
        <el-form-item label="类型名称" prop="title">
          <el-input v-model="rulFrom.title" placeholder="请输入类型名称"></el-input>
        </el-form-item>
        <el-form-item label="活动性质" prop="main">
          <el-checkbox-group v-model="rulFrom.main">
            <el-checkbox label="美食/餐厅线上活动" ></el-checkbox>
            <el-checkbox label="地推活动" ></el-checkbox>
            <el-checkbox label="线下主题活动" ></el-checkbox>
            <el-checkbox label="单纯品牌曝光"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('rulFrom')">确定</el-button>
          <el-button @click="resetForm('rulFrom')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import commonTable from "@/components/common-table/index.vue";
export default {
  components: { commonTable },
  data() {
    return {
      formInline: {},
      openVisble: false,
      rulFrom: {
        title:'',
        main:[]
      },
      rules: {
        title:[{requried:true,message:'请填写车辆类型名称',tigger:'blur'}],
        main:[{requried:true,type:'array',message:'请选择准驾类型',tigger:'change'}]
      },
      tabelData: [
        { id: 1, title: "M1", main: ["A1"].toString(), time: "禁用" },
        { id: 2, title: "M2", main: ["A2", "A3"].toString(), time: "启用" },
        { id: 3, title: "O1", main: ["A1"].toString(), time: "启用" },
        { id: 4, title: "O2", main: ["C1", "C2", "C3", "C4", "C5"].toString(), time: "禁用" },
        { id: 5, title: "N1", main: ["B1", "B2"].toString(), time: "禁用" },
      ],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "title",
            label: "类型名称",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "准驾车型",
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
                operation: "delet",
                type: "text",
                label: "禁用",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.time === "禁用";
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
                  return row.time === "启用";
                },
              },
            ],
          },
        ],
      },
      pageObj: {
        total: 10,
      },
    };
  },
  methods: {
    onSerch() {},
    onSuReg() {},
    onAdd() {
      this.openVisble = true;
    },
    rowOperation(now, $index, row) {
      switch (row) {
        case "editOpen":
          this.openVisble = true;
          break;
        default:
          break;
      }
    },
    submitForm(fromName){
      this.$refs[fromName].validate().then(res=>{
        if(res){
          this.openVisble=false
          this.$refs[fromName].clearValidate()
        }
      })
    },
    resetForm(fromName){
      this.$refs[fromName].resetFields()
      this.openVisble=false
    }
  },
};
</script>

<style></style>
‘
