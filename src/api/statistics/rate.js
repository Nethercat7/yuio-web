import request from "@/utils/request";

export function getEmplInfo(params) {
    return request({
        url: '/stats/rate/getEmplInfo',
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