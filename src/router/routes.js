/**
  @desc 路由表
*/

const Layout = () => import("@/views/layout/index.vue"),
  Login = () => import("@/views/login/login.vue"),
  NotFound = () => import("@/views/error/404.vue"),
  Forget = () => import("@/views/login/forget.vue");
// 任何角色都能访问的静态路由
export const staticRoutes = [
  {
    path: "/",
    redirect: "/omcs/system/userInfo",
    component: Layout,
    meta: {
      title: "预约管理",
    },
    children: [
      {
        path: "/omcs/system/userInfo",
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
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/message/editNotific.vue"),
        meta: {
          title: "新增/编辑公告",
          hidden:true,
          roles: []
        },
      },
      {
        path: "/message/notiMessage",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/message/notiMessage.vue"),
        meta: {
          title: "通知消息",
          roles: [],
        },
      },
      {
        path: "/message/helpMessage",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/message/helpMessage.vue"),
        meta: {
          title: "帮助管理",
          roles: [],
        },
      },
      {
        path: "/message/agreementMessage",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/message/agreementMessage.vue"),
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
        path: "/auth/role",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/auth/role"),
        meta: {
          title: "角色管理",
          roles: [],
        },
      },
      {
        path: "/auth/user",
        component: () => import(/* webpackChunck 'userInfo' */ "@/views/auth/user"),
        meta: {
          title: "用户管理",
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
        {
          path: "/config/loginBg",
          component: () => import(/* webpackChunck 'userInfo' */ "@/views/config/loginBg"),
          meta: {
            title: "登录地图配置",
            roles: [],
          },
        },
      ],
    },
  {
    path: '/bill',
    component:Layout,
    redirect: '/omcs/bill/billLsit',
    meta: {
      title: '账单管理',
    },
    children: [
      {path:'/omcs/bill/billLsit',
      component:()=>import(/* webpackChunck 'userInfo' */ "@/views/omcs/bill"),
        meta: {
        title: "账单列表",
          hidden: true
        }

      }
    ]
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
