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
import write from './modules/write'

// 解决路由重复控制台报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

const constantRoutes = [
    {
        path: '/',
        component: Layout,
        children:[
            {
                path:"profile",
                component:()=>import("@/layout/components/profile"),
                name:"Profile",
                meta:{name:"个人资料"}
            }
        ]
    },
    {
        path: '/login',
        component: UserLogin
    },
    system,
    statistics,
    compare,
    write
]

export default new Router({
    mode: 'history', // 去掉url中的#
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})