import jwt from "jsonwebtoken"

export function setStorage(k, v) {
    return localStorage.setItem(k, JSON.stringify(v));
}

export function getStorage(k) {
    return localStorage.getItem(k);
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