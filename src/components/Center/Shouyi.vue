<template>
    <div class="swap">
        <div v-title data-title="收益明细"></div>
        <div class="ftop">
            <router-link  class="back" to="/center/income">
                <img src="../../static/images/icon_03.png">
            </router-link>
            <h2>
                <span class="aaa" @click="ftop()">收益明细</span>
                <p class="bbb">
                    <img src="../../static/images/centermingxi_11.png" alt="">
                    <router-link  to="/center/xiaofei">账户明细</router-link>
                </p>
            </h2>
            <a class="comea"></a>
            <div style="clear: both;"></div>
        </div>
        <div class="income">
            <div class="mingxi">
                <h2>收益来源</h2>
                <div class="list">
                    <template v-for="item in list">
                        <dl><dt class="pleft"><img :src="item.headimgurl" alt=""><em>{{item.name}}</em></dt><dd><i>{{item.created_at}}</i><span>+{{item.credit}}</span></dd></dl>
                    </template>
                    
                </div>
            </div>
            <div class="loada" @click="init_help_list()">加载更多</div>
        </div>
    </div>
</template>
<script>
import store from '../../vuex/store'
export default {
    name: 'swap',
    data () {
        return {
            list: [],  //数据列表
            host:HOST,  //全局域名
            pagenum:1,  //初始页码
        }
    },
    methods:{
        init_help_list:function(){
            store.commit('UPDATE_LOADING', true);
            var vm = this;
            $(".loada").hide();
            $.ajax({
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                url:HOST+'/api/rebate?page='+vm.pagenum,
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

                        //vm.list = result.data.data
                        
                        if(result.data == ''){
                            layer.open({
                                content: '暂无数据'
                                ,skin: 'msg'
                                ,time: 2
                            });
                        }
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
        ftop:function(){
            $('.aaa').toggleClass("on");
            $('.aaa').siblings("p").toggle();
            return false;
        }
    },
    created:function(){
        this.init_help_list();
        store.commit('UPDATE_SHOWMENU',false);
    }
}

</script>
