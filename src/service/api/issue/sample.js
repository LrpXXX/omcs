import http from "@/service/http"
import qs from "qs"
export const Sample={
    // 获取样车管理数据
    getSampleList(data={pageNum:1,pageSize:10}){
        return  http.post('/system/sm-sample/getSamplePage',data).then(res=>res).catch(err=>err)
    },
    // 获取样车状态
    getStates(){
        return http.get('/system/sys-code/getSampleStates').then(res=>res).catch(err=>err)
    },
    // 送还样添加信息
    recodsAdd(data){
            return  http.postFrom('/system/sm-sample/add',qs.parse(qs.stringify(data))).then(res=>res).catch(err=>err)
    },
    // 还样图片数据
    recodeUplod(file){
        return  http.upload('/system/sm-sample/add',file,).then(res=>res).catch(err=>err)
    }
}