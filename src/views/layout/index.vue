<template>
  <el-container class="layout-container">
    <!-- 全局左侧菜单 -->
    <el-aside :width="asiderWidth" class="layout-aside">
      <!-- 系统logo标识 -->
      <div class="logo-wrap">
        <p class="title">柳汽智慧场管理平台</p>
      </div>
      <!-- 菜单 -->
      <layout-menu />
    </el-aside>

    <el-container>
      <!-- 全局header -->
      <el-header height="50px" class="layout-header-wrapper">
        <layout-header :collapsed="isCollapse" @change="onChange" />
      </el-header>

      <!-- 全局实时监控滚动组件 -->
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="(item, index) in menuList" :key="item.path">
            <span v-if="index === menuList.length - 1">{{ item.meta.title }}</span>
            <a v-else @click.prevent="onLink(item)">{{ item.meta.title }}</a>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
      </div>
       

      <!-- 子页面容器 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import menu from "./menu/menu.vue";
import header from "./header/header.vue";
export default {
  name: "layout",
  components: {
    "layout-menu": menu,
    "layout-header": header,
  },
  data() {
    return {
      isCollapse: false,
      menuList: []
    };
  },
  computed: {
    asiderWidth() {
      return this.isCollapse ? "54px" : "208px";
    },
  },
  created() {
    // 进入页面获取一次面包屑
    this.getBreadcrumb();
  },
  methods: {
    // 获取面包屑信息
    getBreadcrumb() {
      const matched = this.$route.matched.filter((item) => item.meta && item.meta.title);
      this.menuList = matched.filter((item) => item.meta && item.meta.title && !item.meta.breadcrumb && item.name !== "layout");
    },
    onChange() {
      this.isCollapse = !this.isCollapse;
    },
  },
  watch:{
      // 路由改变，更新面包屑
      $route() {
      this.getBreadcrumb();
    },
  }
};
</script>

<style scoped lang="scss">
.layout-container {
  height: 100%;
  overflow: auto;
  background: $color-bacgroun !important;
  .layout-aside {
    height: 100vh;
    transition: all 0.3s;
    background-color: $color-bacgroun !important;
    overflow: hidden;
    width: 200px;
    .logo-wrap {
      height: 50px;
      line-height: 50px;
      white-space: nowrap;
      overflow: hidden;
      .title {
        color: #ffffff;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 0;
        padding-left: 20px;
      }
    }
  }
  .layout-header-wrapper {
    padding: 0;
  }
  .breadcrumb{
    background: #ffffff;
    font-size: 24px;
    height: 50px;
    line-height: 50px;
    padding-top:20px
  }
  .el-main {
    margin: 0;
    padding: 0;
    background: #ffffff;
    border-radius: 4px;
  }
}
</style>
