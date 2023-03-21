<template>
  <div> 
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
    <el-tab-pane label="标准收费">
      <cinem-wbc :timee="'时间'"></cinem-wbc>
    </el-tab-pane>
    <el-tab-pane label="包场收费">
      <cinem-bc></cinem-bc>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import cinemWbc from './components/cinemWbc.vue';
import cinemBc from './components/cinemBc.vue'
export default {
  components: { cinemWbc,cinemBc },
    data() {
      return {
        tabPosition: 'top'
      };
    }
}
</script>

<style>

</style>