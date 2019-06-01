<template>
<div id="detailContainer" class="slide-inter-active">
	<!-- <header id="header">
		<i class="iconfont icon-right"></i><h1>影片详情</h1>
	</header> -->
    <Header title="影片详情" class="header">
        <i class="iconfont icon-right"
        @touchstart="handleback"></i>
    </Header>


		<Loading v-if="isLoading"/>
		<!-- <Scroller v-else id="content" class="contentDetail"> -->
			<div v-else id="content" class="contentDetail">

			<div class="detail_list">
				<div class="detail_list_bg" :style="{'background-image':'url('+detailMovie.img.replace(/w\.h/,'148.208')+')'}"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="detailMovie.img | setWH('128.200')">
					</div>
					<div class="detail_list_info">
						<h2>{{detailMovie.nm}}</h2>
						<p>{{detailMovie.enm}}</p>
						<p style="font-size:14px;color:orange;font-weight:700">{{detailMovie.wish}}人想看</p>
						<p>{{detailMovie.cat}}</p>
						<p>{{detailMovie.src}} / {{detailMovie.dur}}</p>
						<p>{{detailMovie.pubDesc}}</p>
					</div>
				</div>
			</div>
			<!-- <div class="detail_intro">
				<p>{{detailMovie.dra}}</p>
			</div> -->
			<!-- 折叠面板的实现 -->
				<van-collapse v-model="activeName" accordion>
					<van-collapse-item title="剧情简介" name="1">
						{{detailMovie.dra}}
					</van-collapse-item>
				</van-collapse>

			<div class="detail_player swiper-container" ref="detail_player">
				<p class="meiti">剧照：</p>
				<ul class="swiper-wrapper">
					<li class="swiper-slide"
					v-for="(item,index) in detailMovie.photos" :key="index">
						<div>
							<img :src="item | setWH('90.70')" alt="">
						</div>
					</li>
				</ul>
			</div>



		</div>
		<!-- </Scroller> -->


	</div>    
</template>

<script>
import Header from '@components/Header'
import BScroll from 'better-scroll'

// 折叠面板
import Vue from 'vue'
import { Collapse, CollapseItem } from 'vant';
Vue.use(Collapse).use(CollapseItem);

export default {
	name:"Detail",
	data() {
		return {
			detailMovie:{},
			isLoading:true,
			activeName:'1',
	

		}
	},
    components:{
        Header
	},
	props:['movieid'],
	mounted() {
		// console.log(this.movieid)
		this.axios.get("/api/detailmovie?movieId="+this.movieid).then((res)=>{
            var msg = res.data.msg;
            if (msg === "ok") {
				this.detailMovie = res.data.data.detailMovie;
					this.isLoading = false;
					this.$nextTick(()=>{// DOM加载之后，进行配置
						new Swiper(this.$refs.detail_player, {// 找到动漫元素
						slidesPerView : 'auto',
						freeMode : true,
						freeModeSticky: true
					});
				})
            }
		})
	},
    methods: {
        handleback(){
            this.$router.back();
		},
    },
}
</script>

<style scoped>
#detailContainer{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    min-height: 100%;
    background: #ffffff;
}
.header{
	position: fixed;
	z-index: 50
}
#content.contentDetail{ display: block; margin-bottom:0;}
/* #content.contentDetail{ height: 100%;overflow: hidden;margin-bottom:0;} */
#detailContainer.slide-inter-active{
	animation:300ms slidemove;
}
@keyframes slidemove{
	0%{ transform: translateX(100%); }
	100%{ transform: translateX(0%); }
}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; filter: blur(20px);background: 0 40%;  background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}

#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
#content .detail_player .video{ width: 100%;height: 300px; }
#content .detail_player .meiti{ margin:0px 0 5px 0;font-weight: 700;color: #666;}
#detailContainer .detail_player .swiper-slide{ width:90px; margin-right: 10px; text-align: center; font-size: 14px;}
#detailContainer .detail_player .swiper-slide img{ width:90px; height: 70px; margin-bottom: 5px;}
#detailContainer .detail_player .swiper-slide p:nth-of-type(2){ color:#999;}

</style>
