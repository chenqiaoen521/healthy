<template>
<div class="publish">
<div v-title data-title="产品分类"></div>

<!--ftop开始-->
<div class="ftop">
    <div class="index_search index_search01" style="padding-left: 10px;">
        <router-link class="lka" style="left:0px; display:block; width:100% !important;" to="/search">
            <input type="text" placeholder="请输入您要搜索的产品">
            <input type="button" value=" ">
        </router-link>
    </div>
    <div style="clear: both;"></div>
</div>
<!--ftop开始-->


<div class="fenlei">
    <div class="fen-nav" :style="{height:h+'px'}">
        <ul>
            <li v-for="n in fenlei" :class="{'on':n==index  }"  @click="getChilds(n)">{{n.mobile_name}}</li>    <!-- 对象之间的比较 -->
        </ul>
    </div>
    <div class="fen-box" :style="{height:h+'px'}">
        <div class="fff">
            <div class="fenlist" v-for="n in childs">
                <ul>
                    <li>
                        <router-link class="imga" :to="'/publish_xq/'+n.id+'/0'">
                            <img :src="host+n.icon">
                        </router-link>
                        <router-link class="txta" :to="'/publish_xq/'+n.id+'/0'">
                            <span>{{n.mobile_name}}</span>
                            <i>{{n.info}}</i>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>


</div>
</template>

<script>
import Vue from 'vue'
import store from '../vuex/store'


export default {
    name: 'publish',
    data () {
        return {
            fenlei:[],  //返回数据
            childs:[],
            host:HOST,  //全局域名
            h:0,
            index:null
        }
    },
    methods:{
        //初始化商品列表
        init_fenlei:function(){
            store.commit('UPDATE_LOADING', true);
            var vm = this;
            $.ajax({
                url:HOST+'/api/category',
                type:'GET',
                data:{},
                success:function(result){
                  //
                  vm.fenlei =  result.data;
                  store.commit('UPDATE_LOADING', false);
                  vm.getChilds(vm.fenlei[0]);
                }
            },"json");
        },
        getChilds:function(fenlei){
            this.index = fenlei;
            this.childs = fenlei.child;

        }

    },
    created:function(){
        this.init_fenlei();
        var m=$(window).height()-98;
        //$("html,body").css({"overflow":"hidden"})
        this.h = m;
        store.commit('UPDATE_SHOWMENU',true);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>