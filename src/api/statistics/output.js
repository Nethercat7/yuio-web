import request from "@/utils/request";

export function outputCityInfo(params) {
    return request({
        url: '/stats/output/city',
        method: "post",
        responseType: "blob",
        data: params
    })
}

export function outputWorkInfo(params) {
    return request({
        url: '/stats/output/work',
        method: "post",
        responseType: "blob",
        data: params
    })
}

export function outputStudentPlan(params) {
    return request({
        url: '/stats/output/plan',
        method: "post",
        responseType: "blob",
        data: params
    })
}