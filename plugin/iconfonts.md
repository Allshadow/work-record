#### symbol 引用

目前使用 iconfont 的官方推荐版本 symbol 引用

##### 下载

1）查看在线链接方式

- 在项目页面中点击 【查看在线链接】 显示链接地址
- 点击在线链接跳出页面
- 右击页面选择另存为

2）下载至本地方式

- 点击 【下载至本地】下载文件
- 选择 目录下 iconfont.js 

##### 引用

1）在 main.js 引入下载后的文件

```
import '@/common/iconfont.js'
```

2）加入通用 css 代码

```
<style type="text/css">
.icon {
	width: 1em; height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>
```

3）使用图标

```
<svg class="icon" aria-hidden="true">
    <!-- xxx 为图标名称 -->
    <use xlink:href="#XXX"></use>
</svg>
```

##### vue 中动态绑定图标

```
<svg
	class="icon"
	aria-hidden="true"
>
	<!-- 在 xlink:href 前加 v-bind -->	
  <use :xlink:href="icon"></use>  
</svg>
```

