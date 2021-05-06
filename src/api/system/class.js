import request from "@/utils/request"

export function addClass(params){
    return request({
        url:'sys/class/add',
        method:'post',
        data:params
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

export function updClass(params){
    return request({
        url:'sys/class/upd',
        method:'put',
        data:params
    })
}

export function getClassByKeyword(param) {
    return request({
        url: "sys/class/getByKeyword?keyword=" + param,
        method: "get"
    })
}