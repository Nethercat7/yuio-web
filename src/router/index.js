import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//Layout
import Layout from '@/layout/'
import UserLogin from '@/layout/login'

//各模块路由
import system from './modules/system'
import statistics from './modules/statistics'
import compare from './modules/compare'

// 解决路由重复控制台报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

const constantRoutes = [
    {
        path: '/',
        component: Layout
    },
    {
        path: '/login',
        component: UserLogin
    },
    system,
    statistics,
    compare,
]

export default new Router({
    mode: 'history', // 去掉url中的#
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})