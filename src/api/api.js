import http from '../utils/http'

let request = 'http://192.168.1.108:8081'

let api={
    //院系管理
    addCollege(params){
        return http.post(`${request}/college/add`,params)
    },
    getColleges(params){
        return http.get(`${request}/college/get`,params)
    },
    delCollege(params){
        return http.get(`${request}/college/del?id=`+params)
    },
    updCollege(params){
        return http.post(`${request}/college/upd`,params)
    },
    //专业管理
    getMajors(params){
        return http.get(`${request}/school/major/get`,params)
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
        return http.post(`${request}/school/class/get`,params)
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
        return http.get(`${request}/student/get`,params)
    },
    delStudent(params){
        return http.get(`${request}/student/del`,params)
    },
    updStudent(params){
        return http.post(`${request}/student/upd`,params)
    },
    //用户管理
    getUsers(params){
        return http.get(`${request}/user/get`,params)
    },
    addUser(params){
        return http.post(`${request}/user/add`,params)
    },
    delUser(params){
        return http.get(`${request}/user/del`,params)
    },
    updUser(params){
        return http.post(`${request}/user/upd`,params)
    },
    //角色管理
    getRoles(params){
        return http.get(`${request}/role/get`,params)
    },
    addRole(params){
        return http.post(`${request}/role/add`,params)
    },
    updRole(params){
        return http.post(`${request}/role/upd`,params)
    },
    delRole(params){
        return http.get(`${request}/role/del`,params)
    },
    //权限管理
    getPerms(params){
        return http.get(`${request}/perms/get`,params)
    },
    //就业率
    getERate(params){
        return http.get(`${request}/eRate/get`,params)
    },
    getERateTotal(params){
        return http.get(`${request}/eRate/getTotal`,params)
    },
    //城市API
    getCityies(params){
        return http.get(`${request}/cityies/get`,params);
    }
}

export default api