<template>
<div id="app">

<loading v-show="isLoading" position="absolute"></loading>
<!-- 路由出口 -->
<!-- 路由匹配到的组件将渲染在这里 -->
<router-view></router-view>

<!--菜单-->
<div class="fixft" v-show="showMenu">
    <router-link to="/" :class="{'current':'/'==route.path}">
        <span>
            <img src="./static/images/navicon_45.png" class="img1">
            <img src="./static/images/navicon_28.png" class="img2">
        </span>
        <i>首页</i>
    </router-link>
    <router-link to="/publish" :class="{'current':'/publish'==route.path}">
        <span>
            <img src="./static/images/navicon_48.png" class="img1">
            <img src="./static/images/navicon_30.png" class="img2">
        </span>
        <i>分类</i>
    </router-link>
    <router-link to="/shopcar" :class="{'current':'/shopcar'==route.path}">
        <span>
            <img src="./static/images/navicon_50.png" class="img1">
            <img src="./static/images/navicon_32.png" class="img2">
            <em v-if="is_login == true" class="shop_car_count">{{shopcar_count}}</em>
        </span>
        <i>购物车</i>
    </router-link>
    <router-link to="/center" :class="{'current':'/center'==route.path}">
        <span>
            <img src="./static/images/navicon_42.png" class="img1">
            <img src="./static/images/navicon_35.png" class="img2">
        </span>
        <i>我的</i>
    </router-link>
</div>
<!--菜单-->


</div>
</template>
<script>
    import store from './vuex/store'
    import jquery from './static/lib/jquery.min.js'
    import layer from './static/lib/layer.js'
    import common from './static/common.js'
    //import weixin from 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js'
    import jqueryform from './static/lib/jquery.form.js'
    //import baidu from 'http://api.map.baidu.com/api?key=&v=1.1&services=true'

    import Loading from './plugins/loading'   //loading组件加载
    // import Alert from './plugins/alert'   //alert组件加载
    // import Dialogs from './plugins/dialog'   //dialog组件加载
    // import Toast from './plugins/toast'   //dialog组件加载


    require('./static/css/animate.css')
    require('./static/css/Cbase.css')
    require('./static/css/fullscreenstyle.css')
    require('./static/css/index.css')
    require('./static/css/swiper.min.css')
    require('./static/css/center.css')
    require('./static/css/layer.css')

    export default {
        data:function(){
            return {
                shopcar_count: 0,
                is_login:false
        }
    },
    components:{
        jquery,
        Loading
    },
    store: store,
    computed: {
        isLoading (){
            return this.$store.state.isLoading;
        },
        showMenu () {
            return this.$store.state.showMenu;
        },
        route(){
            return this.$store.state.route;
        }

    },
    methods:{
        login:function(email,password){
            $.ajax({
                url:HOST+'/api/login',
                        type:'POST',
                        data:{'email':email,'password':password},
                success:function(result){
                    if(result.success){
                        localStorage.setItem('Authorization','Bearer ' + result.data.token);
                        console.log('登录成功')
                    }else{
                        console.log('登录失败')
                    }
                }
            },"json");
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
                        vm.is_login = true;
                        vm.shopcar_count = result.data.count;
                    }
                },
                error:function(e){
                }
            },"json");
      }
    },
    created:function(){
        this.get_shopcar_count();

        //this.login('simayubo@gmail.com','123456');
        //this.login('wangyan@wangyan.com','123456');
        this.login('15890690720','112233');
    },
    updated:function(){
        var bottom01 = $(".fixft").height();
        var bottom02 = $(".makesure").height();
        var bottom03 = $(".amount").height();
        var bottom04 = $(".payfix").height();

        var top01 = $(".ftop").height();
        var top02 = $(".orderkind").height();
        if(top01){top01=46;}
        if(top02){top02=58;}
        if(bottom01){bottom01=54;}
        var bottom = bottom01 + bottom02 + bottom03+ bottom04;
        var top = top01 + top02;
        $("body").css({"padding-bottom":bottom+"px","padding-top":top+"px"})
    }
}
</script>

<style>

</style>
