`vuex` 是一个状态管理模式，来集中管理组件的状态。此篇文章换种方式来总结`vuex`的使用方法。

#### 安装

在创建项目的时候可以选择安装`vuex`，若未安装，则可以使用如下命令：

```
// 若使用 vue2 版本，需要加上 vuex@3 版本号需要 3.x
// npm 
npm install vuex --save

// yarn
yarn add vuex
```

##### 基本结构

一般在`src`目录下会有一个`store`文件夹来存放`vuex`相关文件，基本结构如下：

```
store
	|-- index.js     # 我们组装模块并导出 store 的地方
	|-- state.js     # 根级别的 state 自己添加
	|-- getters.js   # 根级别的 getter 自己添加
	|-- actions.js   # 根级别的 action
	|-- mutations.js # 根级别的 mutation
	|-- modules
		|-- app.js  # app 模块
		|-- cart.js  # 购物车模块
```

##### 部分代码示例

`store/index.js`

```
// 该文件用于创建 Vuex 中最为核心的 store
import Vue from 'vue'
import Vuex from 'vuex'

// 这个是使用 Module 会使用到的文件
import app from './module/app'
import settings from './module/settings'

import getters from './getters'

Vue.use(Vuex)

const state = {
	count: 1
}
const mutations = {}
const actions = {}

// 创建并导出 store 
// store 核心概念都总结在了此处
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: { // 当应用十分复杂时，会经常使用到
    app,
    settings
  }
})
```

`getters`以及`modules`下的文件举例：

```
// getters
const getters = {
  doList: state => state.app.doList
}
export default getters

// store/module/app.js
const state = {
  sidebar: ''
}

const mutations = {
  TOGGLE_SIDEBAR: (state, payload) => {
    state.sidebar = payload
  }
}

const actions = {
  doList({ commit }， payload) {
    commit('TOGGLE_SIDEBAR', payload)
  },
}

export default {
  namespaced: true, // 使用命名空间
  state,
  mutations,
  actions
}
```

必须在`main.js`中引入

```
// 此引入的是 store 文件夹下的 index.js
import store from './store' 

new Vue({
	el: '#app',
	store
})
```

#### 使用

`vuex`本质上是通过获取或修改`state`值来管理组件的展示形式。

定义`state`，上面的代码示例已经有了。以下主要是修改与获取：

##### 获取

获取`state`值的方式：

1）直接`state`获取

```
// 在模板语法中
<div>{{$store.state.count}}</div>

// <script>
this.$store.state.count

// 计算属性中获取（推荐）
computed:{
	count(){
		return this.$store.state.count
	}
}
```

2）经过`getter`处理

`getter`把`state`经过一定规则处理完再给组件使用。例如，`state`中`count`加一后再返回等等...

`getter` 中的基本语法:

```
const getters = {
  doList (state) {
    return state.count + 1
  }
  
  // 如果只有一条语句也可以简写为
  // doList: state => state.count + 1
}
```

`getter`接受其他的`getter`作为第二个参数：

```
doList (state, getters) {
	return getters.doList.length
}
```

组件中使用`getter`

```
// 在模板语法中
<div>{{$store.getters.doList}}</div>

// <script>
this.$store.getters.doList

// 计算属性中获取（推荐）
computed:{
	count(){
		return this.$store.getters.doList
	}
}
```

跟计算属性差不多，允许给`getter`传递参数：

```
getTodoById(state){
	return (id) => {
		return state.todos.find(todo => todo.id === id)
	}
}

// 或者
getTodoById: (state) => (id) => {
	return state.todos.find(todo => todo.id === id)
}
// 在组件上使用时，传递参数
$store.getters.getTodoById(2)
```

##### 修改

`vuex`中只有`mutation`能修改`state`状态值。使用`action`是通过间接修改`mutation`来修改`state`。

1）`mutation`

注意事项：

```
// mutation 必须是同步函数
```

`mutations`基本语法：

```
// 在 mutatiions 中定义的方法
const mutations = {
	"MT_COUNT"; function(state, payload){
		 state.count = state.count + 1
	}
}
```

组件中触发`mutation`方法：

```
// 需要 commit 触发执行
this.$store.commit('MT_COUNT')

// 触发 mutation 传参，第一个参数动作类型， 第二个参数值 
// 参数可以传递对象
this.$store.commit('MT_COUNT', 10)

// 另一种提交方式，使用对象 type
toAdd () {
  this.$store.commit({
    // type 为 moutations 定义的方法名
    type: 'MT_COUNT', 
    // 传递的参数
    xxx: ‘fad’
  })
}
```

如果使用常量替代 `Mutation` 事件类型：

```
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'

// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

2）`action`

为什么要使用`action` ?

`action`中允许写入异步函数，如果未写入异步函数，是可以直接使用`mutation`

`action`基本语法：

```
const actions = {
	addCount: function(context, payload){
		// 调用 commit,触发 mutation 中的方法
		// context = {state, commit, getters}
		// 传参与 mutation 中一样
		context.commit('MT_COUNT', 2)
	}
}
```

组件中触发`action`：

```
// 需要 dispatch 触发执行
this.$store.dispatch('addCount')

// 触发 action 传参
// 也可以传递对象
this.$store.dispatch('addCount', 10)

// 另一种提交方式，使用对象 type
this.$store.dispatch({
  // type 为 actions 定义的方法名
  type: 'addCount', 
  // 传递的参数
  xxx: ‘fad’
})
```

`store.dispatch` 可以处理被触发的 `action` 的处理函数返回的 `Promise`，并且 `store.dispatch` 仍旧返回 `Promise`：

```
const actions = {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // 这里可以写异步函数
        commit('someMutation')
        resolve()
      }, 1000)
    })
  },
  
  // actionB 中也可以执行 actionA
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}

// 组件获取值
store.dispatch('actionA').then(() => {
  // ...
})

// 使用 ES6 的 async/await
const actions = {
	async actionA ({ commit }) {
  	commit('xxx', await getData())
  },
  async actionB ({ dispatch, commit }) {
  	// 等待 actionA 完成
  	await dispatch('actionA') 
 	 	commit('xxx', await getOtherData())
  }
}
```

##### `module`

如果项目比较大的情况下，如果集中在一起管理，维护会相对麻烦，所以有了分割模块功能。

模块上述代码示例也比较完整，这里就不再重复定义结构。

对于模块内部的`action`与 `getter`：

```
// context 多了一个 rootState 代表根节点的 state
```

组件取模块内部的值：

```
// 取 state 值
// state.cart cart 为模块名称
this.$store.state.cart.xxx

// 取 getter 中的值
// 若未使用命名空间则与全局 getters 同一级，如果全局有定义相同方法名，会冲突
// cartProducts 为 getters 定义的方法名
this.$store.getters.cartProducts
```

关于命名空间：

默认情况下，模块内部的 `action`、`mutation` 和 `getter` 是注册在全局命名空间。所以，若未将`namespaced`设置为`true`，`action mutation getter` 都在子类定义会发生冲突。

带命名空间的模块：

```
modules: {
  account: {
  	namespaced: true,
  	getters: {
  		filterCount(){//...}
  	}
  }
}
// 实际上会将名称变为 “account/getters”

// 使用命名空间后
// xxx 为 module 配置的值
// state
$store.state.xxx.
//getters
this.$store.getters['xxxx/get']
// mutations
this.$store.commit('xxx/muta', newVal)
// actions
this.$store.dispatch(‘xx/action’, 2)
```

当前模块调用其他模块的参数

```
// 当前模块的 state 和 mutation 中是无法获取其它模块的state
// actions 中可通过第一个参数中的 rootState 属性获取到其它模块 state
const actions = {
	logout(content){
		content.commit
		content.dispatch
		content.rootState
		content.rootGetters
		content.state
	}
}

使用其他模块的 mutations
// 第三个参数传 { root: true }
content.commit('permission/reset', false {root: true}) 

// 使用 actions 
ontext.dispatch(‘模块名/actions方法名’, 传参, { root: true})
```

##### 辅助函数

`mapState`

用来取`state`值

```
import { mapState } from 'vuex'

// mapState 在计算属性中可以是对象写法或者是数组写法
// 若计算属性中定义的名称与 state 中定义的名称不一致，则需要使用对象写法

// 对象写法
computed: {
	// mapState 的参数对象的键值对为
	// {'计算属性方法名称': 'store中 state 的 key值'}
	...mapState({count: 'count', xx: 'num'})
	
	// 说明
	...mapState({
		// 箭头函数可使代码更简练
		count: state => state.count,
		// 别名 'count' 等同于 'state = > state.count'
		countAlias: 'count',
		
		// 使用组件中的 this 需要写成函数
		countPlusLocalState (state) {
      return state.count + this.localCount
    }
	})
}

// 若计算属性中定义的名称与 state 中定义的名称一致，则可使用数组写法

// 数组写法
computed: {
	...mapState(['count', 'xxx'])
}
```

在启用命名空间后取`state`值

```
computed: {
  ...mapState('app', {
    count: 'count'
  })
}
```

`mapGetters`

```
// 语法与 mapState 差不多
import { mapGetters } from 'vuex'

computed:{
	...mapGetters([
		'doList',
		'doLength'
	])
}

// 如果想使用别名 用对象语法

computed:{
	...mapGetters({
		doneCount: 'doList',
		doneLength: 'doLength'
	})
}

// 启用命名空间
computed:{
	...mapGetters(’app‘，{
		xxx
	})
}
```

`mapMutations`

`actions`语法与其差距不大，所以不重复了。

`mapMutations`使用方法来触发事件执行：

```
<button @click="incre()"></button>

import { mapMutations } from 'vuex'

methods: {
	incre(){
		// 使用 handleMutation 来触发 mutations 执行
		// 这个方法名称若与 mutations 中定义的方法名称一致，可以使用数组语法
		// 如果需要传参，直接handleMutation(1),1即为参数
		this.handleMutation(1)
	},
	// 数组语法
	// 将 `this.handleMutation()` 映射为 `this.$store.commit('handleMutation')`
	...mapMutations([’handleMutation‘])
	// 对象语法
	// 'jia'是 mutations 中定义的方法
	// 将 `this.handleMutation()` 映射为 `this.$store.commit('jia')`
})
	...mapMutations({handleMutation: 'jia'})
}
```

在启用命名空间后触发`mutations`

```
// 模块名称,也可以使用数组语法
...mapMutations('app',{handleMutation: 'jia'})

//若多个模块，则使用多个mapMutations
...mapMutations('app',{handleMutation: 'jia'})
...mapMutations('cart',{handleMutation: 'jia'})
```

