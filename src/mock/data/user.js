const Mock=require('mockjs')
const Random=require('mockjs').Random

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
                user_avatar:Random.image('200x100'),
                user_status:'@integer(0,1)'
            })
            resp.data.push(data)
        }
    }
    return resp;
}

module.exports={
    get
}