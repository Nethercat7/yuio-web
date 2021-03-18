let storage={
    set(k,v){
        localStorage.setItem(k,JSON.stringify(v))
    },
    get(k){
        return localStorage.getItem(k)
    },
    remove(k){
        localStorage.removeItem(k)
    }
}

export default storage