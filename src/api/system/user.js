import request from "@/utils/request"

export function addUser(params) {
    return request({
        url: 'sys/user/add',
        method: 'post',
        data: params
    })
}

export function getUsers() {
    return request({
        url: 'sys/user/get',
        method: 'get'
    })
}

export function delUser(id) {
    return request({
        url: 'sys/user/del?id=' + id,
        method: 'delete'
    })
}

export function updUser(params) {
    return request({
        url: 'sys/user/upd',
        method: 'put',
        data: params
    })
}

export function getUserById(param) {
    return request({
        url: "sys/user/getById?id=" + param,
        method: "get"
    })
}

export function getUserByKeyword(param) {
    return request({
        url: "sys/user/getByKeyword?keyword=" + param,
        method: "get"
    })
}

export function updUserProfile(params) {
    return request({
        url: "sys/user/updProfile",
        method: "put",
        data: params
    })
}

export function changeUserPwd(params) {
    return request({
        url: "sys/user/changePwd",
        method: "put",
        data: params
    })
}