<template>
<div class="pay_order">
<div v-title data-title="支付订单"></div>

<!--ftop开始-->
<div class="ftop">
    <!-- <a class="back" onClick="javascript:history.back(-1);"><img src="./../static/images/icon_03.png"></a> -->
    <router-link class="back" to="/center/order/-1"><img src="./../static/images/icon_03.png"></router-link>
    <h2>支付订单</h2>
    <a class="comea">&nbsp;</a>
    <div style="clear: both;"></div>
</div>
<!--ftop开始-->

<div class="number">
    <p><span>订单编号：{{data.order_num}}</span><i>等待付款</i></p>
</div>
<p class="money"><span>支付金额</span><i>¥{{data.pay_price}}</i></p>
<div class="pay_way">
    <span>选择支付方式</span>
    <p :class="{'on':moren}"><label><img src="./../static/images/icon_034.png"><i>微信支付</i><input type="radio" name="way" @click='way()'></label></p>
    <p :class="{'on':!moren}"><label><img src="./../static/images/icon_035.png"><i>余额支付</i><input type="radio" name="way" @click='way()'></label></p>
</div>
<a class="confirm_pay" @click="mima()">确认支付</a>


<!-- 支付弹窗 -->
<div class="mask" @click="guanbi()" v-if='showon'></div>
<div class="write_password" v-if='showon'>
    <h2>
        <i>输入密码</i>
        <router-link :to="'/center/user-setting'">忘记密码?</router-link>
    </h2>

    <div class="pwd-box">
        <div class="fake-box" id="myForm" name="card" >
            <!-- <input @keyup='keyup(0)' type="password" class="numb on" id="n0" tabindex="1" name="n1" onkeyup="value=value.replace(/[^0-9]/g,'')" maxlength="1" >
            <input @keyup='keyup(1)' type="password" class="numb" id="n1" tabindex="2" name="n2" onkeyup="value=value.replace(/[^0-9]/g,'')" maxlength="1"  >
            <input @keyup='keyup(2)' type="password" class="numb" id="n2" tabindex="3" name="n3" onkeyup="value=value.replace(/[^0-9]/g,'')" maxlength="1"  >
            <input @keyup='keyup(3)' type="password" class="numb" id="n3" tabindex="4" name="n4" onkeyup="value=value.replace(/[^0-9]/g,'')" maxlength="1"  >
            <input @keyup='keyup(4)' type="password" class="numb" id="n4" tabindex="5" name="n5" onkeyup="value=value.replace(/[^0-9]/g,'')" maxlength="1"  >
            <input @keyup='keyup(5)' type="password" class="numb" id="n5" tabindex="6" name="n6" onkeyup="value=value.replace(/[^0-9]/g,'')" maxlength="1"  > -->
            <input @click="add(0)" type="password" style="" class="numb on" value="" maxlength="1"  >
            <input @click="add(1)" type="password" class="numb" value="" maxlength="1"  >
            <input @click="add(2)" type="password" class="numb" value="" maxlength="1"  >
            <input @click="add(3)" type="password" class="numb" value="" maxlength="1"  >
            <input @click="add(4)" type="password" class="numb" value="" maxlength="1"  >
            <input @click="add(5)" type="password" class="numb" value="" maxlength="1"  >
        </div>

    </div>

    <!-- <router-link class="forget_password" :to="'/center/user-setting'">
        忘记密码?
    </router-link> -->

    <div class="btnBox">
        <div class="jian" @click='xie(1)' >1</div>
        <div class="jian" @click='xie(2)' data-val="2">2</div>
        <div class="jian" @click='xie(3)' data-val="3">3</div>
        <div class="jian" @click='xie(4)' data-val="4">4</div>
        <div class="jian" @click='xie(5)' data-val="5">5</div>
        <div class="jian" @click='xie(6)' data-val="6">6</div>
        <div class="jian" @click='xie(7)' data-val="7">7</div>
        <div class="jian" @click='xie(8)' data-val="8">8</div>
        <div class="jian" @click='xie(9)' data-val="9">9</div>
        <!-- <div class="jian clear tu" @click='xie(10)' data-val="clear"><img src="./../static/images/qingkongcon.png"></div> -->
        <div class="jian clear tu" data-val="clear" @click="guanbi()">取消</div>
        <div class="jian" @click='xie(0)' data-val="0">0</div>
        <!-- <div class="jian del tu" @click='xie(11)' data-val="del"><img src="./../static/images/tuicon.png"></div> -->
        <div class="jian del tu" data-val="del" @click="qingqiu()">完成</div>
    </div>

</div>
<!-- 支付弹窗 -->

<!-- 支付弹窗 -->
<!-- <div class="keyboard" id="keyboard">
  <div class="t"><div class="submit" data-val="submit">完成</div></div>
  <div class="btnBox">
    <div class="jian">1</div>
    <div class="jian" data-val="2">2</div>
    <div class="jian" data-val="3">3</div>
    <div class="jian" data-val="4">4</div>
    <div class="jian" data-val="5">5</div>
    <div class="jian" data-val="6">6</div>
    <div class="jian" data-val="7">7</div>
    <div class="jian" data-val="8">8</div>
    <div class="jian" data-val="9">9</div>
    <div class="jian clear tu" data-val="clear"><img src="./../static/images/qingkongcon.png"></div>
    <div class="jian" data-val="0">0</div>
    <div class="jian del tu" data-val="del"><img src="./../static/images/tuicon.png"></div>
  </div>
</div> -->
<!-- 支付弹窗 -->



</div>
</template>

<script>
import Vue from 'vue'
import store from '../vuex/store'

export default {
    data:function() {
        return {
            data:[] ,          //请求得到的数据
            router_id:null,    //传递的id参数
            moren:true ,       //控制支付方式
            fangzhi:0,         //给支付接口的支付方式参数
            showon:false,       //控制支付窗口是否显示
            passstr:''             //返回密码
        }
    },
    methods:{
        init_confirm:function(){
            var vm = this;
            var router_id = this.$route.params.id;
            $.ajax({
                url:HOST+'/api/pay_order',
                type:'GET',
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                data:{id:router_id},
                success:function(result){
                    vm.data =  result.data;
                    //console.log(vm.data) ;
                    //console.log(vm.data.order_id)  // 给支付接口的订单ID
                }
            },"json");
        },
        way:function(){
            var vm = this;
            vm.moren = ! vm.moren;
            //console.log(vm.moren)
        },
        //input选中  废弃
        keyup:function(index){

            var vm = this;
            var _this = $("#myForm input").eq(index);
            if(_this.length>=1 && _this.val() != '' ){
            // if($(this).length>=1){
                //console.log($("#myForm input").eq(index))
                switch(index){
                    case 0: $("#n1").focus(); break;
                    case 1: $("#n2").focus(); break;
                    case 2: $("#n3").focus(); break;
                    case 3: $("#n4").focus(); break;
                    case 4: $("#n5").focus(); break;
                    case 5: // break;
                    default: break;
                }
            }
            var  chuan= '';

            for(var i=0; i<6;i++){
                var txt = $("#myForm input").eq(i).val();
                if (txt ==''){ txt =''};
                chuan = chuan + txt;
            }
            vm.passstr = chuan;

            if(vm.passstr.length==6){
                vm.qingqiu();
            }
        },
        mima:function(){

            var vm = this;
            //先拿到支付方式
            if(vm.moren){

                vm.fangzhi=2;

                this.callpay();
                //store.commit('UPDATE_LOADING',true);

            }else{
                vm.fangzhi=1;
                //console.log('余额支付');

                //当前只执行余额支付
                //打开弹窗
                store.commit('UPDATE_LOADING',true);
                vm.showon = true;

                store.commit('UPDATE_LOADING',false);
                //获取输入密码
                //console.log('密码是'+vm.passstr);
                //var n = vm.passstr.length;
                //console.log('密码长度'+n);
            }
            console.log(88888)

        },
        qingqiu:function(chuan){
            //console.log('来请求了')
            var vm = this;
            vm.showon = false;
            var router_id = this.$route.params.id;

            if(vm.passstr.length<6){
                layer.open({
                    content: '输入的密码长度有误'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
            }
            else if(vm.passstr.length==6)
            {
                console.log(vm.passstr)
                console.log('发送请求')
                $.ajax({
                    url:HOST+'/api/pay',
                    type:'POST',
                    headers:{
                        Authorization:localStorage.getItem('Authorization')
                    },
                    data:{password:vm.passstr,order_id:router_id,pay_type:vm.fangzhi},
                    success:function(result){
                        if(result.success){
                            layer.open({
                                content: '订单已经支付成功'
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            vm.$router.push('/center/order/all')

                        }else{
                            layer.open({
                                content: result.msg
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                        }
                    }
                },"json");
            }
            store.commit('UPDATE_LOADING',false);

        },
        guanbi:function(){
            var vm = this;
            vm.showon = false;
        },
        callpay:function() {
            var vm = this;
            var id = this.$route.params.id
            store.commit('UPDATE_LOADING', true);
            $.ajax({
                type: 'get',
                data:{oi_id: id},
                url: HOST+'/jsApi',
                success: function (msg) {
                    global.jsApiParameters = msg.data;
                    if (typeof WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                            document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                        }
                    } else {
                        store.commit('UPDATE_LOADING', false);
                        WeixinJSBridge.invoke(
                            'getBrandWCPayRequest',
                            jsApiParameters,
                            function (res) {
                                console.log(res.err_code+res.err_desc+res.err_msg);
                                //如果支付成功
                                if (res.err_msg == 'get_brand_wcpay_request:ok') {
                                    //支付成功后跳转的地址
                                    layer.open({
                                        content: '支付成功'
                                        ,skin: 'msg'
                                        ,time: 2
                                    });
                                } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
                                    layer.open({
                                        content: '取消支付'
                                        ,skin: 'msg'
                                        ,time: 2
                                    });
                                } else if (res.err_msg == 'get_brand_wcpay_request:fail') {
                                    layer.open({
                                        content: '支付失败'
                                        ,skin: 'msg'
                                        ,time: 2
                                    });
                                } else {
                                    layer.open({
                                        content: '未知错误'
                                        ,skin: 'msg'
                                        ,time: 2
                                    });
                                }
                                vm.$router.push('/center/order_xq/'+id)
                            }
                        );
                    }
                    store.commit('UPDATE_LOADING',false);
                }
            });
        },
        //写入
        xie:function(num){
            var vm = this;
            if(num==10){
               //清空
                $(".fake-box input").val(' ');
                $(".fake-box input").removeClass("on");
                $(".fake-box input").eq(0).addClass("on")
            }
            else if(num ==11){
                //删除

                var  n = $(".fake-box input.on").index()-1;
                if(n>-1){
                    $(".fake-box input.on").val(' ');
                    $(".fake-box input").removeClass("on");
                    $(".fake-box input").eq(n).addClass("on");
                }else{

                    $(".fake-box input").eq(0).val(' ');
                    $(".fake-box input").eq(0).addClass("on");
                }
            }
            else{
                //var moes = $(".fake-box input").length;
                //if(!$(".skuang div").eq(5).hasClass("on")){

                    var  n = $(".fake-box input.on").index()+1;
                    $(".fake-box input.on").val(num);
                    $(".fake-box input").removeClass("on");
                    $(".fake-box input").eq(n).addClass("on");
                    if(n>=$(".fake-box input").length){

                        $(".fake-box input.on").val(num);
                        $(".fake-box input").eq(5).addClass("on");
                        vm.showon = false;
                        var mmstr = '';
                        for(var i=0; i<6;i++){
                            mmstr += $(".fake-box input").eq(i).val();
                        }
                        vm.passstr = mmstr;
                        //console.log(vm.passstr)
                        vm.qingqiu();
                    }
            }

        },
        //添加
        add:function(index){
            var vm = this;
            $(".fake-box input").removeClass("on");
            $(".fake-box input").eq(index).addClass("on")
        }
    },
    created:function(){
        store.commit('UPDATE_SHOWMENU',false);
        this.init_confirm();
        console.log(HOST);
    }
}
</script>
<style type="text/css"></style>
