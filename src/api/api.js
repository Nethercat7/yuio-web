import http from '../utils/http'

let request = 'http://192.168.1.108:8081'

let api = {
    //组织管理
    addOrg(params) {
        return http.post(`${request}/org/add`, params)
    },
    getOrg(params) {
        return http.get(`${request}/org/get`, params)
    },
    delOrg(params) {
        return http.get(`${request}/org/del?id=` + params)
    },
    updOrg(params) {
        return http.post(`${request}/org/upd`, params)
    },
    //院系管理
    addCollege(params) {
        return http.post(`${request}/college/add`, params)
    },
    getColleges(params) {
        return http.get(`${request}/college/get`, params)
    },
    delCollege(params) {
        return http.get(`${request}/college/del?id=` + params)
    },
    updCollege(params) {
        return http.post(`${request}/college/upd`, params)
    },
    //专业管理
    addMajor(params) {
        return http.post(`${request}/major/add`, params)
    },
    getMajors(params) {
        return http.get(`${request}/major/get`, params)
    },
    delMajor(params) {
        return http.get(`${request}/major/del?id=` + params)
    },
    updMajor(params) {
        return http.post(`${request}/major/upd`, params)
    },
    //班级管理
    addCls(params) {
        return http.post(`${request}/cls/add`, params)
    },
    getCls(params) {
        return http.get(`${request}/cls/get`, params)
    },
    delCls(params) {
        return http.get(`${request}/cls/del?id=` + params)
    },
    updCls(params) {
        return http.post(`${request}/cls/upd`, params)
    },
    //学生管理
    addStudent(params) {
        return http.post(`${request}/student/add`, params)
    },
    getStudents(params) {
        return http.get(`${request}/student/get`, params)
    },
    delStudent(params) {
        return http.get(`${request}/student/del?id=` + params)
    },
    updStudent(params) {
        return http.post(`${request}/student/upd`, params)
    },
    //用户管理
    addUser(params) {
        return http.post(`${request}/usr/add`, params)
    },
    getUsers(params) {
        return http.get(`${request}/usr/get`, params)
    },
    delUser(params) {
        return http.get(`${request}/usr/del?id=` + params)
    },
    updUser(params) {
        return http.post(`${request}/usr/upd`, params)
    },
    //角色管理
    addRole(params) {
        return http.post(`${request}/role/add`, params)
    },
    getRoles(params) {
        return http.get(`${request}/role/get`, params)
    },
    delRole(params) {
        return http.get(`${request}/role/del?id=` + params)
    },
    updRole(params) {
        return http.post(`${request}/role/upd`, params)
    },
    //权限管理
    getPerms(params) {
        return http.get(`${request}/perms/get`, params)
    },
    //就业率
    getERate(params) {
        return http.get(`${request}/eRate/get`, params)
    },
    getERateTotal(params) {
        return http.get(`${request}/eRate/getTotal`, params)
    },
    //系统功能
    resetPwd(params) {
        return http.post(`${request}/sys/resetPwd`, params)
    },
    login(params) {
        return http.post(`${request}/sys/login`, params)
    },
    studentLogin(params){
        return http.post(`${request}/sys/studentLogin`,params)
    },
    saveEmploymentStatus(params){
        return http.post(`${request}/sys/saveEmploymentStatus`,params)
    },
    getEStatus(params){
        return http.get(`${request}/sys/getEStatus?id=`+params)
    },
    getCollegeAndMajor(params){
        return http.get(`${request}/sys/getCollegeAndMajor`,params)
    },
    getFullOrg(params){
        return http.get(`${request}/sys/getFullOrg`,params)
    },
    //菜单管理
    addMenu(params) {
        return http.post(`${request}/menu/add`, params)
    },
    getMenu(params){
        return http.get(`${request}/menu/get`,params)
    },
    delMenu(params){
        return http.get(`${request}/menu/del?id=`+params)
    },
    updMenu(params){
        return http.post(`${request}/menu/upd`,params)
    },
    //数据统计模块
    getTotalEmploymentInfo(params){
        return http.get(`${request}/statistics/getTotalEmploymentInfo`,params)
    },
    getCollegeEmploymentInfo(params){
        return http.get(`${request}/statistics/getCollegeEmploymentInfo`,params)
    },
    getEmploymentCityInfo(params){
        return http.get(`${request}/statistics/getEmploymentCityInfo`,params)
    },
    getEmploymentWorkInfo(params){
        return http.get(`${request}/statistics/getEmploymentWorkInfo`,params)
    },
    getUnEmploymentStudentPlan(params){
        return http.get(`${request}/statistics/getUnEmploymentStudentPlan`,params)
    },
    getIntentionCityInfo(params){
        return http.get(`${request}/statistics/getIntentionCityInfo`,params)
    }
}

export default api