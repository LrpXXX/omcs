/**
  @desc 路由表
*/

const Layout = () => import("@/views/layout/index.vue"),
  Login = () => import("@/views/login/login.vue"),
  NotFound = () => import("@/views/error/404.vue"),
  Forget = () => import("@/views/login/forget.vue");
import DZGL from "@/views/road/barrier/dzgl";
import JQLV from "@/views/road/barrier/jqlv";
import JCLV from "@/views/road/barrier/jclv";
import KGLV from "@/views/road/barrier/kglv";
import NJYC from "@/views/road/barrier/njyc";
import JKSB from "@/views/road/video/jksb"
import SSJK from "@/views/road/video/ssjk"
import  HISTORY  from "@/views/road/video/history"
import LeftMean from '@/views/layout/menu/leftMean.vue'
import TopMean  from "@/views/layout/menu/topMean.vue"
import MySetting from "@/views/omcs/mySetting.vue"

// 任何角色都能访问的静态路由
export const staticRoutes = [
  {
    path:"/",
    redirect:'/omcs',
  },
  {
    // 数据展示中心
    path:"/ddcs",
    type:'home',
    name:'ddcs',
    leaf: true, // 只有一个节点,
    menuShow:true,
    component:Layout
  },
  ,{
    // 监控指挥中心
    path:'/mccs',
    type:'home',
    name:'mcss',
    menuShow:true,
    leaf: true, // 只有一个节点
    component:Layout
  },{
    // 运营管理中心
    path:'/omcs',
    type:'home',
    name:'omcs',
    redirect:'/omcs/booking',
    menuShow:true,
    component:Layout,
    children: [
      {
        path: "/omcs/booking",
        components:{
          default:MySetting,
          top:TopMean,
          aside:LeftMean
        } ,
        redirect:'/omcs/booking/bookingList',
        name:'预约单管理',
        menuShow:true,
        children:[  
          { path: '/omcs/booking/bookingList', component: import(/* webpackChunck 'userInfo' */ "@/views/system/user-info.vue") , name: '个人中心', menuShow: true },
          { path: '/omcs/booking/user-info', component:() => import(/* webpackChunck 'userInfo' */ "@/views/system/userInfolist.vue") ,name:'预约列表',menuShow:true},
            ]
      },
      {
        path: "/omcs/site",
        components: {
           default:MySetting,
          top:TopMean,
          aside:LeftMean
        },
        name:'场地管理',
        menuShow:true,
        children:[ { path: '/omcs/booking/bookingList', component: import(/* webpackChunck 'userInfo' */ "@/views/system/user-info.vue") , name: '个人中心', menuShow: true },
        { path: '/omcs/booking/user-info', component:() => import(/* webpackChunck 'userInfo' */ "@/views/system/userInfolist.vue") ,name:'预约列表',menuShow:true},]
      },
    ],
  },
  {
    // 道路管理中心
    path:'/rmcs',
    type:'home',
    name:'rmcs',
    menuShow:true,
    component:Layout,
    leaf: true, // 只有一个节点
  },{
    // 系统管理中心sacs
    path:'/sacs',
    type:'home',
    name:'sacs',
    menuShow:true,
    component:Layout,
    leaf: true, // 只有一个节点
  },
  // {
  //   path: "/",
  //   redirect: "/omcs/system/userInfo",
  //   component: Layout,
  //   meta: {
  //     title: "预约管理",
  //   },
   
  // },
  // {
  //   path: "/personnel",
  //   redirect: "/personnel/personnle",
  //   component: Layout,
  //   meta: {
  //     title: "人员管理",
  //   },
  //   children: [
  //     {
  //       path: "/personnel/personnel",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/personnel/personnelList.vue"),
  //       meta: {
  //         title: "驾驶人员",
  //         roles: [],
  //       },
  //     },
  //     {
  //       path: "/yardman/yardmanList",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/personnel/yardmanList.vue"),
  //       meta: {
  //         title: "场地人员",
  //         roles: [],
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/site",
  //   redirect: "/site/siteList",
  //   component: Layout,
  //   meta: {
  //     title: "场地管理",
  //   },
  //   children: [
  //     {
  //       path: "/site/siteList",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/site/siteList.vue"),
  //       meta: {
  //         title: "场地管理",
  //         roles: [],
  //       },
  //     },
  //     {
  //       path: "/site/cinema",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/site/cinema.vue"),
  //       meta: {
  //         title: "包场",
  //         roles: [],
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/issue",
  //   component: Layout,
  //   meta: {
  //     title: "发放管理",
  //   },
  //   children: [
  //     {
  //       path: "/issue/sunCard",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/issue/sunCard.vue"),
  //       meta: {
  //         title: "通行卡管理",
  //         roles: [],
  //       },
  //     },
  //     {
  //       path: "/issue/interPhone",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/issue/interPhone.vue"),
  //       meta: {
  //         title: "对讲机管理",
  //         roles: [],
  //       },
  //     },
  //     {
  //       path: "/issue/interPhoneList",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/issue/interPhoneList.vue"),
  //       meta: {
  //         title: "对讲机记录",
  //         roles: [],
  //       },
  //     },
  //     {
  //       path: "/issue/devcise",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/issue/devcise.vue"),
  //       meta: {
  //         title: "定位设备管理",
  //         roles: [],
  //       },
  //     },
  //     {
  //       path: "/issue/devciseList",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/issue/devciseList.vue"),
  //       meta: {
  //         title: "固定设备记录",
  //         roles: [],
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/car",
  //   component: Layout,
  //   meta: {
  //     title: "车辆管理",
  //   },
  //   children: [
  //     {
  //       path: "/car/inspection",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/car/inspection/inspection.vue"),
  //       meta: {
  //         title: "巡检车辆",
  //         roles: [],
  //       },
  //     },
  //     {
  //       path: "/car/sample",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/car/sample/sample.vue"),
  //       meta: {
  //         title: "样车管理",
  //         roles: [],
  //       },
  //     },
  //     {
  //       path: "/car/recpectRecod",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/car/sample/recpectRecod.vue"),
  //       meta: {
  //         title: "收样",
  //         roles: [],
  //       },
  //     },
  //     {
  //       path: "/car/returnRecod",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/car/sample/returnRecod.vue"),
  //       meta: {
  //         title: "还样",
  //         roles: [],
  //       },
  //     },
  //     {
  //       path: "/car/cartype",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/car/cartype"),
  //       meta: {
  //         title: "车辆类型",
  //         roles: [],
  //       },
  //     },
  //   ],
  // },
  // // 消息管理
  // {
  //   path: "/message",
  //   component: Layout,
  //   meta: {
  //     title: "消息管理",
  //   },
  //   children: [
  //     {
  //       path: "/message/notifiction",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/message/notifiction.vue"),
  //       meta: {
  //         title: "通知公告",
  //         roles: [],
  //       },
  //     },
  //     {
  //       path: "/message/messageAdd",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/message/editNotific.vue"),
  //       meta: {
  //         title: "新增/编辑公告",
  //         hidden: true,
  //         roles: [],
  //       },
  //     },
  //     {
  //       path: "/message/notiMessage",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/message/notiMessage.vue"),
  //       meta: {
  //         title: "通知消息",
  //         roles: [],
  //       },
  //     },
  //     {
  //       path: "/message/helpMessage",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/message/helpMessage.vue"),
  //       meta: {
  //         title: "帮助管理",
  //         roles: [],
  //       },
  //     },
  //     {
  //       path: "/message/agreementMessage",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/message/agreementMessage.vue"),
  //       meta: {
  //         title: "协议管理",
  //         roles: [],
  //       },
  //     },
  //   ],
  // },
  // // 权限角色
  // {
  //   path: "/auth",
  //   component: Layout,
  //   meta: {
  //     title: "权限角色",
  //     roles: [],
  //   },
  //   children: [
  //     {
  //       path: "/auth/tissue",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/auth/tissue"),
  //       meta: {
  //         title: "组织管理",
  //         roles: [],
  //       },
  //     },
  //     {
  //       path: "/auth/role",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/auth/role"),
  //       meta: {
  //         title: "角色管理",
  //         roles: [],
  //       },
  //     },
  //     {
  //       path: "/auth/user",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/auth/user"),
  //       meta: {
  //         title: "用户管理",
  //         roles: [],
  //       },
  //     },
  //   ],
  // },
  //   // 系统配置
  //   {
  //     path: "/config",
  //     component: Layout,
  //     meta: {
  //       title: "系统配置",
  //       roles: [],
  //     },
  //     children: [
  //       {
  //         path: "/config/personnel",
  //         component: () => import(/* webpackChunck 'userInfo' */ "@/views/config/personnel"),
  //         meta: {
  //           title: "人员配置",
  //           roles: [],
  //         },
  //       },
  //       {
  //         path: "/config/car",
  //         component: () => import(/* webpackChunck 'userInfo' */ "@/views/config/car"),
  //         meta: {
  //           title: "车辆配置",
  //           roles: [],
  //         },
  //       },
  //       {
  //         path: "/config/fixed",
  //         component: () => import(/* webpackChunck 'userInfo' */ "@/views/config/fixed"),
  //         meta: {
  //           title: "固设配置",
  //           roles: [],
  //         },
  //       },
  //       {
  //         path: "/config/loginBg",
  //         component: () => import(/* webpackChunck 'userInfo' */ "@/views/config/loginBg"),
  //         meta: {
  //           title: "登录底图配置",
  //           roles: [],
  //         },
  //       },
  //     ],
  //   },
  //   // 系统日志
  //   {
  //     path: "/log",
  //     component: Layout,
  //     meta: {
  //       title: "系统日志",
  //       roles: [],
  //     },
  //     children: [
  //       {
  //         path: "/log/login",
  //         component: () => import(/* webpackChunck 'userInfo' */ "@/views/log/login"),
  //         meta: {
  //           title: "登录日志",
  //           roles: [],
  //         },
  //       },
  //       {
  //         path: "/log/operate",
  //         component: () => import(/* webpackChunck 'userInfo' */ "@/views/log/operate"),
  //         meta: {
  //           title: "操作日志",
  //           roles: [],
  //         },
  //       },
  //     ],
  //   },
  //   {path:'/config',
  //   meta:{
  //     title:'系统设置'
  //   },
  //   children: [
  //     {
  //       path: "/config/personnel",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/config/personnel"),
  //       meta: {
  //         title: "人员配置",
  //         roles: [],
  //       },
  //     },
  //     {
  //       path: "/config/car",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/config/car"),
  //       meta: {
  //         title: "车辆配置",
  //         roles: [],
  //       },
  //     },
  //     {
  //       path: "/config/fixed",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/config/fixed"),
  //       meta: {
  //         title: "固设配置",
  //         roles: [],
  //       },
  //     },
  //     {
  //       path: "/config/loginBg",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/config/loginBg"),
  //       meta: {
  //         title: "登录地图配置",
  //         roles: [],
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/bill",
  //   component: Layout,
  //   redirect: "/omcs/bill/billLsit",
  //   meta: {
  //     title: "账单管理",
  //   },
  //   children: [
  //     {
  //       path: "/omcs/bill/billLsit",
  //       component: () => import(/* webpackChunck 'userInfo' */ "@/views/omcs/bill"),
  //       meta: {
  //         title: "账单列表",
  //         hidden: true,
  //       },
  //     },
  //   ],
  // },
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

  // {
  //   path: "/road",
  //   redirect: "/road/barrier/gate",
  //   component: Layout,
  //   meta: {
  //     title: "道闸管理",
  //   },
  //   children: [
  //     {
  //       path: "/road/barrier/gate",
  //       component: DZGL,
  //       meta: {
  //         title: "道闸管理",
  //       },
  //     },
  //     {
  //       path: "/road/barrier/record",
  //       component: JCLV,
  //       meta: {
  //         title: "进出记录",
  //       },
  //     },
  //     {
  //       path: "/road/barrier/switch",
  //       component: KGLV,
  //       meta: {
  //         title: "开关记录",
  //       },
  //     },
  //     {
  //       path: "/road/barrier/jqlv",
  //       component: JQLV,
  //       meta: {
  //         title: "鉴权记录",
  //       },
  //     },
  //     {
  //       path: "/road/barrier/njyc",
  //       component: NJYC,
  //       meta: {
  //         title: "耐久异常",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path:'/road/video',
  //   component:Layout,
  //   redirect:'/road/video/jksb',
  //   meta:{
  //     title:'监控设备'
  //   },
  //   children:[
  //     {
  //       path: "/road/video/jksb",
  //       component: JKSB,
  //       meta: {
  //         title: "监控设备",
  //       },
  //     },
  //     {
  //       path: "/road/video/ssjk",
  //       component: SSJK,
  //       meta: {
  //         title: "实时监控",
  //       },
  //     },
  //     {
  //       path: "/road/video/history",
  //       component: HISTORY,
  //       meta: {
  //         title: "历史视频",
  //       },
  //     },
  //   ]
  // }
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
