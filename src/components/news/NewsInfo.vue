<template>
  <div class="newsinfo-container">
   <h3 class="title">{{ newsinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
      <span>点击次数：{{ newsinfo.click }}</span>
    </p>

    <hr>

    <div class="content" v-html="newsinfo.content"></div>
    <!-- 评论区域子组件 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>


<script>
import comment from '@/components/subcomponents/comment'
export default {
  data(){
    return{
      id: this.$route.params.id,  // 将 URL 地址传递过来的 Id值， 挂载到 data 上，方便以后调用
      newsinfo: { }  // 新闻对象
    }
  },
  created(){
    
    this.getNewsInfo();
  },
 
  methods:{
    getNewsInfo(){
      // console.log('ok')
      // console.log(this.$route)
      this.$http.get('api/newsinfo/' + this.id ).then(result => {
        if(result.body.status === 0){
          // console.log(result.body)
          // console.log(result.body.message)
          this.newsinfo = result.body.message[0]
        }
      })
    }
  },
  components:{
    'comment-box': comment
  }
}
</script>

<style lang="scss" scoped>
.newsinfo-container{
  padding: 0 4px;
  .title{
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle{
    font-size: 13px;
    color: blue;
    display: flex;
    justify-content: space-between;
  }
  .content{
    img{
      width: 100%;
    }
  }
}
</style>
