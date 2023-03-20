<template>
  <div> 
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
    <el-tab-pane label="标准收费">标准收费</el-tab-pane>
    <el-tab-pane label="包场收费">包场收费</el-tab-pane>
  </el-tabs></div>
</template>

<script>
export default {
    data() {
      return {
        tabPosition: 'top'
      };
    }
}
</script>

<style>

</style>