import request from "@/utils/request"

export function addEmplInfo(params) {
    return request({
        url: "/write/empl/add",
        method: "post",
        data: params
    })
}

export function getEmplInfo(id) {
    return request({
        url: "/write/empl/get?code=" + id,
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