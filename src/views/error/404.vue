<template>
  <div class="page-404">
    <div>
      <h1 class="mb-30">404 页面不存在</h1>
      <router-link to="/" replace class="">返回首页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "error404",
};
</script>

<style lang="scss" scoped>
.page-404 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
