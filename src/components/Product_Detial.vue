<template>
<div class="product_details">
<div v-title data-title="产品详情"></div>



<!--ftop开始-->
<div class="ftop"> <a class="back" onClick="javascript:history.back(-1);"><img src="../static/images/icon_03.png"></a>
    <h2>产品详情</h2>
    <a style="color:#000" class="comea" @click="showshare()">分享有礼</a>
    <div style="clear: both;"></div>
</div>
<!--ftop开始-->

<!--banner start -->
<div class="product_box">
    <!-- 轮播图片 -->
    <swiper :options="imgsConfig">
        <swiper-slide v-for="img in product.pic">
            <a><img :src="host+img" alt=""></a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- 轮播图片 -->
    <div class="pro_text">
        <div v-if="seen" class="timer">
            距结束还剩：<span class="timer-d">{{product.over_time | daojishi-d}}</span>天
            <span class="timer-h">{{product.over_time | daojishi-h}}</span>时
            <span class="timer-m">{{product.over_time | daojishi-m}}</span>分
            <span class="timer-s">{{product.over_time | daojishi-s}}</span>秒
        </div>
        <h2>
            <p>{{product.name}}</p>
            <!-- <span>
                <img src="../static/images/icon_06.png">
                <img src="../static/images/icon_06.png">
                <img src="../static/images/icon_06.png">
                <img src="../static/images/icon_07.png">
                <img src="../static/images/icon_07.png">
            </span> -->
            <span :class="{'on':product.star==0}">
                <img src="../static/images/icon_07.png"><img src="../static/images/icon_07.png"><img src="../static/images/icon_07.png">
                <img src="../static/images/icon_07.png"><img src="../static/images/icon_07.png">
            </span>
            <span :class="{'on':product.star==1}">
                <img src="../static/images/icon_06.png"><img src="../static/images/icon_07.png"><img src="../static/images/icon_07.png">
                <img src="../static/images/icon_07.png"><img src="../static/images/icon_07.png">
            </span>
            <span :class="{'on':product.star==2}">
                <img src="../static/images/icon_06.png"><img src="../static/images/icon_06.png"><img src="../static/images/icon_07.png">
                <img src="../static/images/icon_07.png"><img src="../static/images/icon_07.png">
            </span>
            <span :class="{'on':product.star==3}">
                <img src="../static/images/icon_06.png"><img src="../static/images/icon_06.png"><img src="../static/images/icon_06.png">
                <img src="../static/images/icon_07.png"><img src="../static/images/icon_07.png">
            </span>
            <span :class="{'on':product.star==4}">
                <img src="../static/images/icon_06.png"><img src="../static/images/icon_06.png"><img src="../static/images/icon_06.png">
                <img src="../static/images/icon_06.png"><img src="../static/images/icon_07.png">
            </span>
            <span :class="{'on':product.star==5}">
                <img src="../static/images/icon_06.png"><img src="../static/images/icon_06.png"><img src="../static/images/icon_06.png">
                <img src="../static/images/icon_06.png"><img src="../static/images/icon_06.png">
            </span>
        </h2>
        <p>{{product.describe}}</p>
        <div class="pro_det">
            <h3><i>￥</i><b>{{product.sell_price}}</b><!-- <span>特级</span><span>甄选</span> --></h3>
            <p><span>库存：{{product.stock}} </span><i></i><span>月销量：{{product.sell_num}}笔</span></p>
        </div>
    </div>
</div>
<!--banner over-->

<div class="pro_standard">
    <h2><span>选择商品规格/口味</span><!-- <img src="../static/images/icon_015.png"> --></h2>
    <div class="pro_stand">
        <dl v-for="(at,index) in product.goods_attr">
            <dt>{{at.name}}</dt>
            <dd v-for="a in at.value" @click="choose(a,at,index,$event)">{{a.value}}</dd>
        </dl>
    </div>
    <div class="shu">
        <i>购买数量</i>
        <span class="jia" @click="zengjia()"><img src="../static/images/icon_017.png"></span>
        <input class="shopcart-td-num" type="text" v-model = 'buynum' />
        <span class="jian" @click="jianshao()"><img src="../static/images/icon_016.png"></span>
    </div>
</div>

<div class="pro_description modular">
    <!-- <h2><span>商品描述</span></h2> -->
    <div class="miaoshu" v-html="product.content">
     <!-- 冬虫夏草为虫体与菌座相连而成，全长9～12厘米。虫体如三眠老蚕，长约3～6厘米，粗约0.4～0.7厘米。外表呈深黄色，粗糙，背部有多数横皱纹，腹面有足8对，位于虫体中部的4对明显易见。 -->
    </div>
</div>



<div class="pro_description modular" v-show = "comment.length>0">
    <h2><span>用户评价</span></h2>
    <div class="pingjia">
        <div class="pingjia_item" v-for='(d,index) in comment'>
            <img src="../static/images/img_06.jpg" :src="d.headimgurl"><i>{{d.nickname}}</i><span>{{d.created_at}}</span>
            <div class="ping_text">
                <p>{{d.content}}</p>
                <div class="wrapper">
                    <div v-for='(dn,index3) in d.pic' @click="big(index,index3)" :class="'image pop'+index+'_'+index3"><a rel="gallery"><img :src='host+dn'></a></div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="fixft pro_bottom">
    <span>
        <a target="_blank" href="https://youyijiankang.qiyukf.com/client?k=662ad898f35db70353eb453b140ca343&wp=1" style="width: 50%;"><b class="bgkf">客服</b></a>
        <b :class="{'on':product.goodsKeep=='yes'}" @click="change()">收藏</b></span>
    <p><a @click="joinCar"style="background-color: rgb(37, 37, 37);">加入购物车</a><a @click="buy()">立即购买</a></p>
</div>

<div id="box" class="sidebar">
    <ul>
        <li><a href="#luxian1" class="linka"><span>商品描述</span><i></i></a></li>
        <li><a href="#luxian2" class="linka"><span>用户评价</span><i></i></a></li>
   </ul>
   <p class="gotop"><a class="topshang"><span>返回顶部</span><i></i></a></p>
</div>


<!--提醒分享-->
<div class="sharetip" v-if="shareon">
    <img src="../static/images/sharetip_06.png" alt="">
    <a @click="showshare()"><img src="../static/images/sharetip_09.png" alt=""></a>
</div>
<!--提醒分享-->


</div>
</template>

<script>

import Vue from 'vue'
import store from '../vuex/store'
import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'

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
    // name: 'product_details',
    data () {
        return {
            //轮播图设置
            imgsConfig: {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                autoplay: 2500
            },
            //imgs: [],  //轮播图片
            host: HOST,  //全局域名
            product:{},  //数据
            //childs:[],
            comment:[],  //评论的内容
            child:[],    //商品的属性
            //pic:[],
            sys_attrprice:[], //单价改变设置
            seen: false,     //是否显示倒计时
            time:null,      //倒计时的时间
            buynum:1,       //购买的数量
            c:[],           //
            attr_ids:null,   // 传递的商品属性ID
            shareon:false,   //是否显示分享
            docu_id:null ,       // 传递的商品ID
            back:null,     //返回的数据
            sign: []
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    methods:{
        init_product_detial:function(){
            store.commit('UPDATE_LOADING', true);
            var vm = this;
            var uid = vm.GetQueryString('user_pid');
            var url = window.location.href;
            $.ajax({
                url:HOST+'/api/goods/'+this.$route.params.id,
                type:'GET',
                data:{user_pid: uid, url: url},
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                success:function(result){
                    store.commit('UPDATE_LOADING', false);
                    vm.product =  result.data;
                    vm.child =  vm.product.goods_attr;
                    vm.comment = vm.product.comment;  //评论的内容
                    vm.docu_id =  vm.product.id;
                    vm.sign =  result.data.sign;
                    vm.weixin_share();
                    //判断是否是限时商品
                    if(vm.product.xian==1){
                        vm.seen = true;
                        //console.log(vm.product.xian_time);  //剩余时间
                        vm.init_timehours()
                    }else{
                        vm.seen = false;
                    }

                    //console.log(vm.product.star); //商品星级
                    //console.log(vm.product.goodsKeep); //商品收藏
                },
                error:function(e){
                    store.commit('UPDATE_LOADING', false);
                }
            },"json");

        },
        GetQueryString:function(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        },
        //选择属性
        choose:function(self,attr,index,dd){
            // self 点击的对象自身
            // attr 点击的对象自身的属性值
            // index 自己在组合中的位置
            // dd  是啥啊 不知道
            // sys_attrprice  表示价格组合的对象

            var vm = this;

            //再点击的对象上添加选中的类
            //$(dd.target).toggleClass('on');
            $(dd.target).addClass('on');
            $(dd.target).siblings().removeClass('on');

            this.sys_attrprice[index] = self.id;

            // console.log(attr.name)
            // console.log(self.id,self.value)
            // console.log(index)
            //console.log(this.sys_attrprice.join(','))
            var con = this.sys_attrprice.join(',');  //拼接商品属性的id组合
            vm.dapei = vm.product.attr_json.sys_attrprice;  //在数据中找出价格组合表

            //console.log(vm.dapei[con])
            //console.log('拼接的'+(con.length+1)/2)
            //console.log('xuanxiang'+vm.child.length)


            var l = con.split(",");

            var chang = vm.child.length;

            //console.log('商品属性的长度'+chang)

            if(l[0] != ''){  //排除没选择的情况
                if(l.length == chang){
                    if(vm.dapei[con]){
                        //console.log(vm.dapei[con].sell_price)
                        //console.log("有库存啊，可以购买，价格和库存是"+vm.dapei[con].sell_price+"和"+vm.dapei[con].stock )
                        vm.product.sell_price = vm.dapei[con].sell_price;
                        vm.product.stock = vm.dapei[con].stock;
                        vm.attr_ids = con;
                    }else{
                        layer.open({
                            content: '库存不足'
                            ,skin: 'msg'
                            ,time: 1.5 //2秒后自动关闭
                        });
                        //$(dd.target).removeClass('on');

                        //console.log('dd.target是'+$(dd.target).text())

                        $(dd.target).parents("dl").siblings("dl").find("dd").removeClass("on")
                        $(dd.target).addClass('on')

                        this.sys_attrprice = [ ];
                        this.sys_attrprice[index] = self.id;
                        vm.attr_ids = null;

                        /*this.sys_attrprice[index] = null;
                        vm.attr_ids = null;*/
                    }
                }
            }

        },
        change:function(){
            var status = 1;
            if(this.product.goodsKeep=="yes"){
                status = -1;
            }
            var m = this;
            store.commit('UPDATE_LOADING', true);
            $.ajax({
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                url:HOST+'/api/collect',
                type:'GET',
                data: {goods_id: this.$route.params.id},
                success:function(result){
                    store.commit('UPDATE_LOADING', false);
                    if(result.success == true){
                        if(status == 1){
                            m.product.goodsKeep = 'yes'
                        }else{
                            m.product.goodsKeep = 'no'
                        }
                        layer.open({
                            content: result.msg
                            ,skin: 'msg'
                            ,time: 2
                        });
                    }else{
                        layer.open({
                            content: '系统异常'
                            ,skin: 'msg'
                            ,time: 2
                        });
                    }
                },
                error:function(e){
                    store.commit('UPDATE_LOADING', false);
                }
            },"json");
            //console.log(this.product.goodsKeep);
        },
        //计算时间
        init_timehours:function(){
            var vm = this;

            vm.time = setInterval(function(){
                if(vm.product.over_time && vm.product.over_time>0){
                    vm.product.over_time--;
                }else{
                    vm.clearTime();

                }
            },1000);

        },
        clearTime:function(){
            clearInterval(this.time);
        },
        jianshao:function(){
            var vm = this;
            if(vm.buynum>1){
                vm.buynum --;
            }else{}
        },
        zengjia:function(){
            var vm = this;
            console.log(this.product.stock);
            if(vm.buynum<vm.product.stock){
                vm.buynum ++;
            }else{
                layer.open({
                    content: '库存不足'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
            }
        },
        //加入购物车
        joinCar:function(){
            var vm = this;
            if(vm.product.goods_attr==''){
                //无属性商品
                vm.attr_ids = '';
            }else{

                if(this.attr_ids == null){
                    layer.open({
                        content: '请先选择商品的属性规格，再加入购物车'
                        ,skin: 'msg'
                        ,time: 2 //2秒后自动关闭
                    });
                    store.commit('UPDATE_SHOWMENU',false);
                    return;
                }
            }
            $.ajax({
                    url:HOST+'/api/add_car',
                    type:'POST',
                    headers:{
                        Authorization:localStorage.getItem('Authorization')
                    },
                    data:{'goods_id':vm.docu_id,'num':this.buynum,'attr_ids':vm.attr_ids},
                    success:function(result){
                        if(result.success){
                            //判断返回值
                            layer.open({
                                content: '成功加入购物车'
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            vm.get_shopcar_count();
                            //console.log('this商品id'+this.product.id);
                            //console.log('商品id'+vm.product.id);
                            console.log('商品id'+vm.attr_ids);
                        }else{
                            //判断返回值
                            layer.open({
                                content: result.msg
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                        }
                    }
                },"json");
        },
        //显示分享活动
        showshare:function(){
            var vm = this;
            vm.shareon = !vm.shareon;
        },
        //直接购买
        buy:function(){
            var vm = this;
            if(vm.product.goods_attr==''){
                //直接跳转
                vm.attr_ids = '';
            }else{
                if(this.attr_ids == null){
                    layer.open({
                        content: '请先选择商品的属性规格，再购买商品'
                        ,skin: 'msg'
                        ,time: 2 //2秒后自动关闭
                    });
                    store.commit('UPDATE_SHOWMENU',false);
                    return;
                }
            }
            $.ajax({
                url:HOST+'/api/buy',
                type:'POST',
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                data:{'goods_id':vm.docu_id,'num':this.buynum,'attr_ids':vm.attr_ids},
                success:function(result){
                    if(result.success){
                        vm.back = result.data;
                        //console.log(vm.back );
                        //console.log('传递的商品id：'+vm.docu_id)
                        //console.log(result.data.goods_id)
                        console.log('选择成功，跳转到购买页面')
                        vm.$router.push('/confirm_order/'+vm.back+'/0')
                    }else{
                        //判断返回值
                        layer.open({
                            content: result.msg
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                    }
                },
                error:function(e){

                }
            },"json");
        },
        //显示跳转
        scroll:function(){
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            if(t>350){
                $("#box").show();
            }else{
                $("#box").hide();
            }
        },
        get_shopcar_count:function(){
            var vm = this;
            $.ajax({
                url:HOST+'/api/getShopcarCount',
                type:'get',
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                success:function(result){
                    if(result.success == true){
                        $('.shop_car_count').html(result.data.count);
                    }
                },
                error:function(e){
                }
            },"json");
        },
        //图片放大
        big:function(prev,self){

            var me = $('.pop'+prev+'_'+self);
            var w = me.width();
            var wd = $(".wrapper").width();

            if(w>60){

                me.find("a").animate({width:'60px',height:'60px'});
                me.find("img").animate({width:'60px',height:'60px'});

            }else{


                me.parents(".pingjia_item").siblings(".pingjia_item").children(".wrapper").find("a").animate({width:'60px',height:'60px'});
                me.parents(".pingjia_item").siblings(".pingjia_item").children(".wrapper").find("img").animate({width:'60px',height:'60px'});
                me.siblings(".image").find("a").animate({width:'60px',height:'60px'});
                me.siblings(".image").find("img").animate({width:'60px',height:'60px'});
                me.find("a").animate({width:wd+'px',height:wd+'px'});
                me.find("img").animate({width:wd+'px',height:wd+'px'});
            }
        },
        weixin_share:function(){
            var vm = this;
            var info = vm.sign;
            var goods_info = vm.product;
            //alert(location.href.split('#')[0])
            var wx = require('weixin-js-sdk');
            wx.config({
                //debug:true,
                appId: info.appId,
                timestamp: info.timestamp,
                nonceStr: info.nonceStr,
                signature: info.signature,
                jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','showOptionMenu','showAllNonBaseMenuItem']
            });
            wx.showOptionMenu();
            wx.ready(function () {
                wx.showAllNonBaseMenuItem();
                wx.onMenuShareTimeline({
                    title: goods_info.name, // 分享标题
                    link: info.url, // 分享链接
                    desc: goods_info.describe, // 分享描述
                    imgUrl: HOST+goods_info.thumb, // 分享图标
                    success: function () {
                        alert('分享成功啦！');
                    },
                    cancel: function(){
                        alert('分享失败');
                    }
                });
            });
            wx.onMenuShareAppMessage({
                title: goods_info.name, // 分享标题
                link: info.url, // 分享链接
                desc: goods_info.describe, // 分享描述
                imgUrl: HOST+goods_info.thumb, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    alert('分享成功啦');
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    alert('分享失败');
                    // 用户取消分享后执行的回调函数
                }
            });
        }
    },
    created:function(){
        store.commit('UPDATE_SHOWMENU',false);
        this.init_product_detial();
    },
    destroyed:function(){
        this.clearTime();



    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

