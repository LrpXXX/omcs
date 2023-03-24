import http from "@/service/http";
export const Site={
    getList(){
        return http.get('/system/sm-site/getList').then(res=>res).catch(err=>err)
    }
}