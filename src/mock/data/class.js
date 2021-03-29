const Mock = require('mockjs');

let resp = {
    code: 1,
    data: []
}

function get() {
    if (resp.data.length===0)
        for (let i = 0; i < 200; i++) {
            let data = Mock.mock({
                class_id: '@id',
                class_code: '@string',
                class_name: '@name Class',
                class_students: '@int(20,50)',
                class_grade: '2017',
                class_status: '@int(0,1)',
                class_desciption: '@paragraph',
                class_create_time: '@date(yyyy-MM-dd hh:mm:ss)',
                class_college_id:'@id',
                class_college_name:'@name College',
                class_major_id:'@id',
                class_major_name:'@name Major'
            })
            resp.data.push(data);
        }
    resp.total = resp.data.length;
    return resp;
}

function add(params) {
    let obj = JSON.parse(params.body);
    obj.class_id=Mock.mock('@id');
    obj.class_students=Mock.mock("@int(20,50)");
    resp.data.push(obj);
    resp.msg = "成功添加";
    resp.type = "success";
    return resp;
}

function del(params) {
    for (let i = 0; i < resp.data.length; i++) {
        if (resp.data[i].class_id === params.body) {
            let index = resp.data.indexOf(resp.data[i])
            resp.data.splice(index, 1);
        }
    }
    resp.msg = "成功删除";
    resp.type = "success";
    return resp;
}

function upd(params) {
    let obj = JSON.parse(params.body);
    for (let i = 0; i < resp.data.length; i++) {
        if (resp.data[i].class_id === obj.class_id) {
            resp.data[i] = obj;
        }
    }
    resp.msg = "成功修改";
    resp.type = "success"
    return resp;
}

module.exports = {
    get,
    add,
    del,
    upd
}