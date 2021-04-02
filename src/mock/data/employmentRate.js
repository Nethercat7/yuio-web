const Random = require('mockjs').Random;

let resp = {
    code: 1,
    data: [],
    type: 'success'
}

function get() {
    if (resp.data.length === 0) {
        let data = [];
        let collegetotalPeople=0;
        let collegeEmploymentPeople=0;
        let collegeUnemploymentPeople=0;
        for (let i = 0; i < 10; i++) {
            let collegeName = Random.name();
            let totalPeople = Random.natural(300, 700);
            let employmentPeople = Random.natural(totalPeople - 100, totalPeople);
            let unemploymentPeople = totalPeople - employmentPeople;
            let employmentRate = ((totalPeople - unemploymentPeople) / totalPeople) * 100
            let obj = {
                college_name: collegeName,
                total_people: totalPeople,
                employment_people: employmentPeople,
                unemployment_people: unemploymentPeople,
                employment_rate: employmentRate.toFixed(0),
                school:false,
            }
            data.push(obj);
        }
        //计算学院总人数和就业率
        for(let i=0;i<data.length;i++){
            collegetotalPeople+=data[i].total_people;
            collegeEmploymentPeople+=data[i].employment_people;
            collegeUnemploymentPeople+=data[i].unemployment_people;
        }
        let schoolRate={
            college_name:'广西科技大学',
            total_people:collegetotalPeople,
            employment_people: collegeEmploymentPeople,
            unemployment_people: collegeUnemploymentPeople,
            employment_rate:(((collegetotalPeople-collegeUnemploymentPeople)/collegetotalPeople)*100).toFixed(0),
            school:true
        }
        data.push(schoolRate);
        resp.data = data;
    }
    return resp;
}

module.exports = {
    get
}