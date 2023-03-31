import http from "@/service/http";
export  const Devcise={
    // 分页模糊查询
    getFixedListPage(parmary={pageNum:1,pageSize:10}) {
        return http
            .get("/system/sm-equipment-positioning/listPage", parmary)
            .then((res) => res)
            .catch((err) => err);
    },
}
