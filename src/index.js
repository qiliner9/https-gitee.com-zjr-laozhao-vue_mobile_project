// 入口文件

import Vue from 'vue'

// 导入 App 根组件
import app from './App.vue'

// 1.1 导入路由包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)
// 1.3 导入 router.js 路由模块
import router from './router.js'

// 导入 MUI 的样式
import '@/lib/mui/css/mui.min.css'
import '@/lib/mui/css/icons-extra.css'

// 导入 Mint-UI
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 导入 vue-resource 
import VueResource from 'vue-resource'
// 安装 vue-resource
Vue.use(VueResource)
// 设置请求根路径
Vue.http.options.root = 'http://127.0.0.1:3002/'
// 全局设置 post 时候表单数据的组织格式      application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;



// 调用时间插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY--MM--DD HH:mm:ss")
{
  return moment(dataStr).format(pattern)
})

// 缩略图预览插件
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)


// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入网站肯定会调用 main.js 先从本地存储中把 购物车数据读出来放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state: {  // this.$store.state.***
    car: car // 将 购物车中的商品的数据，用一个数组存储起来， 在 car 数组中，存储一些商品的对象， 设计成 
    // { id: 商品id, count: 要购买的数量, price: 商品的单价, selected: false }
  },
  mutations: { // this.$store.commit('方法名称', '按需传唯一的参数')
    addToCar(state, goodsinfo)
    {
      // 点击加入购物车，把商品信息，保存到 store 中的 car 上
      // 分析：
      // 1. 如果购物车中，之前就已经有这个对象的商品了，那么，只更新数量就行了
      // 2. 如果没有，则直接把 商品对象 push 到 car 中即可

      // 假设 在购物车中没有找到对应的商品
      var flag = false

      state.car.some(item =>
      {
        if (item.id == goodsinfo.id)
        {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      // 如果最终，循环完毕，得到的 flag 还是 false ，则直接把 商品对象直接 push 到 购物车中
      if (!flag)
      {
        state.car.push(goodsinfo)
      }

      // 当 更新 car 之后，把 car 数组， 存储到 本地的 localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car))

    },
    updateGoodsInfo(state, goodsinfo)
    {
      // 修改购物车中商品的数量值，同步更新到 store 中
      state.car.some(item =>
      {
        if (item.id == goodsinfo.id)
        {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFromCar(state, id)
    {
      // 根据 Id，从 store 中的购物车中删除对应的那条商品数量
      state.car.some((item, i) =>
      {
        if (item.id == id)
        {
          state.car.splice(i, 1)
          return true;
        }
      })
      // 将删除完毕后的最新的购物车数据同步到本地数据中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info)
    {
      state.car.some(item =>
      {
        if (item.id == info.id)
        {
          item.selected = info.selected
        }
      })
      // 把最新的 所有购物车商品的状态保存到本地数据中去
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: { // $store.getters.***
    // 相当于 计算属性，也相当于 filters
    getAllCount(state)
    {
      var c = 0;
      state.car.forEach(item =>
      {
        c += item.count
      })
      return c
    },
    getGoodsCount(state)
    {
      var o = {}
      state.car.forEach(item =>
      {
        o[item.id] = item.count
      })
      // console.log(o)
      return o
    },
    getGoodsSelected(state)
    {
      var o = {}
      state.car.forEach(item =>
      {
        o[item.id] = item.selected
      })
      // console.log(o)
      return o
    },
    getGoodsCountAndAmount(state)
    {
      var o = {
        count: 0, // 勾选的数量
        amount: 0 // 勾选的总价
      }
      state.car.forEach(item =>
      {
        if (item.selected)
        {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }

  }
})



var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,  // 1.4 挂载路由对象到 vm 实例上
  store  // 把 store 挂载到 vm 实例上
})