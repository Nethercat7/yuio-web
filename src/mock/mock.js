import College from './data/college';

const Mock = require('mockjs');

Mock.mock('/school/college','get',function(){
    return College.get();
})