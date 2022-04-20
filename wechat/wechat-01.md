！！！微信小程序功能实现

### 自定义头部导航

#### 简介 

微信小程序自定义头部导航栏也是一个常见的需求。于是，记录一下，方便查阅复习。

#### 基础准备工作 

现在以小程序的一个页面 `detail `目录为例，来进行配置

```
  detail
        -| index.wxml
        -| index.js
        -| index.wxss
        -| index.json
```

##### 设置 `navigationStyle`

将` index.json `中的 `navigationStyle` 设置为 `custom`，若想要全局都自定义，则需要设置全局的 `app.json`

```
 {
    "navigationStyle": "custom"
 }
```

##### 计算状态栏高度

在` app.js` 中计算相应的高度，代码如下

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

新建一个 `custom-header` 文件夹，代码如下

`index.wxml`

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

`index.js`

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

`index.scss` （此处我是用 scss 来写的，所以直接贴 scss 代码）

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

`index.json` (`json` 文件未做改变)

```
{
  "component": true,
  "usingComponents": {}
}
```

#### 引用组件

在 `index.json` 文件中引入所编写的组件

```
{
  "usingComponents": {
  	//定义组件名称，路径根据自己文件夹配置
    "custom-header": "/components/custom-header/index" 
  }
}
```

##### 页面中使用组件

只是简单的封装了一下，仅供基础使用

```
<custom-header 
  img-src="/image/mine/left-arrow.png"
>
</custom-header>
```

#### 参考 

参考以下博客：[博客](http://blog.csdn.net/gary_yan/article/details/78645303)



### 自定义组件

#### 基础组件

##### 创建自定义组件

1）在` json` 文件中进行自定义组件声明

```
{
  "component": true //true 将组件设置为自定义组件
}
```

2）在`wxml`编写组件模板， `wxss`文件中加入组件样式

```
<!-- 这是自定义组件的内部WXML结构 -->
<view class="inner">
  {{innerText}}
</view>
<slot></slot>
```

```
/* 这里的样式只应用于这个自定义组件 */
.inner {
  color: red;
}
!!! 在组件wxss中不应使用ID选择器、属性选择器和标签名选择器
```

3）在` js` 中使用 `Component()` 来注册组件

```
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function(){}
  }
})
```

##### 使用自定义组件

1）在使用组件页面 `json` 进行引用声明

```
{
  "usingComponents": {
  	//组件所在路径
    "component-tag-name": "path/to/the/custom/component" 
  }
}
```

2） 在 `wxml` 页面使用

```
<view>
  <!-- 以下是对一个自定义组件的引用 -->
  <component-tag-name inner-text="Some text"></component-tag-name>
</view>
```

#### 组件模板

##### `<slot>`节点

1）基础使用

```
<!-- 组件模板 -->
<view class="wrapper">
  <view>这里是组件的内部节点</view>
  <slot></slot>
</view>
```

```
<!-- 引用组件的页面模板 -->
<view>
  <component-tag-name>
    <!-- 这部分内容将被放置在组件 <slot> 的位置上 -->
    <view>这里是插入到组件slot中的内容</view>
  </component-tag-name>
</view>
```

2）多个slot

默认情况下，一个组件的wxml中只能有一个slot, 需要使用多个slot时，可以在组件js中声明启用

```
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: { /* ... */ },
  methods: { /* ... */ }
})
```

用name来区分不同的组件

```
<!-- 组件模板 -->
<view class="wrapper">
  <slot name="before"></slot>
  <view>这里是组件的内部细节</view>
  <slot name="after"></slot>
</view>
```

使用时，用slot属性来将节点插到不同的slot上

```
<!-- 引用组件的页面模板 -->
<view>
  <component-tag-name>
    <!-- 这部分内容将被放置在组件 <slot name="before"> 的位置上 -->
    <view slot="before">这里是插入到组件slot name="before"中的内容</view>
    <!-- 这部分内容将被放置在组件 <slot name="after"> 的位置上 -->
    <view slot="after">这里是插入到组件slot name="after"中的内容</view>
  </component-tag-name>
</view>
```

##### 模板数据绑定

```
<!-- 引用组件的页面模板 -->
<view>
  <component-tag-name 
  	prop-a="{{dataFieldA}}" 
  	prop-b="{{dataFieldB}}"
  >
    <!-- 这部分内容将被放置在组件 <slot> 的位置上 -->
    <view>这里是插入到组件slot中的内容</view>
  </component-tag-name>
</view>
```



### 自定义分享

小程序的任何一个页面都能分享给好友或群聊

#### 保存分享图片

https://blog.csdn.net/hackersuye/article/details/82897652