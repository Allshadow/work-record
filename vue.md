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

# 五、其他

## 1、跳转外部链接

```js
let url = http://www.baidu.com
window.location.href = url;
```

