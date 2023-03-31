<template>
  <div class="login-container">
    <div class="login-wrap">
      <!-- <div> -->
      <img src="@/assets/images/login-bg.png" alt="" class="login-bg" />
      <!-- </div> -->

      <div class="login-content">
        <div class="login-logo">
          <p>柳汽智慧场管理平台</p>
        </div>
        <el-form class="login-form-wrap" :model="loginForm" :rules="rules" ref="loginFormRef">
          <el-form-item prop="account" class="ipt-item">
            <el-input v-model="loginForm.account" placeholder="请输入用户名">
              <i slot="prefix" class="el-input__icon el-icon-mobile"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" class="ipt-item">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入登录密码">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item class="ipt-item">
            <el-button type="primary" class="login-button" :loading="loading" @click="onLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import loginApi from "@/service/api/login/index";
import auth from "@/common/auth";
import {resetRouter} from "@/router";
import {Message} from "element-ui";
export default {
  data() {
    return {
      loading: false,
      loginForm: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    onLogin() {
      this.$refs["loginFormRef"].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          const { account, password } = this.loginForm;
          const params = {
            user: this.$rsa.rsaPublicData(account),
            pass: this.$rsa.rsaPublicData(password),
            code: 1,
          };
          const res = await loginApi.login(params);
          this.loading = false;
          //登录成功
          if (res.code===200) {
            // 登录后先重置之前添加的路由，避免重复
            resetRouter();
            auth.setToken(res.data.accessToken)
            auth.setRefreshToken(res.data.accessToken)
            auth.setUserInfo(res);
            this.$t.setSession('accessToken', res.data.accessToken)
            this.$t.setSession('refreshToken', res.data.refreshToken)
            // sso
            this.$t.setSession('validTime', new Date().getTime() + Number(res.data.expiresIn) * 1000)
            this.$t.setSession('userName', res.data.userName)
            this.$t.setSession('userInfo', res.data.userInfo)
            this.$t.setSession('permission', res.data.permission)
            this.$store.commit("SETUSERINFO", res);
            const toPath = decodeURIComponent(this.$route.query.redirect || "/");
            Message.success('登录成功')
            this.$router.replace(toPath);
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 1345px;
  height: 100vh;
  background: #f4f4f4;
  .login-wrap {
    display: flex;
    align-items: center;
    border-radius: 34px;
    width: 88.54%;
    height: 83.33%;
    background: #fff;
    overflow: hidden;
    .login-bg {
      flex-basis: 55.82%;
      height: 100%;
    }
    .login-content {
      width: 360px;
      text-align: center;
      margin: 0 auto;
      .login-logo {
        font-size: 36px;
        font-weight: 500;
        color: #000000;
        margin-bottom: 134px;
      }
      .login-form-wrap {
        ::v-deep .ipt-item .el-form-item__content .el-input__icon {
          font-size: 15px;
        }
        ::v-deep .ipt-item .el-form-item__content .el-input__inner {
          height: 50px;
          font-size: 20px;
        }
      }
      .login-button {
        width: 100%;
        font-size: 22px;
        font-weight: 400;
      }
    }
  }
}
</style>
