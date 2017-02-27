<template>
<div class="gonggao">


<!--ftop开始-->
<div class="ftop"> <a class="back" onClick="javascript:history.back(-1);"><img src="../static/images/icon_03.png"></a>
    <h2>公告详情</h2>
        <a class="comea">&nbsp;</a>
    <div style="clear: both;"></div>
</div>
<!--ftop开始-->

<div class="notice">
    <ul>
        <li v-for="n in gonggaos">
        <!-- <router-link  :to="{ name: 'gonggao_xq', params: { id: n.id }}">
          <h2><span>{{n.title}}</span><i>{{n.created_at}}</i></h2>
          <p>{{n.desc}}</p>
        </router-link> -->
            <router-link :to="'/gonggao_xq/'+n.id">
                <h2><span>{{n.title}}</span><i>{{n.created_at}}</i></h2>
                <p>{{n.desc}}</p>
            </router-link>
      </li>
    </ul>
    <div class="loada nn" @click="init_gonggaos()">加载更多</div>
</div>

</div>
<!--fixft结束-->
</template>

<script>

import Vue from 'vue'
import store from '../vuex/store'
/*'*/

export default {
    name : 'gonggao',
    data :function() {
        return{
            gonggaos:[],
            pagenum:1,
        }
    },
    components: {

    },
    methods:{
        //初始化商品列表
        init_gonggaos:function(){

            store.commit('UPDATE_LOADING', true);
            $(".loada").hide();
            var vm = this;
            $.ajax({
                url:HOST+'/api/notice?page='+vm.pagenum,
                type:'GET',
                data:{},
                success:function(result){
                    vm.pagenum ++;

                    var allpage = result.data.last_page;

                    if(vm.pagenum>allpage){
                        $(".loada").hide();
                    }else{
                        $(".loada").show(); 
                    }

                    vm.gonggaos = vm.gonggaos.concat(result.data.data); 
                    store.commit('UPDATE_LOADING', false);
              }
            },"json");
        }
    },
    created:function(){
        this.init_gonggaos();
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
