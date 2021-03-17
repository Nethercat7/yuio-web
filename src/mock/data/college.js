const Mock=require('mockjs');

let resp={
    code:1,
    data:null,
    msg:'success'
}

function get(){
    let data=Mock.mock({
        'data|7':[{
            college_id:'@id',
            college_code:'@string',
            college_name:'@name College',
            'college_student|100-700':0,
            college_description:'@cparagraph',
            'college_status|0-1':0,
            college_create_time:'@date'
            
        }]
    })
    resp.data=data.data;
    return resp;
}

module.exports={
    get
}