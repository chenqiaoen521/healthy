<template>
    <div class="swap">
        <div v-title data-title="选择订单中的收货地址"></div>

        <div class="ftop">
            <a class="back" onClick="javascript:history.back(-1);">
                <img src="../../static/images/icon_03.png">
            </a>
            <h2>选择收货地址</h2>
            <a class="comea"></a>
            <div style="clear: both;"></div>
        </div>
        <div class="address">
            <div class="list">
                <div class="sg" :class="{'on':item.status==1}" v-for="(item,index) in list" @click="tijiao(index)">
                    <a>
                        <span class="name"><i>{{item.name}}</i><em>{{item.phone}}</em></span>
                        <span class="place"><i>[默认]</i>{{item.province}} {{item.city}} {{item.area}} {{item.street}} {{item.address}}</span>
                    </a>
                </div>
            </div>
        </div>
        <router-link  class="makesure" :to=" '/center/add-address/0/'+str ">添加收货地址</router-link>
    </div>
</template>
<script>
import store from '../../vuex/store'
export default {
    name: 'swap',
    data () {
        return {
            router_data :'',  //传递的路由参数
            list: [],
            ids:[],    //返回的串
            str:''   
        }
    },
    methods:{

        init_help_list:function(){
            var vm = this;
            var router_data = this.$route.params.data;
            vm.str = this.$route.params.data;
            $.ajax({
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                url:HOST+'/api/user_address',
                type:'GET',
                success:function(result){
                    if(result.success == true){
                        vm.list = result.data;
                        //vm.str = 
                    }else{
                        alert('查询失败')
                    }
                    //store.commit('UPDATE_LOADING', false);
                },
                error:function(e){
                    console.log(e)
                }
            },"json");
        },
        tijiao:function(index){
            var vm = this;
            var router_data = this.$route.params.data;
            vm.ids = vm.list[index].id;
            console.log(vm.ids);
            //console.log(router_data)

            vm.$router.push('/confirm_order/'+router_data+'/'+vm.ids)

            // $.ajax({
            //     url:HOST+'/api/order',
            //     type:'GET',
            //     headers:{
            //         Authorization:localStorage.getItem('Authorization')
            //     },
            //     data:{data:router_data,addr_id:vm.ids},
            //     success:function(result){
            //         vm.$router.push('/confirm_order/'+router_data+'/'+vm.ids)
            //         console.log(result.data)
            //     }
            // },"json");  
        }
    },
    created:function(){
        this.init_help_list();
        store.commit('UPDATE_SHOWMENU',false);
    }
}

</script>
