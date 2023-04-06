import http from "@/service/http";
const prefix = "/system/sm-config-background"
const logBgService = {
    // 查询全部
    getLogBgList(data) {
        return http
            .get(prefix + "/getList", data)
            .then((res) => res)
            .catch((err) => err);
    },

    add(data) {
        return http.postFrom(prefix + "/add", data)
            .then((res) => res)
            .catch((err) => err)
    },
    updateById(data) {
        return http.post(prefix + "/updateById", data)
            .then((res) => res)
            .catch((err) => err)
    },
    deleteById(id) {
        return http.get(prefix + "/delId", { id })
            .then((res) => res)
            .catch((err) => err)
    },
}

export default logBgService;