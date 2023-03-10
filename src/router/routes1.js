/** 
  @desc 路由表
*/

const Layout = () => import("@/views/layout/index.vue"),
  Home = () => import("@/views/home/home.vue"),
  NotFound = () => import("@/views/error/404.vue");

// 任何角色都能访问的静态路由
export const staticRoutes = [
  {
    path: "/",
    redirect: "/home",
    meta: {
      hidden: true,
    },
  },
  {
    path: "/home",
    component: Layout,
    meta: {
      title: "首页", // 页面标题
      icon: "", // 图标，一般配合菜单使用
      roles: [], // RoleId 可以访问的角色ID
      keepAlive: false, // boolean 是否开启页面缓存
    },
    children: [
      {
        path: "",
        component: Home,
        meta: {
          title: "首页",
          roles: [],
        },
      },
    ],
  },
  {
    path: "/system",
    component: Layout,
    meta: {
      title: "系统管理",
    },
    children: [
      {
        path: "/system/userInfo",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/system/userInfo.vue"),
        meta: {
          title: "个人中心",
          roles: [],
        },
      },
      {
        path: "/system/siteManage",
        component: () => import(/* webpackChunck 'siteManage' */ "@/views/system/site-manage.vue"),
        meta: {
          title: "场地管理",
          roles: [],
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import(/* webpackChunck 'login' */ "@/views/login/login.vue"),
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
    component: Layout,
    meta: {
      title: "测试动态路由",
      roles: [999],
    },
    children: [
      {
        path: "/permission/page",
        component: () => import(/* webpackChunck 'permissionPage' */ "@/views/permission/page/index.vue"),
        meta: {
          title: "page",
          roles: [6],
        },
      },
    ],
  },
];
