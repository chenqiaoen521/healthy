<template>
<div class="gonggaoxq">
    <div v-title data-title="详情"></div>
  <!--ftop开始-->
  <div class="ftop"> <a class="back" onClick="javascript:history.back(-1);"><img src="../static/images/icon_03.png"></a>
    <h2>详情</h2>
    <a class="comea">&nbsp;</a>
    <div style="clear: both;"></div>
  </div>
  <!--ftop开始-->
  <div class="notice noti">
      <div class="notice_xq">
        <h2><span>{{gonggaoxq.title}}</span><i>{{gonggaoxq.created_at}}</i></h2>
        <div class="notice_text">
          <div v-html="gonggaoxq.content"></div>
        </div>
      </div>
  </div>
</div>
<!--fixft结束-->
</template>

<script>

import Vue from 'vue'
import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'
import store from '../vuex/store'
/*'*/

export default {
  name : 'gonggaoxq',
  data :function() {
    return{
      gonggaoxq:[]
    }
  },
  components: {

  },
  methods:{
    //初始化商品列表
    init_gonggaoxq:function(){

      //store.commit('UPDATE_LOADING', true);
      var vm = this;
      $.ajax({
        url:HOST+'/api/notice_detail?id='+this.$route.params.id,
        type:'GET',
        data:{},
        success:function(result){
          //console.log(result.data)
          vm.gonggaoxq =  result.data;
          //store.commit('UPDATE_LOADING', false);
          console.log(result.data)
        },
        error:function(e){

        }
      },"json");
    }
  },
  created:function(){

   this.init_gonggaoxq();

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
