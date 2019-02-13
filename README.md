# 这是一个移动端 vue 项目，

## 注意：先运行 根目录 server 文件夹下的 app.js 作为 node 服务器(命令行： node app )，然后运行 dist 文件夹下的 index.html 可以看到整个项目 的功能。如果开发者模式需要首先 cnpm i 安装依赖包, 然后运行 npm run dev 可启动项目，数据都是从node服务器获取的，所以需要先启动服务器

## 一个有节操 懂浪漫的程序猿


### @正经人老赵￥

## 先搭建基本框架，tabbar 有 主页，会员，购物车，搜索

## 制作首页 App 组件
1. 完成 Header 区域， 使用 Mint-UI 中 的 Header 组件
2. 制作底部的 Tabbar 区域， 使用 MUI 中的 Tabbar.html
    + 制作购物车：
    + 先拷贝 扩展图标 css 样式
    + 拷贝 ttf 文件
    + 为购物车添加样式类： mui-icon-extra mui-icon-extra-cart
3. 在 中间放置一枚 router-view 展示匹配到的 组件

## 改造 tabbar a标签 为 router-link

## 设置 路由高亮类
 1. 在 router.js 里用 mui 的高亮类覆盖默认 的路由高亮类

## 点击 tabbar 中的路由链接显示对应的路由组件

## 制作首页轮播图布局 使用 MintUI里的 mt-swipe 组件

## 加载首页轮播图数据
1. 获取数据， 使用 vue-resource 
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取的数据保存到 data 上
4. 使用 v-for 循环渲染 每个 item 项

## 改造九宫格成6宫格 （使用 MUI 的grid-default.html）

## 改造新闻路由链接

## 新闻资讯页面制作
1. 绘制界面， 使用 MUI 中的 media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现新闻资讯列表点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link，同时，在跳转的时候提供唯一的 Id 标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在 路由模块中，将新闻详情的  路由地址 和 组件页面对应起来

## 实现 新闻详情页 的 页面布局 和 数据渲染

## 单独封装一个 comment.vue 组件模板
1. 先创建一个 单独的 comment.vue 组件模板
2. 在需要使用 评论 组件的地方， 手动导入 comment.vue 组件 "import comment from './comment.vue'"
3. 在父组件中，使用 "components" 属性，将导入的组件注册为自己的 子组件
4. 将注册的子组件，注册名称， 以 标签形式 在页面引用即可

## 获取所有的评论数据显示到页面中
1. getComments()


## 实现点击加载更多评论的功能
1. 为加载更多按钮绑定点击事件，请求下一页数据
2. 点击加载更多，让 pageIndex++， 然后重新调用 this.getComments()方法重新获取最新一页的数据
3. 为了防止新数据覆盖老数据，所以使用数组的 concat() 方法拼接


## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，通过 Toast 弹窗提示内容不能为空
4. 通过 vue-resource 发送请求，把评论内容提交给服务器
5. 刷新列表，看到最新评论，
  +如果重新调用 getComments() 的话，可能只能得到最后一页的数据。
  +换一种思路：当评论成功后，在客户端，手动拼接处一个最新的评论对象，然后调用数组的 unshift 方法，把最新的评论追加到 data 中的 comments 的开头


## 改造图片分享 按钮 为路由的链接并显示对应页面的组件页面

## 绘制 图片 列表组件页面结构并美化样式
1. 制作 顶部滑动条
2. 制作 底部的图片列表
### 制作顶部滑动条的坑们：
1. 需要借助 MUI 中的 tab-top-webview-main.html 
2. 需要把 slider 区域的 mui-fullscreen 类去掉
3. 通过官方文档知道这个js组件需要初始化后才能使用 
 + 导入 mui.js
 + 调用官方初始化方式
 ...
 mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
 ...
4. 在初始化滑动条的时候导入了 mui.js 但是报错："Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them"
 + 经过合理推测，应该是 mui.js 中用到了 'caller', 'callee', and 'arguments'；但是在webpack 打包好的 bundle.js 中，默认启用了严格模式，所以两者冲突了；
 + 解决方案： 1. 把 mui.js 中的非严格模式的代码改掉，但是不现实；2. 把 webpack 打包时候的严格模式禁用
 + 选择 plan B 移除严格模式：使用这个插件babel-plugin-transform-remove-strict-mode  使用方式：在 .babelrc 文件的 plugins 里面添加 "transform-remove-strict-mode"
5. 刚进入图片分享页面的时候，滑动条无法正常工作，原因：需要等 DOM 元素加载完毕才能初始化 ，所以 把初始化代码放到 mounted() 生命周期函数中
6. 当 滑动条 调试ok后， 发现 tabbar 不能正常工作了，经过各种调试后，发现把每个 tabbar 按钮的样式中的 'mui-tab-item' 类重新改一下名字就行了
7. 获取所有分类并渲染分类列表

### 制作图片列表区域
1. 使用懒加载技术实现图片列表，实现方式： Mint-UI 组件中的 'lazy load'
2. 根据 'lazy load' 使用文档尝试使用
3. 渲染图片列表数据

### 实现了 图片列表的懒加载改造和 样式美化

## 实现了点击图片跳转到 图片详情页面
1. 在改造 li 成 router-link 的时候，需要使用 tag 属性指定要渲染为 哪种元素

## 实现详情页面的布局和美化，同时获取数据渲染页面


## 实现 图片详情中 缩略图的功能
1. 使用 插件 vue2-preview 这个插件
2. 注意：每个 图片数据对象中，必须要有 w 和 h 属性

## 完成 商品购买页面

## 结合 vuex 实现购物车数据交互