<template>
    <div class="swap">
        <div v-title data-title="提现说明"></div>
        <div class="ftop">
            <router-link  class="back" to="/center/income">
                <img src="../../static/images/icon_03.png">
            </router-link>
            <h2>提现说明</h2>
            <div style="clear: both;"></div>
        </div>
        <!--个人中心-奖励规则-->
        <div class="income">
            <div class="tip">
                <h3>{{title}}</h3>
                <p v-html="content"></p>
            </div>
        </div>
        <!--个人中心-奖励规则-->
    </div>
</template>
<script>
import store from '../../vuex/store'
export default {
    name: 'swap',
    data () {
        return {
            title: '',
            content:''
        }
    },
    methods:{
        init_user_info:function(){
            store.commit('UPDATE_LOADING', true);
            var vm = this;
            $.ajax({
                url:HOST+'/api/withdraw_intro',
                type:'GET',
                success:function(result){
                    if(result.success == true){
                        vm.title = result.data[0].title;
                        vm.content = result.data[0].content;
                    }else{
                        layer.open({
                            content: result.msg
                            ,skin: 'msg'
                            ,time: 2
                        });
                    }
                    store.commit('UPDATE_LOADING', false);
                },
                error:function(e){

                    store.commit('UPDATE_LOADING', false);
                }
            },"json");
        }
    },
    created:function(){
        this.init_user_info();
        store.commit('UPDATE_SHOWMENU',false);
    }
}

</script>
