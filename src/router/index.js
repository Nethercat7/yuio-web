import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/view/index'
import College from '@/view/school/college'
import Major from '@/view/school/major'
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
        }
    ]
})