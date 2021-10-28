#### 模快化使用

```
// 安裝
npm install vue-router

// 明确安装路由功能
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
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

