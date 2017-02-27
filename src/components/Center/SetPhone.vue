<template>
    <div class="swap">
        <div v-title data-title="绑定手机号"></div>
        <div class="ftop">
            <router-link  class="back" to="/center/user-setting">
                <img src="../../static/images/icon_03.png">
            </router-link>
            <h2>绑定手机号</h2>
            <div style="clear: both;"></div>
        </div>
        <div class="setphone">
            <h3>请输入你需要绑定的手机号</h3>
            <div class="fill">
                <dl><dt>手机号</dt><dd><input type="text" name="phone" id="phone"  placeholder="请输入手机号"></dd></dl>
                <dl><dt>验证码</dt><dd><input type="text" name="code" id="code" placeholder="请输入验证码" class="w60"><button @click="get_code()" id="xxx">获取验证码</button></dd></dl>
            </div>
            <button type="button" @click="save()" class="makesure" style="border:0">保存</button>
        </div>
    </div>
</template>
<script>
import store from '../../vuex/store'
export default {
    methods:{
        save:function(){
            store.commit('UPDATE_LOADING', true);
            var vm = this;
            var phone = $('#phone').val();
            var code = $('#code').val();
            var top_code = vm.$route.params.code
            var data = {old_phone:phone,code:code,type:1}
            if(top_code != 0){

                data = {new_phone:phone,code:code,type:2,top_code:top_code}
            }
            if(phone == '' || code == ''){
                layer.open({
                    content: '手机号或验证码不能为空'
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
                url:HOST+'/api/checkCode',
                type:'POST',
                data:data,
                success:function(result){
                    if(result.success == true){
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
                    store.commit('UPDATE_LOADING', false);
                }
            },"json");
        },
        get_code:function(){
            store.commit('UPDATE_LOADING', true);
            var vm = this;
            var phone = $('#phone').val();
            var top_code = vm.$route.params.code
            var data = {old_phone:phone,type:1}

            if(top_code != 0){

                data = {new_phone:phone,type:2}
            }

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
                data: data,
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
        }
    },
    created:function(){
        store.commit('UPDATE_SHOWMENU',false);
    }
}

</script>
