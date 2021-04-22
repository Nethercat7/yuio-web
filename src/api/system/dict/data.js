import request from "@/utils/request"

export function addDictData(data){
    return request({
        url:'sys/dict/data/add',
        method:'post',
        data:data
    })
}

export function getDictData(type){
    return request({
        url:'sys/dict/data/get?type='+type,
        method:'get'
    })
}

export function delDictData(id){
    return request({
        url:'sys/dict/data/del?id='+id,
        method:'delete'
    })
}

export function updDictData(data){
    return request({
        url:'sys/dict/data/upd',
        method:'put',
        data:data
    })
}