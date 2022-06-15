#### 基础配置

安装

```
yarn add axios
```

引用

```
// main.js
import axios from 'axios'

Vue.prototype.$axios = axios
```

组件使用

```
this.$axios.post('url', data).then(res =>{})
```

