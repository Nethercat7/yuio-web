import Layout from '@/layout/'

const statistics = {
    path: '/statistics',
    name: 'Statistics',
    component: Layout,
    meta: { title: '数据统计' },
    children: [
        {
            path: 'employmentRate',
            name: 'EmploymentRate',
            component: () => import('@/views/statistics/employmentRate/'),
            meta: { title: '就业率统计' },
        }
        , {
            path: 'employmentStatus',
            name: 'EmploymentStatus',
            component: () => import('@/views/statistics/employmentStatus/'),
            meta: { title: '就业情况统计' }
        },
        {
            path: 'employmentIntention',
            name: 'EmploymentIntention',
            component: () => import('@/views/statistics/employmentIntention/'),
            meta: { title: '就业意向统计' }
        }
    ]
}

export default statistics;