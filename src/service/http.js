import axios from "axios";
import { Message, MessageBox } from "element-ui";
import router from "@/router/index";
import auth from "@/common/auth";
import { getUTCTime } from "./zdk/timeTime";

// 设置请求头和请求路径
axios.defaults.baseURL = "http://10.130.81.37:9871/system";
axios.defaults.timeout = 60000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
// token是否过期
function isTokenExpire(serverTokenExpire) {
  return getUTCTime(new Date()) >= serverTokenExpire * 1;
}
// 相应设置token
axios.interceptors.request.use(
  (config) => {
    // 自定义headers
    const interceptor = auth.getToken();
    if (config.headers && interceptor) {
      config.headers.Authorization = interceptor;
    }
    return config;
  },
  (error) => {

    return error;
  }
);

// 响应拦截
let needLogin = false; //单独针对登录进行拦截，避免页面提示多次 ’请重新登录‘；
axios.interceptors.response.use(
  (res) => {
    // code === 0请求成功
    // if (code === 200) {
    //   return Promise.resolve(res.data);
    // } else {
    //   // token失效，重新登录
    //   if (code === 20 && !needLogin) {
    //     needLogin = true;
    //     MessageBox.confirm("登录信息过期，请重新登录。", "提示", {
    //       closeOnClickModal: false,
    //       confirmButtonText: "确定",
    //       type: "warning",
    //       showClose: false,
    //       showCancelButton: false,
    //     }).then(() => {
    //       auth.removeToken();
    //       router.replace(`/login?redirect=${encodeURIComponent(router.currentRoute.fullPath)}`);
    //     });
    //   }
    //   if (!needLogin) {
    //     Message.error(res.data && res.data.msg);
    //   }
    return Promise.reject(res);
  },
  (error) => {
    // if (error.message.indexOf('timeout') !== -1) {
    //   ElMessage.error('请求超时，请重试');
    //   return;
    // }
    // if (error.message.indexOf('404') !== -1) {
    //   console.log('请求资源未找到，请稍后再试');
    //   return;
    // }
    return Promise.reject(error);
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
