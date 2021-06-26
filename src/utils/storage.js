import jwt from "jsonwebtoken"
import router from '../router';

export function setStorage(k, v) {
    return localStorage.setItem(k, JSON.stringify(v));
}

export function getStorage(k) {
    let item = localStorage.getItem(k);
    if (item) {
        item = item.split('"').join("")
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
    let subject = verifyToken();
    subject.id.toFixed(0);
    return subject
}

export function delSubject() {
    localStorage.removeItem("token")
}

export function getSubjectId() {
    return verifyToken().id.toFixed(0);//因为JS数字类型过长会造成精度丢失，所以使用雪花算法作为ID的话，要先转为字符串。
}

export function getSubjectName() {
    return verifyToken().name
}

export function getSubjectCode() {
    return verifyToken().code
}

export function getSubjectType() {
    return verifyToken().type
}

function verifyToken() {
    let token = null;
    try {
        token = jwt.verify(localStorage.getItem("token").split('"').join(""), "*******")
    } catch (error) {
        if (error.name == 'TokenExpiredError') {
            router.push("/login")
        }
    }
    return token;
}