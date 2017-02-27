<template>
    <div class="search_list">
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
        <div class="search_list">
            <p><a class="on"><span>综合</span></a><a><span>销量</span></a><a><span>评价</span></a><a><span class="bg">价格</span></a></p>
            <ul>
                <li><a href="product_xq.html"><img src="images/img_010.jpg">
                    <div class="search_item">
                        <p>云南特级冬虫夏草云南特级冬虫夏草</p>
                        <h2><i>￥</i><b>185.00</b><span>月销18252笔</span></h2>
                    </div>
                </a></li>
                <li><a href="product_xq.html"><img src="images/img_03.jpg">
                    <div class="search_item">
                        <p>云南特级冬虫夏草</p>
                        <h2><i>￥</i><b>185.00</b><span>月销18252笔</span></h2>
                    </div>
                </a></li>
                <li><a href="product_xq.html"><img src="images/img_010.jpg">
                    <div class="search_item">
                        <p>云南特级冬虫夏草</p>
                        <h2><i>￥</i><b>185.00</b><span>月销18252笔</span></h2>
                    </div>
                </a></li>
                <li><a href="product_xq.html"><img src="images/img_010.jpg">
                    <div class="search_item">
                        <p>云南特级冬虫夏草</p>
                        <h2><i>￥</i><b>185.00</b><span>月销18252笔</span></h2>
                    </div>
                </a></li>
                <li><a href="product_xq.html"><img src="images/img_010.jpg">
                    <div class="search_item">
                        <p>云南特级冬虫夏草</p>
                        <h2><i>￥</i><b>185.00</b><span>月销18252笔</span></h2>
                    </div>
                </a></li>
                <li><a href="product_xq.html"><img src="images/img_010.jpg">
                    <div class="search_item">
                        <p>云南特级冬虫夏草</p>
                        <h2><i>￥</i><b>185.00</b><span>月销18252笔</span></h2>
                    </div>
                </a></li>
            </ul>
        </div>
    </div>
</template>

<script>
import store from '../vuex/store'
export default {
    name: 'search',
    data () {
        return {
            list: []
        }
    },
    methods:{
        //初始化商品列表
        inti_goods_list:function(){
            //store.commit('UPDATE_LOADING', true);
            var vm = this;
            $.ajax({
                url:HOST+'/api/goods',
                type:'GET',
                data:{category_id:this.$route.params.id, status:1},
                success:function(result){
                    //console.log(result.data)
                    vm.gonggaoxq =  result.data;
                    //store.commit('UPDATE_LOADING', false);
                    console.log(result)
                },
                error:function(e){

                }
            },"json");
        },
    },
    created:function(){
        store.commit('UPDATE_SHOWMENU',false);
        this.inti_goods_list();
    },
    destroyed:function(){
        store.commit('UPDATE_SHOWMENU',false);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>