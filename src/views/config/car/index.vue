<template>
  <div>
    <!-- 顶部搜索栏 -->
    <el-form :model="formInline" :inline="true">
      <el-form-item label="类型名称" prop="driverQualification" class="first-input">
        <el-input v-model.trim="formInline.driverQualification"></el-input>
      </el-form-item>
      <el-form-item label="车辆状态" prop="ruleState">
        <el-select v-model.trim="formInline.ruleState" placeholder="请选择">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="禁用" value="0"></el-option>
          <el-option label="启用" value="2"></el-option>
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
    <commonTable :pageObj="pageObj" :tableData="tableData" :columObj="columObj" @rowOperation="rowOperation" />
    <!-- 新增/编辑表单数据 -->
    <el-dialog title="编辑/添加车辆类型" :visible.sync="openVisle" >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="类型名称" prop="driverQualification">
          <el-input v-model="ruleForm.driverQualification" placeholder="请输入类型名称"></el-input>
        </el-form-item>
        <el-form-item label="准驾车型"  prop="vehicleType">
          <el-select v-model.trim="ruleForm.vehicleType" multiple placeholder="请选择准驾车型" >
              <el-option :key="item.id" :label="item.codeText" :value="item.codeValue" v-for="item in carTypeOptions" ></el-option>
          </el-select>
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
import carService from '@/service/api/config/car';
import sysCodeService from '@/service/api/sys/sysCode';
import { isNumber } from '@/common/is';
import tools from '@/service/zdk/tools';
export default {
  components: { commonTable },
  data() {
    return {
      formInline: {},
      openVisle: false,
      ruleForm: {},
      submitFormEntity: {},
      tempCodeValueStr: "",
      textValueMap: "",
      rules: {
        driverQualification:[{requried:true,message:'请填写车辆类型名称',tigger:'blur'}],
        vehicleType:[{requried:true,type:'array',message:'请选择准驾类型',tigger:'change'}]
      },
      tableData: [],
      columObj: {
        columnData: [
          {
            text: true,
            prop: "driverQualification",
            label: "类型名称",
            align: "center",
          },
          {
            text: true,
            prop: "vehicleType",
            label: "准驾车型",
            align: "center",
          },
          {
            label: "状态",
            align: "center",
            ownDefined: true,
            ownDefinedReturn: (row, $index) => {
              return row.ruleState===0?"未启用":"已启用";
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
                  return row.ruleState === 2;
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
                  return row.ruleState === 0;
                },
              },
            ],
          },
        ],
      },
      pageObj: {
        total: 10,
      },
      carTypeOptions: [],
      condition: []
    };
  },
  created() {
    this.initCarTypeOptions();
    this.initCar();
  },
  methods: {
    /**初始化字典转化map */
    initTextValueMap() {
      let codeMap = new Map();
      for (let index = 0; index < this.carTypeOptions.length; index++) {
          const element = this.carTypeOptions[index];
          codeMap.set(element.codeText, element.codeValue);
      }
      this.textValueMap = codeMap;
    },
    /**初始化准驾车型下拉框对应数据 */
    initCarTypeOptions() {
      sysCodeService.selectCodeTextByCodeValue("ZJCX")
      .then((res) => {
        if (res.code == 200){
          this.carTypeOptions = res.data;
          this.initTextValueMap();
        }
      }).catch((err) => {

      });
    },
    /**初始化表格数据 */
    initCar(condition) {
      let parmary = {
        pageNum: this.pageObj.pageIndex,
        pageSize: this.pageObj.pageSize,
        condition: JSON.stringify(condition)
      };
      carService
        .getCarByPage(parmary)
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
      if(this.formInline.driverQualification != undefined && this.formInline.driverQualification != ""){
        let title = {
          column: "driver_qualification",
          type: "like",
          value: this.formInline.driverQualification
        }
        this.condition.push(title);
      }
      if(this.formInline.ruleState != undefined && this.formInline.ruleState != "" && this.formInline.ruleState != "全部"){
        let state = {
          column: "rule_state",
          type: "eq",
          value: this.formInline.ruleState
        }
        this.condition.push(state);
      }
      this.initCar(this.condition);
      // 重置条件数组
      this.condition = [];
    },
    onSuReg() {
      this.formInline = {};
      this.initCar();
    },
    onAdd() {
      this.openVisle = true;
    },
    /**打开编辑el-dialog */
    onEdit(row) {
      this.openVisle=true;
      this.ruleForm = tools.deepClone(row);
      this.ruleForm.vehicleType = this.ruleForm.vehicleType==undefined?[]:this.ruleForm.vehicleType.split(",");
      if (this.ruleForm.vehicleType.length > 0){
        let array = this.ruleForm.vehicleType;
        for (let index = 0; index < array.length; index++) {
          array[index] = this.textValueMap.get(array[index]);
        }
        this.ruleForm.vehicleType = array;
      }
      console.log(this.ruleForm.vehicleType);
    },
    onForbbiden(row) {
      row.ruleState = 0;
      let data = {
        id: row.id,
        ruleState: row.ruleState
      };
      carService.updateById(JSON.stringify(data))
      .then((res) => {
        if (res.code == 200){
          this.$message.success("禁用成功!");
        }
      }).catch((err) => {
        this.$message.error("系统故障");
      });
    },
    onEnable(row) {
      row.ruleState = 2;
      let data = {
        id: row.id,
        ruleState: row.ruleState
      };
      carService.updateById(JSON.stringify(data))
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
      this.onSerch(1, e);
    },
    /** */
    submitForm(formName){
      console.log(this.ruleForm);
      this.$refs[formName].validate().then(res=>{
        if(res){
          this.submitFormEntity = tools.deepClone(this.ruleForm);
          this.submitFormEntity.vehicleType = tools.array2String(this.ruleForm.vehicleType, ",");
          if(this.submitFormEntity.id===undefined || this.submitFormEntity.id === ""){
            this.submitFormEntity.ruleState = 2;
            carService.add(JSON.stringify(this.submitFormEntity))
            .then((result) => {
              if (result.code == 200){
                this.$message.success("新增车辆类型成功!");
                this.initCar();
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message.error("系统故障!");
            });
            this.resetForm(formName);
          }else{
            carService.updateById(JSON.stringify(this.submitFormEntity))
            .then((result) => {
              if (result.code == 200){
                this.$message.success("编辑车辆类型成功!");
                this.initCar();
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
      this.submitFormEntity = {};
      this.openVisle = false;
      this.tempCodeValueStr = "";
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
