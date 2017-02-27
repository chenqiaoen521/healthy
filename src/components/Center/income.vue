<template>
    <div class="swap">
        <div v-title data-title="我的钱包"></div>
        <div class="ftop">
            <router-link  class="back" to="/center">
                <img src="../../static/images/icon_03.png">
            </router-link>
            <h2>我的钱包</h2>
            <router-link  class="comea" to="/center/shouyi">明细</router-link>
            <div style="clear: both;"></div>
        </div>
        <!--个人中心-钱包收益-->
        <div class="income">
            <!--<br/>-->
            <div class="mine">
                <h5>钱包(元)</h5>
                <h6>{{user.wallet}}</h6>
            </div>
            <br/>
            <div class="mine">
                <h5>收益(元)</h5>
                <h6>{{shouyi}}</h6>
                <router-link to="/center/income_help">
                    <img src="../../static/images/centershouyi_03.png">
                </router-link>
            </div>
            <div class="sg">
                <p>
                    <router-link class="ru" to="/center/tixian_help">
                        提现<i>(提现说明)</i>
                    </router-link>
                    <router-link class="come" to="/center/tixian"></router-link>
                </p>
            </div>
        </div>
        <!--个人中心-钱包收益-->
    </div>
</template>
<script>
import store from '../../vuex/store'
export default {
    name: 'swap',
    data () {
        return {
            user: [],
            host:HOST,
            shouyi: 0.00
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
                        var agent_credit = parseFloat(vm.user.agent_credit);
                        var fenxiao_credit = parseFloat(vm.user.fenxiao_credit);
                        var shouyi = agent_credit + fenxiao_credit;
                        vm.shouyi = shouyi.toFixed(2)
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
