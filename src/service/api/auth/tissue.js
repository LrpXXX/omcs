import http from "@/service/http";
const APIURL = "/system/sys-org/";
export const Tissue = {
  //查询树状结构
  getTissutList() {
    return http
      .get(APIURL + "getTree")
      .then((res) => res)
      .catch((err) => err);
  },
  //分页查询
  getPageList(parmary = { pageSize: 10, pageNum: 1 }) {
    return http
      .get(APIURL + "listPage", parmary)
      .then((res) => res)
      .catch((err) => err);
  },
  tissueAdd(data) {
    return http
      .post(APIURL + "add", data)
      .then((res) => res)
      .catch((err) => err);
  },
  tissueUpdate(data) {
    return http
      .post(APIURL + "updateById", data)
      .then((res) => res)
      .catch((err) => err);
  },
};
