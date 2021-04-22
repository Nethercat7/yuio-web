import request from "@/utils/request"

export function addDictType(data){
    return request({
        url:'sys/dict/type/add',
        method:'post',
        data:data
    })
}