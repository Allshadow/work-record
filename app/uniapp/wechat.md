### 基础

#### 页面跳转

```
// 参考地址
https://uniapp.dcloud.net.cn/api/router.html

uni.navigateTo()
```



### 报错

#### 编译时报错

新建 `uniapp` 时，运行到微信小程序，微信开发者工具报错如下；

![image-20220816093700630](wechat.assets/image-20220816093700630.png)

缺少应用的 `appId`， 注册流程：

```
// 登录地址
// 注册成为开发者，并创建应用，应用名称要与本地项目名称一致
https://dev.dcloud.net.cn/

// 在本地 manifest.json - 微信小程序配置 - 基础配置 - uni-app 应用标识（AppId）
// 2. 微信小程序AppId， 微信小程序开发者工具获取,如果要用测试号，在创建小程序那里取一个即可
```