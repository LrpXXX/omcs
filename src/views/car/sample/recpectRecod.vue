<template>
  <div class="from">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="送样人员" prop="contactPerson">
        <el-input v-model="ruleForm.contactPerson" placeholder="填写送样人员"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="contactNumber">
        <el-input v-model="ruleForm.contactNumber" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="始发地" prop="cardsize">
        <el-input v-model="ruleForm.cardsize"></el-input>
      </el-form-item>
      <el-form-item label="进场拖车" prop="cardcolor">
        <el-input v-model="ruleForm.cardcolor"></el-input>
      </el-form-item>
      <el-form-item label="停放区域" prop="actual">
        <el-input v-model="ruleForm.actual"></el-input>
      </el-form-item>
      <el-form-item label="随车数量" prop="actual">
        <el-input v-model="ruleForm.actual"></el-input>
      </el-form-item>
      <el-form-item label="要是数量" prop="actual">
        <el-input v-model="ruleForm.actual"></el-input>
      </el-form-item>
      <el-form-item label="收样照片" prop="fzr">
        <el-upload
          class="upload-demo list-uploadbtn"
          ref="upload"
          :action="curBastUrl"
          :auto-upload="false"
          :http-request="uploadFile"
          :on-remove="updataRemove"
          :before-upload="beforeUpload"
          :on-change="updatachange"
          :multiple="true"
        >
          <el-button size="small">点击上传</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交预约</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Sample } from '@/service/api/issue/sample';
export default {
  data() {
    return {
      ruleForm: {
        contactPerson: "",
        contactNumber: "",
        card: "",
      },
      rules: {
        contactPerson: [{ required: true, message: "请输入还样人员", trigger: "blur" }],
        contactNumber: [{ required: true, message: "请填写联系电话", trigger: "blur" }],
        card: [{ required: true, message: "请输入身份证号码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  // 添加还样信息
  recpoectRecod(data){
    Sample.recodsAdd(data).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  }
};
</script>
<style lang="scss" scoped>
.from {
  width: 60vw;
  display: flex;
  margin: 20px auto;
  justify-items: center;
  align-content: center;
  .demo-ruleForm {
    width: 50vw;
  }
}
</style>
