https://www.cnblogs.com/tjyoung/p/8289141.html

### 起步

使用 gitbash 命令行进行操作

#### 安装 vue-cli

```
npm install -g @vue/cli
```

#### 新建 vue-cli 项目

```
winpty vue.cmd create aw-view
```

#### 进入目录

```
cd aw-view
```

#### 运行项目

```
yarn serve
```

### 组件代码

#### 目录结构

在 aw-view 目录下新建 packages 文件夹

由于打包发布与非打包发布组件代码一致，所以单独提取出来

```
packages
	|-- aw-demo //组件名称
		|-- src
			|-- index.vue
		|-- index.js
	|-- index.js
```

#### 相应代码

1）packages 目录下的 index.js 代码如下:

```
// 若使用 ui 框架的 css 必须在此引入
import 'element-ui/lib/theme-chalk/index.css' 

// 引入组件
import awDemo from './aw-demo/index'

// 存储组件列表
const components = [awDemo]
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return
  // 遍历注册全局组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,

  // 按需引入
  awDemo
}
```

2）aw-demo 目录 src 目录下  index.vue

```
<template>
  <div>这是测试页</div>
</template>
<script>
export default {
  <!-- name 必须写 -->
  name: 'aw-demo'
}
</script>
```

4）aw-demo 目录下的 index.js

```
import awDemo from './src'

// 为组件提供 install 安装方法，供按需引入
awDemo.install = function (Vue) {
  Vue.component(awDemo.name, awDemo)
}
// 默认导出组件
export default awDemo
```

### 配置 package.json

```
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint --fix",
    // 新增 npm script 
    "lib": "vue-cli-service build --target lib ./packages/index.js --name aw-view --dest lib"
},

--target lib xxx // 指定打包的目录
--name // 打包后的文件名称
--dest // 打包后文件夹名称
```

### 配置 vue.config.js

新建 vue.config.js 文件 

```
module.exports = {
  publicPath: './',
  /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  outputDir: 'dist',
  /* 放置生成的静态资源 (mixin、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: 'assets',
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: false,
  devServer: {
    /* 自动打开浏览器 */
    open: true,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: '0.0.0.0',
    port: 8082,
    https: false,
    hotOnly: false
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include.add('/packages/')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
  }
}
```

### 构建

```
npm run lib
```

### 打包发布

#### 新建目录

在 aw-view 下新建 res 目录

#### 复制文件

将 lib 目录下的 aw-view.umd.min.js 复制到 res 目录下

若有 css 也需要复制过来

#### 创建package.json

在  res 目录下执行：

```
cd res

yarn init -y
```

#### 配置package.json

目前仅列出需要的配置参数，其他的需要自行添加

```
{
  "name": "aw-view",
  "version": "1.0.0",
  "main": "index.js", //入口文件为 aw-view.umd.min.js，也能将其重命名 index.js
  "license": "MIT"
}
```

### 非打包发布

#### 配置 package.json

package.json

```
"name": "aw-view", // 包的名称，引入时使用
"version": "0.1.0", // 发布的时候版本号不能重复，呈叠加形式
"private": false, // 这个要改为 false
"main": "aw-view/packages", //组件库的主入口地址(在使用组件时引入的地址)
"description": "aw common components", // 描述
"main": "lib/aw-view.common.js", // 入口文件（要 npm run lib 后）
```

#### 配置 .npmignore

新建  .npmignore 文件，可以忽略提交一些文件

```
# 忽略目录
lib/
!lib/aw-view.common.js  // 设置白名单 这个好像没作用
src/
#packages/
public/

# 忽略指定文件
vue.config.js
babel.config.js
*.map
```

### 发布到 npm 

#### npm 注册

1）若没有账号，需要在 npm 上注册一个，官网地址：https://www.npmjs.com/

2）填入信息，邮箱验证即可

3）验证后在本地用命令行进行发布操作

#### 发布常用命令

发布需要在本地控制台进行操作，vscode terminal 或 者 git bash

1）登录命令

键入以下命令时，输入用户信息

```
npm login
```

显示以下信息则为成功，若发现报错，大概率用户信息不正确

![image-20210518091620086](Untitled.assets/image-20210518091620086.png)

2）确认登录成功

```
npm whoami
```

3）发布

```
npm publish
```

4）删除

```
npm unpublish --force //强制删除

npm unpublish guitest@1.0.1 //指定版本号

npm deprecate //某些情况
```

### 使用

#### 下载

```
yarn add aw-view
```

#### 全局引用

在 main.js 中引入 

```
import awView from 'aw-view'
//import 'aw-view/aw-view.css' 若存在css则引入

Vue.use(awView)
```

在组件中引用

```
<aw-demo></aw-demo>
```

#### 按需引用

在 main.js 中引入 

```
import { awDemo } from 'aw-view'

Vue.use(awDemo)
```

#### 组件引用

在页面中引用

```
import awDemo from 'aw-view/aw-demo'

// 引入组件
components: {
   awDemo
},
```

### 参考地址

```
https://zhuanlan.zhihu.com/p/146328240

https://www.cnblogs.com/max-tlp/p/9338855.html

https://www.yuque.com/homacheuk/dmqta3/mbro9z

https://www.yuque.com/homacheuk/dmqta3/mbro9z 语雀

https://www.cnblogs.com/qianxiaox/p/13826344.html?ivk_sa=1024320u
```

