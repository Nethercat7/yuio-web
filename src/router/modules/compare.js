import Layout from '@/layout/'

let compare = {
    path: '/compare',
    name: 'Compare',
    component: Layout,
    meta: { title: '数据对比' },
    children: [
        {
            path: 'eRate',
            name: 'Employment Rate Compare',
            component: () => import('@/views/compare/eRate'),
            meta: { title: '就业率对比' }
        }
    ]
}

export default compare;