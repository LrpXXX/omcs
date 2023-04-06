import http from "@/service/http";
const APIURL = "/system/sys-role/";
export const Role = {
  getList(parmary = { pageNum: 1, pageSize: 10 }) {
    return http
      .get(APIURL + "listPage", parmary)
      .then((res) => res)
      .catch((err) => err);
  },
  add(data) {
    return http
      .post(APIURL + "add", data)
      .then((res) => res)
      .catch((err) => err);
  },
  update(data) {
    return http
      .post(APIURL + "updateById", data)
      .then((res) => res)
      .catch((err) => err);
  },
};
