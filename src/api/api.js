import http from '../utils/http'

let request = ''

let api={
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
    }
}

export default api