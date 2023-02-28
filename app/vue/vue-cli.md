### `vue-cli`

#### 版本说明

目前`vue-cli` 版本已经变为 `5.x`;

使用 `4.X`，安装版本为`@vue/cli@4.5.15`

#### 全局安装

```
// 如果有全局安装了旧版本vue-cli(1.x或者 2.x)
// 使用以下命令卸载旧版本：
npm uninstall vue-cli -g
# OR
yarn global remove vue-cli

// 安装
npm install -g @vue/cli
# OR
yarn global add @vue/cli

// 查看是否安装成功
vue --version

// 创建项目
// Windows 上通过 minTTY 使用 Git Bash，交互提示符并不工作
$ winpty vue.cmd create [项目名称]
OR
$ vue create [项目名称]
```



#### 局部安装

```
// 初始化 package.json
npm init -y

// 安装 vue-cli
yarn add -D @vue/cli
or
npm i -D @vue/cli

// 查看是否安装成功
npx vue -V

// 创建项目
npx winpty vue.cmd create project-one
```



#### 创建项目

##### 预设选择

![image-20210215151425560](vue-cli.assets/image-20210215151425560.png)

##### 自定义选择

1）使用回车确定

2）使用空格选择

![](vue-cli.assets/config.png)

##### 启动服务

```
cd [项目名称]
yarn serve
```

##### 参考链接

```
https://www.jb51.net/article/160146.htm

// config 配置
https://juejin.im/post/5bd02f98e51d457a944b634f
```



### `vue.config.js`

#### 开启`Gzip`

下载`compression-webpack-plugin`

```
yarn add -D compression-webpack-plugin@5.0.0
```

`vue.config.js`下添加配置

```
const CompressionPlugin = require("compression-webpack-plugin");
const env = process.env.NODE_ENV !== 'development';

module.exports = {
	// ..
	configureWebpack: (config) =>{
    if (env) {
      //gzip压缩
      const productionGzipExtensions = ['html', 'js', 'css']
      config.plugins.push(
          new CompressionPlugin({
              test: new RegExp(
                  '\\.(' + productionGzipExtensions.join('|') + ')$'
              ),
              threshold: 10240, // 只有大小大于该值的资源会被处理 10240
              minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
              deleteOriginalAssets: false // 删除原文件
          })
      )
    }
  },
}
```

##### 参考文档

```
https://blog.csdn.net/gegegegege12/article/details/122668040
https://zhuanlan.zhihu.com/p/81570108
https://blog.csdn.net/duanhy_love/article/details/125069009
```



##### 报错

```
ERROR TypeError: Cannot read property 'tapPromise' of undefined

// 直接使用 yarn add -D compression-webpack-plugin 时版本过高
// 需要使用 yarn add -D compression-webpack-plugin@5.0.0
```



#### 强制清除浏览器缓存

更新版本的时候，有时需要手动清除浏览器缓存。以下是代码清除缓存的方式：

##### 打包时给文件加上`hash`值

在`vue-config.js`中给文件加上版本号，或者时间戳等信息

```
const timeStamp = new Date().getTime()

module.exports = {
	// ...
	configureWebpack:{
    output:{
      filename: `js/[name].${timeStamp}.js`,
      chunkFilename: `js/[name].${timeStamp}.js`
    }
  },
  css: {
    extract: {
      filename: `css/[name].${timeStamp}.css`,
      chunkFilename: `css/[name].${timeStamp}.css`
    },
  },
}
```

##### 参考链接

```
// 1.vue-cli打包增加版本号、时间戳等自定义参数
https://blog.csdn.net/hy3528/article/details/127963584
// 2.vue 强制清除浏览器缓存
https://javaforall.cn/161108.html
```



#### `devServer`

##### 自动打开浏览器

```
module.exports = {
  devServer: {
    open: true,  //自动开启浏览器
    host: 'loacalhost' // vue-cli 5 需要加上这个
    port: 8099 //配置端口号
  }
}
```

##### 反向代理配置

```
// vue.config.js 配置
module.exports = {
  // 开启代理服务器
  devServer: {
		proxy: {
			'/api': { // 将以 /api 开头的请求转发到 https://danjuanapp.com 底下
        target: 'https://danjuanapp.com',
        ws: true, // 用于支持 websocket
        changeOrigin: true, // 用于控制请求头中的 host 值
        secure: false,
   			// pathrRewrite 匹配前缀，不然代理服务器会将前缀 '/api',作为请求路径
   			// { 正则 , 匹配后的值 }
        pathRewrite:{'^/api': ''}
      },
		}
  },
}

// index.vue 使用
<script>
	import axios from 'axios'
	export default {
		mounted(){
			// 发送 axios 请求
      axios.get('/api/v3/filter/fund?type=1&order_by=1m&size=10&page=1')
    }
	}
</script>
```

#### `sourceMap`

```
module.exports = {
  // 不需要生产环境的 source map
  productionSourceMap: false,
  css: {
  	sourceMap: false
  }
}
```

#### `eslint`

##### 关闭`eslint`

1）配置`vue.config.js`文件

```
module.exports = {
	lintOnSave: false
}

// 需要重新运行项目
```

2）注释或删除掉 `eslintrc`配置文件

可能是在`package.json` ，也可能是在  `.eslintrc.js`



### `package.json`

#### 配置局域网访问变量

```
"scripts": {
	// --host 后面为 ip 地址 
	//--port 端口号，可以不用配置，默认端口号
	"dev": "vue-cli-service serve --host 192.168.199.126" --port 9082,
}
```



### 模式和环境变量

#### `process.env.NODE_ENV`

##### 概述

在`node.js`中，`process`表示当前的`node`进程。

`process.env`包含了系统环境等信息，比如版本信息等，但是不存在`process.env.NODE_ENV`。

`NODE_ENV`是用户自定义的变量，`webpack`中它用来判断生产环境或开发环境。

##### `vue-cli`中的环境变量

`vue-cli`的版本中，已经使用`DefinePlugin`方式配置好了`process.env.NODE_ENV`。

##### 获取当前环境

```
// NODE_ENV 决定运行的模式
// main.js 中打印
console.log('env', process.env.NODE_ENV)
```

#### `vue-cli` 默认模式

##### 三个默认模式

```
development 模式用于 vue-cli-service serve

test 模式用于 vue-cli-service test:unit

production 模式用于 vue-cli-service build 和 vue-cli-service test:e2e
```

##### 修改默认模式

```
// 使用 --mode 选项修改模式
vue-cli-service build --mode development
```

#### 环境变量

##### 环境变量与模式的关系

```
// 1. 文件 .env.[mode] 这个 mode 应该与上面的模式一致

如果将默认模式修改为: vue-cli-service serve --mode dev
则 .env 需要命名为 .env.dev 不然取不到值

// 2.  若 .env.[mode] 文件中没有设置 NODE_ENV=XXX, 则 NODE_ENV 默认值为 [mode]
```

##### 配置环境变量

当运行`vue-cli-service`命令时，所有环境变量都从对应的环境文件中载入。

在根目录新建如下规则文件

```
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

例如开发环境，根目录新建一个 `.env.development`文件：

```
VUE_APP_BASE_URL= "http;//..."
```

当运行`vue-cli-service`时，即会加载此文件中的配置

##### `vue`组件中获取

```
process.env.VUE_APP_BASE_URL
```

### 静态资源

#### 访问public文件夹

1）描述

任何放置在`public`文件夹的静态资源都会被简单复制，而不经过`webpcak`.需要通过绝对路径来引用他们。

2）在`public/index.html`或其他通过 `html-webpack-plugin`用作模板的HTML文件中，需要通过`<%= BASE_URL %>`设置链接前缀：

```html
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
```

3）在模板中，你首先需要向你的组件传入基础URL:

```JS
data(){
    return{
        publicPath: process.env.BASE_URL
    }
}
然后：
<img :src="`${this.publicPath}my-image.png`">
```

4）在 sass 中使用

```css
.bg{
	background: url('/img/mini-bg.png');
	// '/' 表示根路径，此路径是在 public/img 下
}
```

#### 引入`src/assets`图片

##### 使用相对路径引入

```
 <img src="../assets/images/temp_1_1.png" alt="">
```

##### 使用 require

```
require('@/assets/images/demo.png')
```

#### 样式引入

##### 在`scss`中引入

```
@import './'
```

##### 引入全局样式

```script
<script>
	import '@/assets/css/icon.css';
	import '@/assets/css/common.scss';
</script>
```

##### 引入局部样式

```script
<style lang="scss" scoped>
	@import "../assets/css/icon.css";
	@import "../assets/css/common.scss"
</style>
```

##### 引入`assets`背景图

```
 background: url('~@/assets/imgs/fontBackgroun.png') no-repeat 100% 100%;
```

#### 引入`JSON`文件

##### `import`

```
// xxx.json
{
	"code": "0000",
	"msg": "xxxx"
}

// xxx.vue 
import GansuJson from "../api/100000_full.json"

```

##### `axios`

```
// json 应放在 public 文件夹

// xxx.vue
import axios from "axios";

axios.get("/620000_level_3.json")
	.then(res => {
	
	}
)
```



### 兼容 `ie`

#### 使用`polyfill`

以下这个方法只能兼容到`ie10`:

1）安装

```
yarn add @babel/polyfill
```

2）在`main.js`顶部引入`@babel/polyfill`

```
import '@babel/polyfill'
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

3）修改`babel.config.js`

```
module.exports = {
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: 'entry',
      }
    ]
  ]
}
```

4）修改`.browserslist`

```
> 1%
last 2 versions
not ie <= 8
```

5）修改`vue.config.js`

```
module.exports = {
	transpileDependencies:['*'] //最开始这里的值为 true,查到的改成 * , 
}
```

##### 参考文档

```
https://blog.csdn.net/weixin_43749669/article/details/128343229
```

注意：

```
!!! 路由不能使用 history 需要用 hash
```



#### 报错

新建的 `vue-cli4`项目用`ie`打开报语法错误，如下图所示:

![image-20220708095421058](vue-cli.assets/image-20220708095421058.png)

点击报错信息如下图所示：

![image-20220708100719816](vue-cli.assets/image-20220708100719816.png)

一般是引用外部依赖没被识别

解决方案：

1）安装 `babel/polyfill`依赖包

```
yarn add @babel/polyfill // 生产依赖
```

2）在`vue.config.js`配置`transpileDependencies`

```
module.exports = {
  devServer: {
    open: true,
  },
  lintOnSave: false,
  // 将上图依赖文件添加此处
  transpileDependencies: [
    'sockjs-client'
 	]
}
```



### 功能

#### 浏览器标题设置

##### 页面设置标题相同

```
<head>
	<title>我是标题</title>
</head>
```

##### 页面设置标题不同

```
router - index.js

// 路由中定义路由元信息
const router = new Router({
	routes: [
		{
			path: 'index',
			meta:{
				title: '首页' //在此处设置标题
			}
		}
	]
})

// 在路由的全局前置守卫进行拦截
main.js

router.beforeEach((to, from, next) =>{
	document.title = to.meta.title
})

```

##### 自定义指令设置标题

```

```

