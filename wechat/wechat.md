## 自定义头部导航

### 简介 

微信小程序自定义头部导航栏也是一个常见的需求。于是，记录一下，方便查阅复习。

### 基础准备工作 

现在以小程序的一个页面 detail 目录为例，来进行配置

```
  detail
        -| index.wxml
        -| index.js
        -| index.wxss
        -| index.json
```

#### 设置 ’navigationStyle’

将 index.json 中的 ‘navigationStyle’ 设置为 ‘custom’，若想要全局都自定义，则需要设置全局的 app.json

```
 {
    "navigationStyle": "custom"
 }
```

#### 计算状态栏高度

在 app.js 中计算相应的高度，代码如下

```
App({
  onLaunch: function () {
    //获取胶囊按钮的信息  {高度，距离头部高度}
    const {height, top} = wx.getMenuButtonBoundingClientRect()


    // 获取手机系统信息
    wx.getSystemInfo({
      success: res => {
        //手机状态栏高度
        const statusBarHeight = res.statusBarHeight;

        //导航高度
        this.globalData.navHeight = statusBarHeight + height + (top - statusBarHeight) * 2;

      }, fail(err) {
        console.log(err);
      }
    })
  }，
  globalDate:{ //设置全局变量
      navHeight: 0, //导航栏高度
      navTop: 0, //胶囊距顶部的高度
      navButtonHeight: 0, //胶囊的高度
  }
}) 
```

#### 编写自定义组件

新建一个 custom-header 文件夹，代码如下

index.wxml

```
<view class="nav" style="height: {{navHeight}}px;">
  <view 
    class="back-btn" 
    style="top: {{navTop}}px;height: {{navButtonHeight}}px;"
    bindtap="onTap"
  >
    <image src="{{imgSrc}}"></image>
  </view>
  <view 
    class="text" 
    style="top: {{navTop}}px;height: {{navButtonHeight}}px; line-height: {{navButtonHeight}}px"
  >{{title}}
  </view>
</view>
```

index.js

```
let app = getApp();


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    imgSrc: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    navHeight: app.globalData.navHeight,
    navTop: app.globalData.navTop,
    navButtonHeight: app.globalData.navButtonHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function () {//返回上一页
      wx.navigateBack({
        delta: 1
      })  
    }
  }
})
```

index.scss （此处我是用 scss 来写的，所以直接贴 scss 代码）

```
.nav{
  position: fixed;
  width: 100%;
  z-index: 1000000000;
  .back-btn{
    position: absolute;
    left: 40rpx;
    display: flex;
    align-items: center;
    z-index: 10000000001;
    image{
      width: 32rpx;
      height: 36rpx;
    }
  }
  .text{
    text-align: center;
    position: absolute;
    width: 100%;
  }
}
```

index.json (json 文件未做改变)

```
{
  "component": true,
  "usingComponents": {}
}
```

#### 引用组件

在 index.json 文件中引入所编写的组件

```
{
  "usingComponents": {
    "custom-header": "/components/custom-header/index" //定义组件名称，路径根据自己文件夹配置
  }
}
```

#### 页面中使用组件

只是简单的封装了一下，仅供基础使用

```
<custom-header 
  img-src="/image/mine/left-arrow.png"
>
</custom-header>
```

### 参考 

参考以下博客：[博客](http://blog.csdn.net/gary_yan/article/details/78645303)