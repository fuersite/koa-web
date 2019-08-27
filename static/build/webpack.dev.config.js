process.env.NODE_ENV = 'devem';
const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.base.config');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(config, {
  mode: 'development',
  devtool: '#source-map',
  devServer: {
    contentBase: path.join(__dirname,"..", "dist"),
    compress: true,
    port: 9000,
    historyApiFallback:true,
  },
  plugins:[
    new HtmlWebpackPlugin({            //在这里实例化
        template:path.join(__dirname,"..", "src", "index.html"),   //这里告诉他模板html放在什么位置
        filename:'index.html',         //这里是输出后的文件名，这里我还是叫index.html，可改
        minify:{                       // 这里放缩小的条件
            removeAttributeQuotes:true,  //去掉文件里的双引号
            collapseWhitespace:true,     //去掉文件的空白行，这里是把文件打包成一行
        },
        hash:true,
        chunks: ['index', 'vendor']
    }),
    new HtmlWebpackPlugin({            //在这里实例化
        template:path.join(__dirname,"..", "src", "index.html"),   //这里告诉他模板html放在什么位置
        filename:'admin.html',         //这里是输出后的文件名，这里我还是叫index.html，可改
        minify:{                       // 这里放缩小的条件
            removeAttributeQuotes:true,  //去掉文件里的双引号
            collapseWhitespace:true,     //去掉文件的空白行，这里是把文件打包成一行
        },
        hash:true,
        chunks: ['admin', 'vendor']
    }),
    new HtmlWebpackPlugin({            //在这里实例化
        template:path.join(__dirname,"..", "src", "index.html"),   //这里告诉他模板html放在什么位置
        filename:'work.html',         //这里是输出后的文件名，这里我还是叫index.html，可改
        minify:{                       // 这里放缩小的条件
            removeAttributeQuotes:true,  //去掉文件里的双引号
            collapseWhitespace:true,     //去掉文件的空白行，这里是把文件打包成一行
        },
        hash:true,
        chunks: ['work', 'vendor']
    }),
    new HtmlWebpackPlugin({            //在这里实例化
        template:path.join(__dirname,"..", "src", "index.html"),   //这里告诉他模板html放在什么位置
        filename:'error.html',         //这里是输出后的文件名，这里我还是叫index.html，可改
        minify:{                       // 这里放缩小的条件
            removeAttributeQuotes:true,  //去掉文件里的双引号
            collapseWhitespace:true,     //去掉文件的空白行，这里是把文件打包成一行
        },
        hash:true,
        chunks: ['error', 'vendor']
    })
]
});