const Mock = require('mockjs');

let resp = {
    code: 1,
    data: []
}

function add(params) {
    let obj = JSON.parse(params.body);
    resp.data.push(obj);
    resp.msg = "成功添加";
    resp.type = "success";
    return resp;
}

function get() {
    if (resp.data.length === 0) {
        for (let i = 0; i < 30; i++) {
            let data = Mock.mock({
                student_id: "@id",
                student_name: '@cname',
                student_code: '@id',
                student_grade: '2017',
                student_college_id: '@id',
                student_major_id: '@id',
                student_college_name: '@name College',
                student_major_name: '@name Major',
                student_status: '@integer(0,2)',
                student_class_id:'@id',
                student_class_name:'@name Class'
            })
            resp.data.push(data);
        }
    }
    return resp;
}

function del(params){
    for(let i=0;i<resp.data.length;i++){
        if(resp.data[i].student_id===params.body){
           let index=resp.data.indexOf(resp.data[i]);
           resp.data.splice(index,1);
           break;
        }
    }
    resp.msg="成功删除";
    resp.type = "success";
    return resp;
}

module.exports = {
    add,
    get,
    del
}