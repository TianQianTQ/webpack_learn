
var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
module.exports = {
	context:__dirname,     //运行环境的上下文
	//entry:'./src/script/main.js' ,  //打包的入口
	// entry:['./src/script/main.js','./src/script/a.js'],
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
      }
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