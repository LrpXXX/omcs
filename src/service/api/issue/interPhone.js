import http from "@/service/http";
export const InterPhone = {
  // 分页模糊查询
  getListPage(parmary) {
    return http
      .get("/system/sm-equipment-interphone/listPage", parmary)
      .then((res) => res)
      .catch((err) => err);
  },
  //   添加对讲机记录
  addListPage(data) {
    return http
      .post("/system/sm-equipment-interphone/add", data)
      .then((res) => res)
      .catch((err) => err);
  },
  //   根据ID修改对剑机发放记录
  updateListPage(data) {
    return http
      .post("/system/sm-equipment-interphone/updateById", data)
      .then((res) => res)
      .catch((err) => err);
  },
};
