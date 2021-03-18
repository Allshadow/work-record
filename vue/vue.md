### 监听页面刷新后,回到主页

```
created(){
	// 页面刷新时重定向到根路径
	if(this.$router.path !== '/'){
		this.$router.replace('/')
	}
}
```

### 图片 :src 属性使用三目运算符问题

在图片的 :src 属性上使用三目运算符 读不到后面的图片url ,使用替代方法

```
<img v-if="xxx" :src="" />
<img v-else :src="" />
```

### 实现父子组件的双向绑定

#### 场景

我们可能需要对一个 prop 进行双向绑定，所以用 update:myPropName 模式触发事件。

#### 基本结构

```
//子组件
this.$emit('update:title'，newTitle) // update;title  冒号之间不能存在空格

//父组件
<text-doucument
	:title = "doc.title"
	@update:title="doc.title = $event"
></text-doucument>
```

#### 使用 .sync 修饰符

.sync 是上面父组件的语法糖，可以将父组件改写成如下规则

```
<text-doucument :title.sync="doc.title"></doucument>
```

#### 用一个对象同时设置多个prop

```
//doc 为一个对象
<text-doucument :title.sync="doc"></doucument>
```

#### 注意事项

.sync 修饰符的 v-bind 不能与表达式一起使用

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

## 7、img标签使用技巧

### 1）onerror方法

```vue
//场景：
	//当图片加载不了，使用默认代替，因此用到onerror方法
//使用：
/*
	传统使用 onerror, vue中使用 @error
	@error可以传递多个参数 onerror($event, index)	
*/
<img :src="item.picUrl"  alt="" @error="onerror($event, index)">

methods:{
	onerror(e, index){
        let img = e.srcElement;
		img.src = this.defaultImg;
        img.onerror = null; //防止闪图
	},
}
```

### 2）src属性添加随机数

```vue
//场景：
	//间隔1s时间来刷新图片，由于图片的请求路径是一样的，由于图片懒加机制，则不会重新请求，导致请求到的图是同一张。
//使用：
/*
	src后面拼接随机的字符串，不会影响到图片请求
**/
<img :src="item.picUrl + '?time=' + Math.random()">
```

## 8、key

```vue
//场景：
	// 当父组件更新数据时，子组件的数据没有被更新
//使用：
<the-dialog
    title="监管配置设置"
    :show-data.sync="isEditSetting"
    :isReset="true"
    @reset="resetForm"
    @submit="submit"
>
    <the-setting-form
        :data-list="dataObj"  //dataObj更新时，组件的数据未更新
        ref="editForm"
        :key="Math.random()"  //加上一个随机数的key
     />
</the-dialog>
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

## 4、computed

### 1）计算属性的setter

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

