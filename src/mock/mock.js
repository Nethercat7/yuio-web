import College from './data/college';
import Major from './data/major';
import Class from './data/class';
import Student from './data/student';
import User from './data/user';
import Role from './data/role';

const Mock = require('mockjs');

Mock.mock('/school/college/get','get',function(){
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
Mock.mock('/school/major/get','get',function(){
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
Mock.mock('/school/class/get','post',function(params){
    return Class.get(params);
})
Mock.mock('/school/class/add','post',function(params){
    return Class.add(params);
})
Mock.mock('/school/class/del','get',function(params){
    return Class.del(params);
})
Mock.mock('/school/class/upd','post',function(params){
    return Class.upd(params);
})
Mock.mock('/student/add','post',function(params){
    return Student.add(params);
})
Mock.mock('/student/get','get',function(params){
    return Student.get(params);
})
Mock.mock('/student/del','get',function(params){
    return Student.del(params);
})
Mock.mock('/student/upd','post',function(params){
    return Student.upd(params);
})
Mock.mock('/user/get','get',function(params){
    return User.get(params);
})
Mock.mock('/user/add','post',function(params){
    return User.add(params);
})
Mock.mock('/user/del','get',function(params){
    return User.del(params);
})
Mock.mock('/user/upd','post',function(params){
    return User.upd(params);
})
Mock.mock('/role/get','get',function(params){
    return Role.get(params);
})
Mock.mock('/role/add','post',function(params){
    return Role.add(params);
})
Mock.mock('/role/upd','post',function(params){
    return Role.upd(params);
})