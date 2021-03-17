import Mock from 'mockjs'

const Random=Mock.Random

let arr=[]

for(let i=0;i<10;i++){
    let template={
        college_id:Random.id(),
        college_code:Random.string(1,3),
        college_name:Random.name()+' College',
        college_students:Random.integer(100,700),
        college_status:Random.integer(0,1),
        college_description:Random.paragraph(1,3),
        college_create_time:Random.time()
    }
    arr.push(template)
}

let data={ 
    code:1,
    data:arr,
    msg:'success'
}

export default data

