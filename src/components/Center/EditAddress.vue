<template>
    <div class="swap">
        <!--ftop开始-->
        <div class="ftop">
            <router-link  class="back" to="/center/address">
                <img src="../../static/images/icon_03.png">
            </router-link>
            <h2>修改收货地址</h2>
            <a class="comea deletea" v-on:click="del()">删除</a>
            <div style="clear: both;"></div>
        </div>
        <!--ftop开始-->
        <!--个人中心-收货地址-->
        <div class="address">
          <form id="form">
          <div class="fill">
              <router-link  class="bg" :to="'/center/select-city/edit/'+info.id+'/0'"><span>所在地区</span>
                  <input type="text" :placeholder="add_str" disabled>
                  <input type="hidden" name="area" :value="add_ids">
              </router-link>
              <a><span>街道</span><input type="text" name="street" :value="info.street" placeholder="请输入街道信息"></a>
              <a><span>详细地址</span><input type="text" name="address" :value="info.address" placeholder="请输入详细地址"></a>
              <a><span>收货人姓名</span><input type="text" name="name" :value="info.name" placeholder="请输入收货人信息"></a>
              <a><span>手机号码</span><input type="text" name="phone" :value="info.phone" placeholder="请输入您的手机号码"></a>
              <a><span>邮编</span><input type="text" name="postcode" :value="info.postcode" placeholder="请输入邮政编码"></a>
          </div>
          <div :class="{'chose': 1, 'on':info.status == 1 }" v-on:click="chose()">
              <span>设为默认地址</span>
              <input type="hidden" name="status" :value="info.status" id="status">
          </div>
          </form>
        </div>
        <a class="makesure" v-on:click="save()">保存</a>
        <!--个人中心-收货地址-->
        <!--很多弹窗-->
        <div class="popbg"></div>
        <div class="pop popdelete">
            <h2>删除地址</h2>
            <p>您真的要删除该地址吗？</p>
            <div class="only"><a class="qx" v-on:click="qx()">取消</a><a class="qr" v-on:click="qr()">确认</a></div>
        </div>
        <!--很多弹窗-->
    </div>
</template>
<script>
import store from '../../vuex/store'
export default {
    name: 'swap',
    data () {
        return {
            info: [],
            add_str: '',
            add_ids: ''
        }
    },
    methods:{
        del:function(){
            //删除询问
            $("body,html").css({"overflow":"hidden"});
            $(".popbg").fadeIn();
            $(".popdelete").fadeIn();
        },
        qx:function(){
            //取消删除
            $("body,html").css({"overflow":"auto"});
            $(".popbg").fadeOut();
            $(".pop").fadeOut();
        },
        qr:function(){
            //确认删除
            var id = this.$route.params.id;
            var vm = this;

            $.ajax({
                url:HOST+'/api/address/'+id,
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                type:'DELETE',
                success:function(result){
                    if(result.success == true){
                        $("body,html").css({"overflow":"auto"});
                        $(".popbg").fadeOut();
                        $(".pop").fadeOut();
                        layer.open({
                            content: '删除成功'
                            ,skin: 'msg'
                            ,time: 1 //2秒后自动关闭
                            ,end: function () {
                                vm.$router.push('/center/address')
                            }
                        });
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
        init_address_city:function(){
            var str = this.$route.params.address;
            if(str == 0){
                this.add_str = '请选择所在地区';
            }else{
                var vm = this;
                $.ajax({
                    url:HOST+'/api/get_region_name',
                    type:'GET',
                    data:{str: str},
                    success:function(result){
                        vm.add_str = result.data[0]+','+result.data[1]+','+result.data[2];
                        vm.add_ids = str;
                    }
                  },"json");
            }
        },
        init_address:function(){
                var id = this.$route.params.id;
                var vm = this;

                $.ajax({
                    url:HOST+'/api/address/'+id,
                    headers:{
                        Authorization:localStorage.getItem('Authorization')
                    },
                    type:'GET',
                    success:function(result){
                        //console.log(result);
                        if(vm.$route.params.address == 0){
                            vm.add_str = result.data.province+','+result.data.city+','+result.data.area;
                        }else{
                            vm.init_address_city()
                        }
                        vm.info = result.data;
                    }
                },"json");
        },
        save:function(){
            var id = this.$route.params.id;
            var vm = this;
            var data = $('#form').serialize();
            $.ajax({
                url:HOST+'/api/address/'+id,
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                data:data,
                type:'PUT',
                success:function(result){
                    if(result.success == true){
                        layer.open({
                            content: '修改成功 '
                            ,skin: 'msg'
                            ,time: 1
                            ,end: function () {
                                vm.$router.push('/center/address')
                            }
                        });
                    }else{
                         layer.open({
                            content: result.msg
                            ,skin: 'msg'
                            ,time: 2
                        });
                    }
                },
                error:function(e){
                    var result = JSON.parse(e.responseText);
                    var status = result.status;

                     if(status == 422){
                        var error = result.data.error
                        console.log(error)
                       var str = '';
                        for (var i in error){
                            var _error = ''
                            for (var j in error[i]){
                                _error += error[i][j]+'<br/>';
                            }
                            str += _error;
                        }
                        layer.open({
                            content: str
                            ,skin: 'msg'
                            ,time: 2
                        });
                    }
                }
              },"json");
        },
        chose:function(){
          $('.chose').toggleClass("on");
          var status = $('.chose').hasClass('on')
          if(status){
              $('#status').val(1)
          }else{
              $('#status').val(0)
          }
        }
    },
    created:function(){
        this.init_address();
        //this.init_address_city();
        store.commit('UPDATE_SHOWMENU',false);
    }
}

</script>
