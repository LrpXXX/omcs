import Vue from "vue";
import App from "./App.vue";
// 导入路由
import router from "./router/index";
// 导入store
import store from "./store/index";
// 导入axios
import http from "./service/http";
// 挂载自定义指令
import directive from "@/common/directives";
// import ws from "./common/websocket";

// 导入全局过滤器
import * as filters from "@/common/filters";

// 按需加载element-ui组件
import "@/common/element-ui";
// 覆盖element-ui样式
import "@/styles/element-variables.scss";
// 自定义元素样式
import "@/styles/global.scss";

Vue.prototype.$http = http;

Vue.config.productionTip = false;

Vue.use(directive);

// Vue.use(ws);
// ws.createWebsocket();

console.log(window.WebVideoCtrl);

// 挂载过滤器
Object.keys(filters).forEach((item) => {
  Vue.filter(item, filters[item]);
});

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
});
app.$mount("#app");
