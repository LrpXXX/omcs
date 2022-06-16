// mixin--混入--用户layout中公共方法
const { compile } = require("path-to-regexp");
export default {
  methods: {
    // 匹配带参数(/foo/:id)或者更复杂的路由
    pathCompile(path) {
      const { params } = this.$route;
      const toPath = compile(path);
      return toPath(params);
    },
    // 点击标签页切换页面
    onLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        // 有重定向路由路径，直接跳转
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    },
  },
};
