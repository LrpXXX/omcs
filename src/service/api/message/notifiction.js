import http from "@/service/http";
const prefix = "/system/sm-notice"
const notification = {
    // 分页模糊查询
    getNotificationByPage(data) {
        return http
            .get(prefix + "/listPage", data)
            .then((res) => res)
            .catch((err) => err);
    },
    add(data) {
        return http.post(prefix + "/add", data)
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

export default notification;