<template>
  <!--个人中心-->
<div class="centerindex">
    <div v-title data-title="个人中心"></div>
    <div class="geren">
        <a class="imga"><img :src="user.headimgurl" alt="头像"></a>
        <a class="name">{{user.name}}</a>
        <h6>
            <span v-if="user.daili == 1">普通用户</span>
            <span v-if="user.daili == 2">区域代理</span>
            <span v-if="user.daili == 3">VIP代理</span>
            <i>ID:{{user.id}}</i>
        </h6>
        <router-link  class="seta" to="/center/setting">
            <img src="../static/images/centericon_03.png">
        </router-link>
    </div>
    <div class="link">
        <div class="sg">
            <router-link class="biga" to="/center/order/all"><span class="bg1">我的订单</span><i>查看全部订单</i></router-link>
            <div class="kind">
                <router-link to="/center/order/-1">
                    <img src="../static/images/centericon_29.png" alt="">
                    <i>待付款</i>
                    <b v-if="count.no_pay > 0">{{count.no_pay}}</b>
                </router-link>
                <router-link to="/center/order/1">
                    <img src="../static/images/centericon_19.png" alt="">
                    <i>待发货</i>
                    <b v-if="count.fahuo > 0">{{count.fahuo}}</b>
                </router-link>
                <router-link to="/center/order/2">
                    <img src="../static/images/centericon_22.png" alt="">
                    <i>待收货</i>
                    <b v-if="count.shouhuo > 0">{{count.shouhuo}}</b>
                </router-link>
                <router-link to="/center/order/3">
                    <img src="../static/images/centericon_24.png" alt="">
                    <i>待评价</i>
                    <b v-if="count.pingjia > 0">{{count.pingjia}}</b>
                </router-link>
                <router-link to="/center/order_tuilist">
                    <img src="../static/images/centericon_26.png" alt="">
                    <i>退款/售后</i>
                    <b v-if="count.shouhou > 0">{{count.shouhou}}</b>
                </router-link>
            </div>
        </div>
        <div class="sg">
            <a class="biga"><span class="bg2">我的钱包</span></a>
            <div class="both">
                <router-link to="/center/income"><span><b>{{user.wallet}}</b> 元</span><i>账户余额</i></router-link>
                <router-link to="/center/code"><span><img src="../static/images/centericon_40.png" alt=""></span><i>我的二维码</i></router-link>
            </div>
        </div>
        <div class="sg">
            <router-link class="biga bg" to="/center/fans"><span class="bg3">我的云粉</span></router-link>
            <router-link class="biga bg" to="/center/address"><span class="bg4">地址管理</span></router-link>
            <router-link class="biga bg" to="/center/keep"><span class="bg5">我的收藏</span></router-link>
            <router-link class="biga bg" to="/center/reply"><span class="bg6">意见反馈</span></router-link>
            <router-link class="biga bg" to="/center/lianxi"><span class="bg7">联系我们</span></router-link>
        </div>
    </div>
</div>
<!--个人中心-->
</template>

<script>
import store from '../vuex/store'


export default {
    name: 'center',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            lists:[],
            user:[],
            count:[]
        }
    },
    methods:{
       init_user_info:function(){
            var vm = this;
            $.ajax({
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                url:HOST+'/api/user',
                type:'GET',
                success:function(result){
                    if(result.success == true){
                        vm.user = result.data
                    }else{
                        layer.open({
                            content: result.msg
                            ,skin: 'msg'
                            ,time: 2
                        });
                    }
                }
            },"json");
       },
       //订单统计
       get_order_count:function(){
            var vm = this;
            $.ajax({
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                url:HOST+'/api/getOrderCount',
                type:'GET',
                success:function(result){
                    if(result.success == true){
                        vm.count = result.data
                    }
                    store.commit('UPDATE_LOADING', false);
                }
            },"json");
       }
    },
    created:function(){
        store.commit('UPDATE_LOADING', true);
        this.init_user_info();
        this.get_order_count();
        store.commit('UPDATE_SHOWMENU',true);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>