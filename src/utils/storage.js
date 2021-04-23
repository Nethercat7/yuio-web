import jwt from 'jsonwebtoken'

let storage = {
    set(k, v) {
        localStorage.setItem(k, JSON.stringify(v))
    },
    get(k) {
        return localStorage.getItem(k).split('"').join("")
    },
    remove(k) {
        localStorage.removeItem(k)
    },
    parse(k) {
        return jwt.decode(localStorage.getItem(k))
    },
    setSubject(v) {
        localStorage.setItem("token", JSON.stringify(v))
    },
    getSubject() {
        return jwt.verify(this.get('token'),"*******")
    },
    removeSubject() {
        localStorage.removeItem('token')
    }
}

export default storage