import Vue from "vue";
import VueRouter from "vue-router";
import { staticRoutes, asyncRoutes } from "./routes";
import store from "@/store/index.js";
import auth from "@/common/auth";
// 进度条
import nprogress from "@/common/nprogress/index";
Vue.use(VueRouter);

// 重写 router push 方法， 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

const createRouter = () =>
  new VueRouter({
    routes: staticRoutes,
    scrollBehavior: () => {
      return { x: 0, y: 0 };
    },
  });
const router = createRouter();

// 根据登录用户的roleId获取对应权限的菜单
const getAsyncRoutes = (roles) => {
  return new Promise((resolve) => {
    let accessedRoutes = filterRoutes(asyncRoutes, roles);
    // const allRoutes = staticRoutes[0].children;
    // store.commit("SETMENUS", allRoutes.concat(accessedRoutes));
    store.commit("SETMENUS", staticRoutes.concat(accessedRoutes));
    resolve(accessedRoutes);
  });
};

// 判断是否有该菜单权限
const hasPermission = (route, roles) => {
  // 如果定义路由表时，该路由存在role字段, 否则认为该路由无需权限即可访问
  if (route.meta && route.meta.roles && route.meta.roles.length) {
    return roles.some((role) => route.meta.roles.includes(role));
  }
  return true;
};

// 过滤出对应角色权限的路由列表
const filterRoutes = function (routes, roles) {
  if (!Array.isArray(routes)) {
    throw new Error("routes 必须为数组");
  }
  let resultRoutes = [];
  // 遍历创建好的所有动态路由
  routes.forEach((_route) => {
    // 先判断权限
    if (hasPermission(_route, roles)) {
      if (_route.children) {
        _route.children = filterRoutes(_route.children, roles);
      }
      resultRoutes.push(_route);
    }
  });
  return resultRoutes;
};

// 登录后，根据权限处理动态路由
const hasLogin = async ({ router, to, next }) => {
  const hasMenus = store.getters.menus && store.getters.menus.length;
  // 先判断是否已存在过权限
  if (hasMenus) {
    next();
  } else {
    // 当前用户的role
    const { roleId } = store.getters.userInfo;
    const roles = [roleId];
    store.commit("SETROLE", roles);
    const accessRoutes = await getAsyncRoutes(roles);
    if (accessRoutes && accessRoutes.length) {
      router.addRoutes(accessRoutes);
      // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      next({ ...to, replace: true }); // 详见  https://juejin.im/post/591aa14f570c35006961acac
    } else {
      next();
    }
  }
};

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
//  !!! 作用是：重置之前addRoutes过的路由，避免多次add出现重复 !!!
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

// 路由守卫
router.beforeEach((to, from, next) => {
  nprogress.start();
  // 路由守卫判断
  if (!to.matched.length) {
    next("/404");
  } else if (to.path === "/login" || to.path === "/404") {
    next();
  } else {
    // 获取token
    const token = auth.getToken();
    if (token) {
      hasLogin({ router, to, next });
    } else {
      next("/login");
    }
    // next()
  }
});

// 路由加载结束后执行
router.afterEach((to) => {
  nprogress.close();

  // 设置浏览器页面标题
  if (to.meta.title) {
    document.title = String(to.meta.title);
  }
});

export default router;
