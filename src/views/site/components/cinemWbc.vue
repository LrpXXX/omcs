
<template>
    <div class='wbc-set'>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
    <el-form-item label="起步时间" prop="start">
      <el-input v-model="ruleForm.start"></el-input>
    </el-form-item>
    <el-form-item label="单价" prop="price">
      <el-input v-model="ruleForm.price"></el-input>
    </el-form-item>
    <el-form-item label="计费系数" prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="不启用"></el-radio>
        <el-radio label="启用"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
  <script>
    export default {
      data() {
        return {
          ruleForm: {
            name: '',
            price: '',
            resource: '',
          },
          rules: {
            start: [
              { required: true, message: 'Please input Activity name', trigger: 'blur' },
            ],
            price: [
              { required: true, message: 'Please input activity form', trigger: 'blur' }
            ],
            resource:[{ required: true, message: 'Please adiot activity form', trigger: 'change' }]
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
  </script>
<style lang="scss" scoped>
.wbc-set{
    width: 60vw;
    margin: 0 auto;
}
</style>