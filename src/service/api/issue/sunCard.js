import http from "@/service/http";
export const SunCard = {
  // 模糊查询
  getListPage(parmary = { pageNum: 1, pageSize: 10 }) {
    return http
      .get("/system/sm-equipment-passcard/listPage", parmary)
      .then((res) => res)
      .catch((err) => err);
  },
  //   通行卡片新增
  addCard(data) {
    return http
      .post("/system/sm-equipment-passcard/add", data)
      .then((res) => res)
      .catch((err) => err);
  },
};
