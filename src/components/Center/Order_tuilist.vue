<template>
<div>

<!--ftop开始-->
<div class="ftop">
    <!-- <a class="back" onClick="javascript:history.back(-1);"><img src="../../static/images/icon_03.png"></a> -->
    <router-link class="back" to="/center"><img src="../../static/images/icon_03.png"></router-link>
    <h2>退款售后</h2>
    <a class="comea" href="search.html"><!-- <img src="../../static/images/centerorder_03.png" alt="搜索"> --></a>
    <div style="clear: both;"></div>
</div>
<!--ftop开始-->


<!--个人中心-订单-->
<div class="centerorder">
    <div class="list" style="margin-top: 6px;">
        <div class="sg" v-for='(p,index) in order'>
            <a class="num">
                <span>订单号：{{p.order_goods_number}}</span>
                <i v-if="p.status==0">等待卖家处理</i>
                <i v-if="p.status==3">退款成功</i>
                <i v-if="p.status==2">退货中</i>
                <i v-if="p.status==4">退货完成</i>
                <i v-if="p.status==1">卖家拒绝申请</i>
            </a>
            <div class="thing">
                <router-link class="imga" :to="'/product/'+p.goods_id"><img :src='host+p.goods_thumb' alt=""></router-link>
                <div class="text">
                    <router-link :to="'/product/'+p.goods_id" class="name">
                        <span><i>{{p.goods_name}}</i><em v-show="p.goods_attr_values != '' ">规格：{{p.goods_attr_values}}</em></span>
                        <span class="price"><i>¥{{p.price}}</i><em>x{{p.num}}</em></span>
                    </router-link>
                </div>
            </div>
            <div class="sum">交易金额：¥{{p.sum_price}}    <!-- 退款金额：<b>¥<em>{{p.money}}</em></b> --></div>
            <!-- <div class="mation" v-if="p.status==2 && p.is_set==0">
                <h4>退货地址：苗华强，18702117108，上海上海市浦东新区合庆镇 青三村 南龚家宅76号B栋2楼</h4>
                <h5>退款说明：请将退货商品包装好，且商品不影响二次销售；请勿发平邮或到付件，商品寄出后，需及时在每笔退款上操作“填写物流信息”，以免退款超时关闭</h5>
            </div> -->
            <div class="caozuo" v-if="p.status!=1">
                <a v-if="p.status==0 && p.type==1" class="paya canclea" @click="quxiao(p.id,index,'退款')">取消退款</a>
                <a v-if="p.status==0 && p.type==2" class="paya canclea" @click="quxiao(p.id,index,'退货')">取消退货</a>
                <!-- <a v-if="p.status==3 || p.status==4" class="deletea" @click="shanchu(p.id,index)">删除订单</a> -->
                <!-- <a :href="'/center/order_fill/'+p.id">填写退货信息</a> -->
                <a v-if="p.status==2 && p.is_set==0" :href="'/center/order_fill/'+p.id">填写退货信息</a>
            </div>
        </div>
        <div class="loada nn" @click="init_order()">加载更多</div>
    </div>
</div>
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
            pagenum:1,
        }
    },
    methods:{
        //数据请求
        init_order:function(){
            var vm = this;
            store.commit('UPDATE_LOADING', true);
            $.ajax({
                url:HOST+'/api/refundList?page='+vm.pagenum,
                type:'GET',
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                success:function(result){
                    //vm.order= result.data.order_list;

                    vm.pagenum ++;

                    var allpage = result.data.page.last_page;

                    if(vm.pagenum>allpage){
                        $(".loada").hide();
                    }else{
                       $(".loada").show(); 
                    }

                    vm.order = vm.order.concat(result.data.order_list); 

                    console.log(vm.order);
                    store.commit('UPDATE_LOADING', false);
                },
                error:function(e){
                    store.commit('UPDATE_LOADING', true);
                }
            },"json");
        },
        //删除订单
        // shanchu:function(id,index){
        //     var vm = this;
        //     layer.open({
        //         content: '您确定要删除订单吗？'
        //         ,btn: ['确认', '取消']
        //         ,yes: function(index2){
        //             $.ajax({
        //                 headers:{
        //                     Authorization:localStorage.getItem('Authorization')
        //                 },
        //                 url:HOST+'/api/changeStatus/oi_'+id+'/-2',//api/changeStatus/oi_{oi_id}/-2
        //                 type:'GET',
        //                 success:function(result){
        //                     if(result.success){
        //                         layer.open({
        //                             content: "退款申请已取消"
        //                             ,skin: 'msg'
        //                             ,time: 2
        //                         });
        //                         console.log("删除了")
        //                         $(".list .sg").eq(index).remove();
        //                     }else{
        //                         layer.open({
        //                             content: result.msg
        //                             ,skin: 'msg'
        //                             ,time: 2
        //                         });
        //                     }
        //                 }
        //             },"json");
        //             layer.close(index2);
        //         }
        //     });
        // },
        //取消退款退货
        quxiao:function(id,index,text){
            var vm = this;
            layer.open({
                content: '您确定要取消'+text+'吗？'
                ,btn: ['确认', '取消']
                ,yes: function(index2){
                    $.ajax({
                        headers:{
                            Authorization:localStorage.getItem('Authorization')
                        },
                        url:HOST+'/api/refundDel/'+id, //api/changeStatus/oi_{oi_id}/-2
                        type:'GET',
                        success:function(result){
                            if(result.success){
                                layer.open({
                                    content: result.msg
                                    ,skin: 'msg'
                                    ,time: 2
                                });
                                $(".list .sg").eq(index).remove();
                            }else{
                                layer.open({
                                    content: result.msg
                                    ,skin: 'msg'
                                    ,time: 2
                                });
                            }
                        }
                    },"json");
                    layer.close(index2);
                }
            });
        }
    },
    created:function(){
        this.init_order();
        store.commit('UPDATE_SHOWMENU',false);
    }
}


</script>