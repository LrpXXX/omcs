/*
 * @Desc:
 * @Author: jqw
 * @Date: 2022-06-09 15:33:01
 */
import Vue from "vue";
import Vuex from "vuex";
import createPersistedstate from "vuex-persistedstate";
Vue.use(Vuex);

import user from "./modules/user";
import { staticRoutes } from "@/router/routes";
import auth, {VUEXKEY} from "@/common/auth";



export default new Vuex.Store({
  // vuex的插件配置
  plugins: [
    createPersistedstate({
      // 缓存数据时的key
      key: VUEXKEY,
      // 哪些模块需要被缓存
      paths: ["user"],
    }),
  ],
  modules: {
    user,
  },
  state: {
    collapsed: false,
    topNavState: 'home',
    leftNavState: 'home'  
  },
  mutations: {
    // 设置路由
    SETMENUS: (state, routes = []) => {
      state.menus = routes;
    },
    // 退出登录
    LOGINOUT: (state) => {
      state.menus = [];
      state.user.roles = [];
      state.user.userInfo = {};
      auth.removeToken()
    },
  },
  actions: {
    // setXXXXX: ({ commit }, roles) => {
    //   return new Promise((resolve) => {
    //   });
    // },
  },
});
