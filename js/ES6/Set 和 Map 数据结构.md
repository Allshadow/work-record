### set

1）Set 本身是一个构造函数，用来生成 Set 数据结构

2）Set 结构不会添加重复的值

#### 基本用法

控制台打印出来的结果

![image-20210806094952589](1.Set 和 Map 数据结构.assets/image-20210806094952589.png)

初始化

```
const set = new Set()
// 使用 ... 将 set 对象转为数组
let s = [...set]
// []

const set = new Set([1,2,3,4,4,5])
let s = [...set]
// [1,2,3,4,5]
```

#### 与 `map` 方法使用

```
const value = [{name: '陈', age: 22}, { name: '王', age: 18}]
let set = new Set(value.map(ele => ele.name))
let setArr = Array.from(set)

console.log('setArr', setArr)
//setArr (2) ["陈", "王"]
```

## Map

1) Map 与 Object(对象)的区别

Object 只接受 key 为 字符串，为 字符串-值对应

Map 可以接受各种类型的值作为key, 为值-值对应

2）Map 可以接受数组