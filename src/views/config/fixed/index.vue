<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="固设名称" prop="rfid">
        <el-input v-model.trim="formInline.rfid"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="ffzt">
        <el-select v-model.trim="formInline.ffzt" placeholder="发放状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="禁用" value="禁用"></el-option>
          <el-option label="启用" value="启用"></el-option>
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
    <!-- 表单列表 -->
    <commonTable :table-data="tableData" :colum-obj="columObj" :page-obj="pageObj" @rowOperation="rowOperation" ></commonTable>
    <!-- 新增/编辑页面 -->
    <el-dialog title="新增/编辑固设" :visible.sync="openVisle">
      <el-form :model="rulFrom" :rules="rules" ref="rulFrom" label-width="100px">
        <el-form-item label="固设名称" prop="title">
          <el-input v-model="rulFrom.title" placeholder="请输入固设名称"></el-input>
        </el-form-item>
        <el-form-item label="计费模式" prop="main">
          <el-select v-model="rulFrom.main">
            <el-option label="时长" value="时长"></el-option>
            <el-option label="次数" value="次数"></el-option>
            <el-option label="里程" value="里程"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计费单价" prop="price">
          <el-input v-model="rulFrom.price" placeholder="请输入计费单价"></el-input>
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
      openVisle:false,
      formInline: {},
      rulFrom:{},
      rules:{
        title:[{ required: true, message: "请输入固设名称", trigger: "blur" }],
        main:[{ required: true, message: "请选择计费模式", trigger: "change" }],
        price:[[{ required: true, message: "请输入计费单价", trigger: "blur" }]]
      },
      tableData: [
        { id: 1, title: "左边固定", main: "时间", time: "xx元/小时", type: "启用" },
        { id: 2, title: "左边固定", main: "时间", time: "xx元/km", type: "启用" },
        { id: 3, title: "左边固定", main: "时间", time: "xx元/次", type: "禁用" },
      ],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "title",
            label: "固设名称",
            align: "center",
          },
          {
            text: true,
            prop: "main",
            label: "计费模式",
            align: "center",
          },
          {
            text: true,
            prop: "time",
            label: "计费单价",
            align: "center",
          },
          {
            text: true,
            prop: "type",
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
                operation: "delete",
                type: "text",
                label: "禁用",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.type === "禁用";
                },
              },
              {
                operation: "delete",
                type: "text",
                label: "启用",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.type === "启用";
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
      this.openVisle=true
    },
    submitForm(formName){
      console.log(this.rulFrom);
      this.$refs[formName].validate().then(res=>{
        if(res){
          if(this.rulFrom.id===undefined){
            console.log('新增呀');
            this.rulFrom={}
          }else{
            console.log('没东西');
            this.rulFrom={}
          }
          
          this.openVisle=false
        }
      })
    },
    resetForm(fromName){
      this.$refs[fromName].resetFields()
      this.openVisle=false
    },
    rowOperation(row,$index,now){
      switch (now) {
        case 'editOpen':
          this.openVisle=true;
          this.rulFrom=JSON.parse(JSON.stringify(row))
          break;
        case 'delete':
          console.log(`这是${row.type}`);
          break;
        default:
          break;
      }
    }
  },
};
</script>

<style></style>
‘
