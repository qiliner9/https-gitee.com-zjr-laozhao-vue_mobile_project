<template>
<div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
      <span>点击：{{ photoinfo.click }} 次</span>
    </p>

    <hr>

    <!-- 缩略图区域 -->
     <div class="thumbs">
       
       <vue-preview
      :list="list"
      :thumbImageStyle="{width: '120px', height: '80px', margin: '10px', }"
      :previewBoxStyle="{border: '1px solid #eee'}"
      :tapToClose="true"
      @close="closeHandler"
      @destroy="destroyHandler"
    />
     
     </div>
      
    <!-- 图片内容区域 -->

    <div class="content" v-html="photoinfo.content"></div>

    <!-- 放置一个现成的评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
// 1. 导入评论子组件
import comment from '../subcomponents/comment.vue'

export default {
   data() {
    return {
     id: this.$route.params.id,  // 从路由中获取到的 图片 Id
      photoinfo: {  }, //图片详情
      list: [ ] // 缩略图的数组
    }
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      this.$http.get('api/photoinfo/' + this.id).then(result => {
        if(result.body.status === 0){
          this.photoinfo = result.body.message[0];
        }
      })
    },
    getThumbs(){
      // 获取所有缩略图
      this.$http.get('api/photothumbs/' + this.id ).then(result => {
        if(result.body.status === 0){
          // 循环每一个图片数据，补全图片的宽和高
          result.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
          });
          // 把完整的数据保存到 slide 中
          this.list = result.body.message;
        }
      })
    },
    // 即将关闭的时候，调用这个处理函数
    closeHandler() {
      console.log('closeHandler')
    },
    // 完全关闭之后，调用这个函数清理资源
    destroyHandler() {
      console.log('destroyHandler')
    }
  },
  components: { // 注册评论子组件
    'cmt-box' : comment
  }
}
</script>

<style lang="scss" scoped>
.photoinfo-container{
  padding: 3px;
  h3{
    color: #26A2FF;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle{
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content{
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs{
  margin: 10px;
  box-shadow: 0 0 8px #999;

  }


}

</style>
