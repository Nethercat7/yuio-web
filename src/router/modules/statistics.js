import Layout from '@/layout/'

const statistics = {
    path: '/statistics',
    name: 'Statistics',
    component: Layout,
    meta: { title: '数据统计' },
    children: [
        {
            path: 'eRate',
            name: 'Employment Rate',
            component: () => import('@/views/statistics/eRate/'),
            meta: { title: '就业率统计' },
        }
        , {
            path: 'eStatus',
            name: 'Employment Status',
            component: () => import('@/views/statistics/eStatus/'),
            meta: { title: '就业情况统计' }
        },
        {
            path: 'eIntention',
            name: 'Employment Intention',
            component: () => import('@/views/statistics/eIntention/'),
            meta: { title: '就业意向统计' }
        },
        {
            path: 'detail',
            name: 'Employment Rate Detail',
            component: () => import('@/views/statistics/eRate/components/detail'),
            meta: { title: '详细信息' }
        }
    ]
}

export default statistics;