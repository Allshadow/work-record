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

## 2. const

```js
1) 常量一定要赋初始值

2) 一般常量用大写（潜规则）

3) 常量不能修改

4) 块级作用域

5) 对于数组和对象的元素修改，不能算常量的修改，不会报错
const ARR = ['1', '2']
ARR.push('Hello') // 不会报错
ARR[0] = 2 //不会报错
若使用
ARR = '123' //报错

总结： 声明数组或对象时使用 const 比较稳妥
```

# 二、变量的解构赋值

## 1.定义

允许按照一定模式从数组和对象中提取值，对变量进行赋值

## 2.数组解构

```js
const F4 = ['小沈阳', '刘能', '李四'];
let [xiao, liu, zhao] = F4;
console.log(xiao)
```

## 3.对象的解构

```js
1) 对象的解构
const OBJ = {
    name: 'chen',
    hasn: funciton(){
    	console.log('我打印出来了')
	} 
}
let {name, hasn} = OBJ;

hasn(); //方法正常调用
//属性解构比较少， 方法解构比较多

2) 解构设置别名
let {name: myName, hasn: nyHasn} = OBJ;
```

# 三、模板字符串

```js
1) 声明
let str = `我也是一个字符串`; //反引号``

2）内容中可直接出现换行符
let str = `<ul>
				<li></li>			
			</ul>`

3) 变量的拼接  //`${}`
let first = 1,
    last = 2;
//ES6中使用${NAME}，并将其放在反引号中
let name = 'your name is ${first} ${last}';

//ES6之前拼接字符串
let name = 'your name is ' + first + ' ' + last + '';
```

# 四、对象的简化写法

```js
1) 允许在大括号里面直接写入变量和函数，作为对象的属性和人方法
let name = 'chen'
let change = function(){
	console.log('Hello World')
}

const OBJ = {
	name, //相当于name : name的简化写法
	change
	inprove(){ //也可以直接这种写发 替代 :function
		
	}
}
console.log(OBJ) // {name: 'chen', change: f, inprove: f}
```

# 五、箭头函数

```js
1) 使用箭头（=>）定义函数
//早期版本
let fn = function(){}

//es6版本
let fn = () =>{}

2) this是静态的
//this始终指向函数声明时所在作用域下的this的值
例子：
function getName(){
    console.log(this.name)
}

let getName2 = () =>{
    console.log(this.name)
}
//设置window 对象的name 属性
window.name = 'chen'
const school = {
    name: 'change'
}
//直接调用
getName();  //chen
getName2(); //chen
//.call方法调用
getName.call(school) //change
getName2.call(school) // chen

2) 不能作为构造实例化对象
let Person = (name, age) =>{
    this.name = name;
    this.age = age;
}
let me = new Person('xiao', 30) //报错
```

# 六、promise

## 1.定义

```
es6中异步编程的解决方案，promise是一个构造函数
```

## 2.实例化 Promise 对象

```
const p = new Promise(function(resolve, reject){
	setTimeout(function(){
		//let data = '数据库中的用户数据';
		//resolve(data); //表示成功
		let err = '数据读取失败'
		reject(err)
	}, 1000)
})

//调用promise 对象的 then 方法
p.then(function(value){
	//成功时执行
}, function(reason){
	//失败时执行
})
```

