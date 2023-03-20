<template>
  <!-- Table -->
  <div>
    直接没有数据了
    <!-- <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-dialog> -->

    <!-- Form -->
    <el-button type="button" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">

    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
  data() {
    return {
      dialogFormVisible: false,
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
    }
  }
};
</script>
