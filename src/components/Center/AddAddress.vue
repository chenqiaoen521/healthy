<template>
    <div class="swap">
        <!--ftop开始-->
        <div class="ftop">
            <a class="back" onClick="javascript:history.back(-1);"><img src="../../static/images/icon_03.png"></a>
            <h2>添加收货地址</h2>

            <div style="clear: both;"></div>
        </div>
        <div class="address">
            <form id="form">
            <div class="fill">
                <router-link v-if="str == false" class="bg" to="/center/select-city/add/0/0"><span>所在地区</span>
                    <input type="text" :placeholder="add_str" disabled>
                    <input type="hidden" name="area" :value="add_ids">
                </router-link>
                <router-link v-if="str != false" class="bg" :to="'/center/select-city/add/0/'+str"><span>所在地区</span>
                    <input type="text" :placeholder="add_str" disabled>
                    <input type="hidden" name="area" :value="add_ids">
                </router-link>
                <a><span>街道</span><input type="text" name="street" placeholder="请输入街道信息"></a>
                <a><span>详细地址</span><input type="text" name="address" placeholder="请输入详细地址"></a>
                <a><span>收货人姓名</span><input type="text" name="name" placeholder="请输入收货人信息"></a>
                <a><span>手机号码</span><input type="text" name="phone" placeholder="请输入您的手机号码"></a>
                <a><span>邮编</span><input type="text" name="postcode" placeholder="请输入邮政编码"></a>
            </div>
            <div class="chose" v-on:click="chose()">
                <span>设为默认地址</span>
                <input type="hidden" name="status" value="0" id="status">
            </div>
                </form>
        </div>
        <a class="makesure" v-on:click="save()">保存</a>
    </div>
</template>
<script>
import store from '../../vuex/store'
export default {
    name: 'swap',
    data () {
        return {
            add_str: '',
            add_ids: '',
            str:false
        }
    },
    methods:{
        save:function(){
            var vm = this;
            var data = $('#form').serialize();
            $.ajax({
                url:HOST+'/api/address',
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                type:'POST',
                data:data,
                success:function(result){
                    if(result.success == true){
                        layer.open({
                            content: '添加成功'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                        if(vm.str == false){
                            vm.$router.push('/center/address')
                        }else{
                            vm.$router.push('/center/chose_address/'+vm.str)
                        }
                    }else{
                         layer.open({
                            content: result.msg
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
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
        init_address:function(){
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
                    },
                    error:function(e){
                         console.log(e);
                    }
                  },"json");
            }
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
        if(this.$route.params.str != 0){
            this.str = this.$route.params.str;
        }
        this.init_address();
        store.commit('UPDATE_SHOWMENU',false);
    }
}

</script>
