const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    host: 'localhost',
    port: 9527,
    proxy: {
      '^/auditing': {
        target: 'http://122.51.156.19:9090/', // 测试
        changeOrigin: true,
        xfwd: true
      }
    },
    open: true // 配置自动启动浏览器
  },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        data: `
                @import "@/styles/public.scss";
                @import "@/styles/public-class.scss";
                @import '@/styles/index.scss';
                @import '@/styles/variables.scss';
                @import '@/styles/mixin.scss';
                @import '@/styles/transition.scss';
                @import '@/styles/element-ui.scss';
                @import '@/styles/sidebar.scss';
                @import '@/styles/btn.scss';
                @import '@/styles/position.scss';
                @import '@/styles/font.scss';
                @import '@/styles/theme/register.scss';
            `
      }
    }
  },
  chainWebpack: config => {
    /**
         * 删除懒加载模块的 prefetch preload，降低带宽压力
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
         * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
         */
    config.plugins
      .delete('prefetch')
      .delete('preload')
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve
      .symlinks(true)
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@lib', resolve('/src/libs'))
      .set('@util', resolve('/src/utils'))
      .set('@actions', resolve('/src/actions'))
      .set('@static', resolve('/src/static'))
      .set('@controller', resolve('/src/actions/controller.js'))
    config.resolve.extensions
      .add('.vue')
      .add('.js')
      .add('.json')
    // 非开发环境
    config.when(process.env.NODE_ENV !== 'development', config => {
      config.optimization
        .minimizer([
          new UglifyJsPlugin({
            uglifyOptions: {
              // 移除 console
              // 其它优化选项 https://segmentfault.com/a/1190000010874406
              compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log']
              }
            }
          })
        ])
    })
    // 一个规则里的 基础Loader
    // svg是个基础loader
    const svgRule = config.module.rule('svg')
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()
    // 添加要替换的 loader
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // 修改images loader 添加svg处理
    // https://juejin.im/post/5c3c544c6fb9a049d37f5903
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  }
}
