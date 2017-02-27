<template>
<div class="index">
<!--ftop开始-->
<div class="ftop">
    <div class="index_search">
        <router-link to="/search"><input type="text" placeholder="请输入您要搜索的产品"></router-link>
        <p>
            <router-link to="/gonggao"><img src="../static/images/icon_05.png">
                <!--<sup>11</sup>-->
            </router-link>
        </p>
    </div>
    <div style="clear: both;"></div>
</div>
<!--ftop开始-->

<!-- 轮播图片 -->
<swiper :options="imgsConfig">
    <swiper-slide v-for="img in imgs">
        <a :href='img.url'><img :src="host+img.image" alt=""></a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
</swiper>
<!-- 轮播图片 -->

<!-- 轮播消息 -->
<div class="index_knowledge"> <img src="../static/images/icon_0902.png">
    <swiper :options="newsConfig" class="swiper-container dlist">
        <swiper-slide v-for="n in news">
            <router-link :to="'/gonggao_xq/'+n.id">
                <i>最新</i>{{n.title}}
            </router-link>
        </swiper-slide>
    </swiper>
</div>
<!-- 轮播消息 -->


<!-- 商品列表 -->
<div class="index_main">
    <p class="index_mtitle">
        <a :class="{'on':status==1}" @click="init_products(1)">热销</a>
        <a :class="{'on':status==2}" @click="init_products(2)">推荐</a>
        <a :class="{'on':status==3}" @click="init_products(3)">限时</a>
    </p>
    <ul>
        <li v-for="p in products">
        <!-- <router-link :to="{ name: 'product', params: { id: p.id }}">
          <img :src="host+p.thumb">
        </router-link> -->
            <router-link :to="'/product/'+p.id">
                <img :src="host+p.thumb">
            </router-link>
            <div class="product_text">
            <!-- <div v-if="seen" class="timer" data-nowTime="2016-03-07 0:10:10" data-pointTime="2016-03-07 10:00:00">
              距结束还剩：<span class="timer-h">00</span>：<span class="timer-m">00</span>：<span class="timer-s">00</span>
            </div> -->
                <div v-if="seen" class="timer">
                    距结束还剩：<span class="timer-d">{{p.over_time | daojishi-d}}</span>天
                    <span class="timer-h">{{p.over_time | daojishi-h}}</span>时
                    <span class="timer-m">{{p.over_time | daojishi-m}}</span>分
                      <span class="timer-s">{{p.over_time | daojishi-s}}</span>秒
                </div>
                <h2>
                    <p>{{p.name}}</p>
                    <span :class="{'on':p.star==0}">
                        <img src="../static/images/icon_07.png"><img src="../static/images/icon_07.png"><img src="../static/images/icon_07.png">
                        <img src="../static/images/icon_07.png"><img src="../static/images/icon_07.png">
                    </span>
                    <span :class="{'on':p.star==1}">
                        <img src="../static/images/icon_06.png"><img src="../static/images/icon_07.png"><img src="../static/images/icon_07.png">
                        <img src="../static/images/icon_07.png"><img src="../static/images/icon_07.png">
                    </span>
                    <span :class="{'on':p.star==2}">
                        <img src="../static/images/icon_06.png"><img src="../static/images/icon_06.png"><img src="../static/images/icon_07.png">
                        <img src="../static/images/icon_07.png"><img src="../static/images/icon_07.png">
                    </span>
                    <span :class="{'on':p.star==3}">
                        <img src="../static/images/icon_06.png"><img src="../static/images/icon_06.png"><img src="../static/images/icon_06.png">
                        <img src="../static/images/icon_07.png"><img src="../static/images/icon_07.png">
                    </span>
                    <span :class="{'on':p.star==4}">
                        <img src="../static/images/icon_06.png"><img src="../static/images/icon_06.png"><img src="../static/images/icon_06.png">
                        <img src="../static/images/icon_06.png"><img src="../static/images/icon_07.png">
                    </span>
                    <span :class="{'on':p.star==5}">
                        <img src="../static/images/icon_06.png"><img src="../static/images/icon_06.png"><img src="../static/images/icon_06.png">
                        <img src="../static/images/icon_06.png"><img src="../static/images/icon_06.png">
                    </span>
                </h2>
                <p>{{p.describe}}</p>
                <h3>
                    <p><i>￥</i><b>{{p.sell_price}}</b><!-- <span>特级</span><span>甄选</span> --></p>
                    <router-link :to="'/product/'+p.id">立即购买</router-link>
                </h3>
            </div>
        </li>
    </ul>
</div>
<!-- 商品列表 -->
<div class="index_icon">
    <p>
        <span><img src="../static/images/icon_01.png"><i>品质保证</i></span>
        <span><img src="../static/images/icon_02.png"><i>送货保障</i></span>
        <span><img src="../static/images/icon_003.png"><i>7天包换</i></span>
        <span><img src="../static/images/icon_04.png"><i>质量保障</i></span>
    </p>
</div>
</div>
<!--fixft结束-->
</template>
<script>
import Vue from 'vue'
import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'
import store from '../vuex/store'

Vue.filter( 'daojishi-d' , function(over_time) {
    var day = Math.floor(over_time/86400);
    return day ;
});
Vue.filter( 'daojishi-h' , function(over_time) {
    var hour = Math.floor(over_time%86400/3600);
    hour = hour<10 ? '0'+ hour:hour;
    return hour ;
});
Vue.filter( 'daojishi-m' , function(over_time) {
    var min = Math.floor(over_time%86400%3600/60);
    min = min<10 ? '0'+ min:min;
    return min ;
});
Vue.filter( 'daojishi-s' , function(over_time) {
    var src = Math.floor(over_time%60);
    src = src<10 ? '0'+ src:src;
    return src ;
});

export default {
    name : 'index',
    data :function() {
        return{
            //轮播图设置
            imgsConfig: {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                autoplay: 2500
            },
            imgs: [],

            //消息设置
            newsConfig:{
              paginationClickable: true,
              autoplay: 3000,
              direction : 'vertical'
            },
            news:[],


            //商品列表
            products:[],    //商品数据
            status:1,       //种类选择 默认选中热销
            host:HOST,      //全局域名
            seen: false,    //是否显示限时HTML
            time:null,      //限时倒计时时间
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    methods:{
        //初始化轮播列表
        init_swiper:function(){
            var vm = this;
            $.ajax({
                url:HOST+'/api/banner',
                type:'GET',
                data:{},
                success:function(result){
                    //console.log(result.data)
                    vm.imgs =  result.data;
                },
                error:function(e){

                }
            },"json");

            $.ajax({
                url:HOST+'/api/index_notice',
                //url:"http://yyjk.com/api/category",
                type:'GET',
                data:{},
                success:function(result){
                    vm.news =  result.data;
                    //console.log(result.data)
                },
                error:function(e){

                }
            },"json");
        },
        //初始化商品列表
        init_products:function(status){
            this.status = status;
            if(status==3){this.seen = true;}
            else{this.seen = false;}

            store.commit('UPDATE_LOADING', true);
            var vm = this;
            $.ajax({
                url:HOST+'/api/goods_list',
                type:'GET',
                data:{'status':status},
                success:function(result){
                    if(status==3){
                        vm.products = result.data;
                        vm.init_timehours()
                    }else{
                        vm.products =  result.data;
                    }
                    store.commit('UPDATE_LOADING', false);
                },
                error:function(e){

                }
            },"json");
        },
        //计算时间
        init_timehours:function(){
            var vm = this;

            vm.time = setInterval(function(){
                for(var i in vm.products){
                    if(vm.products[i].over_time>0){
                        vm.products[i].over_time--;
                    }else{
                        vm.clearTime();
                        if(vm.status==3){
                            vm.init_products(3);
                        }
                        //console.log('刷新')
                    }
                }
            },1000);
        },
        clearTime:function(){
            clearInterval(this.time);
        }
    },
    created:function(){
        store.commit('UPDATE_SHOWMENU',true);
        this.init_swiper();
        this.init_products(1);
    },

    destroyed:function(){
        this.clearTime();
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
