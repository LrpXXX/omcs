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
  //发放设备接口
  getIusse(data = { bookingId, equipmentId, equipmentType: "通信卡" || "定位设备" || "对讲机", equipmentNumber, isReturn: 0 || 1, occouredTime }) {
    return http
      .post("/system/sm-equipment/issue", data)
      .then((res) => res)
      .catch((err) => err);
  },
  //收回设备接口
  /**
   * @param data={   equipmentId:归还ID,
   *             equipmentNumber:设备编号,
   *             occouredTime: 归还时间,
   *             contactPerson: 归还人员,
   *             contactNumber: 归还人员电话,
   *             isReturn: 0发放 1收回,
   *             bookingId: 1,
   *             equipmentType: '通信卡'||'定位设备'||'对讲机',
   *             returnType: 1试验结束 2设备损坏,}
   *
   */
  getIusseClose(data) {
    return http
      .post("/system/sm-equipment/returnEquipment", data)
      .then((res) => res)
      .catch((err) => err);
  },
  //  获取对讲机发放收取获取到数据
/**
 * @param data={   contactPerson:领用/归还人员,
 *             equipmentId:设备id,
 *             endTime: 结束时间,
 *             startTime：开始时间
 *             isReturn: 0已发放 1已归还,
 *             pageNum: 1,
 *             pageSize: 10,}
 */
  getWorkingRecordsList(data={pageNum:1,pageSize:10}) {
    return http
      .get("/system/sm-equipment-interphone/getWorkingRecordsList", data)
      .then((res) => res)
      .catch((err) => err);
  },
};
