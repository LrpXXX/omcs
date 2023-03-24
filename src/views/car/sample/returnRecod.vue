<template>
  <div class="from">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" enctype="multipart/form-data">
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
        <el-upload
          ref="fileUpload"
          :action="fileUploadUrl"
          :auto-upload="false"
          :on-change="fileChange"
          :on-remove="fileRemove"
          :file-list="fileList"
          :limit="1"
          accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf"
        >
          <span slot="tip" style="margin-left: 20px">只能上传doc/docx/xls/xlsx/ppt/pptx/pdf文件</span>
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
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ], //上传图片数据
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
