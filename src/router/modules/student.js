import Layout from '@/layout/'

const studentRouter ={
    path: '/',
    component: Layout,
    name: "StudentManagement",
    meta: { title: '学生信息管理' },
    children: [
        {
            path: 'student',
            component: () => import('@/views/student/student')
        }
    ]
}


export default studentRouter