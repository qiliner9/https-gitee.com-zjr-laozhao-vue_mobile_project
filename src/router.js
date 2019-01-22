// 1 导包
import VueRouter from 'vue-router'

import HomeContainer from '@/components/tabbar/HomeContainer'
import MemberContainer from '@/components/tabbar/MemberContainer'
import SearchContainer from '@/components/tabbar/SearchContainer'
import ShopcarContainer from '@/components/tabbar/ShopcarContainer'
import NewsList from '@/components/news/NewsList'
import NewsInfo from '@/components/news/NewsInfo'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import VideoList from './components/videos/VideoList'
// 3 创建路由对象

var router = new VueRouter({

  routes: [  // 配置路由规则
    { path: '/', redirect: '/home' },  // 进入页面默认重定向到 home 页
    { path: '/home', component: HomeContainer },  // 
    { path: '/member', component: MemberContainer },  // 
    { path: '/shopcar', component: ShopcarContainer },  // 
    { path: '/search', component: SearchContainer }, // 
    { path: '/home/newslist', component: NewsList },  // 
    { path: '/home/newsinfo/:id', component: NewsInfo },
    { path: '/home/photolist', component: PhotoList },
    { path: '/home/photoinfo/:id', component: PhotoInfo },
    { path: '/home/goodslist', component: GoodsList },
    { path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo' },
    { path: '/home/video', component: VideoList },
  ],
  linkActiveClass: 'mui-active'  // 覆盖默认的 路由高亮类， 默认叫 router-link-active
})

// 把路由对象暴露出去
export default router