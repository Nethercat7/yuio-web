import request from "@/utils/request"

export function addPerms(params){
    return request({
        url:'sys/perms/add',
        method:'post',
        data:params
    })
}

export function getPerms(){
    return request({
        url:'sys/perms/get',
        method:'get'
    })
}

export function delPerms(id){
    return request({
        url:'sys/perms/del?id='+id,
        method:'delete'
    })
}

export function updPerms(params){
    return request({
        url:'sys/perms/upd',
        method:'put',
        data:params
    })
}

export function getPermsByKeyword(param) {
    return request({
        url: "sys/perms/getByKeyword?keyword=" + param,
        method: "get"
    })
}

export function outputPerms() {
    return request({
        url: "sys/perms/output",
        method: "get",
        responseType: "blob",
    })
}