### 分享

此次记录一下 mock.js 在 vue-cli 中使用得方法，方便以后使用。

掘金平台的字数有限制，如有机会添加长文，会将规则匹配的也一并记录。

### 安装

```
yarn add --dev mockjs
or
npm install mockjs --save-dev
```

### 使用方法

#### 在src目录下新建mock目录

![](mock.js.assets/stickpicture.png)

#### 上图 index.js 的文件

```
const Mock = require('mockjs');
//格式： Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/user/userInfo', 'get', require('./json/userInfo'));
Mock.mock('/home/banner', 'get', require('./json/homeBanner'));
```

#### json 文件内容，以 homeBanner.json 为例

```
{
  "result": "success",
  "data": {
    "mtime": "@datetime", //具体应用看官方文档
    "score|1-800": 800,
    "rank|1-100":  100,
    "stars|1-5": 5,
    "nickname": "@cname"
  },
  "msg": ""
}
```

#### main.js 引入

```
import axios from 'axios' //需要使用到 axios
Vue.prototype.axios = axios;  //挂载 axios
require('./mock'); //引入mock数据，关闭则注释该行
```

#### 访问接口

```
this.axios.get('/user/userInfo')
  .then(function(res){
    console.log(res);
  })
  .catch(function(err){
    console.log(err);
  });
```

  