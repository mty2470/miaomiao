<template>
    <div class="movie_body" ref="movie_body">
        <!-- 作为全局组件去使用 -->
        <Loading v-if="isloading"/>
        <Scroller v-else :handleToScroll = "handleToScroll" :handleToTouchEnd = "handleToTouchEnd">
            <ul>
                <li class="pulldown">
                    <span>{{pullDown}}</span>
                </li>
                <li v-for="item in movieList" :key="item.id">
                    <div class="pic_show" @tap="handleToDetail" ><img :src="item.img | setWH('128.180')"></div>
                    <!-- 全局中设置过滤器 -->
                    <div class="info_list">
                        <h2>{{item.nm}}<img v-if="item.version" src="@assets/3D.png"></h2>
                        <p>观众评分：<span class="grade">{{item.sc}}</span></p>
                        <p>主演: {{item.star}}</p>
                        <p>{{item.showInfo}}</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>  
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:"Hotplay",
    data() {
        return {
            movieList:[],
            pullDown:'',
            isloading:true,

            // 只能在城市切换中才去渲染active，如果从 即将上映 到 热映 就不需要重新渲染
            prevCityId:-1
        }
    },
    // mounted() {
    activated() { // 换成keeo-alive的生命周期函数
        // console.log(1); // 只执行一次，有keep-alive的存在
        var cityid = this.$store.state.city.id;
        if (this.prevCityId === cityid) {
            return;// 就什么都不做，说明不是从城市组件切换过来的
        }
        this.isloading = true;
        // console.log("数据加载！"); // 作为一个标识，是否从城市组件渲染过来，防止多次请求
        this.axios.get("/api/movieOnInfoList?cityId="+cityid).then((res)=>{
            var msg = res.data.msg;
            if (msg === "ok") {
                this.movieList = res.data.data.movieList;
                this.isloading = false;
                this.prevCityId = cityid;
                // this.$nextTick(()=>{// 1.该方法会在界面渲染之后再去触发回调
                //     var scroll = new BScroll(this.$refs.movie_body,{
                //         tap:true,    // 2.配置之后实现点击事件
                //         probeType:1     // 3.会节流，提高性能，有时间间隔
                //     });// 1.数据渲染完成才触发这个类
                //     scroll.on("scroll",(location)=>{
                //         if (location.y>20) {
                //             this.pullDown = "正在加载...";
                //         }
                //     });
                //     scroll.on("touchEnd",(location)=>{
                //         function randomInt(min, max){
                //             var num = min + Math.random()*(max-min);
                //             return Math.round(num);// round讲一个数字舍入为最接近的整数
                //         };// 可以随机获取城市的id
                //         if (location.y>20) {
                //             this.axios.get("/api/movieOnInfoList?cityId="+randomInt(1,500)).then((res)=>{
                //                 var msg = res.data.msg;
                //                 if (msg === "ok") {
                //                     this.pullDown = "更新成功！";
                //                     setTimeout(() => {
                //                          this.movieList = res.data.data.movieList;
                //                         this.pullDown = ''
                //                     }, 500);
                //                 }
                //             })
                //         }
                //     });
                // })
            }
        })
        // "http://p1.meituan.net/w.h/moviemachine/42ef79dd1d894b67dd57de383d753c03556009.jpg"
        // 图片宽高的问题，设置过滤器
    },
    methods: {
        handleToDetail(){
            console.log(1)
        },
        // 实现父子组件的通信，全局组件scroll
        handleToScroll(location){
            if (location.y>10) {
                this.pullDown = "正在加载...";
            }
        },
        handleToTouchEnd(location){
            function randomInt(min, max){
                var num = min + Math.random()*(max-min);
                return Math.round(num);// round讲一个数字舍入为最接近的整数
            };// 可以随机数，充当城市ID，但是有误差，不适用。
            if (location.y>10) {
                var Id = window.localStorage.getItem("nowID");
                this.axios.get("/api/movieOnInfoList?cityId="+Id).then((res)=>{
                    var msg = res.data.msg;
                    if (msg === "ok") {
                        this.pullDown = "更新成功！";
                        setTimeout(() => {
                            this.movieList = res.data.data.movieList;
                            this.pullDown = ''
                        }, 500);
                    }
                })
            }
        }


    },



}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list h2 img{ width: 30px;height: 26px; margin-right: 30px}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.movie_body .pulldown{
    margin: 0;
    padding: 0;
    border: none;
    text-align: center;
    color:#f03d37;
}
.movie_body .pulldown span{
    margin: 0 auto;
}
</style>
