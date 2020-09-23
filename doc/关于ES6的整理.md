# 一、变量声明及申明特性

## 1. let

```js
//特性
1) 不能重复声明
let a = '111';
let a = '222'; //会报错

2) 块级作用域
//只在代码块里面有效， es5之前有全局，函数，eval等作用域
//存在{} 的代码块如果用let声明，都存在块级作用域、
//比如 if else while for..
例子：
{
    let a = '111';
}
console.log(a) //报错a is not define

而如果是var
{
	var a = '111';
}
console.log(a); //打印 111

3) 不存在变量提升
//不允许在声明变量之前使用let定义的变量
例子：
console.log(a); //cannout access 'a' before initialization
let a = '111';

而如果是var
console.log(a); //undefined
var a = '111';

4) 不影响作用域链
//因为当前作用域没有a,则会向上一级来找
{
    let a = '111';
    function fn(){
        console.log(a)
    }
    fn(); // 111
}
```

