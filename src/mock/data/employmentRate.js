const Random = require('mockjs').Random;

let resp = {
    code: 1,
    data: [],
    type: 'success'
}

let resp1={
    code:1,
    data:{},
    type:'success'
}

let college=[
    '机械工程学院',
    '生物与化学工程学院',
    '土木建筑工程学院',
    '电气与信息工程学院',
    '财经学院',
    '汽车与交通学院',
    '电气与信息工程学院',
    '管理学院',
    '医学院',
    '经济与管理学院'
]

function get() {
    if (resp.data.length === 0) {
        let data = [];
        for (let i = 0; i < college.length; i++) {
            let collegeName = college[i];
            let totalPeople = Random.natural(300, 700);
            let employmentPeople = Random.natural(totalPeople - 100, totalPeople);
            let unemploymentPeople = totalPeople - employmentPeople;
            let employmentRate = ((totalPeople - unemploymentPeople) / totalPeople) * 100
            let obj = {
                college_name: collegeName,
                total_people: totalPeople,
                employment_people: employmentPeople,
                unemployment_people: unemploymentPeople,
                employment_rate: employmentRate.toFixed(2),
                school:false,
            }
            data.push(obj);
        }
        //按照就业率来排序
        data.sort((a,b)=>{
            return b.employment_rate-a.employment_rate
        });
        resp.data = data;
    }
    return resp;
}

function getTotal(){
    let schoolTotalPeople=0;
    let schoolEmploymentPeople=0;
    let schoolUnemploymentPeople=0;

    for(let i=0;i<resp.data.length;i++){
        schoolTotalPeople+=resp.data[i].total_people;
        schoolEmploymentPeople+=resp.data[i].employment_people;
        schoolUnemploymentPeople+=resp.data[i].unemployment_people;
    }

    resp1.data={
        school_total_people:schoolTotalPeople,
        school_employment_people:schoolEmploymentPeople,
        school_unemployment_people:schoolUnemploymentPeople,
        school_employment_rate:(((schoolTotalPeople-schoolUnemploymentPeople)/schoolTotalPeople)*100).toFixed(2)
    }
    return resp1;
}
module.exports = {
    get,
    getTotal
}