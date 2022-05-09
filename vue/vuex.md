### 基本

#### 安装

##### 选择安装

`vue-cli` 如需要使用 `vuex`，在创建时选择选项即可。

##### 手动安装

1） `yarn`

```
yarn add vuex
```

2）在一个模块化的打包系统中，您必须显式地通过 `Vue.use()` 来安装 `Vuex`：

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

### 应用

#### `module`

##### 调用其他模块的参数

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

#### 命名空间使用

使用 `mutations`

```
// ‘teacher/SET_DATA_LIST’ teacher 是命名空间名称， SET_DATA_LIST 是 mutations 中方法
this.$store.commit('teacher/SET_DATA_LIST', newVal)
```

#### 基础语法

##### 目录结构及代码

基本结构

```
store
	|-- index.js     # 我们组装模块并导出 store 的地方
	|-- state.js     # 根级别的 state 自己添加
	|-- getters.js   # 根级别的 getter 自己添加
	|-- actions.js   # 根级别的 action
	|-- mutations.js # 根级别的 mutation
	|-- modules
		|-- user.js  # 用户模块
		|-- cart.js  # 购物车模块
```

/store/index.js

```
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state' // 引入 state 

Vue.use(Vuex)

export default new Vuex.Store({
  state，
  getters，
  
})
```

/store/state.js

```
const state = {
  count: 2
}

export default state
```

##### 在 main.js 中使用

```
import store from './store' // 此引入的是 store 文件夹下的 index.js

new Vue({
	el: '#app',
	store
})
```

#### State

##### 获取状态值

使用计算属性获取 state 中的某个状态

```
computed:{
	count(){
		return this.$store.state.count
	}
}
```

##### `mapState` 辅助函数

使用 mapState 辅助函数简化取值

```
import { mapState } from 'vuex'

computed: mapState({
	// 箭头函数可使代码更简练
	count: state => state.count,
	
	// 传字符串参数 'count' 等同于 'state = > state.count'
	countAlias: 'count', # 类似使用别名
	
	// 映射 this.count 为 store.state.count
	// 计算属性名称 与 子节点名称相同时
	count: 'count',
	
	// mapState 把 computed 直接赋值为对象，则为了使用局部函数
	countPlusLocalState (state) {
      return state.count + this.localCount
    }
})
```

使用字符串数组

```
computed: mapState([
	// 映射 this.count 为 store.state.count
	'count'
])
```

##### `...mapState` （推荐）

使用 `...mapState ` 对象展开符，可以将 mapState 与局部计算属性一同使用

mapState 辅助函数中的方法都可以应用

```
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```

#### Getter

相当于全局的计算属性，使用公共的方法处理 state, 供全局使用

##### 基本语法

/store/state.js

```
const state = {
  dataList: [
    {
      label: '南瓜',
      value: 0
    },
    {
      label: '西瓜',
      value: 1
    },
    {
      label: '冬瓜',
      value: 2
    },
    {
      label: '北瓜呢？',
      value: 3
    }
  ]
}

export default state
```

/store/getters.js

```
const getters = {
  doList (state) {
    return state.dataList.filter(ele => ele.value !== 3)
  }
}

export default getters
```

##### 参数

接受其他 `getter` ,作为第二个参数，默认在 `getters` 对象中写入

```
doLength (state, getters) {
	return getters.doList.length
}
```

##### 获取状态值

```
computed:{
	doneTodo () { // 目前返回的是数组
        return this.$store.getters.doList
    },
}
```

##### 使用方法访问

使用方法反问可以实现 `getter` 传参

```
getTodoById: (state) => (id) => {
	return state.todos.find(todo => todo.id === id)
}

store.getters.getTodoById(2)
```

##### `mapGetters` 辅助函数

```
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
```

#### Mutation

更改 vuex 的 store 中的状态的唯一方法是提交 mutation

##### 基本语法

默认接受 `state` 为第一个参数

/store/mutations.js

```
const mutations = {
  increment (state) {
    // 变更状态
    state.count += 1
  }
}

export default mutations
```

组件内使用

```
methods: {
	toAdd () {
      this.$store.commit('increment')
    }
}
```

##### 传递参数

```
store

increment (state, payload) {
	// 变更状态
	state.count += 1
}

methods: {
	toAdd () {
      this.$store.commit('increment', 10) // 也可以传递对象 {}
    }
}
```

##### 使用对象风格提交

```
toAdd () {
    this.$store.commit({
    	type: 'increment', // type 为 moutations 定义的方法名
    	xxx: fad // 传递的参数
    })
}
```

##### 使用常量替代 `Mutation` 事件类型

```
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
```

```
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

##### `mapMutations` 辅助函数

```
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' 
      // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

对于上面的解释

```
// 当使用 mapMutations 辅助函数时，将方法映射为 this.$store.commit('')
// 也可提交参数，也可以使用对象形式

// mutations
const mutations = {
  increment (state) {
    // 变更状态
    state.count += 1
  },

  addBy (state, payload) {
    state.count = payload
  }
}

// 组件引用
import { mapMutations } from 'vuex'

toAdd () {
	this.increment()
},

...mapMutations(['addBy', '']),

toAddTwo () {
	this.addBy(4)
}
```

#### Action

Action 提交的是 mutation, 而不是直接变更状态

Action 可以包含任意异步操作

##### 基本语法

/store/actions.js

```
const actions = {
  // 基础的 context
  increment (context) {
    context.commit('increment')
  },
  
  // 使用解构的方法简化代码
  // commit 提交 mutation  state 获取 state  getters 获取 getters
  increment ({ commit }){
    commit('increment')
  }
}

export default actions
```

##### 组件使用

```
this.$store.dispatch('increment')
```

##### 载荷方式和对象方式分发

```
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

##### `mapActions` 辅助函数

```
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' 
      // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

##### 触发及返回

这个官网写的很直观

`store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，并且 `store.dispatch` 仍旧返回 Promise

```
const actions = {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // 这里可以写异步函数
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}

组件获取值

store.dispatch('actionA').then(() => {
  // ...
})
```

在另外一个 action 中也可以：

```
const actions = {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}

```

使用 async / await

```
const actions = {
	async actionA ({ commit }) {
        commit('gotData', await getData())
    },
    async actionB ({ dispatch, commit }) {
        await dispatch('actionA') // 等待 actionA 完成
        commit('gotOtherData', await getOtherData())
    }
}
```

#### Module

##### 简述

vuex 允许将 store 分割成模块，每个模块拥有自己的 state、mutation、action、getter 甚至是嵌套子模块

##### 基础 module 

store/index.js

```
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
		user,
		cart
	}
})
```

store/modules/cart.js

```
const state = () =>({
	friutList: [
    {
      label: '苹果',
      value: 1
    },
    {
      label: '香蕉',
      value: 2
    },
    {
      label: '葡萄',
      value: 3
    }
  ]
})

const getters = {
	cartProducts: (state, getters, rootState) => {
        return rootState.count
    }
}

const actions = {

}

const mutations = {

}

export default {
	// namespaced: true   是否使用命名空间
	state，
	getters,
	actions,
	mutations
}
```

##### 模块局部状态(官网示例)

对于模块内部的 mutation 和 getter, 接收的第一个参数是模块的局部状态对象

```
const moduleA = {
  state: () => ({
    count: 0
  }),
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```

对于模块内部的 action，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`

```
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：

```
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```

##### 模块命名空间

```
使用上述 namespaced: true,

state 不会受影响

它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名

```

##### 取值

```
// state
computed: {
    fruitList () {
      return this.$store.state.cart.friutList
    },
}

// gettres
doGetter () {
	return this.$store.getters.cartProducts // 与全局getters 同一级
},

```

##### 辅助函数

```
// 实用 mapstate 辅助函数
import { mapState } from 'vuex';

computed: {// info 为 info.js 文件下的 vuex state
	...mapState('info',{
		common: 'common',
	})
}
```
