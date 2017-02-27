<template>
    <div class="swap">
        <div v-title data-title="帮助中心"></div>
        <!--ftop开始-->
        <div class="ftop">
            <a class="back" onClick="javascript:history.back(-1);"><img src="../../static/images/icon_03.png"></a>
            <h2>帮助中心</h2>
            <a class="comea">&nbsp;</a>
            <div style="clear: both;"></div>
        </div>
        <!--ftop开始-->
        <!--个人中心-->
        <div class="sethelp">
            <div class="list">
                <template v-for="item in list">
                    <router-link  class="sg" :to="'/gonggao_xq/'+item.id">
                        <span>{{ item.title }}</span>
                    </router-link>
                </template>
            </div>
            <div class="loada nn" @click="init_gonggaos()">加载更多</div>
        </div>
    </div>
</template>
<script>
import store from '../../vuex/store'
export default {
    name: 'list',
    data () {
        return {
            list: [],
            pagenum:1,
        }
    },
    methods:{
        init_help_list:function(){
            var vm = this;
            $.ajax({
                url:HOST+'/api/helpList?page='+vm.pagenum,
                type:'GET',
                success:function(result){
                    if(result.success == true){
                        vm.pagenum ++;
                        var allpage = result.data.last_page;
                        if(vm.pagenum>allpage){
                            $(".loada").hide();
                        }else{
                           $(".loada").show();
                        }
                        vm.list = vm.list.concat(result.data.data);
                    }else{
                        alert('查询失败')
                    }
                    //store.commit('UPDATE_LOADING', false);
                },
                error:function(e){
                    console.log(e)
                }
            },"json");
        }
    },
    created:function(){
        this.init_help_list();
        store.commit('UPDATE_SHOWMENU',false);
    },
    destroyed:function(){
        store.commit('UPDATE_SHOWMENU',false);
    }
}

</script>
