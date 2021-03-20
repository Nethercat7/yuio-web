const Mock = require('mockjs');

let resp = {
    code: 1,
    data: null
}

let colleges = [{
    college_id: '430000197107012143',
    college_name: '经济与管理学院',
}, {
    college_id: '610000198201238526',
    college_name: '机械与交通工程学院',
}, {
    college_id: '210000200202030853',
    college_name: '生物与化学工程学院',
}, {
    college_id: '450000200702223402',
    college_name: '土木建筑工程学院',
}, {
    college_id: '230000200611067853',
    college_name: '电气与信息工程学院',
}, {
    college_id: '210000198001017302',
    college_name: '计算机科学与通信工程学院',
}, {
    college_id: '71000020120426500X',
    college_name: '马克思主义学院',
}]

function get() {
    if (resp.data === null) {
        let data = Mock.mock({
            "data|50": [{
                class_id: '@id',
                class_code: '@string',
                class_name: '@name Class',
                class_students: '@int(20,50)',
                'class_college|1': ['经济与管理学院', '机械与交通工程学院', '生物与化学工程学院', '土木建筑工程学院', '电气与信息工程学院', '计算机科学与通信工程学院', '马克思主义学院'],
                class_major: '@name Major',
                class_grade: '2017',
                class_status: '@int(0,1)',
                class_desciption: '@paragraph',
                class_create_time: '@date(yyyy-MM-dd hh:mm:ss)'
            }]
        })
        resp.data = data.data;
    }
    resp.total = resp.data.length;
    return resp;
}

function add(params) {
    let obj = JSON.parse(params.body);
    let college = colleges.filter(data => data.college_id.includes(obj.class_college));
    obj.class_college = college[0].college_name;
    obj.class_id = Mock.mock("@id");
    obj.class_students = Mock.mock("@int(20,50)")
    obj.class_create_time = Mock.mock('@date(yyyy-MM-dd hh:mm:ss)')
    resp.data.push(obj);
    resp.msg = "成功添加班级" + obj.class_name;
    resp.type = "success";
    console.log(resp.data)
    return resp;
}

function del(params){
    let className;
    for (let i = 0; i < resp.data.length; i++) {
        if (resp.data[i].class_id === params.body) {
            let index = resp.data.indexOf(resp.data[i])
            className=resp.data[i].class_name;
            resp.data.splice(index, 1);
        }
    }
    resp.msg = "成功删除班级:"+className;
    resp.type = "success";
    return resp;
}

module.exports = {
    get,
    add,
    del
}