import Container from '@/container/'

let collect={
    path:'/collect',
    name:'Collect',
    component:Container,
    children:[
        {
            path:'eStatus',
            name:'Employment Status Collect',
            component:()=>import('@/views/collect/eStatus'),
            meta:{title:'就业率填写'}
        }
    ]
}

export default collect