<!--
 * @Desc: 
 * @Author: jqw
 * @Date: 2022-06-13 11:45:54
-->
<template>
  <el-scrollbar wrap-class="scrollbar-menu">
    <el-menu
      :default-active="activeMenu"
      unique-opened
      collapse-transition
      mode="vertical"
      background-color="#334761"
      text-color="rgba(255, 255, 255, 0.65)"
      active-text-color="#ffffff"
      class="aside-menu"
      router
    >
      <template v-for="menu in menuList">
        <el-menu-item v-if="!menu.children" :index="menu.path" :key="menu.path">{{ menu.meta.title }}</el-menu-item>

        <el-submenu v-else :index="menu.path" :key="menu.path">
          <template slot="title">{{ menu.meta.title }}</template>
          <template v-for="menuChild in menu.children">
            <el-menu-item :index="menuChild.path" :key="menuChild.path">{{ menuChild.meta.title }}</el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
export default {
  name: "layoutMenu",
  props: {},
  computed: {
    // 路由组--菜单列表
    menuList() {
      const menuList = this.$store.getters.menus || [];
      return menuList.filter((item) => !item.meta.hidden);
    },
    // 当前激活菜单的 index
    activeMenu() {
      const { meta, path } = this.$route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.scrollbar-menu {
  height: 100%;
  .aside-menu {
    height: calc(100vh - 50px);
    .el-menu-item {
      &.is-active {
        background: $color-primary !important;
      }
    }
    ::v-deep .el-submenu {
      &.is-active.is-opened {
        .el-submenu__title {
          color: #ffffff !important;
          i {
            color: #ffffff;
          }
        }
      }
      .el-menu {
        box-shadow: inset 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
        .el-menu-item {
          height: 40px;
          line-height: 40px;
          background: #2f3d56 !important;
          &.is-active {
            background: $color-primary !important;
          }
        }
      }
    }
  }
}
</style>
