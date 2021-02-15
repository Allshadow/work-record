### video 获取视频时长

```
let video = document.createElement('video')
let duration = 0
video.src = res.result.filePath
video.play()
video.addEventListener("loadedmetadata", function (_event) {
	duration = video.duration;
})
```

## 数组的拷贝

### 浅拷贝

1）定义

若数据是基本类型，拷贝的是基本类型的值，若数据是引用类型，拷贝的则是内存地址

2）示例

```js
let obj = {
    id:1,
    info:{
        name:"hello",
        age:24
    }
}
let obj2 = obj; // 赋值就是一个浅拷贝
obj2.id = 3;
console.log(obj.id);   // 3
```

### 深拷贝

1）定义

将一个对象从内存中完整拷贝一份出来，从堆内存中开辟一个新的区域存放新对象，且不会影响原对象

2）序列化与反序列化

```
JSON.parse(JSON.stringify)

//缺点
有些格式JSON不支持，如下
1.对象中不能有函数，属性直接被忽略
2.对象中不能有undefined，属性直接被忽略
3.对象中不能有正则，属性直接被忽略
4.Date类型数据会被转化为字符串类型
5.对象不能是环状结构，否则会报错
//所谓环状结构的对象，就是对象的属性又指向了自身，window就是最常见的一个环状对象
```

3）参考文章（数组深拷贝）

https://juejin.im/post/6889327058158092302#heading-13

# 一、数组

## 3、map

### 1）定义

map方法将数组得所有成员依次传入参数函数，然后把每一次执行得结果组成一个新数组返回

### 2）举例

```js
var numbers = [1, 2, 3];

var arr = numbers.map(function (n){
    return n + 1;
})
// arr  [2, 3, 4]
// numbers [1, 2, 3]
```

### 3）应用

```js
// 1、取出数组对象得某个指
var arr = [
    {id: 1, name: '我'}, 
    {id:2, name: '你'},
    {id: 3, name: '他'}
]
let newArr = arr.map(ele => ele.id)
// newArr [1, 2, 3]
```



# 二、ES6

## 1、Map数据结构

1) Map 与 Object(对象)的区别

Object 只接受 key 为 字符串，为 字符串-值对应

Map 可以接受各种类型的值作为key, 为值-值对应

2）Map 可以接受数组

## 2、定义默认参数的方式

```
//以前javescript原先定义方式
var link = function(height, color, url){
  var height = height || 50;
  var color = color || 'red';
  var url = url || 'http://baidu.com'
}

//ES6中
var link = function(height = 50, color = 'red', url = 'http://baidu.com'){

}
```

## 3、模板文本

```

```

# 三、其他

## 1、typeof

### 1）定义

typeof 判断数据类型（数组跟对象都返回Object）

## 2、**instanceof**

## 3、解决js精度问题

### 1）使用number-precision库

#github地址

https://github.com/nefe/number-precision

#下载

```
npm install number-precision --save
```

#方法

```
NP.strip(num)         
// strip a number to nearest right number
NP.plus(num1, num2, num3, ...)   
// addition, num + num2 + num3, two numbers is required at least.
NP.minus(num1, num2, num3, ...)  
// subtraction, num1 - num2 - num3
NP.times(num1, num2, num3, ...)  
// multiplication, num1 * num2 * num3
NP.divide(num1, num2, num3, ...) 
// division, num1 / num2 / num3
NP.round(num, ratio)  
// round a number based on ratio
```

#使用

```
import NP from 'number-precision'
NP.strip(0.09999999999999998); 
// = 0.1
NP.plus(0.1, 0.2);             
// = 0.3, not 0.30000000000000004
NP.plus(2.3, 2.4);             
// = 4.7, not 4.699999999999999
NP.minus(1.0, 0.9);            
// = 0.1, not 0.09999999999999998
NP.times(3, 0.3);              
// = 0.9, not 0.8999999999999999
NP.times(0.362, 100);          
// = 36.2, not 36.199999999999996
NP.divide(1.21, 1.1);          
// = 1.1, not 1.0999999999999999
NP.round(0.105, 2);            
// = 0.11, not 0.1
```

## 4、base64 图片引用

```
“data:image/jpg;base64,...."
```

## （5）下载视频

```js
//此为简单视频下载功能，url为下载视频路径
downLoad(url){
	let a = document.createElement('a');
	a.href = url;
	a.click();
	a = null;
}
```

## （6）下载视频变为打开

```
在下载视频的url后拼接 
?response-content-disposition=attachment
```

## 监听滚动条滚动

```js
<script>
    window.onscroll = funciton(){
    	let scor = document.documentElement.scrollTop
	}

	or
    
    window.addEventListener('scroll', function(){})
</script>
```

