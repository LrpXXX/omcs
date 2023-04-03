import http from "@/service/http";
export  const  Tissue={
        getTissutList(parmary){
            return  http.get('/',parmary)
        }
}
