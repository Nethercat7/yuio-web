let resp = {
    code: 1,
    data: []
}

function add(params){
    let obj=JSON.parse(params.body);
    resp.data.push(obj);
    resp.msg="成功添加";
    resp.type="success";
    console.log(obj);
    return resp;
}

function get(){
    return resp;
}

module.exports={
    add,
    get
}