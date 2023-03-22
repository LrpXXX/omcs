<template>
  <div class="bg-forget">
    <el-card class="box-card">
      <el-form :model="froget" class="demo-form-inline" :rules="emilRul" label-width="50px">
        <el-form-item label="邮箱">
          <el-input v-model="froget.emil" placeholder="请输入邮箱"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="验证码">
          <el-input v-model="formInline.code" placeholder="验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">获取验证码</el-button>
        </el-form-item>
      </el-form>
      <div class="suer-button">
        <el-button type="primary" @click="sure">立即验证</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import loginApi from "@/service/api/login/index";
import { Message } from 'element-ui';
export default {
  data() {
    return {
      froget: {
      },
      emilRul:{
        emil:[{required: true, message: "请输入邮箱", trigger: "blur" }]
      },
      formInline:{}

    };
  },
  methods: {
    onSubmit() {
      loginApi.forget(this.froget.emil).then(res=>{
        console.log(res);
        if(res.code===200){
          Message.success('查询成功,请填写验证码')
        }
      }).catch(err=>{console.log(err);})
    },
    sure(){
      const params={mail:this.froget.emil,code:this.formInline.code}
      console.log(params);
      loginApi.sureId(params).then(res=>{
        if(res.code===200){
          Message.success('验证成功')
          this.$router.push('/editPassword')
        }
      }).catch(err=>{console.log(err)})
    }
  },
};
</script>

<style lang="scss" scoped>
.bg-forget {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("@/assets/images/login-bg.png") no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  .box-card {
    width: 25vw;
    height: 28vh;
    .suer-button {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
