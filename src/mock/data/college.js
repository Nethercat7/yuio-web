const Mock = require('mockjs');

let resp = {
    code: 1,
    data: [{
        college_id: '430000197107012143',
        college_code: 'jgy',
        college_name: '经济与管理学院',
        college_students: 465,
        college_description: '经济与管理学院',
        college_status: 0,
        college_create_time: '2021-01-01 02:57:22'
    }, {
        college_id: '610000198201238526',
        college_code: 'jjy',
        college_name: '机械与交通工程学院',
        college_students: 665,
        college_description: '机械与交通工程学院',
        college_status: 1,
        college_create_time: '2021-01-01 02:57:22'
    }, {
        college_id: '210000200202030853',
        college_code: 'shy',
        college_name: '生物与化学工程学院',
        college_students: 345,
        college_description: '生物与化学工程学院',
        college_status: 0,
        college_create_time: '2021-01-01 02:57:22'
    }, {
        college_id: '450000200702223402',
        college_code: 'tjy',
        college_name: '土木建筑工程学院',
        college_students: 323,
        college_description: '土木建筑工程学院',
        college_status: 1,
        college_create_time: '2021-01-01 02:57:22'
    }, {
        college_id: '230000200611067853',
        college_code: 'dxy',
        college_name: '电气与信息工程学院',
        college_students: 346,
        college_description: '电气与信息工程学院',
        college_status: 0,
        college_create_time: '2021-01-01 02:57:22'
    }, {
        college_id: '210000198001017302',
        college_code: 'jty',
        college_name: '计算机科学与通信工程学院',
        college_students: 485,
        college_description: '计算机科学与通信工程学院',
        college_status: 0,
        college_create_time: '2021-01-01 02:57:22'
    }, {
        college_id: '71000020120426500X',
        college_code: 'my',
        college_name: '马克思主义学院',
        college_students: 124,
        college_description: '马克思主义学院',
        college_status: 0,
        college_create_time: '2021-01-01 02:57:22'
    }],
    msg: 'success'
}

function get() {
    resp.total=resp.data.length;
    return resp;
}

function add(options) {
    let obj = JSON.parse(options.body);
    obj.college_id = Mock.mock('@id');
    obj.college_student = Mock.mock('@int(100,700)');
    resp.data.push(obj);
    resp.total=resp.data.length;
    return resp;
}

function upd(options) {
    let obj = JSON.parse(options.body);
    for (let i = 0; i < resp.data.length; i++) {
        if (resp.data[i].college_id === obj.college_id) {
            resp.data[i] = obj;
        }
    }
    resp.total=resp.data.length;
    return resp;
}

module.exports = {
    get,
    add,
    upd
}