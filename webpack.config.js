var path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin') // 解析 vue 模板必须加载 VueLoaderPlugin 模块
module.exports = {
  
  plugins: [
    new htmlWebpackPlugin({  //创建一个在内存中生成 html 页面的插件

      template: path.join(__dirname, './src/index.html'),  // 指定需要在内存中生成的页面模板
      filename: 'index.html',  // 指定在内存中生成的页面的名称
    }),
    new VueLoaderPlugin() // 解析 Vue 模板必须 
  ],
  module: {// 这个节点用于配置所有的第三方模块加载器
    rules: [// 所有匹配规则
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },// 配置 css 文件的处理规则
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },// 配置处理 less 文件
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=220640&name=[hash:8]-[name].[ext]' },
      // limit 给定的值是图片的大小， 单位是 byte ，引用的图片大于或等于给定的limit值，不会转换成base64格式的字符串。如果图片小于给定的limit值则会转换成base64格式的字符串
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },// 处理字体文件
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 babel 转换 ES 高级语法
      { test: /\.vue$/, use: 'vue-loader' }, // vue-loader
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'], // 表示这几个文件的后缀名可以不写
    alias: {
      '@': path.join(__dirname, './src')  // @符号表示绝对路径。这样，在这个项目中 @ 符号就表示 项目根目录中 src 的这一层 路径
    }
  }
};
