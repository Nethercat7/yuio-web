import request from "@/utils/request"

export function addRole(params){
    return request({
        url:'sys/role/add',
        method:'post',
        data:params
    })
}

export function getRoles(){
    return request({
        url:'sys/role/get',
        method:'get'
    })
}

export function delRole(id){
    return request({
        url:'sys/role/del?id='+id,
        method:'delete'
    })
}

export function updRole(params){
    return request({
        url:'sys/role/upd',
        method:'put',
        data:params
    })
}