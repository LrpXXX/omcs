import http from "@/service/http";
export const Site={
    // 查询所有道路列表信息
    getList(){
        return http.get('/system/sm-site/getList').then(res=>res).catch(err=>err)
    },
    // 分页查询数据
    getPageList(parmay){
        return  http.get('/system/sm-site/listPage',parmay).then(res=>res).catch(err=>err)
    },
    /**
     * 封场、禁用清除容量
     * @parms  {
            "field": "string",
            "primaryKey": "string",
            "value": {}
        }
        @return   Promise
     */
}