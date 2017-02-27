<template>
<div class="shopcars">
<div v-title data-title="购物车"></div>

<!--ftop开始-->
<div class="ftop">
    <a class="back" onClick="javascript:history.back(-1);" style="float:none; position:absolute; left:15px; top:4px; width:40px;"><img src="../static/images/icon_03.png"></a>
    <h3 style=" text-align:center; font-size:18px;">购物车</h3>
    <a style="position:absolute; top:4px; font-size:14px; right:15px; color:#333" v-show="lists.length>0" class="all" @click="bianji()">{{msg}}</a>
    <div style="clear: both;"></div>
</div>
<!--ftop开始-->


<div class="shopcar">
    <ul v-show="lists.length>0">
        <li v-for="(p, index) in lists" :class=" 'li_'+index ">
            <p>
                <label :class="{'on': p.check}"><input @click ="sinselect(index)" type="checkbox"></label>
                <a :href="'/product/'+p.goods_id"><img :src="host+p.thumb"></a>
            </p>
            <div class="shop_car">
                <a :href="'/product/'+p.goods_id">{{p.name}}</a>
                <span v-show="p.attr_values != '' ">规格：{{p.attr_values}}</span>
                <div class="shu">
                    <em>数量：<b>{{p.num}}</b></em>
                    <a><i>￥</i><b>{{p.num * parseInt(p.price*100)/100}}</b></a>
                </div>
                <div class="xiugai" :class="{'on':biancan}">
                    <div class="shul">
                        <span class="jian" @click="jianshao(index)"><img src="../static/images/icon_016.png"></span>
                        <input class="shopcart-td-num" type="text" v-model="p.num">
                        <span class="jia" @click="zengjia(index)"><img src="../static/images/icon_017.png"></span>
                    </div>
                    <a class="dea" @click="deletesin(p.id,index,'ok')">删除</a>
                </div>
            </div>
            <!--<img class="delete" src="../static/images/icon_030.png">-->
        </li>
    </ul>

    <!-- 购物车为空 -->
    <div class="shopcar_null" v-show="lists.length==0 && GQlists.length==0">
        <img src="../static/images/car.jpg">
        <span>您还没有购买任何商品</span>
        <p>
            <router-link to='/center' class="person" >个人中心</router-link>
            <router-link to='/publish'>马上去逛逛</router-link>
        </p>
    </div>
    <!-- 购物车为空 -->

    <!-- 失效宝贝 -->
    <div v-show="GQlists.length>0">
        <h2><span>失效宝贝</span></h2>
        <ul>
            <li v-for="(p, index2) in GQlists" class="on" :class=" 'noli_'+index2 ">
                <p><label><input type="checkbox"></label><a :href="'/product/'+p.goods_id"><img :src="host+p.thumb"></a></p>
                <div class="shop_car">
                    <a :href="'/product/'+p.goods_id">{{p.name}}</a>
                    <span v-show="p.attr_values != '' ">规格：{{p.attr_values}}</span>
                    <div class="shu">
                        <em>数量：<b>{{p.num}}</b></em>
                        <a><i>￥</i><b>{{p.price}}</b></a>
                    </div>
                    <div class="xiugai" :class="{'on':biancan}">
                        <!-- <div class="shul">
                            <span class="jian"><img src="../static/images/icon_016.png"></span>
                            <input class="shopcart-td-num" type="text" v-model="p.num">
                            <span class="jia"><img src="../static/images/icon_017.png"></span>
                        </div> -->
                        <a class="dea" @click="deletesin(p.id,index2,'no')">删除</a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <!-- 失效宝贝 -->

    <!-- 付款信息 -->
    <div class="pay payfix">
        <label :class="{'on':Allcon}"><input type="checkbox"><span @click="allselect()">全选</span></label>
        <div class="pay_right" >
            <p><span>合计：<b>￥{{sunmoney}}</b></span><i>不含运费</i></p>
            <a @click= "qujiesuan()">结算（{{sunnum}}）</a>
        </div>
    </div>
    <!-- 付款信息 -->

</div>





</div>
</template>

<script>
import Vue from 'vue'
import store from '../vuex/store'

export default {
    name:"shopcar",
    data:function() {
        return {
            lists:[],        //返回的数据 正常
            GQlists:[],      //返回的数据 失效宝贝
            biancan:false,   //编辑参数
            msg:"编辑",      //编辑文本
            Allcon:false,   //是否全选
            onoff:false,     //单选
            deleta_ids:null,   //删除商品的id
            sunmoney:0,         //结算价格
            sunnum:0,         //结算数量
            databack:[],       //传递到结算页面的参数
            choselist:'',       //选择结算的商品列表
            host:HOST        //全局域名
        }
    },
    methods:{
        //获取数据吧
        init_car:function(){
            var vm = this;
            $.ajax({
                url:HOST+'/api/shopcar',
                type:'GET',
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                success:function(result){
                    vm.lists = result.data.stock_yes;
                    vm.GQlists = result.data.stock_no;
                }
            },"json");
        },
        //列表编辑
        bianji:function(){
            var vm = this;
            vm.biancan = ! vm.biancan;
            if(vm.msg=="编辑"){
                vm.msg = "完成";
            }else{
                vm.msg = "编辑";
            }
            //this.setsum();
        },
        //数量减
        jianshao:function(index){
            var vm = this;
            console.log(index)
            var n = index;
            if(vm.lists[n].num>1){
                vm.lists[n].num --;
            }
            this.setsum();
        },
        //数量加
        zengjia:function(index){
            var vm = this;
            console.log(index)
            var n = index;
            if(vm.lists[n].num<vm.lists[n].stock){
                vm.lists[n].num ++;
            }else{
               layer.open({
                    content: '库存不足'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
            }
            this.setsum();
        },
        //全选
        allselect:function(){
            var vm = this;
            vm.Allcon = ! vm.Allcon;
            console.log(vm.Allcon)
            console.log(2)
            if(vm.Allcon){
                for(var i in vm.lists){
                    vm.lists[i].check  = true;
                }
            }else{
                for(var i in vm.lists){
                    vm.lists[i].check  = false;
                }
            }

            console.log("执行一次全选")

            this.setsum();
        },
        //单选
        sinselect:function(index){
            var vm = this;

            var onoff = ! vm.lists[index].check;
            vm.lists[index].check = onoff


            //检测是否全选 n作为参考值
            var n = true;
            for(var i in vm.lists){
                if(!vm.lists[i].check){
                    n = false;
                }
            }

            if(n){
                vm.Allcon = true;
            }else{
                vm.Allcon = false;
            }


            this.setsum();
        },
        //删除购物车
        deletesin:function(id,index,kind){
            var vm = this;
            var deleta_ids = id;

            console.log()
            $.ajax({
                url:HOST+'/api/del_car',
                type:'GET',
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                data:{"id":deleta_ids},
                success:function(result){
                    if(result.success){
                        vm.lists[index].check = ! vm.lists[index].check;
                        //vm.setsum();
                        layer.open({
                            content: '删除成功'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                        /*if(kind=="ok"){
                            $(".li_"+ index ).remove();
                        }else{
                            $(".noli_"+ index ).remove();
                        }*/
                        //刷新页面
                        vm.init_car();
                        vm.get_shopcar_count();
                        vm.sunmoney = 0;
                        vm.sunnum = 0;
                        vm.Allcon = false;
                    }
                }
            },"json");
            vm.get_shopcar_count();
        },
        //遍历计算价格
        setsum:function(){
            var vm = this;
            vm.sunmoney = 0;
            vm.sunnum = 0;
            for(var i in vm.lists){
                if(vm.lists[i].check){
                    console.log("计算价格"+i)
                    vm.sunmoney += vm.lists[i].num * parseInt(vm.lists[i].price*100)/100;
                    vm.sunnum += vm.lists[i].num;
                }
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
        //结算页面
        qujiesuan:function(){
            var vm = this;

            for( var i in vm.lists){
                if(vm.lists[i].check){
                    vm.databack.push(vm.lists[i].id+'_'+vm.lists[i].num);
                }
            }
            var string =  vm.databack.join(",")
            console.log(string)  //查找选中的商品的序列，为空表示没有选择

            if(string==''){
                //没有选择商品 弹出提醒
                layer.open({
                    content: '请先选择商品'
                    ,skin: 'msg'
                    ,time: 1.5 //2秒后自动关闭
             });
            }else{
                //如果有商品选中，去请求
                $.ajax({
                    url:HOST+'/api/shopping_cart',
                    type:'get',
                    headers:{
                        Authorization:localStorage.getItem('Authorization')
                    },
                    data:{data:string},
                    success:function(result){
                        //console.log(vm.lists)
                        if(result.success == true){
                            var backid = result.data;
                            console.log(backid);
                            vm.$router.push('/confirm_order/'+backid+'/0')   //跳转到确认订单页面，根据传参规则，此处没有收货地址用0
                        }
                    }
                },"json");
            }
        }
    },
    created:function(){
        this.init_car();
        store.commit('UPDATE_SHOWMENU',true);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>