### `vue2.x`

#### 时间处理

```
monentjs dayjs
```

#### `swiper`

##### 适用版本

现官网`demo`支持`vue3`，适用`vue2`使用以下版本

```
yarn add swiper@5.1.0 vue-awesome-swiper@4.1.1
```

##### 参考文档

```
// 1. vue-awesome-swiper的 github 地址

// 2. vue-awesome-swiper demo
https://v1.github.surmon.me/vue-awesome-swiper

// 3. swiper 配置项
https://www.swiper.com.cn/api/
```



##### `swiper`手动操作后不继续轮播

```
 var swiper = new Swiper('.swiper-container', {
   autoplayDisableOnInteraction: false,//这个加了没啥用
   on: {
     slideChangeTransitionEnd: function() {
     		this.autoplay.start();//就加这个玩意儿
     },
   }
 });
```

#### `vue-signature`

##### 简介

实现在线签名功能

##### 用法

```
https://www.npmjs.com/package/vue-signature
```

### 服务端

#### `json-server`

##### 简介

一个简单的本地服务，可以通过接口，处理获取`json`中的数据

##### 安装

```
npm install -g json-server
```

##### 创建 `db.json`

新建个文件夹，创建 `db.json`文件

```
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

##### 监听数据

在命令行中执行，即可监听到数据变化

```
json-server --watch db.json
```

