module.exports = {
    chainWebpack: config => {
        //设置标题  默认不设置的话是项目名字
        config.plugin('html').tap(args => {
          args[0].title = "高校毕业生就业情况统计系统"
          return args
        })
    }
}