<template>
    <div class="swap">
        <div v-title data-title="选择城市"></div>

        <!--ftop开始-->
        <div class="ftop">
            <a class="back" onClick="javascript:history.back(-1);">
                <img src="../../static/images/icon_03.png"></a>
            <h2>选择城市</h2>
            <a class="comea"></a>
            <div style="clear: both;"></div>
        </div>
        <!--ftop开始-->
        <!--个人中心-收货地址-->
        <div class="address">
            <div class="tit"><a>省</a><a>市</a><a>区</a></div>
            <div class="xulie">
                <template v-for="item in list">
                    <a v-on:click="init_city_list(item.REGION_ID, lever)">{{ item.REGION_NAME }}</a>
                </template>
            </div>
        </div>
        <!--个人中心-收货地址-->
    </div>
</template>
<script>
import store from '../../vuex/store'
export default {
    name: 'swap',
    data () {
        return {
            list: [],
            lever: 1,
            str:'',
            url_str:false
        }
    },
    methods:{
        init_city_list:function(pid = 0, lever = 0){
            var vm = this;
            if(lever != 0){
                if((this.str.split(',')).length-1 < 3){
                    this.str += pid + ','
                }
            }
            if(lever >= 3){
                var type =this.$route.params.type;
                if(type == 'add'){
                    if(this.url_str == false){
                        vm.$router.push('/center/add-address/'+this.str+'/0')
                    }else{
                        vm.$router.push('/center/add-address/'+this.str+'/'+this.url_str)
                    }
                }else if(type == 'edit'){
                    vm.$router.push('/center/edit-address/'+this.$route.params.id+'/'+this.str)
                }else{
                    layer.open({
                        content: '错误'
                        ,skin: 'msg'
                        ,time: 2 //2秒后自动关闭
                    });
                }

            }else{
                var vm = this;
                $.ajax({
                    url:HOST+'/api/region',
                    type:'GET',
                    data:{pid:pid},
                    success:function(result){
                        if(result.success == true){
                            vm.list = result.data
                            vm.lever = lever+1;
                        }else{
                            alert('查询失败')
                        }
                        //store.commit('UPDATE_LOADING', false);
                    }
                },"json");
            }
        }
    },
    created:function(){
        if(this.$route.params.str != 0){
            this.url_str = this.$route.params.str;
        }
        this.init_city_list();
        store.commit('UPDATE_SHOWMENU',false);
    },
    destroyed:function(){
        store.commit('UPDATE_SHOWMENU',false);
    }
}

</script>
