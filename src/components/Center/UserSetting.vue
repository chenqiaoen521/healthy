<template>
    <div class="search">
        <div v-title data-title="个人资料"></div>
        <!--ftop开始-->
        <div class="ftop">
            <router-link  class="back" to="/center">
                <img src="../../static/images/icon_03.png">
            </router-link>
            <h2>个人资料</h2>
            <a class="comea">&nbsp;</a>
            <div style="clear: both;"></div>
        </div>
        <!--ftop开始-->
        <!--个人中心-->
        <form id="formOne" class="my-form" name="myCoolForm" >
        <div class="setziliao">
            <ul>

                <li><span>个人名称</span><label><input type="text" :value="info.name" name="name" id="name"></label></li>
                <li><span>头像</span><label class="bg" id="localImag">
                    <input type="file" id="doc" name="headimgurl" v-on:change="setImagePreview()">

                    <img id="preview" v-if="info.headimgurl == ''" src="../../static/images/centericon_06.png" alt="">

                    <img id="preview" v-else :src="info.headimgurl" alt="">
                </label></li>
                <li><span>微信号</span><label><input type="text" :value="info.nickname" readonly></label></li>

                <li>
                    <span>手机号</span>
                    <label v-if="info.phone == ''" @click="tioazhuan('/center/set_phone/112233')">
                        <input type="text" placeholder="绑定手机号" readonly>
                    </label>
                    <label v-if="info.phone != ''" @click="tioazhuan('/center/check_phone')">
                        <input type="text" :value="info.phone" readonly>
                    </label>
                </li>
                <li>
                    <span>支付密码</span>
                    <label @click="set_pwd()">
                        <input type="text"  v-if="info.pay_pwd == ''" placeholder="设置支付密码" readonly>
                        <input type="text"  v-if="info.pay_pwd != ''" placeholder="更新支付密码" readonly>
                    </label>
                </li>
            </ul>
            <input type="button" style="border:0" v-on:click="submit()" class="makesure" value="保存">
        </div>
        </form>
        <!--个人中心-->
    </div>
    <!--个人中心-->
</template>
<script>
import store from '../../vuex/store'

export default {
    name: 'search',
    data () {
        return {
            info: [],
            host: HOST
        }
    },
    methods:{
        init_user_info:function(){
            var vm = this;
            $.ajax({
                url:HOST+'/api/user',
                type:'GET',
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                success:function(result){
                    if(result.success == true){
                        vm.info = result.data
                        //console.log(result.data)
                        //console.log(vm.info.name)
                    }else{

                    }
                    //store.commit('UPDATE_LOADING', false);
                },
                error:function(e){
                    //console.log(e)
                }
            },"json");
        },
        tioazhuan:function(url){
            this.$router.push(url);
        },
        //下面用于图片上传预览功能
        setImagePreview: function (avalue) {
            var docObj=document.getElementById("doc");

            var imgObjPreview=document.getElementById("preview");
            if(docObj.files &&docObj.files[0])
            {
    //火狐下，直接设img属性
                imgObjPreview.style.display = 'block';
                imgObjPreview.style.width = '40px';
                imgObjPreview.style.height = '40px';
    //imgObjPreview.src = docObj.files[0].getAsDataURL();

    //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
                imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);

            }
            else
            {
    //IE下，使用滤镜
                docObj.select();
                var imgSrc = document.selection.createRange().text;
                var localImagId = document.getElementById("localImag");
    //必须设置初始大小
                localImagId.style.width = "40px";
                localImagId.style.height = "40px";
    //图片异常的捕捉，防止用户修改后缀来伪造图片
                try{
                    localImagId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                    localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
                    $('#doc').val(imgSrc);
                }
                catch(e)
                {
                    alert("您上传的图片格式不正确，请重新选择!");
                    return false;
                }
                imgObjPreview.style.display = 'none';
                document.selection.empty();
            }
            return true;
        },
        submit: function () {
            store.commit('UPDATE_LOADING', true);
            var formData = new FormData($("#formOne")[0]);
            $.ajax({
                url: HOST+'/api/updateUserInfo',
                type:'POST',
                data: formData,
                processData : false,
                contentType : false,
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                success:function(result){
                    //console.log(result.data)
                    if(result.success == true){
                         layer.open({
                            content: '修改成功'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                    }else{
                        layer.open({
                            content: 'result.data.msg'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                    }
                    store.commit('UPDATE_LOADING', false);
                }
            },"json");
        },
        set_pwd:function(){
            this.$router.push('/center/set_pay_pwd');
        }
    },
    created:function(){
        store.commit('UPDATE_SHOWMENU',false);
        this.init_user_info();
    }
}
</script>
