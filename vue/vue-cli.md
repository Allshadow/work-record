### 模式和环境变量

#### 模式

模式的作用，应该就是判断当前是开发环境还是生产环境

##### 默认模式

`vue-cli`中有三个默认模式

```
development 模式用于 vue-cli-service serve

test 模式用于 vue-cli-service test:unit

production 模式用于 vue-cli-service build 和 vue-cli-service test:e2e
```

##### 修改默认模式

使用`--mode` 来修改默认模式

```
vue-cli-service build --mode development
```

##### 获取当前环境

```
// main.js 中打印
console.log('env',process.env.NODE_ENV)
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
<img :src="`${publicPath}my-image.png`">
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

