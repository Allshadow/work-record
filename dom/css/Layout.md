### `transform: scale(xxx)`

#### 正常流程

##### 需求分析

因为稿设计的比例为`1280 * 800`然而，设备的分辨率为`1024 * 640`。由于页面已经开发完成，选择补救措施，就使用`transform: scale(xxx)`，来设置缩放比例，进行适应缩放。

##### 解决思路

计算设备可视区宽度，将该宽度除以设计稿宽度，得岀缩放比例，再设置`scale`属性。

##### 实现

以下都是在`src`目录下操作，

因为是`vue`项目，所以粗略的整理了一个自定义组件

```
// directive 目录下创建 compatible 目录，目录下有 compatible.js 以及 index.js 文件

compatible.js 代码如下

export default function (el) {
	// 获取当前可视区宽度
	let width = document.body.clientWidth

	el.style.transform = `scale(${width/1280})`
}

index.js 代码如下

import compatible from './compatible'

const install = Vue =>{
  Vue.directive('deviceCompatible', compatible)
}

if(window.Vue){
  window.compatible = compatible;
  Vue.use(install);
}

compatible.install = install;

export default compatible

```

在`App.vue`中引入

```
<template>
  <div id="app" v-compatible>
    <router-view />
  </div>
</template>

<script>
import compatible from '@/directive/compatible'

export default {
  name: "App",
  directives:{
    compatible
  },
};
</script>

<style>
  body{
    overflow: hidden;
  }
</style>

<style lang="scss" scoped>
#app {
  width: 1280px;
  height: 800px;
  transform-origin: top left;
  background-color: #eee;
  overflow: hidden;
}
</style>
```

#### 踩坑之路

##### 需要设置宽高

```
// 若没有定义宽高，会导致缩放比例不对
#app{
	width: 1280px; // 设计稿的宽度
  height: 800px; // 设计稿的高度
}
```

##### `scale(x)`旁边留白

```
//使用 transform: scale(0.8)时会发现一个问题，就是原本铺满的页面出现了空白
#app{
  transform-origin: top left; // 设置缩放的原始点，必须配合 transform 用
}
```

##### 左右出现滚动条

```
// 设置完上面的内容发现左右出现了滚动条，设置 body 
<style>
  body{
    overflow: hidden;
  }
</style>
```

##### 应用场景

```
// 目前感觉这种方式用作相同比例的分辨率，宽高比不相同的分辨率，可能会有问题
```



### 移动端适配方案

#### `lib-flexible`

使用`lib-flexible`和`postcss-pxtorem`将`px`单位转化为`rem`单位

1）安装

```
yarn add --dev lib-flexible postcss-pxtorem
```

2）`main.js` 导入 `lib-fiexible`

```
import 'lib-flexible/flexible.js'
```

3）在 `postcss.config.js` 配置

```
module.exports = {
	plugins: {
		autoprefixer: {},
    "postcss-pxtorem": {
      "rootValue": 75,
      "propList": ["*"]
    }
	}
}
```

#### 常见问题

```
//问题
Error: PostCSS plugin postcss-pxtorem requires PostCSS 8.

// 由于 postcss-pxtorem 版本太高
yarn add --dev postcss-pxtorem@5.1.1
```

### 

## 响应式布局

### 简介

响应式布局通常分为三种：

- 利用弹性盒子 Flex、网格布局 Grid 或左浮动法 Float 等 css 属性来实现的在一列上根据屏幕大小不同而进行自动换行
- 利用媒体查询来根据当前屏幕大小来运行相应的css代码
- 利用 javascript 来获取窗口宽高来动态操作 DOM 元素



# post-px-to

使用教程：

https://juejin.im/post/5f0b12296fb9a07eb7358b42#heading-5

github地址：

https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md

# postcss-px2rem

https://blog.csdn.net/qq_43258252/article/details/87867560