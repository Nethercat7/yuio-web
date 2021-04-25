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
        name: "ClsManagement",
        meta: { title: '班级管理' }
    }, {
        path: 'student',
        component: () => import('@/views/system/student/'),
        name: 'StudentManagement',
        meta: { title: '学生管理' }
    }, {
        path: 'user',
        component: () => import('@/views/system/user/'),
        name: 'UserManagement',
        meta: { title: '用户管理' }
    }, {
        path: 'role',
        component: () => import('@/views/system/role/'),
        name: 'RoleManagement',
        meta: { title: '角色管理' }
    }, {
        path: 'menu',
        component: () => import('@/views/system/menu/'),
        name: 'MenuManagement',
        meta: { title: '菜单管理' }
    }, {
        path: 'city',
        component: () => import('@/views/system/city/'),
        name: 'CityManagement',
        meta: { title: '城市管理' }
    }, {
        path: 'work',
        component: () => import('@/views/system/work/'),
        name: 'WorkManagement',
        meta: { title: '岗位管理' }
    }, {
        path: 'dict',
        component: () => import('@/views/system/dict/'),
        name: 'DictType',
        meta: { title: '字典管理' }
    }, {
        path: 'dict/data',
        component: () => import('@/views/system/dict/data'),
        name: 'DictData',
        meta: { title: '字典数据' }
    }, {
        path: 'test',
        component: () => import('@/views/system/test/'),
        name: 'Test',
        meta: { title: '功能测试' }
    }]
}

export default system