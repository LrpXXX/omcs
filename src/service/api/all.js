import http from '@/service/http'

export const Allasig={
    selectionCode(data={codeValue:'YYZT'}){
        return http.get('/system/sys-code/selectCodeTextByCodeValue',data).then(res=>res).catch(err=>err)
    },
    /**
     * @parmsa CDDJ场地等级  ，JFMS计费模式
     */
    siteCdCode(data={codeValue:'CDDJ'}){
        return http.get('/system/sys-code/selectCodeTextByCodeValue',data).then(res=>res).catch(err=>err)
    }

}