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
    console.log(obj);
    obj.user_id=Mock.mock('@id');
    resp.data.push(obj);
    resp.msg='成功添加';
    resp.type='success';
    return resp;
}

module.exports={
    get,
    add
}