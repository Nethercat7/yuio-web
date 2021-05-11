import request from "@/utils/request"

export function addCity(params){
    return request({
        url:'sys/city/add',
        method:'post',
        data:params
    })
}

export function getCities(){
    return request({
        url:'sys/city/get',
        method:'get'
    })
}

export function delCity(id){
    return request({
        url:'sys/city/del?id='+id,
        method:'delete'
    })
}

export function updCity(params){
    return request({
        url:'sys/city/upd',
        method:'put',
        data:params
    })
}

export function getCityByKeyword(param) {
    return request({
        url: "sys/city/getByKeyword?keyword=" + param,
        method: "get"
    })
}

export function outputCities() {
    return request({
        url: "sys/city/output",
        method: "get",
        responseType: "blob"
    })
}

export function uploadCitiesExcel(params) {
    return request({
        headers: { 'Content-Type': 'multipart/form-data' },
        url: "sys/city/upload",
        method: "post",
        data: params,
    })
}