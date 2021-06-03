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

### 实用技巧

未使用命名空间时读取 vuex 中的数据

```
// 实用 mapstate 辅助函数
import { mapState } from 'vuex';

computed: {// info 为 info.js 文件下的 vuex state
	...mapState('info',{
		common: 'common',
	})
},

```

