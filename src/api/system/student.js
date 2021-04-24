import request from "@/utils/request"

export function addStudent(params){
    return request({
        url:'sys/student/add',
        method:'post',
        data:params
    })
}

export function getStudents(){
    return request({
        url:'sys/student/get',
        method:'get'
    })
}

export function delStudent(id){
    return request({
        url:'sys/student/del?id='+id,
        method:'delete'
    })
}

export function updStudent(params){
    return request({
        url:'sys/student/upd',
        method:'put',
        data:params
    })
}

export function getWithEStatusInfo(params){
    return request({
        url:'sys/student/getWithEStatusInfo',
        method:'post',
        data:params
    })
}