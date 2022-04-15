# 三、语法

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

## 5、props 数据验证

```
props: {
		//必须是数字类型
		propA: Number,
		
		// 必须是字符串或数字类型
		propB: [String, Number],
		
		//布尔值，如果没有定义，默认为true
		propC: {
			type: Boolean,
			default: true
		},
		
		//数字，必传
		propD: {
			type: Number,
			required: true
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

## 3、$ref

### 1) 使用

```
# 给标签绑定ref，使用this.$refs.xxx 获取的当前的dom对象
# 给组件绑定res,使用this.$res.xxx 获取的是当前组件对象
```

### （2）动态添加ref

```vue
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
        	this.$refs[`list${index}`][0] //由于取出来的li是数组，所以会加[0] 
        }
    }
</script>	
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

## 3、监听物理按键返回事件

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
        window.addEventListener('popstate', this.backChange, false);//false阻止默认事件
    }
}

//页面销毁时，取消监听。否则其他vue路由页面也会被监听
function destroyed(){
    window.removeEventListener('popstate', this.backChange, false);//false阻止默认事件
}

function methods(){
    backChange() {
        const that = this;
        console.log("监听到了");
    }
}

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

子组件取值
this.$attrs.xxx
```

### 2）$listeners

#### 描述

包含了父作用域中的（不含.native 修饰器）v-on事件监听，可以通过 v-on='$listeners',传入内部组件

#### 案例

```
//父组件使用
v-on = '$listeners'

//子组件使用this.$emit('changeValue', false)，触发父级的方法执行
```

