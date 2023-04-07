import http from "@/service/http";
const prefix = "/system/sys-code"
const sysCodeService = {
    // 根据codeValue查询字典数据
    selectCodeTextByCodeValue(data) {
        return http
            .get(prefix + "/selectCodeTextByCodeValue", { codeValue: data })
            .then((res) => res)
            .catch((err) => err);
    }
}

export default sysCodeService;