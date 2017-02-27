<template>
    <div class="swap">
        <div v-title data-title="我的钱包"></div>
        <div class="ftop">
            <router-link  class="back" to="/center/income">
                <img src="../../static/images/icon_03.png">
            </router-link>
            <h2>提现</h2>
            <div style="clear: both;"></div>
        </div>
        <!--个人中心-钱包收益-->
        <div class="income">
            <div class="sgl">
                <a style="background-image:none;"><span>微信钱包</span></a>
            </div>
            <div class="mine">
                <h5>提现金额</h5>
                <form id="form">
                <h6><input type="text" name="money" placeholder="请输入提现金额"></h6>
                <input type="hidden" name="type" value="1">
                </form>
            </div>
            <h4>可提现金额 {{user.wallet}} 元</h4>
        </div>
        <a class="makesure" @click="tixian()">确认提现</a>
    </div>
</template>
<script>
import store from '../../vuex/store'
export default {
    name: 'swap',
    data () {
        return {
            user: []
        }
    },
    methods:{
        init_user_info:function(){
            store.commit('UPDATE_LOADING', true);
            var vm = this;
            $.ajax({
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                url:HOST+'/api/user',
                type:'GET',
                success:function(result){
                    if(result.success == true){
                        vm.user = result.data
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
        },
        tixian:function(){
            store.commit('UPDATE_LOADING', true);
            var vm = this;
            var data = $('#form').serialize();
            $.ajax({
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                url:HOST+'/api/withdraw',
                type:'POST',
                data:data,
                success:function(result){
                    layer.open({
                        content: result.msg
                        ,skin: 'msg'
                        ,time: 2
                    });
                    //vm.init_user_info();
                    vm.$router.push('/center/income')
                    store.commit('UPDATE_LOADING', false);
                },
                error:function(e, data){
                    var result = JSON.parse(e.responseText);
                    if(result.status == 422){
                        var str = '';
                        for (var i in result.data){
                            str += result.data[i][0]+'<br/>';
                        }
                        layer.open({
                            content: str
                            ,skin: 'msg'
                            ,time: 2
                        });
                    }
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
