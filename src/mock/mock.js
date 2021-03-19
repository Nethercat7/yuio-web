import College from './data/college';
import Major from './data/major';

const Mock = require('mockjs');

Mock.mock('/school/college','get',function(){
    return College.get();
})
Mock.mock('/school/college/add','post',function(options){
    return College.add(options)
})
Mock.mock('/school/college/upd','post',function(options){
    return College.upd(options)
})
Mock.mock('/school/major','get',function(){
    return Major.get();
})
Mock.mock('/school/major/add','post',function(params){
    return Major.add(params);
})