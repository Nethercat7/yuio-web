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
Mock.mock('/school/college/del','get',function(options){
    return College.del(options)
})
Mock.mock('/school/major','get',function(){
    return Major.get();
})
Mock.mock('/school/major/add','post',function(params){
    return Major.add(params);
})
Mock.mock('/school/major/del','get',function(params){
    return Major.del(params);
})
Mock.mock('/school/major/upd','post',function(params){
    return Major.upd(params);
})