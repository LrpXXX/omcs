import http from "@/service/http";

const loginApi = {
  login(data) {
    return http
      .post("/users/login", data)
      .then((res) => res)
      .catch((e) => e);
  },
  // 获取验证码
  forget(emil) {
    return http
      .get("/system/sys-user/getCodeByMail", {
        mail:emil
      })
      .then((res) => res)
      .catch((e) => e);
  },
  // 确定验证码
  sureId(params) {
    return http
      .get("/system/sys-user/captchaAuthentication", params)
      .then((res) => res)
      .catch((e) => e);
  },
  // 修改密码
  editPassword(data) {
    return http
      .post("/system/sys-user/",data)
      .then((res) => res)
      .catch((e) => e);
  },
};

export default loginApi;
