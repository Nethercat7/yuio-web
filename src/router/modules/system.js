import Layout from '@/layout'

const system = {
    path: '/system',
    component: Layout,
    name: 'SchoolManagement',
    meta: { title: '基本信息管理' },
    children: [{
        path: 'college',
        component: () => import('@/views/system/college/'),
        name: 'CollegeManagement',
        meta: { title: '院系管理' },
    },
    {
        path: 'major',
        component: () => import('@/views/system/major/'),
        name: 'MajorManagement',
        meta: { title: '专业管理' }
    },
    {
        path: 'class',
        component: () => import('@/views/system/class/'),
        name: "ClassManagement",
        meta: { title: '班级管理' }
    },{
        path:'student',
        component:()=>import('@/views/system/student/'),
        name:'StudentManagement',
        meta:{title:'学生管理'}
    },{
        path:'user',
        component:()=>import('@/views/system/user/'),
        name:'UserManagement',
        meta:{title:'用户管理'}
    }]
}

export default system