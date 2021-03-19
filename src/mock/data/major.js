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
            "data|100": [{
                major_id: '@id',
                major_code: '@string',
                major_name: "@name Major",
                major_students: "@int(20,150)",
                'major_college|1': ['经济与管理学院', '机械与交通工程学院', '生物与化学工程学院', '土木建筑工程学院', '电气与信息工程学院', '计算机科学与通信工程学院', '马克思主义学院'],
                major_status: "@int(0,1)",
                major_desciption: "@paragraph",
                major_create_time: "@date(yyyy-MM-dd hh:mm:ss)"
            }]
        })
        resp.data = data.data;
    }
    resp.total = resp.data.length;
    return resp;
}

function add(params) {
    let obj = JSON.parse(params.body);
    let college = colleges.filter(data => data.college_id.includes(obj.major_college));
    obj.major_id = Mock.mock("@id");
    obj.major_college = (college[0].college_name);
    obj.major_students = Mock.mock("@int(20,150)");
    resp.data.push(obj);
    resp.msg = "添加成功";
    resp.type = "success";
    return resp;
}

function del(params) {
    for (let i = 0; i < resp.data.length; i++) {
        if (resp.data[i].major_id === params.body) {
            let index = resp.data.indexOf(resp.data[i])
            resp.data.splice(index, 1);
        }
    }
    resp.msg = "成功删除";
    resp.type = "success";
    console.log(resp);
    return resp;
}

function upd(params) {
    let obj = JSON.parse(params.body);
    let college = colleges.filter(data => data.college_id.includes(obj.major_college));
    obj.major_college = college[0].college_name;
    for (let i = 0; i < resp.data.length; i++) {
        if (resp.data[i].major_id === obj.major_id) {
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