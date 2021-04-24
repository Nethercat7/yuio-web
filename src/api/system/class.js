import request from "@/utils/request"

export function addClass(data){
    return request({
        url:'sys/class/add',
        method:'post',
        data:data
    })
}

export function getClasses(){
    return request({
        url:'sys/class/get',
        method:'get'
    })
}

export function delClass(id){
    return request({
        url:'sys/class/del?id='+id,
        method:'delete'
    })
}

export function updClass(data){
    return request({
        url:'sys/class/upd',
        method:'put',
        data:data
    })
}