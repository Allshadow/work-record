#### v-model

##### 基础

定义

v-model 指令在表单 \<input>、\<textarea>、\<select> 元素上创建双向数据绑定。

实现

```
<input v-model="sth" />
//  等同于
<input :value="sth" oninput="sth = $event.target.value" />
```

`v-model` 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

| 元素              | 属性(property) | 事件   |
| ----------------- | -------------- | ------ |
| text 和 textarea  | value          | input  |
| checkbox 和 radio | checked        | change |
| select            | value          | change |

##### 自定义组件

默认

一个组件上的`v-model`默认会利用名为 `value` 的 prop 和名为 `input` 的事件

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

改变默认属性

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

#### 计算属性

##### setter

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

#### 常见问题

##### 监听关闭

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

##### 实现置顶功能

1）简介

`scrollIntoView()` 方法将调用它的元素滚动到浏览器窗口的可见区域

根据其他元素的布局，元素可能无法滚动到顶部或底部。（例如：该元素已经是原素的最底部）

页面可滚动时才有用

2）使用

```
// 正常使用
var element = document.getElementById("box");

element.scrollIntoView();

// vue 中使用
this.$nextTick(() => {
  this.$refs.item.$el.scrollIntoView({
  	behavior: 'smooth' 
  })
})
```

3）参考链接

```
// 参数详见百度
https://blog.csdn.net/learn8more/article/details/108047794
```

