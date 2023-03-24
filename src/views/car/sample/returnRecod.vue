<template>
  <div class="from">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="还样人员" prop="receivePerson">
        <el-input v-model="ruleForm.receivePerson" placeholder="填写还样人员"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="receiveContactNumber">
        <el-input v-model="ruleForm.receiveContactNumber" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="receiveIdentityNum">
        <el-input v-model="ruleForm.receiveIdentityNum" placeholder="请填写身份证号"></el-input>
      </el-form-item>
      <el-form-item label="目的地" prop="destination">
        <el-input v-model="ruleForm.destination" placeholder="填写目的地"></el-input>
      </el-form-item>
      <el-form-item label="进场拖车" prop="receiveTrailer">
        <el-input v-model="ruleForm.receiveTrailer"></el-input>
      </el-form-item>
      <el-form-item label="还样照片" prop="fzr">
        <el-upload action="/api/editEviCard.jhtml" accept="image/*" multiple :auto-upload="false" style="display: inline-block">
          <el-button type="primary" plain>
            <i class="el-icon-upload el-icon--right"></i>
            点击选择还样照片（最多8张，多选）
          </el-button>
          <div slot="tip">只能上传图片格式文件</div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认预约</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import reg from "@/common/reg";
import { Sample } from "@/service/api/issue/sample";
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
        receiveContactNumber: [
          { required: true, message: "请填写联系电话", trigger: "blur" },
          {
            pattern: reg.mobile,
            message: "请输入正确得手机号码",
            trigger: "blur",
          },
        ],
        receiveIdentityNum: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          {
            pattern: reg.card,
            message: "请输入正确得18位身份证号码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        console.log(valid);
        if (valid) {
          const data = {
            businessType: 2,
            destination: this.ruleForm.destination,
            receivePerson: this.ruleForm.receivePerson,
            receiveTrailer: this.ruleForm.receiveTrailer,
            receiveContactNumber: this.ruleForm.receiveContactNumber,
            receiveIdentityNum: this.ruleForm.receiveIdentityNum,
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
}
</style>
