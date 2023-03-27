<template>
  <!-- Table -->
  <div>
    <!-- 驾驶人员书 -->
    <el-form v-model="formInline"  :inline="true">
        <el-form-item label="姓名" prop="name">
          <el-input v-model.trim="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="人员状态" prop="region">
          <el-select v-model.trim="formInline.region" placeholder="人员类别">
            <el-option label="保洁" value="保洁"></el-option>
            <el-option label="维修" value="维修"></el-option>
            <el-option label="管理" value="管理"></el-option>
            <el-option label="服务保障" value="服务保障"></el-option>
            <el-option label="场地维护" value="场地维护"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="培训状态" prop="region">
          <el-select v-model.trim="formInline.region" placeholder="培训状态">
            <el-option label="已通过" value="已通过"></el-option>
            <el-option label="待培训" value="待培训"></el-option>
            <el-option label="不通过" value="不通过"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="驾驶状态" prop="region">
          <el-select v-model.trim="formInline.region" placeholder="驾驶状态">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="可驾驶" value="可驾驶"></el-option>
            <el-option label="不可驾驶" value="不可驾驶"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="准驾车型" prop="region">
          <el-select v-model.trim="formInline.region" placeholder="人员类别">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="A1" value="A1"></el-option>
            <el-option label="A2" value="A2"></el-option>
            <el-option label="A3" value="A3"></el-option>
            <el-option label="B1" value="B1"></el-option>
            <el-option label="B2" value="B2"></el-option>
            <el-option label="C1" value="C1"></el-option>
            <el-option label="C2" value="C2"></el-option>
            <el-option label="C3" value="C  3"></el-option>
            <el-option label="C4" value="C4"></el-option>
            <el-option label="C5" value="C5"></el-option>
            <el-option label="D" value="D"></el-option>
            <el-option label="E" value="E"></el-option>
            <el-option label="F" value="F"></el-option>
            <el-option label="M" value="M"></el-option>
            <el-option label="N" value="N"></el-option>
            <el-option label="P" value="P"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSerch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSuReg">重置</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary" @click="onSubAdd">新增</el-button>
        </el-form-item>
      </el-form>
    <!-- 表单数据 -->
    <commonTable :table-data="tableData" :page-obj="pageObj" :colum-obj="columObj" @rowOperation="rowOperation"></commonTable>
    <!-- Form -->
    <el-button type="button" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">

    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import commonTable from '@/components/common-table/index.vue'
export default {
  components:{commonTable},
  data() {
    return {
      dialogFormVisible: false,
      formInline:{},
      ruleForm: {
        name: "",
        tel: undefined,
        region: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        tel: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        region: [{ required: true, message: "请选择活动区域", trigger: "change" }],
      },
      formLabelWidth: "120px",
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
          cage: 11,
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
            width: "380",
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
                label: "查看",
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
      pageObj:{
        total:10
      }
    };
  },
  methods:{
    submitForm(fromName){
      console.log(fromName);
      this.$refs[fromName].validate().then(res=>{
        if(res){
          console.log(this.ruleForm);
          Message.success('添加成功')
          this.dialogFormVisible=false
        }
      })
    },
    resetForm(fromName){
      this.$refs[fromName].resetFields()
      this.dialogFormVisible=false
    },
    onSuReg(){},
    onSerch(){},
    onSubAdd(){}
  }
};
</script>
