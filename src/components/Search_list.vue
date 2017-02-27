<template>
<div class="search_list">

<!--ftop开始-->
<div class="ftop">
    <div class="index_search index_search01">
        <a class="back" onClick="javascript:history.back(-1);"><img src="images/icon_03.png"></a>
        <div>
            <input type="text" placeholder="请输入您要搜索的产品">
            <input class="dw" onclick="document.location='search_list.html'" type="button" value=" ">
        </div>
    </div>
    <div style="clear: both;"></div>
</div>
<!--ftop开始--> 

<div class="search_list">
    <p><a class="on"><span>综合</span></a><a><span>销量</span></a><a><span>评价</span></a><a><span class="bg">价格</span></a></p>
    <ul>
        <li>
            <a href="product_xq.html"><img src="images/img_010.jpg">
                <div class="search_item">
                    <p>{{lists.agent_credit}}</p>
                    <h2><i>￥</i><b>185.00</b><span>月销18252笔</span></h2>
                </div>
            </a>
        </li>
    </ul>
</div>


  
</div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    created:function(){
        $.ajax({
            url:HOST+'/api/search',
            type:'GET',
            headers:{
                Authorization:localStorage.getItem('Authorization')
            },
            success:function(result){
               var vm = this;
                vm.lists = result.data;
            }
        },"json");
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>