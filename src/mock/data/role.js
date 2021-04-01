const Mock = require('mockjs');

let resp = {
    code: 1,
    data: []
}

function get() {
    if (resp.data.length === 0) {
        for (let index = 0; index < 10; index++) {
            let data = Mock.mock({
                role_id: '@id',
                role_code: '@string',
                role_name: '@name Role',
                role_create_time: '@date(yyyy-MM-dd hh:mm:ss)',
                role_status:'@int(0,1)'
            });
            resp.data.push(data);
        }
    }
    return resp;
}

function add(params){
    let obj=JSON.parse(params.body);
    obj.role_id=Mock.mock('@id');
    obj.role_create_time=dateFtt('yyyy-MM-dd hh:mm:ss',new Date());
    resp.data.push(obj);
    resp.msg='成功添加';
    resp.type='success';
    return resp;
}

function upd(params){
    let obj=JSON.parse(params.body);
    for (let index = 0; index < resp.data.length; index++) {
        if(resp.data[index].role_id===obj.role_id){
            resp.data[index]=obj;
            break;
        }
    }
    resp.msg='成功修改';
    resp.type='success';
    return resp;
}

function dateFtt(fmt, date) { //author: meizz   
    var o = {
        "M+": date.getMonth() + 1, //月份   
        "d+": date.getDate(), //日   
        "h+": date.getHours(), //小时   
        "m+": date.getMinutes(), //分   
        "s+": date.getSeconds(), //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds() //毫秒   
    };
    if(/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

module.exports={
    get,
    add,
    upd
}