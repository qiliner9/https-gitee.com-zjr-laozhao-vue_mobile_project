<template>
  <div class="goodsinfo-container">
    <!-- 钩子函数实现小球动画 -->
    <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter">
     <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

     <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">市场价：
            <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价:
            <span class="now_price">${{ goodsinfo.sell_price }}</span>
          </p>
          <p>购买数量:
            <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            <!-- 分析： 如何实现加入购物车的时候拿到 选择的数量-->
            <!-- 1. 经过分析发现：按钮属于 goodsinfo 页面， 数字 属于 numberbox 组件 -->
            <!-- 2. 由于涉及到父子组件嵌套，所以，无法直接在 goodsinfo 页面 中获取到选中商品的数量值 -->
            <!-- 3. 解决方案：涉及到子组件向父组件传值( 事件调用机制 ) -->
            <!-- 4.  事件调用的本质：父向子传递方法，子调用这个方法，同时把 数据当做参数 传递给这个方法 -->
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入轮播图组件
import swiper from "../subcomponents/swiper.vue";
// 导入 数字选择框 组件
import numbox from "../subcomponents/goodsinfo_numbox.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,  // 将路由参数对象中的 id 挂载到 data，方便调用
      lunbotu: [ ],
      goodsinfo: { }, // 获取的商品信息
      ballFlag: false, // 控制小球隐藏和显示的标识符
      selectedCount: 1 // 保存用户选中的商品数量，默认是1
    };
  },
  created(){
    this.getLunbotu()
    this.getGoodsInfo()
  },
  methods: {
  getLunbotu(){
      this.$http.get('api/getgoodslunbotu/' + this.id).then(result => {
        if(result.body.status === 0) {
          // 想使用轮播图组件，如果拿到的不是 img 属性的 url 数据，需要做进一步处理
          // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识 item.img 属性
          result.body.message.forEach(item => {
            item.img = item.src;
          })
          this.lunbotu = result.body.message;
        }
      })
    }, 
    getGoodsInfo(){
      this.$http.get('api/goods/getinfo/' + this.id ).then(result=>{
        // console.log(result)
        if(result.body.status === 0) {
          this.goodsinfo = result.body.message[0]
        }
      })
    },
    addToShopCar(){
      // 添加到购物车
      this.ballFlag = !this.ballFlag;
      // 拼接出一个，要保存到 store 中 car 数组里的 商品信息对象
      var goodsinfo =  { 
      id: this.id,
      count: this.selectedCount,
      price: this.goodsinfo.sell_price, 
      selected: true,
       };
      // 调用 store 中的 mutations 来将 商品加入到购物车中
      this.$store.commit('addToCar', goodsinfo);
    },
    beforeEnter(el){
      el.style.transform = "translate(0,0)";

    },
    enter(el,done){
      el.offsetWidth;

      // 小球动画优化思路：
      // 1. 先分析问题本质原因：把小球最终位移到的位置，已经固定了
      // 2. 只要分辨率或者滚动条出现后问题就来了
      // 3. 解决方案：动态计算这个最终坐标值；
      // 4. 先得到徽标的横纵坐标，再得到小球的横纵坐标，然后让 x 和 y 值求差，得到的结果就是要位移的距离
      // 5. 如何获取 小球和徽标 的位置  
      // 使用DOM提供的方法domObject.getBoundingClientRect()

      // 获取小球在页面中的位置；
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 通过操作 DOM 获取徽标的位置，先给徽标加个 id 
      const badgePosition = document.getElementById('badge').getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;




      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      // cubic-bezier(.4,-0.3,1,.68) 是一种动画效果，和 ease 类似
      done();
    },
    afterEnter(el){
      this.ballFlag = !this.ballFlag
    },
    getSelectedCount(count) {
      // 当子组件把 选中的数量传递给父组件的时候，把 选中的值保存到 data 上
      this.selectedCount = count;
     // console.log("父组件拿到的数据:" + this.selectedCount)
      
    }
  },
  components: {
    numbox,
    swiper
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }

  .ball{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 146px;
  }


}
</style>

