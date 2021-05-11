import request from "@/utils/request"

export function addCollege(params) {
    return request({
        url: 'sys/college/add',
        method: 'post',
        data: params
    })
}

export function getColleges() {
    return request({
        url: 'sys/college/get',
        method: 'get',
    })
}

export function delCollege(id) {
    return request({
        url: 'sys/college/del?id=' + id,
        method: 'delete'
    })
}

export function updCollege(params) {
    return request({
        url: 'sys/college/upd',
        method: 'put',
        data: params
    })
}

export function getCollegeByKeyword(param) {
    return request({
        url: "sys/college/getByKeyword?keyword=" + param,
        method: "get"
    })
}

export function outputColleges() {
    return request({
        url: "sys/college/output",
        method: "get",
        responseType: "blob"
    })
}

export function uploadCollegesExcel(params) {
    return request({
        headers: { 'Content-Type': 'multipart/form-data' },
        url: "sys/college/upload",
        method: "post",
        data: params,
    })
}