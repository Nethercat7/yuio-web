import jwt from "jsonwebtoken"

export function setStorage(k, v) {
    return localStorage.setItem(k, JSON.stringify(v));
}

export function getStorage(k) {
    let item=localStorage.getItem(k);
    if(item){
        item=item.split('"').join("")
    }
    return item;
}

export function delStorage(k) {
    return localStorage.removeItem(k);
}

export function setSubject(v) {
    localStorage.setItem("token", JSON.stringify(v))
}

export function getSubject() {
    return jwt.verify(localStorage.getItem("token").split('"').join(""), "*******")
}

export function delSubject() {
    localStorage.removeItem("token")
}

export function getSubjectId(){
    return jwt.verify(localStorage.getItem("token").split('"').join(""), "*******").id
}

export function getSubjectName(){
    return jwt.verify(localStorage.getItem("token").split('"').join(""), "*******").name
}

export function getSubjectCode(){
    return jwt.verify(localStorage.getItem("token").split('"').join(""), "*******").code
}