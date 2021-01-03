###  分享

今天已经是2021年，时间一晃而过，祝大家新年快乐

新的开始也不能懈怠，记录一下关于 vuex 在日常使用时的一些总结，方便自己复制即用

### 什么是 vuex ?

#### 官网

vuex 是一个专为 vue.js 应用程序开发的状态管理模式。

#### 自己的理解

vuex 像一个全局的值管理器，不同组件间通过一个公共的地方，来响应式得改变数据流。更新视图。

### 创建基础 store

本项目是基于vue-cli4 创建，所以 demo 也以此进一步改造，@ 为 src 目录

#### 基本结构

@/store/index.js

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
```

main.js

```
import Vue from 'vue'
import App from './App.vue'
import store from './store'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
```

### 核心概念

#### Module

