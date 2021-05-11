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

export function getDictDataByKeyword(param) {
    return request({
        url: "sys/dict/data/getByKeyword?keyword=" + param,
        method: "get"
    })
}

export function outputDictData() {
    return request({
        url: "sys/dict/data/output",
        method: "get",
        responseType: "blob"
    })
}

export function uploadDictDataExcel(params) {
    return request({
        headers: { 'Content-Type': 'multipart/form-data' },
        url: "sys/dict/data/upload",
        method: "post",
        data: params,
    })
}