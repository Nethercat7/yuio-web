import request from "@/utils/request";

export function getEmplInfo(grade) {
    return request({
        url: '/stats/rate/getEmplInfo?grade=' + grade,
        method: "get"
    })
}

export function getCollegeEmplInfo(grade) {
    return request({
        url: '/stats/rate/getCollegeEmplInfo?grade=' + grade,
        method: "get"
    })
}

export function test(params) {
    return request({
        url: '/stats/rate/getEmplInfoBy',
        method: "post",
        data: params
    })
}

export function outputRates(params) {
    return request({
        url: "/stats/rate/output",
        method: "post",
        responseType: "blob",
        data: params
    })
}