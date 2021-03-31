import http from '../utils/http'

let request = ''

let api={
    //院系管理
    getColleges(params){
        return http.get(`${request}/school/college`,params)
    },
    addCollege(params){
        return http.post(`${request}/school/college/add`,params)
    },
    updCollege(params){
        return http.post(`${request}/school/college/upd`,params)
    },
    delCollege(params){
        return http.get(`${request}/school/college/del`,params)
    },
    //专业管理
    getMajors(params){
        return http.get(`${request}/school/major`,params)
    },
    addMajor(params){
        return http.post(`${request}/school/major/add`,params)
    },
    delMajor(params){
        return http.get(`${request}/school/major/del`,params)
    },
    updMajor(params){
        return http.post(`${request}/school/major/upd`,params)
    },
    //班级管理
    getClasses(params){
        return http.post(`${request}/school/class`,params)
    },
    addClass(params){
        return http.post(`${request}/school/class/add`,params)
    },
    delClass(params){
        return http.get(`${request}/school/class/del`,params)
    },
    updClass(params){
        return http.post(`${request}/school/class/upd`,params)
    },
    //学生管理
    addStudent(params){
        return http.post(`${request}/student/add`,params)
    },
    getStudents(params){
        return http.get(`${request}/student`,params)
    },
    delStudent(params){
        return http.get(`${request}/student/del`,params)
    },
    updStudent(params){
        return http.post(`${request}/student/upd`,params)
    },
    //用户管理
    getUsers(params){
        return http.get(`${request}/user`,params)
    },
    addUser(params){
        return http.post(`${request}/user/add`,params)
    },
    delUser(params){
        return http.get(`${request}/user/del`,params)
    },
    updUser(params){
        return http.post(`${request}/user/upd`,params)
    }
}

export default api