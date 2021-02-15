### 分享

坚持养成一个懂得总结得习惯，以备不时之需。生活虽苦，但还是处处有光。生活还是充满希望。

今天记录一下关于 vue , vue-router 不用模块工程文件编写，直接引入页面得实践总结。若方法不够完善，请指出，互相学习

### 准备工作

#### 初始化 vue ， vue-router

这个项目只以  body 标签 中的结构来举例，其他部分需要自己填充

直接引入的页面若使用 ES6 语法，可能会造成兼容性问题

以下是基本引入的结构，会根据此结构进行迭代

```
<div id="app">
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>

<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
<script>
  // 1. 定义 (路由) 组件。
  var Foo = { template: "<div>foo</div>" };
  var Bar = { template: "<div>bar</div>" };

  // 2. 定义路由
  var routes = [
    { path: "/foo", component: Foo },
    { path: "/bar", component: Bar },
  ];

  // 3. 创建 router 实例，然后传 `routes` 配置
  var router = new VueRouter({
    routes: routes,
  });

  // 4. 创建和挂载根实例。
  // 记得要通过 router 配置参数注入路由，
  var app = new Vue({
    el: "#app",
    router: router,
  });
</script>
```

### 组件的使用

#### 新建组件页面

在页面新建 components 文件夹，新建 header.js 文件 代码如下

```
Vue.component('base-header', {
  template : '<div> \
              我是测试头部      \
             </div>'
})
```

#### 使用组件

在 准备工作 上的 html 页面中引入

```
<div id="app">
  <!-- 准备工作的代码新增以下组件 -->
  <base-header></base-header>
</div>

<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
<!-- 引入组件 -->
<script src="./components/header.js"></script>
```

#### demo 地址

点击链接：[demo-01](https://github.com/Allshadow/vue-no-webpack/tree/master/demo-01)

### 映射路由

#### 简单改造准备工作的文件

div 中去掉多余的代码

```
<div id="app">
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

定义路由的步骤添加一个重定向

```
var routes = [
  { path: "/foo", component: Foo },
  { path: "/bar", component: Bar },
  { path: "/", redirect: '/foo'} //新增路由重定向
];
```

#### 路由文件编辑

目前只有在同一个页面来编写组件，如果有更好办法，会更新

修改路由映射组件 template

```
<script>
  // var Foo = { template: "<div>foo</div>" };
  // var Bar = { template: "<div>bar</div>" };
  var Foo = { template: "#foo" };
  var Bar = { template: "#bar" };
</script>
```

添加路由组件的方法有两种：

- 使用 template 标签

```
<div id="app">
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>

// !!! 是在 div 标签外编写
<template id="foo">
  <div>
	我是foo
	<!-- 跳转/bar -->
	<router-link to="/bar">bar</router-link>
  </div>
</template>
<template id="bar">
  <div>我是bar</div>
</template>

<!-- .... -->
```

- 使用 script 引入(由于 template 对 ie 不支持，所以使用以下代码替代)

```
<div id="app">
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
</div>

<script type="text/x-template" id="foo">
	<div>
		我是foo
		<!-- 跳转/bar -->
		<router-link to="/bar">bar</router-link>
	</div>
</script>
<script type="text/x-template" id="bar">
	<div>我是bar</div>
</script>

<!-- .... -->
```

#### 升级路由组件功能

以上的组件不支持我们绑定响应式数据，于是做了如下修改，使其能支持更多 vue 的功能

```
<div id="app">
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>

<script type="text/x-template" id="foo">
  <div>
	我是foo
	<!-- 将 /bar 用方法跳转 -->
	<button @click="toBar">{{ msg }}</button>
  </div>
</script>
<script type="text/x-template" id="bar">
  <div>我是bar</div>
</script>


//将单一的 定义组件 替换以下扩展功能
<script>
  // var Foo = { template: "#foo" };
  // var Bar = { template: "#bar" };
  var Foo = Vue.component('foo', {
      template: '#foo',
      data(){
        return{
          msg: '点击我 bar'
        }
      },
      methods:{
        toBar(){
          this.$router.push({
            path: '/bar'
          })
        }
      }
   })

 var Bar = Vue.component('bar', {
    template: '#bar',
    mounted () {

    },
})
    // ...
</sctipt>
```

#### demo 地址

点击链接：[demo-02](https://github.com/Allshadow/vue-no-webpack/tree/master/demo-02)

### 参考

[博客](https://blog.csdn.net/qq_36660558/article/details/80991304 )

