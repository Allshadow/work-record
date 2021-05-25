## yarn 常用命令

### yarn 安装

```bash
npm i yarn -g
```

### 查看版本

```bash
yarn -v
```

### 创建 package.json

```
yarn init

or

yarn init -y 
```

### 添加依赖

```
yarn add //添加依赖会更新 package.json 以及 yarn.lock 文件

* 生产环境依赖
yarn add webpack || yarn add webpack@2.3.3
相当于 yarn add --save

*开发环境依赖
yarn add --dev webpack

*全局依赖
yarn global add webpack
```

### 更新依赖

```
yarn upgrade //升级所有依赖
yarn upgrade webpack //升级指定包
yarn upgrade --last //忽略版本规则，升级最新版本，并且更新 package.json
```

### 移除依赖

```
yarn remove webpack
```

### 安装 package.json 中所有文件

```
yarn || yarn install
yarn install --force //安装时，如果 node_modules 中有相应的包,可以以强制重新下载安装
```

### 运行脚本

```
yarn run //用来执行在 package.json 中属性下定义的脚本
yarn run dev || yarn dev
```

参考链接

```
https://www.cnblogs.com/lililia/p/10482169.html
http://www.imooc.com/wiki/yarnlesson //慕课网教程
```

