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
        url: 'sys/getFullOrg?grade='+grade,
        method: 'get',
    })
}

export function getGrade(){
    return request({
        url: 'sys/getGrade',
        method: 'get',
    })
}