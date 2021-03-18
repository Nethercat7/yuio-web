import http from '../utils/http'

let request = ''

let api={
    getCollege(params){
        return http.get(`${request}/school/college`,params)
    },
    addCollege(params){
        return http.post(`${request}/school/college/add`,params)
    },
    updCollege(params){
        return http.post(`${request}/school/college/upd`,params)
    },
    getMajor(params){
        return http.get(`${request}/school/major`,params)
    }
}

export default api