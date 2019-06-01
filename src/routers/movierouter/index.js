export default {
    path:"/movie",
    component:()=>import("@views/Movie"),
    children:[
        {
            path:"city",
            component:()=>import("@components/City")
        },
        {
            path:"hotplay",
            component:()=>import("@components/Hotplay")
        },
        {
            path:"readyplay",
            component:()=>import("@components/Readyplay")
        },
        {
            path:"search",
            component:()=>import("@components/Search")
        },{
            path:"detail/hot/:movieid",
            components:{// 命名路由
                default:()=>import("@components/Hotplay"),// 解决底部留白的问题
                detail:()=>import("@views/Movie/detail")   // 注意默认名称的问题
            },  
            props:{
                detail:true // 也需要配置多个，名称要对应。
            }
        },{
            path:"detail/ready/:movieid",
            components:{// 命名路由
                default:()=>import("@components/Readyplay"),// 解决底部留白的问题
                detail:()=>import("@views/Movie/detail")
            },
            props:{
                detail:true // 也需要配置多个
            }
        },
        {
            path:"/movie",
            redirect:"/movie/hotplay"
        }
    ]
}