<template>
<div class="swap">
<div v-title data-title="联系我们"></div>

<!--ftop开始-->
<div class="ftop">
    <a class="back" onClick="javascript:history.back(-1);"><img src="../../static/images/icon_03.png"></a>
    <h2>关于我们</h2>
    <a class="comea"></a>
    <div style="clear: both;"></div>
</div>
<!--ftop开始-->


<!--个人中心-关于我们-->
<div class="aboutus">
    <div class="txt">
        <h2>{{data0_title}}</h2>
        <p>{{data0_value}}</p>
    </div>
    <div class="txt">
        <h2>联系我们</h2>
        <p>
            {{data1_title}}：{{data1_value}} <br>
            {{data2_title}}：{{data2_value}} <br>
            {{data3_title}}：{{data3_value}} <br>
            {{data4_title}}：{{data4_value}}
             <img :src="host+data5_value" alt="">
            <!-- <div style="width:100%;height:350px;border:#ccc solid 1px;" id="dituContent"></div> -->

        </p>
    </div>
</div>
<!--个人中心-关于我们-->



</div>
</template>

<script>
import store from '../../vuex/store'
export default {
    name: 'swap',
    data () {
        return {
            host:HOST,
            datas: [],
            data0_title:null,
            data0_value:null,
            data1_title:null,
            data1_value:null,
            data2_title:null,
            data2_value:null,
            data3_title:null,
            data3_value:null,
            data4_title:null,
            data4_value:null,
            data5_value:null
        }
    },
    methods:{

        init_contact:function(){
            var vm = this;
            store.commit('UPDATE_LOADING', true);
            $.ajax({
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                url:HOST+'/api/about',
                type:'GET',
                success:function(result){
                    if(result.success == true){
                        vm.datas = result.data
                        console.log(vm.datas[0].remark)
                        vm.data0_title = vm.datas[0].remark;
                        vm.data0_value = vm.datas[0].value;
                        vm.data1_title = vm.datas[1].remark;
                        vm.data1_value = vm.datas[1].value;
                        vm.data2_title = vm.datas[2].remark;
                        vm.data2_value = vm.datas[2].value;
                        vm.data3_title = vm.datas[3].remark;
                        vm.data3_value = vm.datas[3].value;
                        vm.data4_title = vm.datas[4].remark;
                        vm.data4_value = vm.datas[4].value;
                        vm.data5_value = vm.datas[5].value;

                    }else{
                        alert('查询失败')
                    }
                    store.commit('UPDATE_LOADING', false);
                },
                error:function(e){
                    console.log(e)
                }
            },"json");
        }
    },
    created:function(){
        this.init_contact();
        store.commit('UPDATE_SHOWMENU',false);

    }
}

</script>

<style type="text/css">
    .iw_poi_title {color:#CC5522;font-size:14px;font-weight:bold;overflow:hidden;padding-right:13px;white-space:nowrap}
    .iw_poi_content {font:12px arial,sans-serif;overflow:visible;padding-top:4px;white-space:-moz-pre-wrap;word-wrap:break-word}
</style>