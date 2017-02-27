<template>
    <div class="swap">
        <div v-title data-title="收货地址"></div>

        <div class="ftop">
            <router-link  class="back" to="/center">
                <img src="../../static/images/icon_03.png">
            </router-link>
            <h2>收货地址</h2>
            <a class="comea"></a>
            <div style="clear: both;"></div>
        </div>
        <div class="address">
            <div class="list">
                <template v-for="item in list">
                    <div class="sg on">
                      <router-link :to="'/center/edit-address/'+item.id+'/0'">
                        <span class="name"><i>{{item.name}}</i><em>{{item.phone}}</em></span>
                        <span class="place"><i v-if="item.status == 1">[默认]</i>{{item.province}}，{{item.city}}，{{item.area}}，{{item.street}}，{{item.address}}</span>
                      </router-link>
                    </div>
                </template>
            </div>
        </div>
        <router-link class="makesure" to="/center/add-address/0/0">添加收货地址</router-link>
    </div>
</template>
<script>
import store from '../../vuex/store'
export default {
    name: 'swap',
    data () {
        return {
            list: [],
            str:false
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
                url:HOST+'/api/user_address',
                type:'GET',
                success:function(result){
                    if(result.success == true){
                        vm.list = result.data
                        if(result.data == ''){
                            layer.open({
                                content: '收货地址为空'
                                ,skin: 'msg'
                                ,time: 2
                            });
                        }
                    }else{
                        layer.open({
                            content: '查询失败'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
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
        if(this.$route.params.str != 0){
            this.str = this.$route.params.str;
        }
        this.init_help_list();
        store.commit('UPDATE_SHOWMENU',false);
    }
}

</script>
