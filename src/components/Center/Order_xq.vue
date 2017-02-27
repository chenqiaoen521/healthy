<template>
<div>

<!--ftop开始-->
<div class="ftop">
    <!-- <a class="back" onClick="javascript:history.back(-1);"><img src="../../static/images/icon_03.png"></a> -->

    <!-- 待付款 -->
    <router-link v-if="order.big_status==-1" class="back" to="/center/order/-1"><img src="../../static/images/icon_03.png"></router-link>

    <!-- 待发货 -->
    <router-link v-if="order.big_status==1" class="back" to="/center/order/1"><img src="../../static/images/icon_03.png"></router-link>

    <!-- 代收货 -->
    <router-link v-if="order.big_status==2" class="back" to="/center/order/2"><img src="../../static/images/icon_03.png"></router-link>

    <!-- 代评价 -->
    <router-link v-if="order.big_status==3" class="back" to="/center/order/3"><img src="../../static/images/icon_03.png"></router-link>

    <!-- 交易成功  订单已取消   交易关闭 -->
    <router-link v-if="order.big_status==4 || order.big_status==5 || order.big_status==6" class="back" to="/center/order/all"><img src="../../static/images/icon_03.png"></router-link>

    <h2>订单详情</h2>
    <a class="comea"></a>
    <div style="clear: both;"></div>
</div>
<!--ftop开始-->


<!--个人中心-订单详情-->
<div class="orderdetail">

    <!-- 选择显示的状态 -->
    <div v-if="order.big_status==-1" class="state"><img src="../../static/images/dengfukuan_03.png" alt="">等待买家付款</div>
    <div v-if="order.big_status==1" class="state"><img src="../../static/images/dengfahuo_03.png" alt="">等待卖家发货</div>
    <div v-if="order.big_status==2" class="state"><img src="../../static/images/orderfahuo_03.png" alt="">卖家已发货</div>
    <div v-if="order.big_status==3" class="state"><img src="../../static/images/dengpingjia_03.png" alt="">等待买家评价</div>
    <div v-if="order.big_status==4" class="state"><img src="../../static/images/ordersucuess_03.png" alt="">交易成功</div>
    <div v-if="order.big_status==5" class="state"><img src="../../static/images/orderclose_03.png" alt="">订单已取消</div>
    <div v-if="order.big_status==6" class="state"><img src="../../static/images/orderclose_03.png" alt="">交易关闭</div>
    <!-- 选择显示的状态 -->

    <div class="dizhi">
        <p><span>收货人：{{order.name}}</span><i>{{order.phone}}</i></p>
        <h6>收货地址：{{order.province}} {{order.city}} {{order.area}} {{order.addr}}</h6>
    </div>
    <div class="qingdan">
        <div class="num">
            <span>商品清单</span>


            <i v-if="order.big_status==-1">等待买家付款</i>
            <i v-if="order.big_status==1">等待卖家发货</i>
            <i v-if="order.big_status==2">卖家已发货</i>
            <i v-if="order.big_status==3">等待买家评价</i>
            <i v-if="order.big_status==4">交易成功</i>
            <i v-if="order.big_status==5">订单已取消</i>
            <i v-if="order.big_status==6">交易关闭</i>

        </div>
        <div class="list">
            <div class="sg" v-for="(p,index) in order.items">
                <a :href="'/product/'+p.og_id" class="imga"><img :src='host+p.goods_thumb' alt=""></a>
                <div class="text">
                    <a class="name" :href="'/product/'+p.goods_id">
                        <span><i>{{p.goods_name}}</i><em v-show="p.goods_attr_values != '' ">规格：{{p.goods_attr_values}}</em></span>
                        <span class="price"><i>¥{{p.price}}</i><em>x{{p.num}}</em></span>
                    </a>
                    <a class="discuss" :href="'/center/order_pingjia/'+p.og_id" v-if="order.big_status==3 && !p.is_commit && p.small_status == 3">评价</a>
                    <!--
                    <a class="discuss" :href="'/center/order_tuikuan/'+p.og_id+'/'+p.price+'/'+p.num"  v-if="order.big_status==2 ||order.big_status==1">申请退款</a>
                    -->

                    <router-link class="discuss" v-if="p.small_status==1" :to="'/center/order_tuikuan/'+p.og_id+'/'+p.price+'/'+p.num+'/1'">申请退款</router-link>
                    <router-link class="discuss" v-if="p.small_status==2" :to="'/center/order_tuikuan/'+p.og_id+'/'+p.price+'/'+p.num+'/2'">申请退货</router-link>
                    <strong v-if='p.small_status==9'>已申请退款</strong>
                    <strong v-if='p.small_status==10'>退款成功</strong>
                    <strong v-if='p.small_status==7'>退货中</strong>
                    <strong v-if='p.small_status==6'>已申请退货</strong>
                    <strong v-if='p.small_status==8'>退货成功</strong>


                </div>
            </div>

        </div>
        <div class="sum">共 <i>{{order.count}}</i>件商品，合计: <i>￥<em>{{order.pay_price}}</em></i>(含快递费)</div>
    </div>
    <div class="tail">
        <h3>支付信息</h3>
        <dl><dt>订单金额</dt><dd>¥{{order.prices}}</dd></dl>
        <dl><dt>运费</dt><dd>¥{{order.big_postage}}</dd></dl>
        <dl><dt>应支付</dt><dd><i>¥<em>{{order.pay_price}}</em></i></dd></dl>
        <dl v-if="order.remark!=''"><dt>备注</dt><dd>{{order.remark}}</dd></dl>
    </div>
    <div class="tail">
        <h3>订单信息</h3>
        <dl v-if="order.order_num!=null"><dt>订单编号</dt><dd>{{order.order_num}}</dd></dl>
        <dl v-if="order.add_time!=null"><dt>创建时间</dt><dd>{{order.add_time}}</dd></dl>
        <dl v-if="order.pay_time!=null"><dt>付款时间</dt><dd>{{order.pay_time}}</dd></dl>
        <dl v-if="order.fahuo_time!=null"><dt>发货时间</dt><dd>{{order.fahuo_time}}</dd></dl>
        <dl v-if="order.shou_time!=null"><dt>收货时间</dt><dd>{{order.shou_time}}</dd></dl>
    </div>
    <!-- <div class="caozuo"><a>取消订单</a></div> -->
    <div class="caozuo">
        <a :href="'/center/order_wuliu/'+order.oi_id" class="watcha" v-if="order.big_status==2 || order.big_status==3">查看物流</a>
        <a class="surea" @click="sure_order(order.oi_id)" v-if="order.big_status==2">确认收货</a>
        <a :href="'/pay_order/'+order.oi_id" class="paya" v-if="order.big_status==-1">付款</a>
        <a class="canclea" @click="cancel_order(order.oi_id)" v-if="order.big_status==-1">取消订单</a>
        <a class="deletea" @click="delete_order(order.oi_id)" v-if="order.big_status==4 || order.big_status==6 || order.big_status==5">删除订单</a>
    </div>
</div>

<!--个人中心-订单详情-->



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
            status:null      //状态
        }
    },
    methods:{
        init_order:function(){
            var vm = this;
            vm.route = this.$route.params.id;
            console.log(vm.route)
            //store.commit('UPDATE_LOADING', true);
            $.ajax({
                url:HOST+'/api/orderList',
                type:'GET',
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                data:{oi_id:vm.route},
                success:function(result){
                    vm.order= result.data.order_list[0];
                    vm.status = result.data.order_list.big_status;
                    console.log(vm.order);
                    //store.commit('UPDATE_LOADING', false);
                },
                error:function(e){

                }
            },"json");
        },
        //删除订单
        delete_order:function(id){

            var vm = this;
            layer.open({
                content: '您确定要删除订单吗？'
                ,btn: ['确认', '取消']
                ,yes: function(index2){
                    $.ajax({
                        headers:{
                            Authorization:localStorage.getItem('Authorization')
                        },
                        url:HOST+'/api/changeStatus/oi_'+id+'/-2',//api/changeStatus/oi_{oi_id}/-2
                        type:'GET',
                        success:function(result){
                            if(result.success){
                                layer.open({
                                    content: result.msg
                                    ,skin: 'msg'
                                    ,time: 2
                                });
                                vm.order.big_status = -2;
                                vm.$router.push('/center/order/all')
                            }
                        },
                        error:function(e){
                            //console.log(HOST+'/api/changeStatus/oi_'+id+'/-2')
                        }
                    },"json");
                    layer.close(index2);
                }
            });
        },
        //取消订单
        cancel_order:function(id){
            var vm = this;
            //console.log('取消订单'+index)
            layer.open({
                content: '您确定要取消订单吗？'
                ,btn: ['确认', '取消']
                ,yes: function(index3){
                    $.ajax({
                        headers:{
                            Authorization:localStorage.getItem('Authorization')
                        },
                        url:HOST+'/api/changeStatus/oi_'+id+'/5',//api/changeStatus/oi_{oi_id}/-2
                        type:'GET',
                        success:function(result){
                            if(result.success){
                                layer.open({
                                    content: result.msg
                                    ,skin: 'msg'
                                    ,time: 2
                                });
                                vm.order.big_status = 5;
                                vm.$router.push('/center/order/all')
                            }else{
                                layer.open({
                                    content: result.msg
                                    ,skin: 'msg'
                                    ,time: 2
                                });
                            }
                        }
                    },"json");
                    layer.close(index3);
                }
            });
        },
        //确认收货
        sure_order:function(id){
            var vm = this;
            layer.open({
                content: '您确定要确认收货吗？'
                ,btn: ['确认', '取消']
                ,yes: function(index4){
                    $.ajax({
                        headers:{
                            Authorization:localStorage.getItem('Authorization')
                        },
                        url:HOST+'/api/changeStatus/oi_'+id+'/3',//api/changeStatus/oi_{oi_id}/-2
                        type:'GET',
                        success:function(result){
                            if(result.success){
                                layer.open({
                                    content: result.msg
                                    ,skin: 'msg'
                                    ,time: 2
                                });
                                vm.order.big_status = 3;
                                vm.$router.push('/center/order/3')
                            }else{
                                layer.open({
                                    content: result.msg
                                    ,skin: 'msg'
                                    ,time: 2
                                });
                            }
                        }
                    },"json");
                    layer.close(index4);
                }
            });
        }
    },
    created:function(){
        this.init_order();
    }
}


</script>


