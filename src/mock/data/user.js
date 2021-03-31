const Mock=require('mockjs')

let resp={
    code:1,
    data:[]
}

function get(){
    if(resp.data.length===0){
        for (let index = 0; index < 30; index++) {
            let data=Mock.mock({
                user_id:'@id',
                user_account:'@string(6,13)',
                user_name:'@cname',
                user_gender:'@integer(0,1)',
                user_phone:'@id',
                user_email:'@email',
                user_status:'@integer(0,1)'
            })
            resp.data.push(data)
        }
    }
    return resp;
}

function add(params){
    let obj=JSON.parse(params.body);
    obj.user_id=Mock.mock('@id');
    resp.data.push(obj);
    resp.msg='成功添加';
    resp.type='success';
    return resp;
}

function del(params){
    for(let i=0;i<resp.data.length;i++){
        if(resp.data[i].user_id===params.body){
            let index=resp.data.indexOf(resp.data[i]);
            resp.data.splice(index,1);
            break;
        }
    }
    resp.msg='成功删除';
    resp.type='success';
    return resp;
}

function upd(params){
    let obj=JSON.parse(params.body);
    for(let i=0;i<resp.data.length;i++){
        if(resp.data[i].user_id===obj.user_id){
            resp.data[i]=obj;
            break;
        }
    }
    resp.msg='成功修改';
    resp.type='success';
    return resp;
}

module.exports={
    get,
    add,
    del,
    upd
}