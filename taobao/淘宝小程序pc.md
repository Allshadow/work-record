#### miniapp-router

##### 简介

miniapp-router 是 pc 端单页面路由管理器

##### 安装

```
npm i miniapp-router -S
```

##### 使用

使用 \< router-view > 标签结构

注意 slot 需和路由定义中的 component 对应

page.axml

```
<router-view>
	<base slot="component" />
	<scene slot="scene" />
	<api slot="api" />
</router-view>
```

page.json

```
{
  "component": true, //若是为组件，一定要设置此参数为 true
  "usingComponents": {
    "router-view": "miniapp-router/router-view/router-view",
    "base": 'XXX', 
    “scene”: 'xxx',
    "api": 'xxx'
  }
}
```

router.js

```
export default {
  routes: [
    {
      path: '/component',
      component: 'component',
      children: [
        { path: '/button', component: 'button' },
        { path: '/icon', component: 'icon' },
      ],
    },
    {
      path: '/scene',
      component: 'scene',
      children: [{ path: '/form', component: 'form' }],
    },
    {
      path: '/api',
      component: 'api',
      children: [
        { path: '/other', component: 'other' },
      ],
    },
  ],
  option: { // 初始化路由位置
    initPath: '/component/button',
  },
};
```

#### 路由

如果为组件必须在 json 中声明 

```
{
  "component": true
}
```

在页面中引入需要到最后一层

```
"main": "../main/index/index", //目录为 main/index/index.js
```

#### 文档

官方组件

```
https://miniapp.open.taobao.com/docV3.htm?docId=1805&docType=20&source=search
```

图表文档

```
https://f2.antv.vision/zh/examples/gallery
```

