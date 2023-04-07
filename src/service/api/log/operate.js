import http from "@/service/http";
const prefix = "/operate/writelog"
const operateService = {
    // 分页模糊查询
    getLogByPage(data) {
        return http
            .get(prefix + "/listPage", data)
            .then((res) => res)
            .catch((err) => err);
    },
}

export default operateService;