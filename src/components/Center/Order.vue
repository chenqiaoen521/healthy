<template>
<div>

<!--ftop开始-->
<div class="ftop">
    <!-- <a class="back" onClick="javascript:history.back(-1);"><img src="../../static/images/icon_03.png"></a> -->
    <router-link class="back" to="/center"><img src="../../static/images/icon_03.png"></router-link>
    <h2>我的订单</h2>
    <a class="comea"><!-- <img src="../../static/images/centerorder_03.png" alt="搜索"> --></a>
    <div style="clear: both;"></div>
</div>
<!--ftop开始-->

<!--定位分类-->
<div class="orderkind">
    <a @click="init_order('all')" :class="{'on':status=='all'}"><span>全部</span></a>
    <a @click="init_order(-1)" :class="{'on':status==-1}"><span>待付款</span></a>
    <a @click="init_order(1)" :class="{'on':status==1}"><span>待发货</span></a>
    <a @click="init_order(2)" :class="{'on':status==2}"><span>待收货</span></a>
    <a @click="init_order(3)" :class="{'on':status==3}"><span>待评价</span></a>
    <!-- <a :class="{'on':order.big_status==-1}"><span>待付款</span></a>
    <a :class="{'on':order.big_status==1}"><span>待发货</span></a>
    <a :class="{'on':order.big_status==2}"><span>待收货</span></a>
    <a :class="{'on':order.big_status==3}"><span>待评价</span></a> -->
</div>
<!--定位分类-->

<!--个人中心-订单-->
<div class="centerorder">
    <div class="list" v-if="order.length!=0">
        <div class="sg" v-for="(p,index) in order">
            <router-link class="num" :to="'/center/order_xq/'+p.oi_id">
                <span>单号:{{p.order_num}}</span>
                <i v-if="p.big_status==-1">等待买家付款</i>
                <i v-if="p.big_status==1">等待卖家发货</i>
                <i v-if="p.big_status==2">卖家已发货</i>
                <i v-if="p.big_status==3">等待买家评价</i>
                <i v-if="p.big_status==4">交易完成</i>
                <i v-if="p.big_status==5">订单取消</i>
                <i v-if="p.big_status==6">交易关闭</i>
            </router-link>
            <div class="thing" v-for="n in p.items">
                <router-link class="imga" :to="'/product/'+n.goods_id">
                    <img :src="host+n.goods_thumb" alt="">
                </router-link>
                <div class="text">
                    <router-link class="name" :to="'/product/'+n.goods_id">
                        <span><i>{{n.goods_name}}</i><em v-show="n.goods_attr_values != '' ">规格：{{n.goods_attr_values}}</em></span>
                        <span class="price"><i>¥{{n.price}}</i><em>x{{n.num}}</em></span>
                    </router-link>
                    <router-link class="discuss" v-if="p.big_status==3 && !n.is_commit && n.small_status == 3" :to="'/center/order_pingjia/'+n.og_id">评价</router-link>
                    <!-- 
                    <router-link class="discuss" v-if="p.big_status==1" :to="'/center/order_tuikuan/'+n.og_id+'/'+n.price+'/'+n.num">申请退款</router-link>
                    <router-link class="discuss" v-if="p.big_status==2" :to="'/center/order_tuikuan/'+n.og_id+'/'+n.price+'/'+n.num">申请退货</router-link> 
                    -->

                    <!-- 显示退款退货信息 -->
                    <router-link class="discuss" v-if="n.small_status==1" :to="'/center/order_tuikuan/'+n.og_id+'/'+n.price+'/'+n.num+'/1'">申请退款</router-link>
                    <router-link class="discuss" v-if="n.small_status==2" :to="'/center/order_tuikuan/'+n.og_id+'/'+n.price+'/'+n.num+'/2'">申请退货</router-link>
                    <strong v-if='n.small_status==9'>已申请退款</strong>
                    <strong v-if='n.small_status==10'>退款成功</strong>
                    <strong v-if='n.small_status==7'>退货中</strong>
                    <strong v-if='n.small_status==6'>已申请退货</strong>
                    <strong v-if='n.small_status==8'>退货成功</strong>
                    <!-- 显示退款退货信息 -->
                </div>
            </div>
            <div class="sum">共<i>{{p.count}}</i>件商品  合计：<b>¥<em>{{p.pay_price}}</em></b> <strong style="font-size:12px; color:#666; font-weight:normal;">(包含邮费)</strong></div>
            <div class="caozuo" v-if="p.big_status!=1">
                <router-link class="watcha" v-if="p.big_status==2 || p.big_status==3" :to="'/center/order_wuliu/'+p.oi_id">查看物流</router-link>
                <a class="surea" @click="sure_order(p.oi_id,index)" v-if="p.big_status==2">确认收货</a>
                <router-link class="paya" v-if="p.big_status==-1" :to="'/pay_order/'+p.oi_id">付款</router-link>
                <a class="canclea" @click="cancel_order(p.oi_id,index)" v-if="p.big_status==-1">取消订单</a>
                <a class="deletea" @click="delete_order(p.oi_id,index)" v-if="p.big_status==4 || p.big_status==6 || p.big_status==5">删除订单</a>
            </div>
        </div>
        <div class="loada" v-if="laonoff" @click="init_order(status,2)">加载更多</div>
    </div>
    <div class="empty" v-if="order.length==0">
       <img src="../../static/images/ordernone_03.jpg" alt="">
       <h2>暂无订单</h2>
       <router-link to='/'>去逛逛</router-link>
   </div>
</div>
<!--个人中心-订单-->

<!--个人中心-订单-->
<!-- <div class="centerorder">
   
</div> -->
<!--个人中心-订单-->


</div>
</template>

<script>
import store from '../../vuex/store'

export default {
    data:function(){
        return {
            order:[],     //请求数据
            host:HOST,         //全局域名
            pjon:false,       //是否评价
            status:'all',      //状态
            pagenum:1,        //页码
            laonoff:false,    
        }
    },
    methods:{
        //数据请求
        init_order:function(kid,type=1){
            var vm = this;
            var old = vm.status;

            if(vm.status!= kid||type==1)
            {vm.pagenum =1;}

            vm.status = kid;

            var data = {'big_status':vm.status};
            if(vm.status =='all'){
                //console.log("空的")
                data = {'big_status':''};
            }
            store.commit('UPDATE_LOADING', true);
            $.ajax({
                url:HOST+'/api/orderList?page='+vm.pagenum,
                type:'GET',
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                data:data,
                success:function(result){
                    vm.pagenum ++;

                    var allpage = result.data.items.last_page;

                    if(vm.pagenum>allpage){
                        console.log("隐藏")
                       // $(".loada").hide();
                        vm.laonoff = false;
                    }else{

                        console.log("出现")
                        //$(".loada").css({"display":"block"}); 

                        vm.laonoff = true;
                    }
                    
                    
                    var arr = [];
                    for(var i in result.data.order_list){
                        arr.push( result.data.order_list[i] );                        
                    }   

                    if(old!=kid || type==1){
                        vm.order = arr;
                    }
                    else{
                        //要追加的数据                       
                        vm.order = vm.order.concat(arr);
                    }    

                    store.commit('UPDATE_LOADING', false);
                },
                error:function(e){
                    store.commit('UPDATE_LOADING', true);
                }
            },"json");
        },
        //删除订单
        delete_order:function(id,index){
            //console.log(index)
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
                                //$(".list .sg").eq(index).remove();                                
                                vm.$router.push('/center/order/all');
                                vm.init_order('all');
                            }
                        }
                    },"json");
                    layer.close(index2);
                }
            });
        },
        //取消订单
        cancel_order:function(id,index){
            var vm = this;
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
                                vm.order[index].big_status = 5;
                                //$(".list .sg").eq(index).remove();
                                vm.$router.push('/center/order/all')
                                vm.init_order('all');
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
        sure_order:function(id,index){
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
                                vm.order[index].big_status = 3;
                                //$(".list .sg").eq(index).remove();
                                vm.$router.push('/center/order/all')
                                vm.init_order(3)
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
        var canshu = this.$route.params.canshu;
        //console.log('参数'+canshu)
        this.init_order(canshu);
        store.commit('UPDATE_SHOWMENU',false);
    }
}


</script>


