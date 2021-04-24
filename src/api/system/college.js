import request from "@/utils/request"

export function addCollege(data){
    return request({
        url:'sys/college/add',
        method:'post',
        data:data
    })
}

export function getColleges(type){
    return request({
        url:'sys/college/get?type='+type,
        method:'get'
    })
}

export function delCollege(id){
    return request({
        url:'sys/college/del?id='+id,
        method:'delete'
    })
}

export function updCollege(data){
    return request({
        url:'sys/college/upd',
        method:'put',
        data:data
    })
}