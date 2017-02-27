<template>
    <div class="swap">
        <div v-title data-title="我的云粉"></div>
        <div class="ftop">
            <router-link  class="back" to="/center">
                <img src="../../static/images/icon_03.png">
            </router-link>
            <h2>我的云粉</h2>
            <a class="comea"></a>
            <div style="clear: both;"></div>
        </div>
        <!--个人中心-收益明细-->
        <div class="income">
            <div class="mingxi tance">
                <div class="list">
                    <template v-for="item in list">
                        <dl><dt class="pleft"><img :src="item.headimgurl" alt=""><em>{{item.name}}<i>({{item.count}}个成员 )</i></em></dt><dd><i>{{item.created_at}}</i><span>+{{item.money}}</span></dd></dl>
                    </template>
                </div>
            </div>
        </div>
        <!--个人中心-收益明细-->
    </div>
</template>
<script>
import store from '../../vuex/store'
export default {
    name: 'swap',
    data () {
        return {
            list: [],
            host:HOST
        }
    },
    methods:{
        init_help_list:function(){
            store.commit('UPDATE_LOADING', true);
            var vm = this;
            $.ajax({
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                url:HOST+'/api/myChild',
                type:'GET',
                success:function(result){
                    if(result.success == true){
                        vm.list = result.data
                        if(result.data == ''){
                            layer.open({
                                content: '暂无数据'
                                ,skin: 'msg'
                                ,time: 2
                            });
                        }
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
        this.init_help_list();
        store.commit('UPDATE_SHOWMENU',false);
    }
}

</script>
