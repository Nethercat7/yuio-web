import request from "@/utils/request"

export function addEmplInfo(params) {
    return request({
        url: "/write/empl/add",
        method: "post",
        data: params
    })
}

export function getEmplInfo(code) {
    return request({
        url: "/write/empl/get?code=" + code,
        method: "get"
    })
}

export function updEmplInfo(params){
    return request({
        url:"write/empl/upd",
        method:"put",
        data:params
    })
}