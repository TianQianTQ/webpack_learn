
var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
module.exports = {
  context:__dirname,     //运行环境的上下文
  entry:'./src/app.js',
  output: {
        path:__dirname+'/dist',   //打包以后的文件路径  绝对路径
        filename:'js/[name].bundle.js' ,    //重新修改   因为有两个文件

  },
  module:{
    rules:[                                 //es6
      {
        test:/\.js$/,
        include:/("\.\/src")/,
        exclude:path.resolve(__dirname,'/node_modules/'),
        use:{
          loader:'babel-loader',
          options:{
            presets:['env']
          }
        }
      },
      {
        test:/\.html$/,
        use:[
            'html-loader'
        ]
          
      },
      {
        test:/\.tpl$/,
        use:[
            'ejs-loader'
        ]
          
      },
      {
         test: /\.css$/,     //并没有给代码前面加上前缀
         use: [
               'style-loader',
               'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                           plugins: [require('autoprefixer')()]
                    }
               }      
          ]
      },
      {   
           test: /\.less$/,
           use: [ 
                'style-loader',
                {
                  loader:'css-loader',
                  options:{importLoaders:1}
                },
                {
                  loader:'postcss-loader',
                  options: {
                     plugins: function () {
                      return [require('autoprefixer')];
                    }
                  }
                },
                'less-loader'
                ],

      },
      {
        test:/\.(png|jpe?g|gif|svg)$/i,
        loader:'file-loader'
          
      },

    ]
  },
  plugins: [
        new htmlWebpackPlugin({
          filename:'index.html',
          template:'index.html',
          inject:'body',
        }),
        ]
}