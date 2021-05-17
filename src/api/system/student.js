import request from "@/utils/request"

export function addStudent(params) {
    return request({
        url: 'sys/student/add',
        method: 'post',
        data: params
    })
}

export function getStudents(params) {
    return request({
        url: 'sys/student/get',
        method: 'post',
        data: params
    })
}

export function delStudent(id) {
    return request({
        url: 'sys/student/del?id=' + id,
        method: 'delete'
    })
}

export function updStudent(params) {
    return request({
        url: 'sys/student/upd',
        method: 'put',
        data: params
    })
}

export function getWithEStatusInfo(params) {
    return request({
        url: 'sys/student/getWithEStatusInfo',
        method: 'post',
        data: params
    })
}

export function getStudentById(param) {
    return request({
        url: "sys/student/getById?id=" + param,
        method: "get"
    })
}

export function updStudentProfile(params) {
    return request({
        url: "sys/student/updProfile",
        method: "put",
        data: params
    })
}

export function changeStudentPwd(params) {
    return request({
        url: "sys/student/changePwd",
        method: "put",
        data: params
    })
}

export function outputStudents(params) {
    return request({
        url: "sys/student/output",
        method: "post",
        responseType: "blob",
        data: params
    })
}

export function uploadStudentsExcel(params) {
    return request({
        headers: { 'Content-Type': 'multipart/form-data' },
        url: "sys/student/upload",
        method: "post",
        data: params,
    })
}

export function downloadProtocol(code) {
    return request({
        url: "sys/student/downloadProtocol?code=" + code,
        method: "get",
        responseType: "blob"
    })
}