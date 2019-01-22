<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    
   <textarea placeholder="请输入要BB的内容(最多吐槽150字)" maxlength="150" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
     <div class="cmt-list" v-for="(item, i) in comments" :key="item.add_time">
      <div class="cmt-item">
         <div class="cmt-title">
          <div class="top"> <p>第{{ i + 1 }}楼</p> 
            <p>用户:&nbsp;&nbsp;{{ item.user_name }}</p>  </div>
           <div class="bot"><p>发表时间: &nbsp;&nbsp;{{ item.add_time | dateFormat }} </p>
            <a href="#" @click.prevent="remove(item.add_time, i)">删除</a></div>
            
        </div>
        <div class="cmt-body">{{ item.content === 'undefined' ? '此用户什么也没留下' : item.content  }}</div>
      </div>

      </div>
   
    <mt-button type="danger" size="large" plain @click="getMore">More</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 1,  // 默认展示第一页数据
      comments: [ ], // 所有的评论数据
      msg: '', // 评论输入的内容
     
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    getComments() {
      this.$http.get("api/newsinfo_comment/" + this.id + "?pageindex=" + this.pageIndex).then(result => {
        if(result.body.status === 0){
        //  this.comments = result.body.message;
        //  拼接之前的老数据
         this.comments = this.comments.concat( result.body.message )
        }
      })
    },
    getMore(){
      this.pageIndex++;
      this.getComments();
    },
    postComment(){
      // 校验是否为空内容
      if (this.msg.trim().length === 0){
       return Toast("评论内容不能为空！");
      }
      // 发表评论
      // post参数：
      // 1. 请求的url地址
      // 2. 提交给服务器的数据对象 { content: this.msg }
      // 3. 定义提交时候，表单中数据的格式  { emulateJSON: true }
      this.$http.post('api/post_newsinfo_comment/' + this.$route.params.id, { content: this.msg.trim() }).then(function(result) {
        // console.log(result.body.status)
        if(result.body.status === 0 ){
        // console.log('ok')

          // 1. 拼接出一个评论对象
          var cmt = { user_name: '@正经人老赵￥', add_time: Date.now(), content: this.msg.trim() };
          this.comments.unshift(cmt);
          this.msg = "";
        }

      })
    }, 
    remove(add_time, index) {
      // 点击删除，把商品从 store 中根据 传递的 Id 删除，同时，把组件中的 goodslist 中，对应要删除的那个商品，使用 index 删除
      this.comments.splice(index, 1);
      this.$http.post('api/post_newsinfo_comment_delete/' + this.$route.params.id , { content: add_time }).then(function(result) {})
    },
  }, 
  props: ["id"]
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
        .cmt-title {
        line-height: 30px;
        background-color: #ccc;
        .top{
          p{
            padding: 0;
            margin: 0;
          }
          display: flex;
          justify-content: space-between
        }
        .bot{
          p,a{
            padding: 0;
            margin: 0;
            text-decoration: none;
          }
          display: flex;
          justify-content: space-between
        }
        
        
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>


