<template>
    <div class="swap">
        <div v-title data-title="设置支付密码"></div>
        <div class="ftop">
            <router-link  class="back" to="/center/user-setting">
                <img src="../../static/images/icon_03.png">
            </router-link>
            <h2>设置支付密码</h2>
            <div style="clear: both;"></div>
        </div>
        <div class="setphone">
            <h3>验证你的手机号</h3>
            <div class="fill">
                <dl><dt>手机号</dt><dd><input type="text" name="phone" :value="user.phone" id="phone" placeholder="请输入手机号"></dd></dl>
                <dl><dt>验证码</dt><dd><input type="text" name="code" id="code" placeholder="请输入验证码" class="w60"><button @click="get_code()" id="xxx">获取验证码</button></dd></dl>
                <dl><dt>支付密码</dt><dd><input type="password" name="pay_pwd" id="pay_pwd" placeholder="请输入支付密码（6位数字）"></dd></dl>
            </div>
            <button type="button" @click="save()" class="makesure" style="border:0">提交设置</button>
        </div>
    </div>
</template>
<script>
import store from '../../vuex/store'
export default {
     data () {
        return {
            user: []
        }
    },
    methods:{

        get_code:function(){
            store.commit('UPDATE_LOADING', true);
            var vm = this;
            var phone = $('#phone').val();
            if(phone == ''){
                layer.open({
                    content: '手机号不能为空'
                    ,skin: 'msg'
                    ,time: 2
                });
                store.commit('UPDATE_LOADING', false);
                return false;
            }
            $.ajax({
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                url:HOST+'/api/getPhoneCode',
                type:'POST',
                data: {old_phone:phone, type:1},
                success:function(result){
                    console.log(result)
                    if(result.success == true){
                        layer.open({
                            content: '发送成功'
                            ,skin: 'msg'
                            ,time: 2
                        });
                        vm.sendMessage($('#xxx'))
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
        init_user:function(){
            store.commit('UPDATE_LOADING', true);
            var vm = this;
            $.ajax({
                url:HOST+'/api/user',
                type:'GET',
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                success:function(result){
                    if(result.success == true){
                        vm.user = result.data
                    }else{

                    }
                    store.commit('UPDATE_LOADING', false);
                },
                error:function(e){
                    store.commit('UPDATE_LOADING', false);
                }
            },"json");
        },
        /*发送验证码p当前元素*/
        sendMessage:function(p) {
            var InterValObj;
            var curCount = 60;
            p.css("background","#ddd")
            p.attr("disabled", "true");
            p.html( curCount + "秒后可发送");
            InterValObj = window.setInterval(function(){
                if (curCount == 0) {
                    window.clearInterval(InterValObj);
                    p.removeAttr("disabled");
                    p.html("发送验证码");
                    p.css("background","url(/Public/home/images/tbg.jpg)")
                }
                else {
                    curCount--;
                    p.html(curCount + "秒后可发送");
                }
            }, 1000);
        },
        save:function(){
            var vm = this;
            var phone = $('#phone').val();
            var code = $('#code').val();
            var pay_pwd = $('#pay_pwd').val();
            var data = {old_phone: phone, pay_pwd: pay_pwd, code: code, type: 1}
            if(phone == '' || code == '' || pay_pwd == ''){
                layer.open({
                    content: '请完整填写表单'
                    ,skin: 'msg'
                    ,time: 2
                });
                return false;
            }
            if(pay_pwd.length != 6 || isNaN(pay_pwd)){
                layer.open({
                    content: '支付密码必须为6位数字'
                    ,skin: 'msg'
                    ,time: 2
                });
                return false;
            }
            store.commit('UPDATE_LOADING', true);

            $.ajax({
                url:HOST+'/api/savePayPwd',
                type:'POST',
                data:data,
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                success:function(result){
                    if(result.success == true){
                        layer.open({
                            content: '设置成功'
                            ,skin: 'msg'
                            ,time: 2
                        });
                        vm.$router.push('/center/user-setting');
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
                    var result = JSON.parse(e.responseText);
                    if(result.status == 422){
                        var str = '';
                        var error = result.data.error;
                        for (var i in error){
                            str += error[i][0]+'<br/>';
                        }
                        layer.open({
                            content: str
                            ,skin: 'msg'
                            ,time: 2
                        });
                    }
                    store.commit('UPDATE_LOADING', false);
                }
            },"json");
        }
    },
    created:function(){
        this.init_user()
        store.commit('UPDATE_SHOWMENU',false);
    }
}

</script>
