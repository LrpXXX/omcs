import http from "@/service/http";

export const Ispection = {
  // 获取所有巡检车辆数据
  ispectionList() {
    return http
      .post("/system/sm-patrol-vehicle/getPatroVehiclePage")
      .then((res) => res)
      .catch((err) => err);
  },
  // 新增巡检车辆
  /*
        *parms* data={  "contactNumber": "string",
  "contactPerson": "string",
  "createTime": "2023-03-22T09:26:42.400Z",
  "createUser": "string",
  "flag": 0,
  "id": "string",
  "patrolType": "string",
  "remark": "string",
  "tenantId": "string",
  "updateTime": "2023-03-22T09:26:42.400Z",
  "updateUser": "string",
  "vehicleName": "string",
  "vehicleNumber": "string",
  "version": 0}
        */
  ispectionListAdd(data) {
    return http
      .post("/system/sm-patrol-vehicle/addd", data)
      .then((res) => res)
      .catch((err) => err);
  },
};
