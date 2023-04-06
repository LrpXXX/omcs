<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="固设名称" prop="equipmentName" class="first-input">
        <el-input v-model.trim="formInline.equipmentName"></el-input>
      </el-form-item>
      <el-form-item label="场地状态" prop="equipmentState">
        <el-select v-model.trim="formInline.equipmentState" placeholder="场地状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="禁用" value="0"></el-option>
          <el-option label="启用" value="1"></el-option>
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
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="固设名称" prop="equipmentName">
          <el-input v-model="ruleForm.equipmentName" placeholder="请输入固设名称"></el-input>
        </el-form-item>
        <el-form-item label="计费模式" prop="billingMode">
          <el-select v-model="ruleForm.billingMode">
            <el-option label="时长" value="时长"></el-option>
            <el-option label="次数" value="次数"></el-option>
            <el-option label="里程" value="里程"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计费单价" prop="unitPrice">
          <el-input v-model="ruleForm.unitPrice" placeholder="请输入计费单价"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import commonTable from "@/components/common-table/index.vue";
import fixedService from '@/service/api/config/fixed';
import { isNumber } from '@/common/is';
export default {
  components: { commonTable },
  data() {
    return {
      openVisle:false,
      formInline: {},
      ruleForm:{},
      rules:{
        title:[{ required: true, message: "请输入固设名称", trigger: "blur" }],
        main:[{ required: true, message: "请选择计费模式", trigger: "change" }],
        price:[[{ required: true, message: "请输入计费单价", trigger: "blur" }]]
      },
      tableData: [],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "equipmentName",
            label: "固设名称",
            align: "center",
          },
          {
            text: true,
            prop: "billingMode",
            label: "计费模式",
            align: "center",
          },
          {
            label: "计费单价",
            align: "center",
            ownDefined: true,
            ownDefinedReturn: (row, $index) => {
              let unit = this.priceMap.get(row.billingMode);
              return row.unitPrice + unit;
            },
          },
          {
            label: "状态",
            align: "center",
            ownDefined: true,
            ownDefinedReturn: (row, $index) => {
              return row.equipmentState==0?"禁用":"启用";
            },
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
                operation: "forbidden",
                type: "text",
                label: "禁用",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.equipmentState === 1;
                },
              },
              {
                operation: "enable",
                type: "text",
                label: "启用",
                icon: "",
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return row.equipmentState === 0;
                },
              },
            ],
          },
        ],
      },
      priceMap: {},
      pageObj: {
        total: 10,
      },
      condition: []
    };
  },
  created(){
    this.initFixed();
    this.priceMap = new Map();
    this.priceMap.set("时长", "元/小时");
    this.priceMap.set("里程", "元/km");
    this.priceMap.set("次数", "元/次");
  },
  methods: {
    initFixed(condition) {
      let parmary = {
        pageNum: this.pageObj.pageIndex,
        pageSize: this.pageObj.pageSize,
        condition: JSON.stringify(condition)
      };
      fixedService
        .getFixedByPage(parmary)
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
      if(this.formInline.equipmentName != undefined && this.formInline.equipmentName != ""){
        let title = {
          column: "equipment_name",
          type: "like",
          value: this.formInline.equipmentName
        }
        this.condition.push(title);
      }
      if(this.formInline.equipmentState != undefined && this.formInline.equipmentState != "" && this.formInline.equipmentState != "全部"){
        let state = {
          column: "equipment_state",
          type: "eq",
          value: this.formInline.equipmentState
        }
        this.condition.push(state);
      }
      this.initFixed(this.condition);
      // 重置条件数组
      this.condition = [];
    },
    onSuReg() {
      this.formInline = {};
      this.initFixed();
    },
    onAdd() {
      this.openVisle = true;
    },
    closeHandle() {
      this.openVislb = false;
      // 关闭el-dialog,刷新表格
      this.initFixed();
    },
    /**打开编辑el-dialog */
    onEdit(row) {
      this.openVisle=true;
      this.ruleForm = row;
    },
    onForbbiden(row) {
      row.equipmentState = 0;
      fixedService.updateById(JSON.stringify(row))
      .then((res) => {
        if (res.code == 200){
          this.$message.success("禁用成功!");
        }
      }).catch((err) => {
        this.$message.error("系统故障");
      });
    },
    onEnable(row) {
      row.equipmentState = 1;
      fixedService.updateById(JSON.stringify(row))
      .then((res) => {
        if (res.code == 200){
          this.$message.success("启用成功!");
        }
      }).catch((err) => {
        this.$message.error("系统故障");
      });
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
      this.onSerch(1, e);ruleForm
    },
    /** */
    submitForm(formName){
      console.log(this.ruleForm);
      this.$refs[formName].validate().then(res=>{
        if(res){
          if(this.ruleForm.id===undefined || this.ruleForm.id === ""){
            this.ruleForm.equipmentState = 1;
            fixedService.add(JSON.stringify(this.ruleForm))
            .then((result) => {
              if (result.code == 200){
                this.$message.success("新增固设成功!");
                this.initFixed();
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message.error("系统故障!");
            });
            this.resetForm(formName);
          }else{
            fixedService.updateById(JSON.stringify(this.ruleForm))
            .then((result) => {
              if (result.code == 200){
                this.$message.success("编辑固设成功!");
                this.initFixed();
              }
            }).catch((err) => {
              console.log(err);
              this.$message.error("系统故障!");
            });
            this.resetForm(formName);
          }
          
          this.openVisle=false
        }
      })
    },
    resetForm(formName){
      // this.$refs[formName].resetFields();
      this.ruleForm  = {};
      this.openVisle = false;
    },
    rowOperation(row,$index,now){
      switch (now) {
        case 'editOpen':
          this.onEdit(row);
          break;
        case 'forbidden':
          this.onForbbiden(row);
          break;
        case 'enable':
          this.onEnable(row);
          break;
        default:
          break;
      }
    }
  },
};
</script>

<style>
  .first-input {
    margin-left: 20px;
  }
</style>

