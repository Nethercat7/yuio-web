import request from "@/utils/request";

export function getEmplCityInfo(params) {
    return request({
        url: '/stats/status/getCityInfo',
        method: "post",
        data: params
    })
}

export function getEmplWorkInfo(params) {
    return request({
        url: '/stats/status/getWorkInfo',
        method: "post",
        data: params
    })
}

export function getUnEmplStudentPlan(params) {
    return request({
        url: '/stats/status/getUnEmplStudentPlan',
        method: "post",
        data: params
    })
}

export function getEmplStudentPlan(params) {
    return request({
        url: '/stats/status/getEmplStudentPlan',
        method: "post",
        data: params
    })
}