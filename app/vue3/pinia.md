### `vite`使用`pinia`

#### 安装

使用以下命令安装:

```
yarn add pinia
```

在`main.js`注册：

```
import { createApp } from 'vue'
// 引入pinia
import { createPinia } from 'pinia'

import App from './App.vue'
// 执行
const pinia = createPinia()
const app = cteateApp(App)

app.use(pinia)
app.mount('#app')
```

在页面中使用

```
import { userStore } from './store/user'
const {count, increment} = userStore()
```

#### 外部js使用`pinia`

外部引用`pinia`时会报错：

```
getActivePinia was called with no active Pinia. Did you forget to install pinia
```

解决方法：

1）在`store`目录新建`store.js`

```
// store.js
import { createPinia } from 'pinia';
const pinia = createPinia();
export default pinia;
```

2）在`main.js`引入

```
// 将注册pinia的方式由如下：
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)

// 修改为:
import pinia from './store/store'
app.use(pinia)
```

3）在外部js中引用

```
import pinia from './store/store' //路径记得更改
// 引入pinia中的store方法
import { userStore } from './store/user'
const store = userStore(pinia)

// /store/user.js 代码如下
import {defineStore} from 'pinia'

export const userStore = defineStore('useUser', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```