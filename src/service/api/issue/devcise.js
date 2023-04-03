import http from "@/service/http";
export const Devcise = {
  // 分页模糊查询
  getFixedListPage(parmary = { pageNum: 1, pageSize: 10 }) {
    return http
      .get("/system/sm-equipment-positioning/listPage", parmary)
      .then((res) => res)
      .catch((err) => err);
  },
  //    固定设备使用情况
  /**
   * @param data={   contactPerson:领用/归还人员,
   *             equipmentId:设备id,
   *             endTime: 结束时间,
   *             startTime：开始时间
   *             isReturn: 0已发放 1已归还,
   *             pageNum: 1,
   *             pageSize: 10,
   *             equipmentNumber：设备编号}
   */
  getFixedUse(parmay = { pageNum: 1, pageSize: 10 }) {
    return http
      .get("/system/sm-equipment-positioning/getWorkingRecordsList", parmay)
      .then((res) => res)
      .catch((err) => err);
  },
  //    固定设备XSCL导出
};
