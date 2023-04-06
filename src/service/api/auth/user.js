import http from "@/service/http";

const APIURL = "/system/sys-user/";
export const User = {
  getList(parmary) {
    return http
      .get(APIURL + "/listPage", parmary)
      .then((res) => res)
      .catch((err) => err);
  },
};
