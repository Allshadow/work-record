# 一、引入外部样式方式

## 1.引入全局样式

```script
<script>
	import '@/assets/css/icon.css';
	import '@/assets/css/common.scss';
</script>
```

## 2.引入局部样式

```script
<style lang="scss" scoped>
	@import "../assets/css/icon.css";
	@import "../assets/css/common.scss"
</style>
```

# 二、配置属性

## 1.自动打开浏览器

```
//打开config文件下的index.js文件
autoOpenBrowser=true
```

# 三、语法

## 1、：class

### 1）对象语法

```
//active 为类名， 多个单词拼接得时候需要 ‘’
//isActive 为布尔值，判断是否展示
:class="{ active: isActive }"
:class="{ 'active-center': isActive }"
```

### 2）data绑定 :class

```html
<div v-bind:class="classObject"></div>
```

```js
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

### 3）计算属性绑定:class

```html
<div v-bind:class="classObject"></div>
```

```
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

### 4）数组语法

```html
<div :class="[active, 'text-danger']"></div>
<div v-bind:class="[activeClass, errorClass]"></div>
```

```js
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

### 5）三元运算符

```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```

### 6)数组中使用对象语法

```html
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

## 2、jsx

### 1）什么是jsx

```
//jsx是javascript与XML结合的格式
当遇到 <  jsx就当HTMEL解析， 遇到 ( 就当javascript解析
```

### 2）render函数使用jsx

```
https://www.cnblogs.com/amylis_chen/p/11320059.html
```

## 3、:style

### 1）使用对象语法

```vue
<div :style='{fontSize: '20px'}'></div>
```

### 2）使用数组语法符

```vue
<div 
    :style="[{color: '#67C23A'},{fontSize:'20px'}]"</div>
```

### 3）使用三目运算符

```vue
//若只有单个样式
<div>
    :style="status==1? 'color: #67C23A', 'color: #F56C6C'"
</div>
//若存在多个样式
<div>
    :style="status==1? {color: '#67C23A'} : {color: '#F56C6C'}, {fontSize: '20px'}"
</div>
```

## 4、插槽

### 1）基本概念

slot分发的内容，作用域是在父组件上

### 2）单个slot

```vue
//子组件上,标签名为<text-slot>的组件
<template>
   <div>
     <slot></slot>
   </div>
</template>

//父组件上
<template>
  <div>
    <text-slot>
      <div>我是div或其他标签</div>
    </text-slot>
  </div>
</template>

//单个slot设置默认
<template>
  <div>
    <slot>
      <p>如果没插入任何内容，我将自动出现 </p>
    </slot>
  </div>
</template>
```

### 3）具名slot

```
//子组件
<slot name="header"></slot>
//父组件，自2.6.0起，已废弃以下写法
<h2 slot="header"></h2>
//更新为,v-slot需要卸载template里面
<template v-slot:header></template>
>>OR
<h2 #header></h2>
```

### 4）作用域插槽

```
//有时候让插槽内容能够访问子组件中才有得数据是很有用得

```



# 四、Api

## 1、$set

### 1）使用背景

为vue data中的某个对象添加动态的属性，但是视图层没发生更新

### 2）存在原因

由于受javascript的限制，vue不能监听对象属性的添加或删除，所以对象属性必须存在于 data中

### 3）使用方法

```js
this.$set(obj, key, value) //key 需要为字符串
#OR
vue.set(obj, key, value)
```

### 4）存在案例

elementUI select 使用了动态默认值，选择项目时，切换效果失效

## 2、watch

### 1）监听父组件props传入值

```js
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

### 2）监听对象变化

```js
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

### 3）监听对象得某个属性变化

```vue
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

## 3、$ref

### 1) 使用

```
# 给标签绑定ref，使用this.$refs.xxx 获取的当前的dom对象
# 给组件绑定res,使用this.$res.xxx 获取的是当前组件对象
```



# 五、其他

## 1、跳转外部链接

```js
let url = http://www.baidu.com
window.location.href = url;
```

## 2、异步获取数据时，子组件未接收到父组件得值

```
//使用 v-if 判断，等待有值时判断
//使用监听器，监听到父组件的值
```

# 六、组件通信

## 1、props / $emit

## 2、$attrs/ $listener

### 1）$attrs

#### 描述

父作用域中不作为prop属性传入的参数（除class 和 style）,可以通过 v-bind="$attrs",传入内部组件

#### 案例

```
v-bind="$attrs"
//父组件

```

### 2）$listeners

#### 描述

包含了父作用域中的（不含.native 修饰器）v-on事件监听，可以通过 v-on='$listeners',传入内部组件

#### 案例

```
v-on = '$listeners'
//子组件使用this.$emit('changeValue', false)，触发父级的方法执行
```

