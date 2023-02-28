### 起步

#### 创建主应用

目前主应用是`vite` + `vue3.x`搭建，详情查阅`/app/vue3/vite`下教程

#### 微服务安装

##### 参考地址

这里面包含`vue2`与`vue3`版本的安装方式，由于`setup`没有`this`，需要在组件内引入：

```
https://wujie-micro.github.io/doc/pack/
```

##### 安装

1）安装

```
npm i wujie-vue3 -S
```

2）引入

`setup`组件引入：

```
<script setup>
import WujieVue from "wujie-vue3"

const { bus, setupApp, preloadApp, destroyApp } = WujieVue

</script>
<template>
	<WujieVue
    width="100%"
    height="100%"
    name="我是无界"
    url="http://localhost:7300"
  >
  </WujieVue>
</template>
```
