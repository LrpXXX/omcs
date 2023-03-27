/** 
  @desc 路由表
*/

const Layout = () => import("@/views/layout/index.vue"),
  Login = () => import("@/views/login/login.vue"),
  NotFound = () => import("@/views/error/404.vue"),
  Forget = () => import("@/views/login/forget.vue");
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
    path: "/",
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
        path: "/issue/interPhoneList",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/issue/interPhoneList.vue"),
        meta: {
          title: "对讲机记录",
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
      {
        path: "/issue/devciseList",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/issue/devciseList.vue"),
        meta: {
          title: "固定设备记录",
          roles: [],
        },
      },
    ],
  },
  {
    path: "/car",
    component: Layout,
    meta: {
      title: "车辆管理",
    },
    children: [
      {
        path: "/car/inspection",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/car/inspection/inspection.vue"),
        meta: {
          title: "巡检车辆",
          roles: [],
        },
      },
      {
        path: "/car/sample",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/car/sample/sample.vue"),
        meta: {
          title: "样车管理",
          roles: [],
        },
      },
      {
        path: "/car/recpectRecod",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/car/sample/recpectRecod.vue"),
        meta: {
          title: "收样",
          roles: [],
        },
      },
      {
        path: "/car/returnRecod",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/car/sample/returnRecod.vue"),
        meta: {
          title: "还样",
          roles: [],
        },
      },
      {
        path: "/car/cartype",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/car/cartype"),
        meta: {
          title: "车辆类型",
          roles: [],
        },
      },
    ],
  },
  // 消息管理
  {
    path: "/message",
    component: Layout,
    meta: {
      title: "消息管理",
    },
    children: [
      {
        path: "/message/notifiction",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/message/notifiction.vue"),
        meta: {
          title: "通知公告",
          roles: [],
        },
      },
      {
        path: "/message/messageAdd",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/message/components/editMessage.vue"),
        meta: {
          title: "新增/编辑公告",
          roles: [],
        },
      },
      {
        path: "/message/notifiction1",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/message/notifiction.vue"),
        meta: {
          title: "通知消息",
          roles: [],
        },
      },
      {
        path: "/message/notifiction2",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/message/notifiction.vue"),
        meta: {
          title: "帮助管理",
          roles: [],
        },
      },
      {
        path: "/message/notifiction3",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/message/notifiction.vue"),
        meta: {
          title: "协议管理",
          roles: [],
        },
      },
    ],
  },
  // 权限角色
  {
    path: "/auth",
    component: Layout,
    meta: {
      title: "权限角色",
      roles: [],
    },
    children: [
      {
        path: "/auth/tissue",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/auth/tissue"),
        meta: {
          title: "组织管理",
          roles: [],
        },
      },
      {
        path: "/auth/tissuesave",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/auth/tissue/editFrom.vue"),
        meta: {
          title: "组织管理新增",
          roles: [],
          hidden:false
        },
      },
      {
        path: "/auth/role",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/auth/role"),
        meta: {
          title: "角色管理",
          roles: [],
        },
      },
      {
        path: "/auth/system",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/auth/system"),
        meta: {
          title: "系统配置",
          roles: [],
        },
      },
    ],
  },
    // 系统配置
    {
      path: "/config",
      component: Layout,
      meta: {
        title: "系统配置",
        roles: [],
      },
      children: [
        {
          path: "/config/personnel",
          component: () => import(/* webpackChunck 'userInfo' */ "@/views/config/personnel"),
          meta: {
            title: "人员配置",
            roles: [],
          },
        },
        {
          path: "/config/car",
          component: () => import(/* webpackChunck 'userInfo' */ "@/views/config/car"),
          meta: {
            title: "车辆配置",
            roles: [],
          },
        },
        {
          path: "/config/fixed",
          component: () => import(/* webpackChunck 'userInfo' */ "@/views/config/fixed"),
          meta: {
            title: "固设配置",
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
