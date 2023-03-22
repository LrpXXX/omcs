<template>
  <div class="bg-forget">
    <el-card class="box-card">
      <el-form :model="froget" class="demo-form-inline" label-width="50px">
        <el-form-item label="邮箱">
          <el-input v-model="froget.emil" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formInline.user" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">获取验证码</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
