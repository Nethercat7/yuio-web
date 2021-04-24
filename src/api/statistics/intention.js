import request from "@/utils/request";

export function getIntentionCityInfo(params) {
    return request({
        url: '/stats/intention/getCityInfo',
        method: "post",
        data: params
    })
}

export function getIntentionWorkInfo(params) {
    return request({
        url: '/stats/intention/getWorkInfo',
        method: "post",
        data: params
    })
}