<template>
  <div class="layout-header">
    <div class="left-options flex ai-center">
      <!-- 展开收起按钮 -->
      <span class="menu-fold" @click="change">
        <i :class="collapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'" />
      </span>

      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="(item, index) in menuList" :key="item.path">
            <span v-if="index === menuList.length - 1">{{ item.meta.title }}</span>
            <a v-else @click.prevent="onLink(item)">{{ item.meta.title }}</a>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>

    <!-- 右侧操作区域 -->
    <ul class="right-options flex ai-center">
      <li class="mr-30 cursor">
        <i class="el-icon-user mr-5"></i>
        <span @click="toUserInfo">{{ userInfo.name || "" }}</span>
      </li>
      <li class="cursor">
        <i class="el-icon-switch-button mr-5"></i>
        <span @click="loginOut">退出系统</span>
      </li>
    </ul>
  </div>
</template>

<script>
import index from "../path-compile.js";
import auth from "@/common/auth";

export default {
  name: "layoutHeader",
  mixins: [index],
  props: {
    collapsed: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      menuList: [],
      userInfo: this.$store.state.user.userInfo,
    };
  },
  created() {
    // 进入页面获取一次面包屑
    this.getBreadcrumb();
  },
  methods: {
    // 触发左侧菜单的展开/收起事件
    change() {
      this.$emit("change");
    },
    // 获取面包屑
    getBreadcrumb() {
      const matched = this.$route.matched.filter((item) => item.meta && item.meta.title);
      this.menuList = matched.filter((item) => item.meta && item.meta.title && !item.meta.breadcrumb && item.name !== "layout");
    },
    // 跳转个人中心
    toUserInfo() {
      this.$router.push("/system/userInfo");
    },
    // 退出登录
    loginOut() {
      auth.removeToken();
      this.$store.commit("LOGINOUT");
      this.$router.push("/login");
    },
  },
  watch: {
    // 路由改变，更新面包屑
    $route() {
      this.getBreadcrumb();
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-header {
  height: 100%;
  padding: 0 23px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
  .menu-fold {
    padding: 0 24px 0 0;
    cursor: pointer;
    font-size: 20px;
  }
  .right-options {
    .avatar-wrapper {
      display: flex;
      align-items: center;
      margin: 0 12px;
      cursor: pointer;
    }
  }
}
</style>
