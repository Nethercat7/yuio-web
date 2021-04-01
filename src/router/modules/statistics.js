import Layout from '@/layout/'

const statistics={
    path:'/statistics',
    name:'Statistics',
    component:Layout,
    meta:{title:'数据统计'},
    children:[
        {
            path:'employment',
            name:'Employment',
            component:()=>import('@/views/statistics/employment/'),
            meta:{title:'就业率统计'}
        }
    ]
}

export default statistics;