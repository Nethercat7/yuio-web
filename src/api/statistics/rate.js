import request from "@/utils/request";

export function getEmplInfo(grade){
    return request({
        url:'/stats/rate/getEmplInfo?grade='+grade,
        method:"get"
    })
}

export function getCollegeEmplInfo(grade){
    return request({
        url:'/stats/rate/getCollegeEmplInfo?grade='+grade,
        method:"get"
    })
}