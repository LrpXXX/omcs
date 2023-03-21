/** 
  @desc 路由表
*/

const Layout = () => import("@/views/layout/index.vue"),
  Login = () => import("@/views/login/login.vue"),
  NotFound = () => import("@/views/error/404.vue")

// 任何角色都能访问的静态路由
export const staticRoutes = [
  // {
  //   path: "/",
  //   redirect: "/home",
  //   component: Layout,
  //   meta: {
  //     title: "首页", // 页面标题
  //   },
  //   children: [
  //     {
  //       path: "/home",
  //       component: Home,
  //       meta: {
  //         title: "首页", // 页面标题
  //         icon: "", // 图标，一般配合菜单使用
  //         roles: [], // RoleId 可以访问的角色ID
  //         keepAlive: false, // boolean 是否开启页面缓存
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/monitor",
  //   component: Layout,
  //   meta: {
  //     title: "实时监控", // 页面标题
  //     icon: "", // 图标，一般配合菜单使用
  //     roles: [], // RoleId 可以访问的角色ID
  //     keepAlive: false, // boolean 是否开启页面缓存
  //   },
  //   children: [
  //     {
  //       path: "/monitor/monitorManage",
  //       component: MonitorManage,
  //       meta: {
  //         title: "实时监控管理",
  //         roles: [],
  //       },
  //     },
  //     {
  //       path: "/monitor/coalTemperature",
  //       component: CoalTemperature,
  //       meta: {
  //         title: "高温报警检测",
  //         roles: [],
  //       },
  //     },
  //   ],
  // },
  {
    path: "/system",
    redirect: "/system/userInfo",
    component: Layout,
    meta: {
      title: "预约管理",
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
      {
        path: "/system/userInfoLsit",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/system/userInfolist.vue"),
        meta: {
          title: "预约列表",
          roles: [],
        },
      },
    ],
  },
  {
    path: "/personnel",
    redirect: "/personnel/personnle",
    component: Layout,
    meta: {
      title: "人员管理",
    },
    children: [
      {
        path: "/personnel/personnel",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/personnel/personnelList.vue"),
        meta: {
          title: "驾驶人员",
          roles: [],
        },
      },
      {
        path: "/yardman/yardmanList",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/personnel/yardmanList.vue"),
        meta: {
          title: "场地人员",
          roles: [],
        },
      },
    ],
  },
  {
    path: "/site",
    redirect: "/site/siteList",
    component: Layout,
    meta: {
      title: "场地管理",
    },
    children: [
      {
        path: "/site/siteList",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/site/siteList.vue"),
        meta: {
          title: "场地管理",
          roles: [],
        },
      },
      {
        path: "/site/cinema",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/site/cinema.vue"),
        meta: {
          title: "包场",
          roles: [],
        },
      },
    ],
  },
  {
    path: "/issue",
    component: Layout,
    meta: {
      title: "发放管理",
    },
    children: [
      {
        path: "/issue/sunCard",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/issue/sunCard.vue"),
        meta: {
          title: "通行卡管理",
          roles: [],
        },
      },
      {
        path: "/issue/interPhone",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/issue/interPhone.vue"),
        meta: {
          title: "对讲机管理",
          roles: [],
        },
      },
      {
        path: "/issue/devcise",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/issue/devcise.vue"),
        meta: {
          title: "定位设备管理",
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
