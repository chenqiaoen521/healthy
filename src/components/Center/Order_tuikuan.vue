<template>
<div>  

<!--ftop开始-->
<div class="ftop">
    <a class="back" onClick="javascript:history.back(-1);"><img src="../../static/images/icon_03.png"></a> 
    <!-- <router-link class="back" to="/center/order/null"><img src="../../static/images/icon_03.png"></router-link> -->
    <h2>{{kind}}</h2>
    <a class="comea"></a>
    <div style="clear: both;"></div>
</div>
<!--ftop开始-->


<!--个人中心-退款申请-->
<div class="refunds">
    <!-- <div class="mation" v-show="typenum == 1">
        <h4>退货地址：苗华强，18702117108，上海上海市浦东新区合庆镇 青三村 南龚家宅76号B栋2楼</h4>
        <h5>退货说明：请将退货商品包装好，且商品不影响二次销售；请勿发平邮或到付件，商品寄出后，需及时在每笔退款上操作“填写物流信息”，以免退款超时关闭</h5>
    </div> -->
    <ul>
        <form id="form">
        <!-- <li>    
            <p>选择方式<span>*</span></p>
            <label><select id="selet" name="type" @change="yuanyin()"><option value="2">退货</option><option value="1">退款</option></select></label>
        </li> -->
        <li><input type="hidden" name="type" :value='typenum'></li>
        <li>
            <p>{{kind}}原因<span>*</span></p>
            <label>
                <select name="reason_id">
                    <option v-for="p in reason" :value="p.id" >{{p.title}}</option>
                </select>
            </label>
        </li>
        <!-- <li><p>{{kind}}金额<span>*</span><i>（最多{{jiage}}）</i></p><label><input name="money" type="text" placeholder="请输入退款金额"></label></li> -->
        <li><p>{{kind}}说明<i>（可不填）</i></p><label><textarea name="content"></textarea></label></li>
        <li><input type="hidden" name="pic" id="path"></li>
        </form>
        
        <form id="ajaxForm" enctype="multipart/form-data">
        <li>
            <p>上传凭证<i><!-- （最多三张） --></i></p>
            <div class="imgbox">
                <!-- <a class="imga">
                    <img src="../../static/images/centerorder_11.png" alt="" class="zs">
                    <img src="../../static/images/orderpingjia_03.png" class="close" alt="">
                </a> -->
                <a class="adda"><img src="../../static/images/orderpingjia_06.png" alt="" class="zs"><input @change="huoqu()" type="file" name="image"></a>
            </div>
        </li>
        </form>
        <div class="dtip" style="margin:10px;">
            <span>上传进度</span>
            <div class="alld"><div class="now"><i></i></div></div>
        </div>
    </ul>
   
</div>
<a class="makesure" @click="init_order()">提交申请</a>
<!--个人中心-退款申请-->



</div>
</template> 

<script>


import store from '../../vuex/store'


export default {
    data:function(){
        return {
            order:[],     //请求数据
            host:HOST,    //全局域名
            route:'',     //空路由
            reason:[],    //返回的下拉原因
            kind:'退货',       //申请种类
            jiage:0,       //退款价格
            typenum:0,     //退款还是退货
        }
    },
    methods:{
        //提交数据
        init_order:function(){
            var vm = this;     
            vm.route = this.$route.params.id; 
            var data=$("#form").serialize();       
            //console.log(data);
            $.ajax({
                url:HOST+'/api/changeStatus/og_'+vm.route+'/6' ,
                type:'GET',
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                data:data,
                success:function(result){
                    vm.order= result.data;
                    if(result.success){
                        layer.open({
                            content: result.msg
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });

                        //跳转到退货列表
                        vm.$router.push('/center/order_tuilist')
                    }else{
                        layer.open({
                            content: result.msg
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                    }
                }
            },"json");
        },
        //获取下拉原因
        yuanyin:function(){
            var vm = this;
            vm.jiage = this.$route.params.money * this.$route.params.num; 
            vm.typenum = this.$route.params.type;
            if(vm.typenum==1){
                //退款               
                vm.kind = '退款';
            }else{
                //退货
                vm.kind = '退货';
            }
            $.ajax({
                url:HOST+'/api/getReason' ,
                type:'GET',
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                success:function(result){
                    vm.reason = result.data;        
                }
            },"json");            
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
                },
                url: HOST+'/api/uploadImg',
                data: $("#ajaxForm").serialize(),
                success: function(data) {
                    var src = data.data.path;
                    var delsrc = vm.host+data.data.del;
                    
                    var string = '<a class="imga"><img src="'+vm.host+src+'" alt="'+src+'" class="zs"><img src="'+delsrc+'" class="close" alt=""></a>'
             
                    $(".refunds ul li .imgbox").prepend(string);
                    
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
                    alert("上传失败");
                }
            });
        }
    },
    created:function(){
        //this.init_order();
        this.yuanyin();
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
