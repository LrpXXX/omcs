<template>
  <div>
    <el-menu mode="horizontal"  class="headerMean">
      <el-menu-item v-for="item in headeMean" :key="item.id" :index="item.path" router>{{ item.name }}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headeMean: [
          { id: "1", name: "数据展示中心", path: "/sjzs" },
          { id: "2", name: "监控指挥中心", path: "/jmmc" },
          { id: "3", name: "运营管理中心", path: "/omcs" },
          { id: "4", name: "道路管理中心", path: "/dlgl" },
          { id: "5", name: "系统管理中心", path: "/xtgl" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.headerMean{
  background:$color-bacgroun !important;
  height: 55px;
  line-height: 55px;
  margin-left: -22px;
}
</style>
