<template>
    <div class="swap">
        <div v-title data-title="意见反馈"></div>

        <div class="ftop">
            <router-link  class="back" to="/center">
                <img src="../../static/images/icon_03.png">
            </router-link>
            <h2>意见反馈</h2>
            <a class="comea"></a>
            <div style="clear: both;"></div>
        </div>
        <div class="mind">
            <form id="form">
            <div class="fill">
                <p style="position:relative; padding:5px 12px 5px 90px;">
                    <i style="position:absolute; left:12px; top:50%; height:30px; margin-top:-15px; line-height:30px;">手机号码：</i>
                    <input type="text" id="tel" placeholder="请输入手机号码" style="display:block; width:100%; height: 40px;line-height: 40px;border: none;background-color: transparent;font-size: 14px;color: #666;" name="tel" >
                </p>
                <textarea name="content" id="content" placeholder="请输入您的反馈内容"></textarea>
            </div>
                </form>
            <h6>请详细描述您遇到的问题，有助于我们快速定位并解决问题,温馨提示：您提交的内容不能超过500字符！</h6>
        </div>
        <a class="makesure" v-on:click="add()">提交</a>
    </div>
</template>
<script>
import store from '../../vuex/store'
export default {
    methods:{
        add:function(){
            store.commit('UPDATE_LOADING', true);
            var data = $('#form').serialize();
            var vm = this;
            $.ajax({
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                url:HOST+'/api/feedback',
                type:'POST',
                data: data,
                success:function(result){
                    store.commit('UPDATE_LOADING', false);
                    if(result.success == true){
                        layer.open({
                            content: '提交成功！'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                        $('#tel').val('');
                        $('#content').val('');
                        vm.$router.push('/center')
                    }else{
                        layer.open({
                            content: result.msg
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                    }

                },
                error:function(e){
                    store.commit('UPDATE_LOADING', false);
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
        }
    },
    created:function(){

        store.commit('UPDATE_SHOWMENU',false);
    }
}

</script>
