### 全局配置

#### `Vue.config`

`Vue.config` 是一个对象，对`Vue`的全局配置，一次修改，全局都能使用

##### `vue-cli`中配置

```
// 在 mian.js 中使用

Vue.config.productionTip = false
```

#### `productionTip`

当我们引入开发版本的`vue`，浏览器会有一个生产提示。使用`productionTip`可以配置是否提示

```
<script src="./js/vue.js"></script>
<script>
	// 配置是否在启动时生成生产提示
	Vue.config.productionTip = false
</script>
```

下图为控制台打印的提示信息：

![image-20220407113617658](vue2.x.assets/image-20220407113617658.png)

### 全局 `API`

#### `Vue.use()`

当我们执行 `Vue.use()` 方法时，就会执行 `js` 中的`install` 方法。

`install`方法名是特定的，在此之中可以注册组件等。

#### `Vue.extend()`

创建一个组件，若自己没写，`vue` 会自动调用

```
// Vue.extend 中， data 必须是函数

const vueDemo = Vue.extend({
	template: `<div>
							xxx
						</div>`
	data(){
		return {}
	}
})

// 可以写成
const vueDemo = { /** .... */ }
```



### `$`

#### `$ref`

#####  基础

```
// 给标签绑定ref，使用this.$refs.xxx 获取的当前的dom对象
// 给组件绑定res,使用this.$res.xxx 获取的是当前组件对象
```

##### 动态添加`ref`

```
<li 
  v-for="(item,index) in listData" 
  :key="index" 
  :ref="`list${index}`"
  @click="toUse"
>
</li>

<script>
	methods:{
    toUse(){
      //由于dom是遍历出来的，所以会加[0]
      this.$refs[`list${index}`][0]  
    }
  }
</script>	
```

#### `$set`

##### 使用背景

为`vue data`中的某个对象添加动态的属性，但是视图层没发生更新

由于受`javascript`的限制，`vue`不能监听对象属性的添加或删除，所以对象属性必须存在于 `data`中

##### 使用方法

```
this.$set(obj, key, value) //key 需要为字符串
#OR
vue.set(obj, key, value)
```

##### 案例

`elementUI select` 使用了动态默认值，选择项目时，切换效果失效



### 内置的组件

#### `keep-alive`

```
https://blog.csdn.net/ZYS10000/article/details/122480733
```



### 移动端事件

```
<!-- 触摸  -->
<div @touchstart.prevent=""></div>

<!-- 滑动  -->
<div @touchstart.prevent=""></div>

<!-- 触摸结束  -->
<div @touchend.prevent=""></div>
```



### 命名规则

1）目录名称

```
使用小写，多个单词用 - 隔开
例如： my-project
```

2）组件名称

```
// 使用大驼峰式命名
例如：StuedentLive.vue
```



### 修饰符

#### `.sync` 

1）使用场景

子组件想要直接修改父组件传入的值时，需要对一个 prop 进行双向绑定

2）语法

```
//父组件

// 本质上是这样的：
<text-doucument
	:title = "doc.title"
	@update:title="doc.title = $event"
>
</text-doucument>

// 使用 .sync 语法糖：
<text-doucument :title.sync="doc.title"></doucument>

// 子组件
this.$emit('update:title'，newTitle) // update;title  冒号之间不能存在空格
```

3）用一个对象同时设置多个prop

```
//doc 为一个对象
<text-doucument :title.sync="doc"></doucument>
```

4）注意事项

```
.sync 修饰符的 v-bind 不能与表达式一起使用
```



### 计算属性与监听器

#### `computed`

##### `setter`

```vue
//监听的值更新了，比如以下的fullName更新，setter就会被调用，若在setter下改变了getter方法计算的值，fullName，也会随着更新。
vm.fullName = 'Job Work'

computed: {
	fullName:{
		get(){
			return this.firstName + this.lastName
		},
		set(newValue){ //newValue 为 fullName 的值
			var name = new Value.split('')
			this.firstName = name[0];
			this.lastName = name[name.length -1]
		}
	}
}
```

##### 传参

```js
:data="computedData(123)"
computed:{
    computedData(val){
        return function(val){
            /** do something */
            retrun val
        }
    }
}
```

##### 返回对象

有时候需要在计算属性中返回对象，适用以下写法

```
// template
// 获取len,并传参
<h3>{{comArray(specialtyOptionCourse).len}}</h3>
// 获取code,并传参
<h3>{{comArray(specialtyOptionCourse).code}}</h3>

// script
comArray(){
	return (arr) => {
		let list = arr.filter(ele => ele.isRecommend)
		let code = list.reduce((pre, cur) => pre + cur.credit, 0)
		return {
			len : list.length,
			code: code        
		}
	}
}
```

#### `watch`

##### 监听父组件`props`传入值

```
props:{
  localTime: null
},

data: {
  return{
    ownTime: ''
  }
}

watch:{
  localTime(newVal, oldVal){
    this.ownTime = newVal;
  }
},
```

##### 监听对象变化

```
data: {
  return{
    ownTime: {}
  }
}

watch:{
  ownTime:{
    handler(newVal, oldVal){

    },
    deep: true  //是否深度监听
    immediate: true //是否立即执行
  }
},
```

##### 监听对象得某个属性变化

```vue
//方法一（推荐）
data:{
	obj: {
		age: 18
	}
}
watch: {
	"obj.age":{
		handler(newValue){
      console.log('obj.age发生变化')
		}
	}
}

//方法二
data: {
  obj: {
  	age: 18
  }
},
computed: {
  isage(){
  	return this.obj.age
  }
},
watch: {
  isage(){
  	console.log('obj.age发生变化')
  }
}
```



### 过滤器

#### 标准用法

```
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>

export default {
	filters: {
    capitalize: function (value) {
      return ''
    }
  }
}

```

#### 串联

```
// 一个过滤器处理了完，依次将参数传入下一个过滤器中
{{ message | filterA | filterB }} 
```

#### 传参

```
// 第一个参数是 message
{{ message | filterA('arg1', arg2) }}
```

#### 全局使用

##### 基本用法

```
Vue.filter('capitalize', function (value) {
  return ''
})

new Vue({
  // ...
})
```

##### 项目中

```
// 在以下 js 写入方法 
/utils/filter.js

export function formatSex(val) {
  // ...
}

// main.js 引入
import * as filters from '@/utils/filter'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  // ...
})
```



### 路由相关

#### 页面置顶

切换组件时，页面默认回到顶部

```
// F12 打开调试工具的时候可能看不到效果
let router = new Router({
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  }
})
```

### 自定义指令

#### 应用

```
//以获取焦点指令为例
1.目录结构：
directive
	--|focus
		--|focus.js
		--|index.js

2.focus.js
export default {
  inserted: function (el) {
    el.focus() //input框获取焦点
    // el.children[0].focus() //elementUi获取焦点
  }
}

3.index.js
import focus from './focus'

const install = Vue =>{
  Vue.directive('focus', focus)
}

if(window.Vue){
  window.focus = focus;
  Vue.use(install);
}

focus.install = install;
export default focus

4.页面引入
  import focus from '@/directive/focus'

5.注册
directives:{
    focus
},

6.使用指令
v-focus
```

### 指令

#### `v-bind`

##### `:class`

1）对象语法

```
//active 为类名， 多个单词拼接得时候需要 ‘’
//isActive 为布尔值，判断是否展示
:class="{ active: isActive }"
:class="{ 'active-center': isActive }"

// 直接绑定 data
<div :class="classObject"></div>

data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

2）数组语法

```
<div :class="[active, 'text-danger']"></div>

<!-- data中的数据 -->
<div v-bind:class="[activeClass, errorClass]"></div>

data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}

<!-- 数组中使用对象语法 -->
<div v-bind:class="[{ active: isActive }, errorClass]"></div>

<!-- 数组中使用三元运算符 -->
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

3）计算属性绑定

```
<div v-bind:class="classObject"></div>

computed: {
  classObject(){
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

##### `:style`

1）对象语法

```
<div :style="{fontSize: '20px', color: '#000'}"></div>

// 直接绑定一个样式
<div :style="styleObject"></div>

data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

2）数组语法

```
<div :style="[{color: '#67C23A'},{fontSize:'20px'}]"></div>
```

3）使用三元运算符

```
//若只有单个样式
<div :style="status==1? 'color: #67C23A' :  'color: #F56C6C'"></div>

//若存在多个样式
<div :style="status==1? {color: '#67C23A'} : {color: '#F56C6C'}, {fontSize: '20px'}"
>
</div>
```

4）计算属性

```
<div :style="styles"></div>

computed:{
  styles(){
    return{
      height: 100 +"px"
    } //78
  },
}
```

#### `v-html`

##### 常见问题

当 `html `中有换行符时，处理方式

```
// 使用 white-space: pre-wrap 属性

<div style="white-space: pre-wrap" v-html="content"></div>
```

#### `v-model`

```
v-model 默认收集的是 input 值

实现数据的双向绑定，要存在valu`值
```

##### 当 `type=radio` 时

```
// 单选框时
男：<input type="radio" name="sex" v-model="sex" value="male">
女：<input type="radio" name="sex" v-model="sex" value="female">

data(){
	return {
		// 设置默认值
		sex: 'male'
	}
}
```

##### 当`type=checkbox`时

```
// 若不设置 value 值时，vue 默认取 checked
学习<input type="checkbox" v-model="hobby" value="study">
吃饭<input type="checkbox" v-model="hobby" value="eat">

data(){
	return {
		// 这个必须为数组
		hobby: []
	}
}
```

##### `v-model`三个修饰符

```
// lazy: 失去焦点再收集数据
// number: 输入字符串转为有效的数字,一般与 type=number 使用
// trim: 输入首尾空格过滤
```



##### 表单元素

###### 基础

1）定义

`v-model` 指令在表单` <input>`、`<textarea>`、`<select>`元素上创建双向数据绑定。

2）实现

```
<input v-model="sth" />
//  等同于
<input :value="sth" oninput="sth = $event.target.value" />
```

`v-model` 在内部为不同的输入元素使用不同的 `property` 并抛出不同的事件：

| 元素                  | 属性(property) | 事件   |
| --------------------- | -------------- | ------ |
| `text` 和 ` textarea` | value          | input  |
| `checkbox` 和 `radio` | checked        | change |
| `select`              | value          | change |

###### 表单组件

1）默认

一个组件上的`v-model`默认会利用名为 `value` 的 `prop` 和名为 `input` 的事件

```
// 名为 base-text 组件
<template>
	<div>
		<input 
			type="text"
			:input="value" 
			@input="$emit('input', $event.target.value)" 
		/>
	</div>
</template>

<script>
	props: {
		value: {}
	}
</script>

// 实现组件双向绑定
<base-text v-model="text" @input="handleInput"></base-text>

此时，组件中的 value 值为 text 传入的值，当 value 值改变时， text 值也会变化
```

2）改变默认属性

使用 `model` 选项修改默认的值

```
<template>
	<div>
		<input
    	type="checkbox"
    	v-bind:checked="checked"
    	v-on:change="$emit('change', $event.target.checked)"
    >
	</div>
</template>

<script>
	model:{
		prop: 'checked',
		event: 'change'
	}
	props: {
		checked: Boolean
	}
</script>

// 
<base-text v-model="text" @input="handleInput"></base-text>
```

##### 自定义组件

###### 组件实现`v-model`

当 `v-model`在非表单组件中使用时

```
// v-model 默认会利用子组件的 props 中绑定的 value 值和触发 input 事件达到双向绑定

// 子组件
<template>
  <div class="base-test">
    <el-button type="primary" @click="toClick">点击加1</el-button>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    value: { // props 绑定子组件
      type: Number,
      default: 0
    },
  },
  methods: {
    toClick(){
      let val = this.value + 1
      this.$emit('input', val) // 触发的方法
    }
  }
}
</script>

// 父组件 使用 v-model 更新数据
<base-test v-model="initData"> 
	<div>data: {{initData}}</div>
</base-test>
```



### `mixin`

```
// mixin.js

export const mixin = {
	methods: {
	
	}
}

// 组件引入
import { mixin } from 'xxx'

export default {
	mixins: [mixin, xxx]
}

// 如果组件与混入同时存在的内容，以组件为主，若同时存在两个声明周期，混入先执行
```



### 插件

```
// plugins.js
export default {
	install(Vue){// 第一个参数是 Vue
		Vue.filter('xxxx', function(){})
		
		Vue.directive('xxx', {})
		
		Vue.mixin({})
		
		// 给 Vue 原型上添加一个方法(vm 和 vc， 都能使用)
		Vue.prototype.hello = () => xxx
	}
}

// main.js
import plugins from './plugins'

Vue.use(plugins)
```



### 语法

#### `vue`模板语法

##### 插值语法

```
// 两对花括号
{{}}
```

##### 指令语法

```
v-xxx
```

#### `el`的两种写法

```
// 第一种写法
const vm = new Vue({
	el: '#app'
})

// 第二种写法
const vm = new Vue({
	//这里面不写 el
})
console.log(vm)
//去v实例的原型对象方法进行挂载
vm.$mount('#app')  // 将vue解析的内容挂载到 <div id="app"> 的容器上去
```

#### 关于`data`

##### `data`的两种写法

```
// 对象式
const vm = new Vue({
	data: {
	
	}
})

// 函数式
const vm = new Vue({
	data(){ // 正常是 data:function(){},一般在对象中写方法会删掉:function
		return {
			
		}
	}
})
```

##### `data`不能使用箭头函数

```
// 正确
const vm = new Vue({
	data(){
		console.log('this', this) // 这个this是vue调用的，所以指向vue实例对象
		return {}
	}
})

//错误
const vm = new Vue({
	data:()=>{ // 箭头函数没有自己的 this,会往上级找this
		console.log('this', this) // 这个this指向是全局的window
		return {}
	}
})

// 由vue所管理的函数，不能使用箭头函数
```

#### 数据代理

##### `Object.defineProperty`

```
<script>
	let person = {
		name: 'John',
		sex: '男',
		// age: 30  若在对象中配置，都可以对此属性进行操作
	}

	let number = 19

	// 若使用 Object.defineProperty 定义，则可以自定义配置
	Object.defineProperty(person, 'age', {
		// value: 35,
		// enumerable: true,  // 控制属性是否可以枚举
		// writable: true, // 控制属性是否可以修改， 默认值 false
		// configurable: true, // 控制属性是否可以删除，默认值 false

		// 当有人读取 person 的 age 属性时，get 函数(getter)就会被调用。
		// 且需要放回值，返回值就是 age 的值
		// 如果是读取整个对象,要点击控制台（...)，才会触发
		get(){
			console.log('有人读取age属性了')
			return number
		},
    // 当有人修改 person 的 age 属性时，set 函数(setter)就会被调用。
    // value 就是修改的属性值
    set(value){
      console.log('有人修改 age 属性了，值是', value)
      // 此时修改 number 的值，就可以改变对象中 age 的值了
      number = value
    }
	})

	// enumerable 为 false, 则该属性不能被遍历
	console.log('key', Object.keys(person))

	console.log('person',person)

</script>
```

##### 定义

数据代理：通过一个对象代理对另一个对象中属性操作(读/写)

##### 最简单的数据代理

```
<script>
    const obj = { x: 100}
    const obj2 = {y: 100}

    // 通过修改 obj2 来读取或写入 obj 的 x 值
    Object.defineProperty(obj2, 'x', {
      get(){
        return obj.x
      },
      set(value){
        obj.x = value
      }
    })
  </script>
```

#### 数组更新

##### 变更数组的方法

```
push()/pop()/shift()/unshift()/splice()/sort()/reverse()
```

##### 直接替换

```
// 对于非变更方法 filter()/concat()/slice() 不会改变原数组，直接替换数组
this.items = []
```

#### 事件处理

##### 事件占位符

```
// $event 可以放置在任何位置
<div @click="to($event)"></div>
```

#### 键盘事件

##### 基本键盘事件

```
<input type="text" placeholder="请输入文字" @keyup="showInfo">

showInfo(e){
  // keycode 已经被废弃，使用 code 好点
  console.log('keycode', e.keyCode)
  console.log('code', e.code)

  console.log(e.target.value)
}
```

##### 按键修饰符

```
<input @keyup.enter="submit">

<!-- 如果 code 名字为大驼峰写法，例如CapsLock -->
<input @keyup.caps-lock="submit">

<input @keyup.13="submit">
```

##### 注意

1） `tab`  键必须配合`keydown`使用，不然没有效果

```
<input @keydown.tab="submit">
```

##### 系统修饰键

```
// 以下系统修饰键比较特殊
ctrl、alt、shift、meta（win图标）

// 配合 keyup 使用时，按下修饰键的同时，需要按下其他键，随后释放其他键，事件才会被触发
// 配合 keydown 使用时，正常触发事件
```

#### `key`

##### 作用

```
// key 是虚拟 dom 对象的标识。
// 当数据发生变化时，Vue 会根据【新数据】生成【新的虚拟 dom】,随后 Vue 进行【新虚拟 dom】与旧【虚拟dom】的差异比较
```

##### 对比规则

```
// 旧虚拟dom找到了与新虚拟 dom 相同的 key:
	// 若虚拟 dom 中内容没变，直接使用之前的真实 dom
	// 若虚拟 dom 中的内容变了，则生成新的真实 dom，随后替换掉之前页面之间的真实 dom
	
// 旧虚拟dom未找到与新虚拟 dom 相同的 key:
	// 创建新的真实dom，随后渲染到页面
```

##### 用`index`作为`key`

```
// 若对数据进行：逆序添加、逆序删除等破坏顺序操作：
	// 会产生没有必要的真实 dom 更新 ==> 界面效果没问题，但效率低
	
// 如果结构中还包含输入类的 dom：
	// 会常产生错误 dom 更新 ==> 界面会有问题
```

#### 版本对比

`vue.js` 与 `vue.runtime.xxx.js` 的区别

```
vue.js 是完整版的vue， 包含核心功能和模板解析器
vue.runtime.xxx.js 是运行版的vue,只包含核心功能，不包含模板解析器

new Vue({
	el: '#app',
	// 使用
	render: h => h(App)
	// 不能使用
	// template: `<h1></h1>`
})

```



#### `jsx`

##### 什么是`jsx`

```
//jsx是javascript与XML结合的格式
当遇到 <  jsx就当HTMEL解析， 遇到 ( 就当javascript解析
```

##### `render`函数使用`jsx`

```
https://www.cnblogs.com/amylis_chen/p/11320059.html
```



### 组件

#### 按需引入

```
ItvConfig: ()=> import("./components/itvConfig")
```

#### 问题

##### 子组件参数

异步获取数据时，子组件未接收到父组件的值

```
//使用 v-if 判断，等待有值时判断
//使用监听器，监听到父组件的值
```

### 组件通信

#### `props & $emit`

##### `props` 

1）语法

```
// 父组件传参语法
<!-- 没有v-bind 默认字符串， 有v-bind 为表达式 -->
<child name='张三' :age="18"></child>
```

```
// 子组件接收语法

// 简单数组
props: ['name', 'value']

// 限制类型
props: {
	name: String, // 必须是数字类型
	age: Number，
	// 必须是字符串或数字类型
	propB: [String, Number],
}

// 完整
props: {
	name: {
		type: String, // 类型
		// required 与 default 不会同时出现
		required: true，// 是否必传
		default: true // 默认值
	},
	
	//如果是数组或对象，默认值必须是一个函数来返回
  propE: {
  	type: Array,
  	default: function(){
  		return[];
  	}
  },

  //自定义一个验证函数
  propF: {
  	validator : function(){
  		return value > 10;
  	}
  }
}
```

2）注意事项

```
// props 优先于 data 中的数据加载,所以，以下可用

props: ['name', 'age'],

data(){
	return {
		myName: this.name
	}
}
```

#### `$attrs & $listener`

##### `$attrs`

1）描述

父作用域中不作为`prop`属性传入的参数（除`class` 和 `style`外），可以通过 `v-bind="$attrs"`，传入内部组件

2）案例

```
v-bind="$attrs"
//父组件

子组件取值
this.$attrs.xxx
```

##### `$listeners`

1）描述

包含了父作用域中的（不含`.native` 修饰器）`v-on`事件监听，可以通过 `v-on='$listeners'`,传入内部组件

2）案例

```
//父组件使用
v-on = '$listeners'

//子组件使用this.$emit('changeValue', false)，触发父级的方法执行
```



### 组件收录

#### `web`端组件

##### 调起打印机

```
// 使用 print.js
https://github.com/Allshadow/vue-components-demo/tree/master/src/components/BasePrint
```

#### 移动端组件

##### 电子签名

基于 `vant` 与`vue-signature`的简单签名组件

```
// 运行此项目，点击电子按钮签名看示例

https://github.com/Allshadow/mobile-demo
```

##### 滑块验证码

```
https://github.com/Allshadow/mobile-demo
```

### 功能

#### 行内使用背景图片

```
<!-- 模板 -->
<div :style="bgStyle">

// script
const defaultImg = require("xxx") 

// or  const defaultImg = require("@/xxx") 

export default [
	data(){
		return {
			defaultImg
		}
	},
	
	computed: {
    bgStyle() {
      return `background-image: url(${this.defaultImg});`
    },
  }
]
```

#### 实现前端筛选

使用计算属性

```
<div id="app">
	<input type="text" placeholder="请输入文字" v-model="keyWord">

	<ul>
  	<li v-for="item in filterData" :key="item.id">{{item.name}}</li>
  </ul>
</div>

new Vue({
	el: '#app',
	data(){
	 	return {
	 		keyWord: '',
	 		dataList: [
	 			{ id: '001', name: '马冬梅' },
	 			{ id: '002', name: '周冬雨' },
	 			{ id: '003', name: '周杰伦' },
	 			{ id: '004', name: '温兆伦' },
	 		]
	 	}
	},
	computed: {
		filterData(){
			return this.dataList.filter(ele => {
				return ele.name.indexOf(this.keyWord) !== -1
			})
		}
	}
})
```

#### `<img>`

##### `:src`使用三目运算符

在图片的` :src` 属性上使用三目运算符读不到后面的图片`url` ,使用替代方法

```
<img v-if="xxx" :src="" />
<img v-else :src="" />
```

##### `onerror`事件

当图片加载不了，使用默认代替，因此用到`onerror`方法

```
/*
	传统使用 onerror, vue中使用 @error
	@error可以传递多个参数 onerror($event, index)	
*/
<img :src="item.picUrl" @error="onerror($event, index)">

methods:{
	onerror(e, index){
    let img = e.srcElement;
		img.src = this.defaultImg;
    img.onerror = null; //防止闪图
	},
}
```

##### `:src`添加随机数

当间隔`1s`时间来刷新图片，由于图片的请求路径是一样的，由于图片懒加机制，则不会重新请求，导致请求到的图是同一张。

```
/*
	src后面拼接随机的字符串，不会影响到图片请求
**/
<img :src="item.picUrl + '?time=' + Math.random()">
```

#### 监听关闭

使用 `beforeDestroy` 生命周期

```
// 结合监听来使用可以使窗口关闭操作生效
mounted() {
	window.addEventListener('beforeunload', e => this.cancelSave(e))
},

method:{
	async cancelSave(){
    ...关闭内容
    // const data ={
    //	 exerciseId: this.exerciseId
    // }
    // let res = await this.$api(this.$cfg.API.teacher.exerciseCanel, data)
  }
}，

beforeDestroy(){
	this.cancelSave()
	window.removeEventListener('beforeunload', e => this.cancelSave(e))
}
```

#### 实现置顶功能

##### `scrollIntoView()`

1）简介

 `scrollIntoView()`方法将调用它的元素滚动到浏览器窗口的可见区域

根据其他元素的布局，元素可能无法滚动到顶部或底部。（例如：该元素已经是原素的最底部）

页面可滚动时才有用

2）使用

```
// 正常使用
var element = document.getElementById("box");

element.scrollIntoView();

// vue 中使用
this.$nextTick(() => {
  // 获取 dom 元素
  this.$refs.item.$el.scrollIntoView({
  	behavior: 'smooth' 
  })
})
```

3）当页面上有定位元素时，不想滚动到最顶部，可使用以下方式

##### `scroll`

```
let element = document.getElementById('xx');
let height = document.getElementById('xx').offsetTop; //计算需要向上移动的距离
element.scroll({
  top: height, //向上移动的距离，如果有fixede布局， 直接减去对应距离即可
  behavior: 'smooth', // 平滑移动
});
```

#### `tab` 数据持久化

1）需求

当有多个 ` tab`  切换时, 我们如果切换到某个子项时，此时页面中的操作可能会离开本页面，返回后会刷新页面。必然体验不好。所以，我们需要保存当前的选项

2）处理方式

将现有的`tab` 的名称或 index 存到缓存，通过组件内的路由守卫来判断进来的页面，是否需要此缓存的字段

3）实现

```
// 监听路由进来的页面
beforeRouteEnter(to, from, next) {
	next(vm =>{
		// 判断此页面是否需要操作缓存
		if(from.path == '/course' ){
			let homeWorkCookie = {
        activeName: 'first'
      }
			vm.$Cookies.set('homeWorkCookie', JSON.stringify(homeWorkCookie))
		}
	})
},

// 在页面中获取
mounted(){
	this.$nextTick(()=>{
    let tab = JSON.parse(this.$Cookies.get('homeWorkCookie'))
    if(tab.activeName){
    	this.activeName = tab.activeName
    }
  })
}

// tab 切换时保存当前选项到缓存
handleClick(val) {
  let homeWorkCookie = {
  	activeName: val.name
  }
	this.$Cookies.set('homeWorkCookie', JSON.stringify(homeWorkCookie))
}
```

#### 监听物理返回键

```
/*
*  mounted 为vue 的 mounted
*  destroyed 为 vue 的 destroyed
*  methods 为 vue 的 methods
* */
function mounted() {
  // 如果支持 popstate 一般移动端都支持了
  if (window.history && window.history.pushState) {
    // 往历史记录里面添加一条新的当前页面的url //这个不用更改
    history.pushState(null, null, document.URL);
    // 给 popstate 绑定一个方法 监听页面刷新
    window.addEventListener(
    	'popstate', 
    	this.backChange, 
    	false
    );//false阻止默认事件
  }
}

//页面销毁时，取消监听。否则其他vue路由页面也会被监听
function destroyed(){
	window.removeEventListener(
		'popstate', 
		this.backChange, 
		false
	);//false阻止默认事件
}

function methods(){
  backChange() {
  	const that = this;
  	console.log("监听到了");
  }
}
```



### 其他

#### 本地服务

##### 图标错误

在本地起服务器时，会有以下错误

![image-20220407113942263](vue2.x.assets/image-20220407113942263.png)

由于`Live Server`会在5500端口启动一台小服务器，把整个工程里的所有文件或者文件夹当作根资源来使用，所以，在这个目录下放置一个`.ico`文件即可

