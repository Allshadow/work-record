# 一、简介

- 将DOM元素转化为图片
- 当前在vue中使用
- 英文文档地址：http://html2canvas.hertzen.com/

# 二、使用

## (1) 安装

```
npm install html2canvas
```

## (2) 语法

- 基本描述

```js
html2canvas(element, options);
//element 需要截图的dom元素
//options 配置参数
```

- 成功回调

```js
html2canvas(element, options)
	.then(canvas =>{
     	console.log('canvas', canavs);
    	//canvas <canvas width="300" height="531"></canvas>
})
```

- 基本用法

```vue
<template>
	<div ref="imageWrapper" @click="toCrop"></div>
</template>

<script>
	import html2canvas from 'html2canvas';
	export default{
        methods:{
           toCrop(){
               html2canvas(this.$refs.imageWrapper，{
                    useCORS: true,  //允许跨域请求
                    ... //相关配置
               }).then(canvas =>{
            		document.body.appendChild(canvas);
        	   })
           } 
        }
    }
</script>
```

## (3) 配置参数(options)

```js
//dom 为所截的dom元素
{
    useCORS: true, //允许跨域请求
    width: dom.offsetWidth, //设置canvas尺寸与所截图尺寸相同，防止白边
    height: dom.offsetHeight, //防止白边
    ignoreElements: (element) =>{ //忽略的dom元素
        //此element 返回的是多个dom,根据需要，返回true后及忽略此元素
        if(element.className === 'issue'){
            return true
        }
	}，
    tainttest：true //是否加载完
}
```

## (4) 跨域请求

- 当非同源时（这个概念相对复杂，详细可以看以下链接第四点）

```
https://www.jianshu.com/p/22bd5b98e38a
//官方文档
http://html2canvas.hertzen.com/getting-started
//有翻译过文档，可以借鉴
http://caibaojian.com/html2canvas.html
```

- 总结，<img>遇跨域请求时,图片不能被导出解决方案

```vue
//在<img>标签上添加crossorigin='anonymous'
//这样触发带跨域请求头Origin的HTTP请求了
<img 
	:src="`${info.ewmUrl}?time=${Math.random()}`" 
	:ref="`img${index}`" 
	class="img-right" 
	crossorigin="anonymous"
>
//加上 ?time=${Math.random()}  解决图片渲染不出来的问题
```

## (5) 不支持样式

```
background-image //其他还未总结
```

