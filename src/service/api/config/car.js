import http from "@/service/http";
const prefix = "/system/sm-config-vehicle"
const carService = {
    // 分页模糊查询
    getCarByPage(data) {
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

export default carService;