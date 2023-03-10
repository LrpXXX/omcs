/** 
  @desc 路由表
*/

const Layout = () => import("@/views/layout/index.vue"),
  Home = () => import("@/views/home/home.vue"),
  Login = () => import("@/views/login/login.vue"),
  NotFound = () => import("@/views/error/404.vue"),
  MonitorManage = () => import("@/views/monitor/monitor-manage"),
  CoalTemperature = () => import("@/views/monitor/coal-temperature");

// 任何角色都能访问的静态路由
export const staticRoutes = [
  {
    path: "/",
    redirect: "/home",
    component: Layout,
    meta: {
      title: "首页", // 页面标题
    },
    children: [
      {
        path: "/home",
        component: Home,
        meta: {
          title: "首页", // 页面标题
          icon: "", // 图标，一般配合菜单使用
          roles: [], // RoleId 可以访问的角色ID
          keepAlive: false, // boolean 是否开启页面缓存
        },
      },
    ],
  },
  {
    path: "/monitor",
    component: Layout,
    meta: {
      title: "实时监控", // 页面标题
      icon: "", // 图标，一般配合菜单使用
      roles: [], // RoleId 可以访问的角色ID
      keepAlive: false, // boolean 是否开启页面缓存
    },
    children: [
      {
        path: "/monitor/monitorManage",
        component: MonitorManage,
        meta: {
          title: "实时监控管理",
          roles: [],
        },
      },
      {
        path: "/monitor/coalTemperature",
        component: CoalTemperature,
        meta: {
          title: "煤温报警检测",
          roles: [],
        },
      },
    ],
  },
  {
    path: "/system",
    redirect: "/system/userInfo",
    component: Layout,
    meta: {
      title: "系统管理",
    },
    children: [
      {
        path: "/system/userInfo",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/system/user-info.vue"),
        meta: {
          title: "个人中心",
          roles: [],
        },
      },
    ],
  },
  {
    path: "/login",
    component: Login,
    meta: {
      title: "登录",
      hidden: true,
    },
  },
  {
    path: "/404",
    component: NotFound,
    meta: {
      title: "页面不存在",
      hidden: true,
    },
  },
];

// 权限动态路由
export const asyncRoutes = [
  {
    path: "/permission",
    redirect: "/permission/index",
    component: Layout,
    meta: {
      title: "测试动态路由",
      roles: [999],
    },
    children: [
      {
        path: "/permission/index",
        component: () => import(/* webpackChunck 'permissionPage' */ "@/views/permission/index.vue"),
        meta: {
          title: "page",
          roles: [6],
        },
      },
    ],
  },
];
