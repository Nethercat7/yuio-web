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

module.exports={
    get
}