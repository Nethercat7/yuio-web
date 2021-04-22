import request from "@/utils/request"

export function addDictType(data){
    return request({
        url:'sys/dict/type/add',
        method:'post',
        data:data
    })
}

export function getDict(){
    return request({
        url:'sys/dict/type/get',
        method:'get'
    })
}

export function delDict(id){
    return request({
        url:'sys/dict/type/del?id='+id,
        method:'delete'
    })
}