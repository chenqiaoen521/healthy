<template>
<div class="publish_xq">
<div v-title data-title="产品分类"></div>

<!--ftop开始-->
<div class="ftop">
    <div class="index_search index_search01">
        <a class="back" onClick="javascript:history.back(-1);" style="position:absolute; left:0; top:0;"><img src="../static/images/icon_03.png"></a>
        <!-- <div>
            <input type="text" placeholder="请输入您要搜索的产品" v-model="h">
            <input class="dw" @click="search()" type="button" value="">
        </div> -->
        <router-link class="lka" style=" position:relative; display:block; width:100% !important;" to="/search">
            <input type="text" placeholder="请输入您要搜索的产品">
            <input type="button" value=" ">
        </router-link>
    </div>
    <div style="clear: both;"></div>
</div>
<!--ftop开始-->

<div class="search_list">
    <p>
        <a :class="{'on':status==1}" @click="init_kinds(1)" ><span>综合</span></a><a :class="{'on':status==2}" @click="init_kinds(2)" ><span>销量</span></a><a :class="{'on':status==3}" @click="init_kinds(3)" ><span>评价</span></a><!-- <a v-if="onoff" :class="{'on':status==4}" @click="init_kinds(4)" ><span class="bg" :class="{'bg1':onoff}">价格高</span></a><a v-if="!onoff" :class="{'on':status==5}" @click="init_kinds(5)" ><span class="bg" :class="{'bg1':!onoff}">价格低</span></a> --><a :class="{'on':status==4||status==5}" @click="chose()" ><span class="bg" :class="{'bg1':onoff}">价格</span></a>
    </p>
    <ul>
        <li v-for="p in publist">
            <router-link :to="'/product/'+p.id">
                <img :src="host+p.thumb">
                <div class="search_item">
                    <p>{{p.name}}</p>
                    <h2><i>￥</i><b>{{p.sell_price}}</b><span>销量{{p.sell_num}}</span></h2>
                </div>
            </router-link>
        </li>
    </ul>
    <div class="loada nn" @click="init_kinds(status,2)">加载更多</div>
</div>
</div>
</template>
<script>
import store from '../vuex/store'
export default {
    data () {
        return {
            publist:[],
            host:HOST,
            status:1,    //分类的值
            onoff:false,  //综合的样式
            h:'',
            hs:[],
            pagenum:1,
        }
    },
    methods:{
        //获取数据的最初
        init_kinds:function(status,type=1){
            var vm = this;

            $(".loada").hide();
            var old = this.status;
            console.log(status)
            console.log(this.status)

            if(this.status!=status || type==1){
                vm.pagenum=1;
            }

            this.status = status;
            if(status==5){
                this.onoff = true;  //4出现
            }else if(status==4){
                this.onoff = false; //5出现
            }
            else{
                //this.onoff = false;
            }
            $.ajax({
                url:HOST+'/api/goods?page='+vm.pagenum,
                headers:{
                    Authorization:localStorage.getItem('Authorization')
                },
                data:{
                    "category_id": this.$route.params.id,
                    "status": status,
                    "key":vm.h
                },
                type:'GET',
                success:function(result){
                    vm.pagenum++;
                    var allpage = result.data.last_page;
                    if(vm.pagenum>allpage){
                        $(".loada").hide();
                    }else{
                       $(".loada").show();

                    }

                    if(result.data.data == ''){
                        layer.open({
                            content: '暂无数据'
                            ,skin: 'msg'
                            ,time: 2
                        });
                    }else{
                        //有数据的话

                        if(old!=status || type==1){
                            vm.publist = result.data.data;
                        }
                        else{
                            vm.publist = vm.publist.concat(result.data.data);
                        }


                    }
                }
            },"json");

        },
        chose:function(){
            if(this.status==4){
                this.init_kinds(4);
                this.status = 5;
            }else{
                this.init_kinds(5);
                this.status = 4;
            }
        },/*
        getSearchHistory:function(){
            var vm = this;
            var hs = this.getCookie('search_history');
            if(vm.hs.length>0){
                vm.hs = vm.hs.split(',');  //先把数据分开
            }
            //alert(1)
            //console.log(vm.h)
            console.log(vm.hs)
        },
        getCookie:function(c_name){
            if (document.cookie.length>0){
                var c_start=document.cookie.indexOf(c_name + "=")
                if (c_start!=-1){
                    c_start=c_start + c_name.length+1
                    var c_end=document.cookie.indexOf(";",c_start)
                        if (c_end==-1)
                            c_end=document.cookie.length
                            return unescape(document.cookie.substring(c_start,c_end))
                }
            }
            return ""
        },
        setCookie:function(c_name,value,expiredays)
        {


            var exp = new Date();
            exp.setTime(exp.getTime() + 60 * 2000);//过期时间 2分钟

            document.cookie=c_name+ "=" +escape(value)+
            ((expiredays==null) ? "" : ";expires="+exp.toGMTString())
        },

        search:function(){
            var vm = this;
            if(vm.h!=""){
                vm.hs.push(vm.h);
                vm.$router.push('/publish_xq/0/'+vm.h)
                this.init_kinds(1);
            }
        },*/
    },
    created:function(){
        if(this.$route.params.key != 0){
            this.h = this.$route.params.key
        }
        this.init_kinds(1);
        store.commit('UPDATE_SHOWMENU',false);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>