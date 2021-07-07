### vue-cli安装

#### 卸载旧版

1）如果有全局安装了旧版本vue-cli (1.x 或者 2.x)，使用以下命令卸载

```
npm uninstall vue-cli -g
# OR
yarn global remove vue-cli
```

#### 安装

1）使用如下命令安装新的包

```npm
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

####  检查

1）使用一下命令检查安装版本是否正确

```
vue --version
```

### 创建项目

#### vue create

```
//Windows 上通过 minTTY 使用 Git Bash，交互提示符并不工作
$ winpty vue.cmd create [项目名称]
OR
$ vue create [项目名称]
```

#### 预设选择

![image-20210215151425560](搭建整套vue体系.assets/image-20210215151425560.png)

#### 自定义选择

#使用回车确定

#使用空格选择

![](搭建整套vue体系.assets/config.png)

#### 启动服务

```
cd [项目名称]
yarn serve
```

1、参考链接

https://www.jb51.net/article/160146.htm

2、config配置

https://juejin.im/post/5bd02f98e51d457a944b634f

### 新建 vue.config.js 

以下为 vue-cli 4 配置

####  取消eslint

```js
module.export = {
    lintOnSave: false, //配置eslint，不生效
    devServer: {
        overlay: {
            warning: false, //配置eslint，不生效
            errors: false //配置eslint，不生效
        }
    },
}
```

#### 自动打开浏览器

```js
module.exports = {
  devServer: {
    open: true,  //自动开启浏览器
    port：8099 //配置端口号
  }
}
```

#### 配置 source map

```
module.exports = {
  // 不需要生产环境的 source map
  productionSourceMap: false,
}
```

#### 清除 dist 文件

使用到 clean-webpack-plugin 插件

**安装**

```
yarn add --dev clean-webpack-plugin
```

**配置**

```
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
        new CleanWebpackPlugin()
    ],
  }
}
```

#### 自动补全 css 前缀插件

1）使用





### postcss

```
https://www.jianshu.com/p/c8dc12afb5ce
```

