const path = require('path');
const webpack = require('webpack');

const isDebug = process.env.NODE_ENV !== 'production';

module.exports = {
    publicPath: './',
    filenameHashing: isDebug,
    productionSourceMap: isDebug,
    css: {
        loaderOptions: {
            css: {
                /**
                 * css-loader会对css文件内部url('***')进行require处理，
                 * 这会要求这个文件路径必须正确且存在，
                 * 这不便我们书写less等样式文件的时候使用外部静态资源，
                 * 这里配置的是，类似以下url('./images/***')路径
                 * 即外部(public/images/...)目录，不做相关处理
                 */
                url(url, filePath) {
                    if (
                        /^(.\/images\/)/.test(url) &&
                        !/node_modules/.test(filePath)
                    ) {
                        return false;
                    }
                    return true;
                },
            },
            less: {
                // 允许在less中使用js方法，iview的Less样式编译需要相关参数
                lessOptions: {
                    javascriptEnabled: true,
                },
                /**
                 * less编译附加变量文件
                 * 即在相应的文件中不需手动引用即可使用custom.less中的变量
                 */
                prependData(loaderContext) {
                    const { resourcePath } = loaderContext;

                    // 只对vue文件添加custom.less变量文件
                    if (/(.vue)$/gi.test(resourcePath)) {
                        return "@import '@/assets/styles/custom.less';";
                    } else {
                        return '';
                    }
                },
            },
        },
    },
    // 需要合并的webpack配置
    configureWebpack: {
        resolve: {
            // 别名
            alias: {
                '~': path.join(__dirname, '/node_modules/'),
                '@': path.join(__dirname, '/src'),
                packages: path.join(__dirname, '/packages'),
            },
        },
        // 添加新的loader
        module: {
            rules: [
                { test: /\.cur$/, use: 'file-loader' },
                // 新增md文件支持
                {
                    test: /\.md$/,
                    use: [
                        { loader: 'vue-loader' },
                        {
                            loader: require.resolve(
                                './packages/markdown-loader'
                            ),
                        },
                    ],
                },
            ],
        },
        // 文件打包拆解
        optimization: {},
        // 其他插件
        plugins: [
            // 定义部分全局变量，打包时候会被替换
            new webpack.DefinePlugin({
                envIsDebug: isDebug,
            }),
        ],
    },
    // 需要babel转义的第三方库
    transpileDependencies: [/view-design/],
    // 开发用代理服务配置
    devServer: {
        port: 9000,
        proxy: {
            // 本地
            '/proxy1': {
                target: 'http://localhost:8010',
                // changeOrigin: true,
                pathRewrite: { '^/proxy1': '' },
            },
        },
    },
};
