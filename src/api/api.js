import http from '../utils/http'

let request = ''

let api={
    getCollege(params){
        return http.get(`${request}/school/college`,params)
    },
}

export default api