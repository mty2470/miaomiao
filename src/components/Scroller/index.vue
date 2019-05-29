<template>
    <div class="wrapper" ref="wrapper">
        <slot/>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:"Scroller",
    props:{// 加载数据时会有父子通信的问题
        handleToScroll:{
            type:Function,
            default:function(){}
        },
        handleToTouchEnd:{
            type:Function,
            default:function(){}
        }
    },
    mounted() {
        var scroll = new BScroll(this.$refs.wrapper,{
            tap:true,
            probeType:1
        });

        this.scroll = scroll;// 局部对象变成属性，面向对象的程序。

        scroll.on("scroll",(location)=>{
            this.handleToScroll(location);
        });// 使用箭头函数，注意this指向的问题。
        scroll.on("touchEnd",(location)=>{
            this.handleToTouchEnd(location);
        })
    },
    methods: {
        toScrollTop(y){// better-scroll 自带的方法
            this.scroll.scrollTo(0,y);
        }
    },


}
</script>

<style scoped>
.wrapper{
    height: 100%;

}
</style>
