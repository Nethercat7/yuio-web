const Mock = require('mockjs')

let resp = {
    code: 1,
    data: [],
    type: 'success'
}

function get() {
    if (resp.data.length === 0) {
        for (let i = 0; i < 10; i++) {
            let data = Mock.mock({
                perms_id: '@id',
                perms_pid: '@id',
                perms_name: '@name Perms',
                perms_code: '@string',
                perms_type: '@int(0,2)',
                perms_url: '@string',
                perms_description: '@string',
                perms_status: '@int(0,1)',
                perms_add_time: '@date(yyyy-MM-dd hh:mm:ss)',
                children: [
                    {
                        perms_id: '@id',
                        perms_pid: '@id',
                        perms_name: '@name Perms',
                        perms_code: '@string',
                        perms_type: '@int(0,2)',
                        perms_url: '@string',
                        perms_description: '@string',
                        perms_status: '@int(0,1)',
                        perms_add_time: '@date(yyyy-MM-dd hh:mm:ss)',
                    },
                    {
                        perms_id: '@id',
                        perms_pid: '@id',
                        perms_name: '@name Perms',
                        perms_code: '@string',
                        perms_type: '@int(0,2)',
                        perms_url: '@string',
                        perms_description: '@string',
                        perms_status: '@int(0,1)',
                        perms_add_time: '@date(yyyy-MM-dd hh:mm:ss)',
                    }
                ]
            })
            resp.data.push(data);
        }
    }
    return resp;
}

module.exports = {
    get
}
