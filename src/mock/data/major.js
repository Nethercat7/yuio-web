const Mock=require('mockjs');

let resp={
    code:1,
    data:null,
    msg:'success'
}

function get(){
    let data=Mock.mock({
        "data|100":[{
            major_id:'@id',
            major_code:'@string',
            major_name:"@name Major",
            major_student:"@int(20,150)",
            'major_college|1':['经济与管理学院','机械与交通工程学院','生物与化学工程学院','土木建筑工程学院','电气与信息工程学院','计算机科学与通信工程学院','马克思主义学院'],
            major_status:"@int(0,1)",
            major_desciption:"@paragraph",
            major_create_time:"@date(yyyy-MM-dd hh:mm:ss)"
        }]
    })
    resp.data=data.data;
    resp.total=resp.data.length;
    return resp;
}

module.exports={
    get
}