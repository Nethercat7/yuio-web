import request from "@/utils/request"

export function addMajor(params){
    return request({
        url:'sys/major/add',
        method:'post',
        data:params
    })
}

export function getMajors(){
    return request({
        url:'sys/major/get',
        method:'get'
    })
}

export function delMajor(id){
    return request({
        url:'sys/major/del?id='+id,
        method:'delete'
    })
}

export function updMajor(params){
    return request({
        url:'sys/major/upd',
        method:'put',
        data:params
    })
}