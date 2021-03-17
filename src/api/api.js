import http from '../utils/http'

let request = ''

let api={
    getCollege(){
        return http.get(`${request}/school/college`)
    }
}

export default api