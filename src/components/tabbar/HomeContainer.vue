<template>
  <div>
   <!-- 轮播图区域 -->
    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
  <!-- 九宫格 到 6宫格改造 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="@/images/adai.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="@/images/fengjian.png" alt="">
          
          
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="@/images/nini.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
         <img src="@/images/shin.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/video">
        <img src="@/images/xiaobai.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
         <img src="@/images/xiaokui.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    
    </ul>
   
  </div>
</template>

<script>
// 导入轮播图组件
import swiper from '@/components/subcomponents/swiper'



import { Toast } from "mint-ui";
export default {
  data() {
    return {
      lunbotuList: [] // 保存轮播图的数组
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      // 获取轮播图数据;
      this.$http.get("api/lunbotu").then(result => {
        if (result.body.status === 0) {
          // console.log(result.body)
          this.lunbotuList = result.body.message;
          // console.log(this.lunbotuList)
        } else {
          Toast("加载轮播图失败……");
        }
      });
    }
  },
  components: {
    swiper
  }
};
</script>


<style lang="scss" scoped>


.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
  img{
    width: 60px;
    height: 60px;
  }
  .mui-media-body {
    font-size: 13px;
  }
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
}
</style>
