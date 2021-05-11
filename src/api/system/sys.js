import request from "@/utils/request"

export function resetPwd(params) {
    return request({
        url: 'sys/resetPwd',
        method: 'put',
        data: params
    })
}

export function doLogin(params) {
    return request({
        url: 'sys/login',
        method: 'post',
        data: params
    })
}

export function getCollegeAndMajor() {
    return request({
        url: 'sys/getCollegeAndMajor',
        method: 'get',
    })
}

export function getCompleteOrg(grade) {
    return request({
        url: 'sys/getCompleteOrg?grade=' + grade,
        method: 'get',
    })
}

export function getGrade() {
    return request({
        url: 'sys/getGrade',
        method: 'get',
    })
}

export function changePwd(params) {
    return request({
        url: "sys/changePwd",
        method: "put",
        data: params
    })
}

export function getMenus(type, id) {
    return request({
        url: "sys/getMenus?type=" + type + "&id=" + id,
        method: "get"
    })
}

export function getExcelTemplate(template, type) {
    return request({
        url: "sys/getTemplate?template=" + template + "&type=" + type,
        method: "get",
        responseType: "blob"
    })
}