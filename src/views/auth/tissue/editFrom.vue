<template>
  <div class="from">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" enctype="multipart/form-data">
      <el-form-item label="上级组织名称" prop="receivePerson">
        <el-input v-model="ruleForm.receivePerson" placeholder="填写还样人员"></el-input>
      </el-form-item>
      <el-form-item label="组织名称" prop="receiveContactNumber">
        <el-input v-model="ruleForm.receiveContactNumber" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="管理费率" prop="receiveIdentityNum">
        <el-input v-model="ruleForm.receiveIdentityNum" placeholder="请填写管理费率">
          <i slot="suffix" style="font-style: normal; margin-right: -35px">%</i>
        </el-input>
      </el-form-item>
      <el-form-item label="税率" prop="destination">
        <el-input v-model="ruleForm.destination" placeholder="请填写税率">
          <i slot="suffix" style="font-style: normal; margin-right: -35px">%</i>
        </el-input>
      </el-form-item>
      <el-form-item label="场地折扣" prop="receiveTrailer">
        <el-input v-model="ruleForm.receiveTrailer"></el-input>
      </el-form-item>
      <el-form-item label="联系人员" prop="receiveTrailer">
        <el-input v-model="ruleForm.receiveTrailer"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="receiveTrailer">
        <el-input v-model="ruleForm.receiveTrailer"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="ffzt">
        <el-radio-group v-model="ruleForm.ffzt">
          <el-radio :label="3">是</el-radio>
          <el-radio :label="6">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认预约</el-button>
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
        receivePerson: "",
        receiveContactNumber: "",
        receiveIdentityNum: "",
        receiveTrailer: "",
        destination: "",
      },
      rules: {
        receivePerson: [{ required: true, message: "请输入还样人员", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const smSample = {
            smdestination: this.ruleForm.destination,
            receivePerson: this.ruleFormreceivePerson,
            receiveTrailer: this.ruleForm.receiveTrailer,
            receiveContactNumber: this.ruleForm.receiveContactNumber,
            receiveIdentityNum: this.ruleForm.receiveIdentityNum,
          };
          const data = {
            files: this.fileList,
            smSampleDTO: {
              businessType: 2,
              smSample,
            },
          };

          this.retrunReacod(data);
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 还样信息添加
    retrunReacod(data) {
      Sample.recodsAdd(data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
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
  .deleteImg {
    font-size: 30px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999;
  }
  img {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
  }
}
</style>
