# vue-cli安装

## 1. 卸载旧版

1）如果有全局安装了旧版本vue-cli (1.x 或者 2.x)，使用以下命令卸载

```
npm uninstall vue-cli -g
# OR
yarn global remove vue-cli
```

## 2. 安装

1）使用如下命令安装新的包

```npm
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

## 3. 检查

1）使用一下命令检查安装版本是否正确

```
vue --version
```

# 创建项目

## 1. vue create

```
//Windows 上通过 minTTY 使用 Git Bash，交互提示符并不工作
$ winpty vue.cmd create [项目名称]
OR
$ vue create [项目名称]
```

## 2.  自定义选择

#使用回车确定

#使用空格选择

![image-20200714164855092](assets/vue/config.png)

## 3. 启动服务

```
cd [项目名称]
yarn serve
```

1、参考链接

https://www.jb51.net/article/160146.htm

2、config配置

https://juejin.im/post/5bd02f98e51d457a944b634f

# vue.config.js (cli4)

## 1. 取消eslint

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

## 2. 自动打开浏览器

```js
module.exports = {
  devServer: {
    open: true, 
  }
}
```

