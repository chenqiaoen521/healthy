<template>
<div>

<!--ftop开始-->
<div class="ftop">
    <a class="back" onClick="javascript:history.back(-1);"><img src="../../static/images/icon_03.png"></a>
    <h2>物流信息</h2>
    <a class="comea"></a>
    <div style="clear: both;"></div>
</div>
<!--ftop开始-->


<!--个人中心-订单-物流中心-->
<div class="orderwuliu">
    <div class="goods">
        <a class="imga"><img src="../../static/images/logo.png" alt=""><i>{{order.goods_count}}件商品</i></a>
        <p>
            <span>物流状态：</span>

            <!-- 物流状态 -->
            <i v-if='order.State==0'>暂无轨迹</i>
            <i v-if='order.State==1'>已揽收</i>
            <i v-if='order.State==2'>在途中</i>
            <i v-if='order.State==201'>到达派件城市</i>
            <i v-if='order.State==3'>已签收</i>
            <i v-if='order.State==4'>问题件</i>
            <i v-if='order.Reason!=4'>{{ order.Reason }}</i>
            <!-- 物流状态 -->

            <br>承运公司：{{order.name}}<br>运单编号：{{order.LogisticCode}}<br>官方电话：<a href="tel:95543">{{order.phone}}</a>
        </p>
    </div>
    <div class="trace">
        <h2><span>物流追踪</span></h2>
        <div class="list">
            <div class="sg" v-for='(p,index) in order.Traces'>
                <p>{{p.AcceptStation}}</p>
                <h6>{{p.AcceptTime}}</h6>
            </div>
        </div>
    </div>
</div>
<!--个人中心-订单-物流中心-->




</div>
</template>

<script>
import store from '../../vuex/store'

export default {
    data:function(){
        return {
            order:[],     //请求数据
            host:HOST,         //全局域名
            route:'',           //空路由
        }
    },
    methods:{
        init_order:function(){
            var vm = this;
            vm.route = this.$route.params.id;
            console.log(vm.route)
            store.commit('UPDATE_LOADING', true);
            $.ajax({
                url:HOST+'/api/wuLiu/'+vm.route ,
                type:'GET',
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                success:function(result){
                    vm.order= result.data;

                    store.commit('UPDATE_LOADING', false);
                },
                error:function(e){


                }
            },"json");
        }
    },
    created:function(){
        this.init_order();
        store.commit('UPDATE_SHOWMENU',false);
    }
}


</script>


