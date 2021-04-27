import request from "@/utils/request";

export function getRateCompare(params){
    return request({
        url:"/cmp/rate/get",
        method:"post",
        data:params
    })
}