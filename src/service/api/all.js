import http from '@/service/http'

export const Allasig={
    selectionCode(data={codeValue:'YYZT'}){
        return http.post('/system/sys-code/selectCodeTextByCodeValue',data).then(res=>res).catch(err=>err)
    }
}