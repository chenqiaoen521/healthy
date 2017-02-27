<template>
<div>

<!--ftop开始-->
<div class="ftop">
    <a class="back" onClick="javascript:history.back(-1);"><img src="../../static/images/icon_03.png"></a>
    <h2>退款/退货</h2>
    <a class="comea"></a>
    <div style="clear: both;"></div>
</div>
<!--ftop开始-->


<!--个人中心-退款申请-->
<div class="refunds">
    <ul>
        <li>
            <p>物流公司<span>*</span></p>
            <label>
                <select name='comp' id="comp">
                    <template v-for="item in order">
                        <option :value='item.id'>{{item.name}}</option>
                        </template>
                </select>
            </label>
        </li>
        <li><p>物流单号<span>*</span></p><label><input type="text" v-model="comnum" placeholder="请填写物流单号"></label></li>
    </ul>
</div>
<a class="makesure" @click="init_order()">提交退货信息</a>
<!--个人中心-退款申请-->


</div>
</template>

<script>
import store from '../../vuex/store'

export default {
    data:function(){
        return {
            order:[],     //请求数据
            host:HOST,         //全局域名
            sid:'',      //商品ID
            comp:'',     //物流公司
            comnum:''    //物流单号
        }
    },
    methods:{
        //页面加载
        wuliu:function(){
            var vm = this;
            $.ajax({
                url:HOST+'/api/getWuliu',
                type:'GET',
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                success:function(result){
                    vm.order = result.data;
                    console.log(vm.order)
                }

            },"json");
        },
        //数据请求
        init_order:function(){
            var vm = this;
            var comp = $('#comp').val();
            store.commit('UPDATE_LOADING', true);

            $.ajax({
                url:HOST+'/api/saveRefund',
                type:'POST',
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                data:{company:comp,number:vm.comnum,id:vm.sid},
                success:function(result){
                    layer.open({
                        content: '退货信息已成功提交！'
                        ,skin: 'msg'
                        ,time: 2
                    });
                    vm.$router.push('/center/order_tuilist')   //跳转回退货列表
                    store.commit('UPDATE_LOADING', false);
                },
                error:function(e){
                    store.commit('UPDATE_LOADING', true);
                }
            },"json");
        }


    },
    created:function(){
        var vm = this;
        vm.sid = this.$route.params.id;
        store.commit('UPDATE_SHOWMENU',false);

        this.wuliu();
        console.log(vm.sid)
    }
}


</script>

