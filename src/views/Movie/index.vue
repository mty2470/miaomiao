<template>
    <div id="main">
        <Header title="喵喵电影"/>
            <div id="content">
                <div class="movie_menu">
                    <router-link tag="div" to="/movie/city" class="city_name">
                        <span>
                            {{ $store.state.city.nm }}     
                        </span><i class="iconfont icon-lower-triangle"></i>
                    </router-link>
                    <div class="hot_swtich">
                        <router-link tag="div" to="/movie/hotplay" class="hot_item">正在热映</router-link>
                        <router-link tag="div" to="/movie/readyplay" class="hot_item">即将上映</router-link>
                    </div>
                    <router-link tag="div" to="/movie/search" class="search_entry">
                        <i class="iconfont icon-sousuo"></i>
                    </router-link>
                </div> 
                <!-- 路由装载,实现切换-->
                <keep-alive>
                    <router-view>

                    </router-view>
                </keep-alive>

            </div>  
        <TabBar/>
                <!-- 详情页的跳转，用命名视图来解决 -->
                <router-view name="detail">

                </router-view>
    </div>
</template>

<script>
import Header from '@components/Header'
import TabBar from '@components/TabBar'

import {messageBox} from '@components/JS'

export default {
    name:"Movie",
    components:{
        Header,
        TabBar,
    },
    // 进行内容的配置
    mounted() {// 直接 在页面挂载的时候去使用。

        setTimeout(() => {
            this.axios.get("/api/getLocation").then((res)=>{
                var msg = res.data.msg;
                    if (msg === "ok") {
                        var nm = res.data.data.nm;
                        var id = res.data.data.id;
                        //如果相同的时候，就不要去弹窗了
                        if (this.$store.state.city.id == id) {//类型不一致的问题 ==
                            return ;
                        } 

                        messageBox({
                            title:"当前城市:",
                            content:nm,
                            cancel:"取消",
                            ok:"切换到"+nm,
                            handleOk:function(){
                                window.localStorage.setItem("nowNM",nm);
                                window.localStorage.setItem("nowID",id);
                                window.location.reload();
                            },
                            // handleCancel:function(){
                            //     console.log(2)
                            // }
                        });            
                    }
                })        
        }, 2000);

    },


}
</script>

<style scoped>
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}

.movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}

.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .hot_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}

.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry i{  font-size:24px; color:red;}
</style>
