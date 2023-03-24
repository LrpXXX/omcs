import http from "@/service/http"
export const Sample={
    // 获取样车管理数据
    getSampleList(data={pageNum:1,pageSize:10}){
        return  http.post('/system/sm-sample/getSamplePage',data).then(res=>res).catch(err=>err)
    },
    // 获取样车状态
    getStates(){
        return http.get('/system/sys-code/getSampleStates').then(res=>res).catch(err=>err)
    }
}