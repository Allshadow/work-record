### 基础

#### 什么是路由

```
// 路由是一组映射关系(key - value)
// key 为路径， value 为 components
```

#### 起步

##### 安装

```
npm install vue-router
```

##### 注册

```
// 明确安装路由功能
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

##### 路由切换

原始`html`中我们使用`a`标签实现页面的跳转

**`vue`中使用**

```
// 申明式
// 本质上是 vue-router 将 router-link 解析为 a 标签
<router-link to="/about"></router-link>

- to //跳转哪个路由
- active-class // 该元素被激活时候的样式
```

##### 路由占位符

```
// 指定展示位置
<router-view />
```

#### 嵌套路由

```
const routes = [
	{	// 一级路由
		path: '/about',  // 跳转的路径
		component: About // 映射的组件
		children: [
			{
				path: 'news', // 二级路由都不加斜杆 
			}
		]
	}
]

// 二级路由跳转时，需要带上它父级的地址 /about/news
```

#### 命名路由

```
// 简化路径的缩写
const routes = [
	{	
		path: '/about',  
		component: About 
		children: [
			{
				name: 'new', // 给路由命名
				path: 'news',
			}
		]
	}
]

// 简化前
<router-link to="/about/news"></router-link>
// 简化后
<router-link :to="{
	name: 'new'
}"></router-link>
```

#### 路由传参

##### `query`

```
// 路径传参
<router-link 
	:to='`/home/message?id=${id}`'
>
</router-link>

<router-link :to="{
	path: '/home/message/detail',
	query: {
		id: id
	}
}">
</router-link>

// 取值
this.$route.query
```

##### `params`

```
// 必须是 name
// 传递参数 /66/11 是参数
/home/news/66/11

const routes = [
	{	
		path: '/home',  
		component: Home 
		children: [
			{
				name: 'new', // 给路由命名
				path: 'news/:id/:value', // 占位符
			}
		]
	}
]
// this.$route.params.id
```



#### 路由的`props`

让路由组件更方便的收到参数

```
const routes = [
	{	
		path: '/home',  
		component: Home 
		children: [
			{
				name: 'new', // 给路由命名
				path: 'news/:id/:value', // 
				component: news,
				// 对象写法，对象中的所有key-value都会以props的形式传给news 组件
				// 一般不用传递静态值的
				// props: {a:1, b: 'hellp'}
				
				// 布尔值写法，值为 true 会将路由组件所有params参数，以props的形式传给 news 组件
				//props: true
				
				props($route){ // 解构构赋值的连续写法 {query: {id, title}}
					return {
						id：
					}
				}
			}
		]
	}
]

// 组件接收
export default {
	props: ['id', 'value']
}
```



#### 路由类型

1）声明式

```
<router-link to="/foo">Go to Foo</router-link>
```

2）编程式

```
router.push(...)
```

#### 禁止回退上一步

1）声明式路由

```
<router-link to="/foo" replace>Go to Foo</router-link>
```

2）编程式路由

```
this.$router.push({
	path: "/demo",
	replace: true 
})

# or

this.$router.replace({
	path: "/demo"
})
```

#### 组件内部跳转新窗口

```
let url = this.$router.resolve({
	path: '/videoPlayer',
	url: ''
})
window.open(url.href, '_blank');
```

#### 导航守卫

##### 全局前置守卫

1）基础用法

```
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

2）跳转路径

```
router.beforeEach((to, from, next) =>{
  // 这个是判断是否是移动端的方法    
  if(Device.isMobile){
  	next();
  }else{
  	// 如果没将 '/usephone' 放行，会造成死循环，控制台会报以下错误
  	// RangeError: Maximum call stack size exceeded
    if(to.path == '/usephone'){
    	next()
    }else{
    	next({path: '/usephone'})
    }
  }
})
```

##### 常见问题

1）组件内的守卫 `beforeRouterEnter` 不能获取组件实例 `this`

```
// 通过回调传参
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```