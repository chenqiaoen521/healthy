<template>
<div class="search">
<div v-title data-title="搜索"></div>


<!--ftop开始-->
<div class="ftop">
    <div class="index_search index_search01">
        <a class="back" onClick="javascript:history.back(-1);"><img src="../static/images/icon_03.png"></a>
        <div class="tdiv">
            <input type="text"  placeholder="请输入您要搜索的产品" v-model="h"><!--
            <a class="ta" @click="search()"  :href="'#/publish_xq/0/'+h" ></a> -->
            <a class="ta" @click="search()" ></a>
        </div>
    </div>
    <div style="clear: both;"></div>
</div>
<!--ftop开始-->

<div class="search_result">
    <h2><span>历史搜索</span><img @click="shanchu()" src="../static/images/icon_028.png"></h2>
    <p>
        <template v-for="item in list">
            <router-link :to="'/publish_xq/0/'+item.content">{{ item.content }}</router-link>
        </template>
    </p>
</div>

</div>
</template>

<script>
import store from '../vuex/store'

export default {
    data () {
        return {
            h:'',
            hs:[],
            list: []
        }
    },
    methods:{
        search:function(){
            var vm = this;
            if(vm.h!=""){
                //vm.hs.push(vm.h);
                vm.$router.push('/publish_xq/0/'+vm.h)
            }
            console.log(vm.hs)
            //this.setCookie('search_history',vm.hs.join(','),60000)
        },
        get_search_list:function(){
            var vm = this;
            store.commit('UPDATE_LOADING', true);
            $.ajax({
                url:HOST+'/api/search/history',
                type:'GET',
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                success:function(result){
                    vm.list= result.data;
                    store.commit('UPDATE_LOADING', false);
                },
                error:function(e){
                    store.commit('UPDATE_LOADING', false);
                }
            },"json");
        },
        shanchu:function(){
            var vm = this;
             layer.open({
                content: '您确定要删除吗？'
                ,btn: ['确认', '取消']
                ,yes: function(index){
                    store.commit('UPDATE_LOADING', true);
                     $.ajax({
                        url:HOST+'/api/search/history',
                        type:'DELETE',
                        headers:{
                            Authorization:localStorage.getItem('Authorization')
                        },
                        success:function(result){
                            if(result.success == true){
                                vm.list = [];
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
                    layer.close(index);
                }
            });
        }
    },
    created:function(){
        store.commit('UPDATE_SHOWMENU',false);
        this.get_search_list();
    }
}
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
