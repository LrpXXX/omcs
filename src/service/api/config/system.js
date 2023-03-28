import http from "@/service/http";

export const System = {
  // 获取人员配置选项
  staffing() {
    return http
      .get("/system/staffing/get")
      .then((res) => res)
      .catch((err) => err);
  },
//   添加人员配置选项
  staffigAdd(data = { smCofig: {}, codeList: {} }) {
    return http
      .post("/system/staffing/add", data)
      .then((res) => res)
      .catch((err) => err);
  },
};
