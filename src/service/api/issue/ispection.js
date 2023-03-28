import http from "@/service/http";

export const Ispection = {
  /**
   * @param  data {pageNum,pageSize,...args}
   *  @author  模糊查询和分页查询
   */
  ispectionList(data = { pageNum: 1, pageSize: 10 }) {
    return http
      .post("/system/sm-patrol-vehicle/getPatrolVehiclePage", data)
      .then((res) => res)
      .catch((err) => err);
  },
  /**
   *
   * @param {*} data {vehicleName:车辆名称 ,vehicleNumber :车牌号 ,contactPerson : 联系人 ,contactNumber: 联系电话 ,patrolType : 车辆类型 ,remaker :备注 }
   * @returns Permosie()
   */
  ispectionListAdd(data) {
    return http
      .post("/system/sm-patrol-vehicle/add", data)
      .then((res) => res)
      .catch((err) => err);
  },
  // 根据ID查询数据
  ispectionListById(id) {
    return http
      .get("/system/sm-patrol-vehicle/getById", { id })
      .then((res) => res)
      .catch((err) => err);
  },
  // 根据ID删除
  ispectionListDelId(id) {
    return http
      .get("/system/sm-patrol-vehicle/delId", { id })
      .then((res) => res)
      .catch((err) => err);
  },
  // 根据ID修改数据
  ispectionListUpdate(data) {
    return http
      .post("/system/sm-patrol-vehicle/updateById", data)
      .then((res) => res)
      .catch((err) => err);
  },
  // 根据VehicleId查询权限列表
  getVehicleId(id) {
    return http
      .get("/system/sm-patrol-vehicle-right/getVehicleId", { id })
      .then((res) => res)
      .catch((err) => err);
  },
};
