<template>
  <div class="from">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="预约客户" prop="auth">
        <el-select
          v-model="ruleForm.auth"
          placeholder="请选择场地预约客户/选择显示"
        >
          <el-option label="lims系统" value="lims"></el-option>
          <el-option label="场地管理系统" value="cjgl"></el-option>
          <el-option label="客户预约系统" value="khyy"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车辆VIN/底盘号" prop="carcode">
        <el-input
          v-model="ruleForm.carcode"
          placeholder="填写车辆VIN码"
        ></el-input>
      </el-form-item>
      <el-form-item label="车辆类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择车辆类型">
          <el-option label="巡检车辆" value="lims"></el-option>
          <el-option label="实验车辆" value="cjgl"></el-option>
          <el-option label="客户预约系统" value="khyy"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车辆名称" prop="cardname">
        <el-input
          v-model="ruleForm.cardname"
          placeholder="填写车辆名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="车辆型号" prop="cardsize">
        <el-input
          v-model="ruleForm.cardsize"
          placeholder="填写车辆名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="车辆颜色" prop="cardcolor">
        <el-input
          v-model="ruleForm.cardcolor"
          placeholder="填写车辆颜色"
        ></el-input>
      </el-form-item>
      <el-form-item label="实车重量" prop="actual">
        <el-input
          v-model="ruleForm.actual"
          placeholder="填写实车重量单位顿"
        ></el-input>
      </el-form-item>
      <el-form-item label="生产企业" prop="scqy">
        <el-input
          v-model="ruleForm.scqy"
          placeholder="填写车辆生产企业名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="检测类型" prop="jclx">
        <el-radio-group v-model="ruleForm.jclx">
          <el-radio label="委托"></el-radio>
          <el-radio label="公告"></el-radio>
          <el-radio label="营运"></el-radio>
          <el-radio label="租用"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="负责人" prop="fzr">
        <el-input v-model="ruleForm.fzr" placeholder="请填写负责人"></el-input>
      </el-form-item>
      <el-form-item label="场地预约" prop="cdyy">
        <el-checkbox-group v-model="ruleForm.cdyy">
      <el-checkbox label="直线性能路" name="cdyy"></el-checkbox>
      <el-checkbox label="制动评价路" name="cdyy"></el-checkbox>
      <el-checkbox label="HNV评价路" name="cdyy"></el-checkbox>
      <el-checkbox label="强化坏路" name="cdyy"></el-checkbox>
      <el-checkbox label="坡道路" name="cdyy"></el-checkbox>
      <el-checkbox label="动态圆广场A" name="cdyy"></el-checkbox>
      <el-checkbox label="动态圆广场B" name="cdyy"></el-checkbox>
    </el-checkbox-group>
      </el-form-item>
      <el-form-item label="实验项目" prop="syxm">
        <el-input
          v-model="ruleForm.syxm"
          placeholder="请填写实验项目得内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="包场服务" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="不需要"></el-radio>
          <el-radio label="需要"> </el-radio>
          <el-select v-solt="selct" v-if="ruleForm.resource === '需要'">
            <el-option label="巡检车辆" value="lims"></el-option>
            <el-option label="实验车辆" value="cjgl"></el-option>
            <el-option label="客户预约系统" value="khyy"></el-option>
          </el-select>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交预约</el-button
        >
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        auth: '',
        carcode: '',
        type: '',
        cardname: '',
        cardsize: '',
        cardcolor: '',
        actual: '',
        scqy: '',
        jclx: '',
        fzr: '',
        cdyy: [],
        syxm: '',
        resource: '',
        desc: ''
      },
      rules: {
        auth: [
          { required: true, message: '请输入活动名称', trigger: 'change' }
        ],
        carcode: [
          { required: true, message: '请填写车辆VIN', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择车辆类型', trigger: 'change' }
        ],
        cardname: [
          { required: true, message: '请填写车辆名称', trigger: 'blur' }
        ],
        cardsize: [
          { required: true, message: '请填写车辆型号', trigger: 'blur' }
        ],
        actual: [
          { required: true, message: '请填写实车重量', trigger: 'blur' }
        ],
        scqy: [
          { required: true, message: '填写车辆生产企业名称', trigger: 'blur' }
        ],
        jclx: [
          { required: true, message: '请至少选择一个检测类型', trigger: 'change' }
        ],
        fzr: [{ required: true, message: '填写负责人', trigger: 'blur' }],
        cdyy: [
          { type: 'array', required: true, message: '请至少选择一个场地', trigger: 'change' }
        ],
        syxm: [
          { required: true, message: '请填写实验项目得内容', trigger: 'blur' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          const fromDate = { ...this.ruleForm }
          localStorage.setSession('fromDate', fromDate)
          this.$message.success({ message: '预约成功' })
          this.$router.push('/system/userInfoLsit')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  created() {
   let  from= JSON.parse(JSON.stringify(localStorage.getItem('edit')))
   console.log(from);
  },
}
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
