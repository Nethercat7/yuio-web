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

export function getMajorByKeyword(param) {
    return request({
        url: "sys/major/getByKeyword?keyword=" + param,
        method: "get"
    })
}

export function outputMajors() {
    return request({
        url: "sys/major/output",
        method: "get",
        responseType: "blob"
    })
}

export function uploadMajorsExcel(params) {
    return request({
        headers: { 'Content-Type': 'multipart/form-data' },
        url: "sys/major/upload",
        method: "post",
        data: params,
    })
}