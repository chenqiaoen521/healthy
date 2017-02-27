<template>
    <div class="swap">
        <div v-title data-title="我的收藏"></div>
        <!--ftop开始-->
        <div class="ftop">
            <router-link  class="back" to="/center">
                <img src="../../static/images/icon_03.png">
            </router-link>
            <h2>我的收藏</h2>
            <a class="comea" v-on:click="come()">编辑</a>
            <div style="clear: both;"></div>
        </div>
        <!--ftop开始-->

        <!--个人中心-我的收藏-->
        <div class="collect">
            <div class="list">
                <template v-for="item in list">
                    <div :class="'sg a'+item.id">
                        <label class="xx" :id="'x-'+item.id" :aid="item.id" v-on:click="sg_label(item.id)"></label>
                        <router-link  class="back" :to="'/product/'+item.goods_id">
                            <span class="pic"><img :src="host+item.thumb" alt=""></span>
                            <span class="txt"><i>{{ item.name }}</i><em>库存：{{ item.stock }}  销量：{{ item.sell_num }}笔 </em><b>¥ <i>{{ item.sellprice }}</i></b></span>
                        </router-link>
                        <img src="../../static/images/centdizhi_03.png" class="del" v-on:click="sg_del(item.id)">
                    </div>
                </template>
            </div>
            <div class="loada" @click="init_list()">加载更多</div>
        </div>
        <!--个人中心-我的收藏-->

        <!--编辑处理-->
        <div class="deal">
            <span v-on:click="deal()" onoff='0'><em>全选</em></span>
            <i v-on:click="delAll()">删除</i>
        </div>
        <!--编辑处理-->

        <!--很多弹窗-->
        <div class="popbg"></div>
        <div class="pop popdelete">
            <h2>确认删除收藏内容？</h2>
            <p>您真的要删除收藏的商品吗？</p>
            <div class="only"><a v-on:click="pop_only()">取消</a><a>确认</a></div>
        </div>
        <!--很多弹窗-->
    </div>
</template>
<script>
import store from '../../vuex/store'
export default {
    data () {
        return {
            list: [],  //数据列表
            host:HOST,  //全局域名
            pagenum:1,  //初始页码
        }
    },
    methods:{
        init_list:function(){
            var vm = this;
            store.commit('UPDATE_LOADING', true);
            $(".loada").hide();
            $.ajax({
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                url:HOST+'/api/user_collect?page='+vm.pagenum,
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
        come:function(){
            var txt = $('.comea').text();

            if(txt=='编辑'){
                $('.comea').text("完成");
                $(".list .sg").addClass("on");
                $(".deal").slideDown();
                $("body").css({"padding-bottom":"44px"});
            }else{
                $('.comea').text("编辑");
                $(".list .sg").removeClass("on");
                $(".deal").slideUp();
                $("body").css({"padding-bottom":"0px"});
            }
        },
        deal:function(){
            //全选
            var num  = $('.deal span').attr("onoff");
            if(num==0){
                $(".list .sg label").addClass("on");
                $(".deal span").attr("onoff",1);
            }else{
                $(".list .sg label").removeClass("on");
                $(".deal span").attr("onoff",0);
            }
        },
        delAll:function(){
            var ids = '';
            $(".xx").each(function(i, e){
                if($(e).hasClass('on')){
                    //console.log($(e).attr('aid'));
                    ids = ids + $(e).attr('aid') + ','
                }
            });
            //删除
             layer.open({
                content: '您确定要删除吗？'
                ,btn: ['确定', '取消']
                ,yes: function(index){
                    store.commit('UPDATE_LOADING', true);
                        $.ajax({
                            headers:{
                                Authorization:localStorage.getItem('Authorization')
                            },
                            url:HOST+'/api/collect/'+ids,
                            type:'DELETE',
                            success:function(result){
                                layer.open({
                                    content: result.msg
                                    ,skin: 'msg'
                                    ,time: 2
                                });
                                $(".xx").each(function(i, e){
                                    if($(e).hasClass('on')){
                                        $('.a'+$(e).attr('aid')).remove();
                                    }
                                })
                                store.commit('UPDATE_LOADING', false);
                            },
                            error:function(e){
                                store.commit('UPDATE_LOADING', false);
                            }
                        },"json");
                        layer.close(index);
                    }
              });
        },
        pop_only:function(){
            //关闭弹框
            $("body,html").css({"overflow":"auto"});
            $(".popbg").fadeOut();
            $(".pop").fadeOut();

            $(".ftop .comea").text("编辑");
            $(".list .sg").removeClass("on");
            $(".deal").slideUp();
            $("body").css({"padding-bottom":"0px"});
        },
        sg_label:function(id){
            //单个产品选择
            if($('#x-'+id).hasClass("on")){
                $('#x-'+id).removeClass("on");
            }else{
                $('#x-'+id).addClass("on");
            }
        },
        sg_del:function(id){
            //单个商品删除
            var vm = this;
            layer.open({
                content: '您确定要删除吗？'
                ,btn: ['确认', '取消']
                ,yes: function(index){
                    store.commit('UPDATE_LOADING', true);
                    $.ajax({
                        headers:{
                            Authorization:localStorage.getItem('Authorization')
                        },
                        url:HOST+'/api/collect/'+id,
                        type:'DELETE',
                        success:function(result){
                            layer.open({
                                content: result.msg
                                ,skin: 'msg'
                                ,time: 2
                            });
                            store.commit('UPDATE_LOADING', false);
                            $('.a'+id).remove();
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
        this.init_list();
        store.commit('UPDATE_SHOWMENU',false);
    }
}

</script>
