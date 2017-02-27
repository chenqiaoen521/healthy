<template>
    <div class="centerindex">
        <div v-title data-title="二维码"></div>
        <!--ftop开始-->
        <div class="ftop">
            <router-link  class="back" to="/center">
                <img src="../../static/images/icon_03.png">
            </router-link>
            <h2>二维码</h2>
            <!--<a class="comea" href="#">分享</a>-->
            <div style="clear: both;"></div>
        </div>
        <!--ftop开始-->

        <!--个人中心-分享二维码-->
        <div class="centcode">
            <div class="code">
                <div class="geren" style="padding: 20px 15px;position: relative; background:#FFF">
                    <a class="imga"><img :src="user.headimgurl" alt="头像"></a>
                    <a class="name">{{user.name}}</a>
                    <h6><i>ID:{{user.ID}}</i></h6>
                </div>
                <div class="show">
                    <div v-if="qrcode == true" class="ma">
                        <img :src="user.qrcode" alt="">
                    </div>
                    <h3 v-if="qrcode == true">扫一扫二维码，加入我们</h3>
                    <h3 v-if="qrcode == false">请到公众号生成二维码</h3>
                </div>
            </div>
        </div>
        <!--个人中心-分享二维码-->
    </div>
</template>
<script>
import store from '../../vuex/store'

export default {
    name: 'centerindex',
    data () {
        return {
            user:[],
            qrcode: true
        }
    },
    methods:{
        get_code:function(){
            var vm = this;
            store.commit('UPDATE_LOADING', true);
            $.ajax({
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                url:HOST+'/api/getQrcode',
                type:'GET',
                success:function(result){
                    vm.user = result.data
                    if(vm.user.qrcode == null){
                        vm.qrcode = false;
                    }
                    //console.log(vm.qrcode);
                    store.commit('UPDATE_LOADING', false);
                },
                error:function(e){
                    store.commit('UPDATE_LOADING', false);
                }
            },"json");
        }
    },
    created:function(){
        this.get_code();
        store.commit('UPDATE_SHOWMENU',false);
    }
}
</script>