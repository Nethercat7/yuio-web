import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/view/index'
import College from '@/view/school/college'
import Major from '@/view/school/major'
import Class from '@/view/school/class'
import Test from '@/view/test'
Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

export default new Router({
    routes: [
        {
            path: '/',
            component: Layout
        },
        {
            path: '/school/college',
            component: College
        },
        {
            path: '/school/major',
            component: Major
        },
        {
            path: '/school/class',
            component: Class
        },
        {
            path: '/test',
            component: Test
        }
    ]
})