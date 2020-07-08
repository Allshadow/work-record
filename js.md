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