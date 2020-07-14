# 一、数组

## 1、splice

### 1）定义

```
//splice 向/从数组中添加/删除项目，然后返回被删除得项目
//arr.splice(index, howmany, item1,item2,)
--index 从哪个位置开始， 为数组的索引值
--howmany 删除数组的数目，从索引开始，删除后面几个，0 表示不删除
--item,为从这个数组中添加的值
```

### 2）应用

```js
//删除一行
this.angentData.forEach((ele, index) =>{
    if(ele.id == id){
        this.angentData.splice(index, 1) //
    }
})

//删除多行
let ag = this.angentData;
    let ch = this.changeRuleValue;
    for(let i= 0; i < ag.length; i++){
        for(let j = 0; j < ch.length; j++){
            if(ag[i].id == ch[j].id){
                ag.splice(ag[i], 1);
            }
        }
    }
}

//获取删除得项目
function getArrDelete() {
    var newArr = arr.splice(type, 1);
}
```

## 2、reduce

```js
//数组去重 data为需要去重得数组
let hash = {}; 
data = data.reduce((preVal, curVal) => {
	hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal); 
	return preVal 
}, [])
```

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

