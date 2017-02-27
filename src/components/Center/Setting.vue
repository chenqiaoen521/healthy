<template>
    <div class="search">
        <div v-title data-title="设置中心"></div>
    <!--ftop开始-->
    <div class="ftop">
        <a class="back" onClick="javascript:history.back(-1);"><img src="../../static/images/icon_03.png"></a>
        <h2>设置中心</h2>
        <a class="comea">&nbsp;</a>
        <div style="clear: both;"></div>
    </div>
    <!--ftop开始-->
    <!--个人中心-->
    <div class="centerset">
        <div class="come">
            <router-link to="/center/user-setting">
                <span class="bg1">个人资料</span><i class="bg"></i>
            </router-link>
            <router-link to="/center/help">
                <span class="bg2">帮助中心</span><i class="bg"></i>
            </router-link>
            <a href="tel:400-7777-051"><span class="bg3">客服热线</span><i>{{ tel }}</i></a>
        </div>
    </div>
        </div>
    <!--个人中心-->
</template>
<script>

import store from '../../vuex/store'
export default {
    data () {
        return {
            tel: ''
        }
    },
    methods:{
        get_tel:function(){
            var vm = this;
            $.ajax({
                url:HOST+'/api/hot_tel',
                type:'GET',
                success:function(result){
                    if(result.success == true){
                        vm.tel = result.data[0].value
                    }else{
                        alert('系统异常')
                    }
                    //store.commit('UPDATE_LOADING', false);
                }
            },"json");
        }
    },
    created:function(){
        this.get_tel();
        store.commit('UPDATE_SHOWMENU',false);
    }
}
</script>
