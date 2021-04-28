import request from "@/utils/request";

export function getSelfCompare(params){
    return request({
        url:"/cmp/rate/getSelf",
        method:"post",
        data:params
    })
}