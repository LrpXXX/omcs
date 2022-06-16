<template>
  <el-container class="layout-container">
    <!-- 全局左侧菜单 -->
    <el-aside :width="asiderWidth" class="layout-aside">
      <!-- 系统logo标识 -->
      <div class="logo-wrap">
        <p class="title">数智可视化站台</p>
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
      <realtime-monitor />

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
import realtimeMonitor from "./realtime-monitor/index.vue";

export default {
  name: "layout",
  components: {
    "layout-menu": menu,
    "layout-header": header,
    "realtime-monitor": realtimeMonitor,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    asiderWidth() {
      return this.isCollapse ? "54px" : "208px";
    },
  },
  methods: {
    onChange() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style scoped lang="scss">
.layout-container {
  min-width: 1440px;
  height: 100%;
  overflow: hidden;
  background: #f0f2f5;
  .layout-aside {
    height: 100vh;
    transition: all 0.3s;
    background-color: #334761;
    overflow: hidden;
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
  .el-main {
    margin: 15px;
    padding: 0;
    background: #ffffff;
    border-radius: 4px;
  }
}
</style>
