<template>
<div>  

<!--ftop开始-->
<div class="ftop">
    <a class="back" onClick="javascript:history.back(-1);"><img src="../../static/images/icon_03.png"></a>
    <h2>商品评价</h2>
    <a class="comea"></a>
    <div style="clear: both;"></div>
</div>
<!--ftop开始-->


<!--个人中心-订单评级-->
<div class="orderpingjia">
    <!-- <div class="goods">
        <a class="imga" href="product_xq.html"><img src="../../static/images/centerorder_11.png" alt=""></a>
        <a class="text" href="product_xq.html"><span>正宗广西荔浦芋头新鲜槟榔香芋农家产品有机5斤疯抢</span><i>¥36</i></a>
    </div> -->
    <div class="pingjia">
        <h2><span>评价</span></h2>
        <div class="fill">      
            <form id="form">  
                <textarea name="content"></textarea>
                <input type="hidden" name="pic" id="path">
                <input type="hidden" name="star" v-model='star' :value='star'>
            </form>
            <form id="ajaxForm" enctype="multipart/form-data">
                <div class="imgbox">
                    <a class="adda">
                        <img src="../../static/images/orderpingjia_06.png" alt="" class="zs">
                        <input @change="huoqu()" type="file" name="image">
                    </a>
                </div>
            </form>
            <div class="dtip">
                <span>上传进度</span>
                <div class="alld"><div class="now"><i></i></div></div>
            </div>
            <div class="score">
                <span>商品评分</span>
                <em>
                    <i @mouseover="light(1)"></i>
                    <i @mouseover="light(2)"></i>
                    <i @mouseover="light(3)"></i>
                    <i @mouseover="light(4)"></i>
                    <i @mouseover="light(5)"></i>
                </em>
            </div>
        </div>
    </div>
</div>
<a class="makesure" @click="init_pingjia()">评价</a>
<!--个人中心-订单评价-->


</div>
</template> 

<script>
import store from '../../vuex/store'

export default {
    data:function(){
        return {
            order:[],     //请求数据
            host:HOST,    //全局域名
            word:'',       //评价的话
            star:5,       //评价的星级
        }
    },
    methods:{        
        //星星打分
        light:function(index){
            var vm  = this;
            vm.star = index;
            var n = index;
            $(".score em i").removeClass("on");
            for(var i=0; i<n; i++){
                $(".score em i").eq(i).addClass("on");     
            }
            
        },
        //获取图片
        huoqu:function(){
            var vm = this;
            $(".dtip").show();
             $("#ajaxForm").ajaxSubmit({
                dataType:  'json', //数据格式为json
                type: 'post',
                headers: {
                    Authorization:localStorage.getItem('Authorization')
                },

                uploadProgress: function(event, position, total, percentComplete) { 
                    var percentVal = percentComplete + '%'; //获得进度 
                    $(".alld .now").width(percentVal)
                    $(".alld .now i").html(percentVal)
                    if(percentVal=='100%'){
                        $(".alld .now").width(0);
                        $(".alld .now i").html(' ;');
                        $(".dtip").hide();
                    }
                    //progress_bar.width(percentVal); //上传进度条宽度变宽 
                    //percent.html(percentVal); //显示上传进度百分比 
                    //console.log(percentVal)
                },
                url: HOST+'/api/uploadImg',
                data: $("#ajaxForm").serialize(),
                success: function(data) {
                    var src = data.data.path;
                    var delsrc = vm.host+data.data.del;
                    
                    var string = '<a class="imga"><img src="'+vm.host+src+'" alt="'+src+'" class="zs"><img src="'+delsrc+'" class="close" alt=""></a>'
             
                    $(".pingjia .imgbox").prepend(string);

                    
                    //删除图片
                    $(".imga img.close").click(function(){
                        var _this = $(this);
                        var dsrc = _this.siblings(".zs").attr("alt");
                        //alert(dsrc)
                        $.ajax({
                            url:HOST+'/api/delImg',
                            type:'GET',
                            headers:{
                                Authorization:localStorage.getItem('Authorization')
                            },
                            data:{path:dsrc},
                            success:function(result){
                                console.log('访问到了')    
                                _this.parents(".imga").remove();  

                                //拼接
                                var chuan = '';
                                for(var i=0; i<$(".imgbox .imga").length;i++ ){                                   
                                    chuan = chuan+'@'+$(".imgbox .imga").eq(i).children("img").attr("alt")                                   
                                }
                                $("#path").val(chuan)      
                                //拼接

                            },
                            error:function(e){
                                                    
                            }
                        },"json");
                    })

                    //拼接
                    var chuan = '';
                    for(var i=0; i<$(".imgbox .imga").length;i++ ){
                        chuan = chuan+'@'+$(".imgbox .imga").eq(i).children("img").attr("alt")                        
                    }
                    $("#path").val(chuan)
                    //拼接


                },
                error:function(xhr){ //上传失败

                    console.log($("#ajaxForm").serialize())
                    alert("上传失败");
                }
            });
        },
        //提交评价
        init_pingjia:function(){
            var vm = this; 
            var id = this.$route.params.id;
            //发送请求
            $.ajax({
                url:HOST+'/api/changeStatus/og_'+id+'/4' ,
                type:'GET',
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                data:$("#form").serialize(),
                success:function(result){
                    vm.reason = result.data; 
                      
                    if(result.success){
                        layer.open({
                            content: '您的评价已经成功提交'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                        vm.$router.push('/center/order/3')
                    }else{
                        layer.open({
                            content: result.msg
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                    }  
                }
            },"json");

        }
    },
    created:function(){

        store.commit('UPDATE_SHOWMENU',false);
    }
}
</script>

<style type="text/css">
.dtip{ padding: 0px 0px 0px 70px; margin: 20px 0 0 0; font-size: 15px; line-height: 30px; color: #333; position: relative; display:none;}
.dtip span{ display: block; position: absolute; left: 0px; top: 50%; margin-top: -15px; height: 30px;}
.dtip .alld{ width: 100%; height: 20px; margin-top: 5px 0; border-radius: 10px; overflow: hidden; background-color: #eee;}
.dtip .alld .now{ background-color: #000; height: 20px; line-height: 20px; color: #fff; text-align: center;}
</style>

