import request from "@/utils/request"

export function addRole(params){
    return request({
        url:'sys/role/add',
        method:'post',
        data:params
    })
}

export function getRoles(){
    return request({
        url:'sys/role/get',
        method:'get'
    })
}

export function delRole(id){
    return request({
        url:'sys/role/del?id='+id,
        method:'delete'
    })
}

export function updRole(params){
    return request({
        url:'sys/role/upd',
        method:'put',
        data:params
    })
}

export function outputRoles() {
    return request({
        url: "sys/role/output",
        method: "get",
        responseType: "blob",
    })
}

export function downloadRoleExcelTemplate(type) {
    return request({
        url: "sys/role/download?type=" + type,
        method: "get",
        responseType: "blob",
    })
}