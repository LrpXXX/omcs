
  <template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24"><router-view name="top"></router-view></el-col>
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <router-view name="aside"></router-view>
      <!--右侧内容区-->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </section>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: 'layout',
    data () {
      return {
        loading: false
      }
    }
  }
</script>
<!-- </template>

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
</style> -->
