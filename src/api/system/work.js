import request from "@/utils/request"

export function addWork(params){
    return request({
        url:'sys/work/add',
        method:'post',
        data:params
    })
}

export function getWorks(){
    return request({
        url:'sys/work/get',
        method:'get'
    })
}

export function delWork(id){
    return request({
        url:'sys/work/del?id='+id,
        method:'delete'
    })
}

export function updWork(params){
    return request({
        url:'sys/work/upd',
        method:'put',
        data:params
    })
}

export function getWorkByKeyword(param) {
    return request({
        url: "sys/work/getByKeyword?keyword=" + param,
        method: "get"
    })
}

export function outputWorks() {
    return request({
        url: "sys/work/output",
        method: "get",
        responseType: "blob"
    })
}

export function uploadWorksExcel(params) {
    return request({
        headers: { 'Content-Type': 'multipart/form-data' },
        url: "sys/work/upload",
        method: "post",
        data: params,
    })
}