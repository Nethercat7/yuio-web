import http from '../utils/http'

let request = 'http://192.168.1.108:8081'

let api={
    //组织管理
    addOrg(params){
        return http.post(`${request}/org/add`,params)
    },
    getOrg(params){
        return http.get(`${request}/org/get`,params)
    },
    delOrg(params){
        return http.get(`${request}/org/del?id=`+params)
    },
    updOrg(params){
        return http.post(`${request}/org/upd`,params)
    },
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
    addMajor(params){
        return http.post(`${request}/major/add`,params)
    },
    getMajors(params){
        return http.get(`${request}/major/get`,params)
    },
    delMajor(params){
        return http.get(`${request}/major/del?id=`+params)
    },
    updMajor(params){
        return http.post(`${request}/major/upd`,params)
    },
    //班级管理
    addCls(params){
        return http.post(`${request}/cls/add`,params)
    },
    getCls(params){
        return http.get(`${request}/cls/get`,params)
    },
    delCls(params){
        return http.get(`${request}/cls/del?id=`+params)
    },
    updCls(params){
        return http.post(`${request}/cls/upd`,params)
    },
    //学生管理
    addStudent(params){
        return http.post(`${request}/student/add`,params)
    },
    getStudents(params){
        return http.get(`${request}/student/get`,params)
    },
    delStudent(params){
        return http.get(`${request}/student/del?id=`+params)
    },
    updStudent(params){
        return http.post(`${request}/student/upd`,params)
    },
    //用户管理
    addUser(params){
        return http.post(`${request}/usr/add`,params)
    },
    getUsers(params){
        return http.get(`${request}/user/get`,params)
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
    },
    //系统功能
    resetPwd(params){
        return http.post(`${request}/sys/resetPwd`,params)
    },
    login(params){
        return http.post(`${request}/sys/login`,params)
    }
}

export default api