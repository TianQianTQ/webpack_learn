# webpack 
##学习webpack使用方法

## 1.webpack基本介绍
+ 安装全局webpack   npm install -g webpack   (安装到默认的global文件夹下C:\Program Files\nodejs\node_global)
+ 进入文件夹   （mkdir filename   建立文件夹）
+ 初始化npm     npm init
+ 安装文件夹下的webpack   npm install webpack --save-dev
+ 查看文件夹下的文件   ls
+ 打开当前文件新建文件，写入内容（eg:hello.js）
+ 打包该文件    webpack hello.js  hello.bundle.js(打包之后文件的名称)
+ 引入模块或文件  require('./index.js')
## 2.处理css文件
    安装
+ npm install css-loader style-loader --save-dev
+ css-loader   使webpack可以处理.css文件
+ style-loader 使页面可以引用样式，插入html中（head）
+ require('style-loader!css-loader!./style.css')
+ webpack的命令行参数处理css文件
+ webpack hello.js hello.bundle.js --module-bind 'css=style-loader!css-loader'
+ --watch（自动打包，自动更新）
+ --progress(可以看到打包过程)
+ --display-modules (看到打包的模块)
+ --display-reasons(打包该文件的原因)
+ --colors(看到的是彩色的)

## 3.webpack基本配置
 1、新建文件夹的内容
+    src代码源文件目录  （script   style）
+    dist 静态资源目录

 2、简单的配置文件 
 webpack.config.js

+ // 配置文件  执行webpack直接会在根目录寻找这个配置文件去执行
module.exports = {
    entry:'./src/script/main.js' ,  //打包的入口
    output:{
        path:__dirname+'/dist/js',   //打包以后的文件路径  绝对路径
        filename:'bundle.js'   //打包以后的文件名
    }
}

  3、--config的使用   
  如果创建的webpack.config.js命名为webpack.config.dev.js(非指定文件)则在命令行使用webpack --   config
 4、package.json中在script中添加
"webpack":"webpack --config webpack.config.js --progress --display-modules --colors --display-reasons"
可在命令行中使用npm run webpack  直接执行这里的脚本命令
  
 5、配置文件的参数
+ entry  webpack 打包的入口指示
+ ##### 3种输入方式匹配不同的需求
+ 1)string    单独入口
      entry:'./src/script/main.js'
+ 2)数组形式    多个入口合并在一个文件中
      entry:['./src/script/main.js','./src/script/a.js']
+ 3)对象    多个文件多个入口
    entry:{
         main:'./src/script/main.js',
        a:'./src/script/a.js'
    }  
  output:{
    filename:'[name].js'
  }
+  [name]表示chunk的name,也就是entry作为对象的key值
+  [hash]打包生成的hash值
+  [chunkhash]chunk的hash值
+ 自动化生成项目中的HTML页面

 ######时刻注意引号与逗号引起的错误

 npm install html-webpack-plugin --save-dev

+ 插件   html-webpack-inline-source-plugin
## 4.处理内联化js与外链js,html模板生成
 一、如果想用不同的模版生成不同的html文件，只用在plugins里添加各种htmlWebpackPlugin的实例就好了。
 二、页面中引入inline的script
github上，ampedandwired/html-webpack-plugin/examples/inline/template.jade中可以看到代码。
 三、htmlWebpackPlugin.files.chunks.entry就是chunks输出的地址
 四、main以inline的形式引进，a,b,c以外链的形式引进
 1、index.html中
+ （1）在htmlWebpackPlugin的配置中有一个有一个参数chunks可以配置。
+ （2）head中
<script type="text/javascript">
        <%= compilation.assets[htmlWebpackPlugin.files.chunks.main.entry.substr(htmlWebpackPlugin.files.publicPath.length)].source() %>
    </script>
#### 重点：！！！compilation.assets是webpack暴露出来可以获取文件数据的方法。通过传文件名路径进这个对象，拿到这个文件的索引，通过调用source拿到文件内容。
compilation.assets需要的是不带publicPath，htmlWebpackPlugin.files.chunks.main.entry带publicPatch，所以用substr()截取。
+ （3）body中<%= htmlWebpackPlugin.files.chunks[k].entry %>
+ （4）config.js中inject为false
 五、小结
+ 1.html和动态生成的文件一一对应。
+ 2.htmlWebpackPlugin，如何自定义html，并且通过模板，参数如何传参。
+ 3.多页面时，如何通过htmlWebpackPlugin生成多个html
+ 4.深入探究通过htmlWebpackPlugin，结合模板的方式把生成的js，通过inline引入到html中。

## 5. 处理项目中的资源
##### 1.loader的作用以及使用
##### 1.处理js es6转换
+ 使用
+ 1.安装方法 npm install babel-loader babel-core babel-preset-env webpack --save-dev
+ 2.所以后面的参数'由presets: ['latest']相对于的变成了presets: ['env']
+ 3.官方并没有废弃query 也没有指明options是新参数 实际测试两种方法都可以 生成结果也一模一样
+ 4.loader: 'babel-loader'才能被识别
+ 5.include和exclude需要相对路径，所以include:__dirname +'./src/' 加前缀__dirname
+ 作用
+ 1.presets:['env'] 告诉babel-loader如何处理js   安装babel-preset-env
+ 2.babel-loader处理起来非常慢，优化方法是添加exclude与include（推荐使用正则）匹配需要转化的文件
+ 3.另一种优化方式添加path.resolve(__dirname,'app/src); 即绝对路径
+ 4.注意，如果是'node_modules'（视频中），而不是'/node_modules/'的话，也能运行。但是'/node_modules/'要更快，'/node_modules/')是618ms,而'node_modules'（视频中）花的时间是1254ms
##### 2.处理css/less.sass文件
+ 使用
+ 1.npm install style-loader css-loader [postcss-loader] [less-loader] [sass-loader] --save-dev
##### 3.处理.html文件
+ 使用 
+ 1.npm install html-loader --save-dev
+ 2.模板文件.tpl   npm install ejs-loader --save-dev(处理ejs语法)
##### 4.处理图片文件
+ 使用
+ 1.npm install file-loader --save-dev(添加图片文件，仅限于在样式中添加相对路径【.less】、在外层模板文件引入时注意是相对生成文件的相对路径【.html】、插件（.tpl）src='相对于生成文件的相对位置'，可使用${require('相对当前位置的相对位置')})
+ 2.设置图片文件的名字query{name:***}
+ 3.url-loader :如果文件大于limte(自设置，在query中直接设置limit)直接丢给file-loader,小于自动转换为base64编码
+ 4.image-webpack-loader : 压缩

















