import http from "@/service/http";
export const Site = {
  // 查询所有道路列表信息
  getList() {
    return http
      .get("/system/sm-site/getList")
      .then((res) => res)
      .catch((err) => err);
  },
  // 根据ID查询数据
  getOneList(id) {
    return http
      .get("/system/sm-site/getById", { id })
      .then((res) => res)
      .catch((err) => err);
  },
  // 分页查询数据
  getPageList(parmay = { pageNum: 1, pageSize: 10 }) {
    return http
      .get("/system/sm-site/listPage", parmay)
      .then((res) => res)
      .catch((err) => err);
  },
  /**
     * 封场、禁用清除容量
     * @parms  {
            "field": "string", 对应字段
            "primaryKey": "string",  id
            "value": {}  需要改变得值
        }
        @return   Promise
     */
  updateFlid(data) {
    return http
      .post("/system/sm-site/updateField", data)
      .then((res) => res)
      .catch((err) => err);
  },
  //根据ID修改数据
  updateByID(data) {
    return http
      .post("/system/sm-site/updateById", data)
      .then((res) => res)
      .catch((err) => err);
  },
  // 添加道路数据
  addSiteLsit(data) {
    return http
      .post("/system/sm-site/add", data)
      .then((res) => res)
      .catch((err) => err);
  },
};
