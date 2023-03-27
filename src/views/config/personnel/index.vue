<template>
  <div>
    <el-card class="card-demo">
      驾驶人员配置
      <el-form :model="timeFrom" :rules="timeFromRul" :inline="true">
        <el-form-item label="培训有效时间" prop="time">
          <el-input v-model="timeFrom.time" placeholder="请填入驾驶有效时间，单位为年"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="card-demo">
      巡检人员/车辆配置
      <div class="buttom"></div>
      <el-form :model="timeFrom" :rules="timeFromRul" :inline="true">
        <el-form-item label="人员/车辆类型" prop="time">
          <el-button>添加</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div style="text-align: center">
      <el-button type="parimary">保存</el-button>
      <el-button type="parimary">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeFrom: {},
      timeFromRul: {
        time: [{ required: true, message: "请输入培训时间", tigger: "blur" }],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.card-demo {
  width: 95vw;
  background-color: #ccc;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 10px;
  .buttom{
    border-bottom: 2px solid #494747;
  }
}
</style>
