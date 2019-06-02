export default {
    path:"/mine",
    component:()=>import("@views/Mine"),
    children:[
        {
            path:'personal',
            component:()=>import('@views/Mine/personal.vue')      
        },
        {
            path:'login',
            component:()=>import('@components/Login')
        },
        {
            path:'register',
            component:()=>import('@components/Register')
        },
        {
            path:'updatepassword',
            component:()=>import('@components/updatePassword')
        },
        {
            path:'/mine',
            redirect:'personal' //重定向到个人中心
        }
    ]
}