import request from "@/utils/request"

export function addUser(params){
    return request({
        url:'sys/user/add',
        method:'post',
        data:params
    })
}

export function getUsers(){
    return request({
        url:'sys/user/get',
        method:'get'
    })
}

export function delUser(id){
    return request({
        url:'sys/user/del?id='+id,
        method:'delete'
    })
}

export function updUser(params){
    return request({
        url:'sys/user/upd',
        method:'put',
        data:params
    })
}