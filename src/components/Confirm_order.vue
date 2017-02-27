<template>
<div class="confirm_order">
<div v-title data-title="确认订单"></div>

<!--ftop开始-->
<div class="ftop">
    <a class="back" onClick="javascript:history.back(-1);"><img src="../static/images/icon_03.png"></a>
    <h2>确认订单</h2>
    <a class="comea">&nbsp;</a>
    <div style="clear: both;"></div>
</div>
<!--ftop开始-->


<div class="ordersure">
    <a @click="chose()" class="address2" v-if='moren_address !="" '>
        <div>
            <h2><span>收货人: {{moren_address.name}}</span><i>{{moren_address.phone}}</i></h2>
            <p>收货地址：{{moren_address.province}} {{moren_address.city}} {{moren_address.area}} {{moren_address.street}} {{moren_address.address}}</p>
        </div>
    </a>
    <router-link class="goadd" :to="'/center/chose_address/'+str" v-if='moren_address =="" '>你还没有添加收货地址，去个人中心添加吧 &gt;&gt;</router-link>

    <div class="goods_list" v-if="order.length>0">
        <h2>商品清单</h2>
        <ul>
            <li v-for="p in order">
                <router-link  :to="'/product/'+p.id">
                    <img :src="host+p.thumb">
                    <div>
                        <p>{{p.name}}</p>
                        <span v-show='p.attr_value != "" '>规格：{{p.attr_value}}</span>
                        <h3><span>¥{{p.sellprice}}</span><i>x{{p.num}}</i></h3>
                    </div>
                </router-link>
            </li>
       </ul>
    </div>

    <div class="delivery">
        <span>配送费</span><p>免邮费/快递费<i>￥{{order_postmoney}}</i></p>
    </div>

    <div class="message">
        <label>留言备注</label>
        <textarea rows="2" id="remark"  placeholder="请输入您想要备注的内容"></textarea>
    </div>

    <p class="sunm">共<i>{{order_num}}</i>件商品，合计:<i>￥{{order_paymoney}}</i>(含快递费)</p>
    <div class="amount">
        <span>需付:<i>￥{{order_paymoney}}</i></span>
        <a @click="chuangzao()">提交订单</a>
    </div>
</div>

</div>
</template>

<script>
import Vue from 'vue'
import store from '../vuex/store'

export default {
    data:function() {
        return {
            //router_data :'',  //传递的路由参数
            order:[],          //返回的商品数据
            order_num:0,          //返回的商品数量
            order_money:0,          //返回的商品价格
            order_paymoney:0,          //返回的商品支付价格
            order_postmoney:0,          //返回的商品运费价格
            moren_address:{} ,     //返回的地址
            host:HOST,
            str:'',      //返回的串
            msg:'',        //买家留言
            dingdan:null   //创建的订单ID
        }
    },
    methods:{
        //请求订单的数据
        init_confirm:function(){
            var vm = this;
            var router_data = this.$route.params.data;   //路由传递的参数
            var router_addr = this.$route.params.addr;   //路由传递的参数

            $.ajax({
                url:HOST+'/api/order',
                type:'GET',
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                data:{data:router_data,addr_id:router_addr},   //传参请求
                success:function(result){

                    vm.order = result.data.goods_list;
                    vm.order_num = result.data.goods_list.length;
                    vm.order_money = result.data.price;
                    vm.order_paymoney = result.data.total_price;
                    vm.order_postmoney = result.data.postage;

                    vm.str = result.data.str
                    //console.log(vm.str)

                    vm.moren_address = result.data.default_address; //获取地址信息

                    //console.log(vm.moren_address)
                    //console.log(vm.moren_address.id);
                }
            },"json");
        },
        chose:function(){
            var vm = this;
            vm.$router.push('/center/chose_address/'+vm.str)
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
        chuangzao:function(){
            store.commit('UPDATE_LOADING', true);
            var vm = this;
            var remark = $('#remark').val();
            if(vm.moren_address ==""){
                layer.open({
                    content: '请先添加一个收货地址'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
            }else{
                var vm = this;
                var router_data = this.$route.params.data;
                var router_addr = this.$route.params.addr;
                console.log(vm.moren_address.id);
                $.ajax({
                    url:HOST+'/api/create_order',
                    type:'POST',
                    headers:{
                        Authorization:localStorage.getItem('Authorization')
                    },
                    data:{data:router_data,addr:vm.moren_address.id,remark:remark},
                    success:function(result){
                        vm.dingdan = result.data.order_id;
                        vm.get_shopcar_count(); //更新购物车数量
                        console.log(vm.dingdan)
                        store.commit('UPDATE_LOADING', false);
                        vm.$router.push('/pay_order/'+vm.dingdan)
                    },
                    error:function(){
                        store.commit('UPDATE_LOADING', false);
                    }
                },"json");
            }
        }
    },
    created:function(){
        this.init_confirm();
        store.commit('UPDATE_SHOWMENU',false);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>