<template>
  <div class="realtime-monitor-wrap flex ai-center" v-if="warnList && warnList.length">
    <img src="@/assets/images/realtime-monitor.png" alt="" class="realtime-img mr-15" />
    <marquee behavior="scroll" direction="left" onMouseOut="this.start()" onMouseOver="this.stop()" class="warn-wrap">
      <img src="@/assets/images/warn1.png" alt="" class="warn-img mr-8" />
      <span class="cursor warn-tips" @click="toMonitorPage()">XX场地XX设备报警，当前温度380度，请及时处理</span>
      <!-- 煤温异常才会有声音控制 -->
      <img src="@/assets/images/open-voice.png" alt="" class="cursor voice-img ml-5" @click="switchCurWarnVoice()" />
    </marquee>
  </div>
</template>

<script>
export default {
  data() {
    return {
      warnList: [],
    };
  },
  mounted() {
    this.warnList = this.$store.state.warnList;
  },
  methods: {
    // 切换当前点击的报警条声音开关 煤温异常才会有声音控制
    switchCurWarnVoice() {},
    // 跳转监控列表页面，带上状态筛选参数
    toMonitorPage() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.realtime-monitor-wrap {
  height: 50px;
  padding: 0 23px;
  font-size: 14px;
  background: #fff;
  .realtime-img {
    width: 64px;
    position: relative;
    top: 2px;
  }
  .warn-wrap {
    .warn-img {
      width: 17px;
      position: relative;
      top: 2px;
    }
    .voice-img {
      width: 14px;
      position: relative;
      top: 2px;
    }
    .warn-tips {
      color: #d61616;
    }
  }
}
</style>