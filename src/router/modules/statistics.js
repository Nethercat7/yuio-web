import Layout from '@/layout/'

const statistics={
    path:'/statistics',
    name:'Statistics',
    component:Layout,
    meta:{title:'数据统计'},
    children:[
        {
            path:'eRate',
            name:'Employment Rate',
            component:()=>import('@/views/statistics/eRate/'),
            meta:{title:'就业率统计'}
        }
        ,{
            path:'eStatus',
            name:'Employment Status',
            component:()=>import('@/views/statistics/eStatus/'),
            meta:{title:'就业情况统计'}
        }
    ]
}

export default statistics;