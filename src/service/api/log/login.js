import http from "@/service/http";
const prefix = "/system/sys-log-login"
const loginService = {
    // 分页模糊查询
    getLogByPage(data) {
        return http
            .get(prefix + "/listPage", data)
            .then((res) => res)
            .catch((err) => err);
    },
}

export default loginService;