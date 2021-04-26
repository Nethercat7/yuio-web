import Layout from '@/layout/'

const statistics = {
    path: '/statistics',
    name: 'Statistics',
    component: Layout,
    meta: { title: '数据统计' },
    children: [
        {
            path: 'emplRate',
            name: 'EmploymentRate',
            component: () => import('@/views/statistics/emplRate/'),
            meta: { title: '就业率统计' },
        }
        , {
            path: 'emplStatus',
            name: 'EmploymentStatus',
            component: () => import('@/views/statistics/emplStatus/'),
            meta: { title: '就业情况统计' }
        },
        {
            path: 'emplIntention',
            name: 'EmploymentIntention',
            component: () => import('@/views/statistics/emplIntention/'),
            meta: { title: '就业意向统计' }
        }
    ]
}

export default statistics;