import axios from "axios";
import { Message, MessageBox } from "element-ui";
import router from "@/router/index";
import auth from "@/common/auth";
import { getUTCTime } from "./zdk/timeTime";
import tools from "@/service/zdk/tools";


// 设置请求头和请求路径
axios.defaults.baseURL = process.env.VUE_APP_URL;
axios.defaults.timeout = 60000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
let isTokenRefreshing = false; // 当标志为true 代表程序正在获取新token
let subscribesArr = []; // 存储前端发送请求的数组
const tokenRequestTime = 100; // token离过期提前请求时间（单位：秒）
// 被拦截的请求push到数组中
function subscribesArrRefresh(cb) {
  subscribesArr.push(cb);
}
// 用新token发起请求队列中的所有请求
function reloadSubscribesArr(newToken) {
  subscribesArr.map((cb) => {
    // console.log("当前存储接口数为:" + subscribesArr.length);
    cb(newToken);
  });
}
// token是否过期
function isTokenExpire(serverTokenExpire) {
  return getUTCTime(new Date()) >= serverTokenExpire * 1;
}
//配置拦截器白名单

const   withList=['/sso/authenticate/login',`${process.env.VUE_APP_URL}sso/authenticate/refreshToken`]
// 相应设置token
axios.interceptors.request.use(
  (config) => {
    console.log(config)

    // 是否需要拦截
    // if (config.interceptor === "undefined" || !config.interceptor) {
    //   console.log('进来了这里')
    //   return config;
    // }
    if(withList.includes(config.url)){
      return  config
    }else {
      // 自定义headers
      let token = auth.getToken(); // 获取当前token值
      let refreshToken = sessionStorage.getItem("refreshToken"); // 刷新token值
      let validTime = sessionStorage.getItem("validTime"); // 获取获取token有效时间
      //  判断token是否失效
      if (validTime === "undefined" || isTokenExpire(validTime)) {
        console.log(isTokenExpire(validTime),'时间到期了呀')
        //  判断是否在获取新的token请求
        if (!isTokenRefreshing) {
          isTokenRefreshing = true;
          //  请求token的地址
          const url = process.env.VUE_APP_URL+"sso/authenticate/refreshToken";
          axios.post(url, { accessToken: token, refreshToken: refreshToken }).then((res) => {
            console.log(res)
            if (res.status == 200 && res.data.code == 200) {
              tools.setSession("accessToken", res.data.data.accessToken);
              tools.setSession("refreshToken", res.data.data.refreshToken);
              auth.setToken(res.data.data.accessToken);
              auth.setRefreshToken(res.data.data.refreshToken);
              // sso
              tools.setSession("validTime", new Date().getTime() + Number(res.data.data.expiresIn) * 1000);
              isTokenRefreshing = false;
              reloadSubscribesArr(res.data.data.accessToken);
            } else {
              // 请求失败，清空缓存，返回登录页
              isTokenRefreshing = false;
              Message.warning("登录失效，请重新登录。", 5);
              subscribesArr = [];
              tools.delAllSession();
              router.options.isInitChildren = false;
              router
                  .replace({
                    path: "/login",
                    query: {
                      redirect: router.currentRoute.fullPath,
                    },
                  })
                  .catch((err) => {
                    console.log(err,'进行了错误嘛');
                    // 请求失败，清空缓存，返回登录页
                    isTokenRefreshing = false;
                    Message.warning("登录超时，请重新登录。", 5);
                    subscribesArr = [];
                    tools.delAllSession();
                    router.options.isInitChildren = false;
                    router.replace({
                      path: "/login",
                      query: {
                        redirect: router.currentRoute.fullPath,
                      },
                    });
                  });
            }
          });
        }
        let retry = new Promise((resolve, reject) => {
          subscribesArrRefresh((newToken) => {
            config.headers.Authorization = newToken;
            resolve(config);
          });
        });
        return retry;
      } else {
        console.log('时间未失效')
        config.headers.Authorization = auth.getToken();
        return config;
      }
    }

  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
let needLogin = false; //单独针对登录进行拦截，避免页面提示多次 ’请重新登录‘；
axios.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
    error => {
      console.log(error.response)
      if (error.response) {
        switch (error.response.status) {
          case 403:
            switch (error.response.data.data) {
              case 'F': // 非法
                Message.error('您的token非法，请不要恶意尝试。', 5)
                console.error('您的token非法，请不要恶意尝试!')
                break
              case 'S': // 失效
                Message.warning('登录已过期，请重新登陆！', 5)
                console.error('登录已过期，请重新登陆!')
                break
              case 'N': // 不存在
                Message.error('token值无效！', 5)
                console.error('token值无效!')
                break
              case 'G': // 过期
                Message.warning('您的token过期，请重新登录!', 5)
                console.error('您的token过期，请获取新token!')
                break
              case 'Q': // 人为挤下线
                Message.warning('您的账号在其它设备上登录,请重新登录!', 5)
                console.error('您的账号在其它设备上登录,请重新登录!')
                break
              default:
                return true
            }
            sessionStorage.clear()
            localStorage.removeItem('token')
            localStorage.removeItem('validTime')
            router.options.isInitChildren = false

            router.replace({
              path: '/',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
            sessionStorage.clear()
            break
        }
      }
      return error.response
    }
);

const http = {
  get(url, params, headers) {
    return new Promise((resolve, reject) => {
      axios({ method: "get", url, params, headers })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
  post(url, data, headers) {
    return new Promise((resolve, reject) => {
      axios({ method: "post", url, data, headers })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
  postFrom(url, data, headers) {
    return new Promise((resolve, reject) => {
      axios({ method: "post", url, data, headers })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, file, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
};
export default http;
