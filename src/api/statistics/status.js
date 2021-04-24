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

export function getStudentPlan(params) {
    return request({
        url: '/stats/status/getStudentPlan',
        method: "post",
        data: params
    })
}