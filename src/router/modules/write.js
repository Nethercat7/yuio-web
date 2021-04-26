import Layout from '@/layout'

const write = {
    path: '/write',
    component: Layout,
    name: 'DataWrite',
    meta: { title: '数据填写' },
    children: [
        {
            path: 'employment',
            component: () => import("@/views/write/employment/"),
            name: 'EmploymentStatusWrite',
            meta: { title: '就业情况填写' },
        }
    ]
}

export default write