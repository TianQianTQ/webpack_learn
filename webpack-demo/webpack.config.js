// 配置文件  执行webpack直接会在根目录寻找这个配置文件去执行

var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
module.exports = {
	//context:      //运行环境的上下文
	//entry:'./src/script/main.js' ,  //打包的入口
	// entry:['./src/script/main.js','./src/script/a.js'],
	entry: {
		main:'./src/script/main.js',
		a:'./src/script/a.js',
		b:'./src/script/b.js',
		c:'./src/script/c.js'
	},
	output: {
		path:__dirname+'/dist',   //打包以后的文件路径  绝对路径
        // filename:'bundle.js'   //打包以后的文件名
        filename:'js/[name].js' ,    //重新修改   因为有两个文件
        //[name]-[hash].js    name+hash组合成文件名
        publicPath: 'http://cdn.com/',              //占位符，把路径引用为线上地址

	},
	plugins: [
        new htmlWebpackPlugin({
        	// filename:'index-[hash].html',//指定文件名称,可当成版本号
        	filename:'a.html',
        	template:'index.html',
        	// inject:'head' ,   //指定放在头部还是body
        	inject:false,
        	// inject:'body',
        	title:'webpack a',
        	minify:{           //压缩
 				removeComments:true,    //删除注释
 				collapseInlineTagWhitespace:true,   //删除空格
        	},
        	// chunks: ['main','a'],
        	excludeChunks: ['b','c'],    //指定除了哪些被排除之后其他的chunk
        }),
         new htmlWebpackPlugin({
        	// filename:'index-[hash].html',//指定文件名称,可当成版本号
        	filename:'b.html',
        	template:'index.html',
        	// inject:'head' ,   //指定放在头部还是body
        	inject:false,
        	// inject:'body',
        	title:'webpack b',
        	// chunks: ['b'],
        	excludeChunks: ['a','c'], 
        }),
         new htmlWebpackPlugin({
        	// filename:'index-[hash].html',//指定文件名称,可当成版本号
        	filename:'c.html',
        	template:'index.html',
        	// inject:'head' ,   //指定放在头部还是body
        	inject:false,
            // inject:'body',
        	title:'webpack c',
        	minify:{           //压缩
 				removeComments:true,    //删除注释
 				collapseInlineTagWhitespace:true,   //删除空格
        	},
        	// chunks: ['c'],
        	excludeChunks: ['a','b'],
        })
        ]
}