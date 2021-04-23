import request from "@/utils/request"

export function doLogin(params){
    return request({
        url:'sys/login',
        method:'post',
        data:params
    })
}