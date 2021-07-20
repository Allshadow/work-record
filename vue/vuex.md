#### 安装

##### 选择安装

vue-cli 如需要使用 vuex，在创建时选择选项即可。

##### 手动安装

1） yarn

```
yarn add vuex
```

2）在一个模块化的打包系统中，您必须显式地通过 `Vue.use()` 来安装 Vuex：

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
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
  state
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
import store from './store' # 此引入的是 store 文件夹下的 index.js

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
	# 箭头函数可使代码更简练
	count: state => state.count,
	
	# 传字符串参数 'count' 等同于 'state = > state.count'
	countAlias: 'count', # 类似使用别名
	
	# 映射 this.count 为 store.state.count
	# 计算属性名称 与 子节点名称相同时
	count: 'count',
	
	# mapState 把 computed 直接赋值为对象，则为了使用局部函数
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
  # 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    # ...
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
	doneTodo () { # 目前返回的是数组
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

# 如果想使用别名 用对象语法

computed:{
	...mapGetters({
		doneCount: 'doList',
		doneLength: 'doLength'
	})
}
```

#### Mutation

更改 vuex 的 store 中的状态的唯一方法是提交 mutation



#### Action

Action 提交的是 mutation, 而不是直接变更状态

Action 可以包含任意异步操作

##### 注册

```
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
  	// 基础的 context
    increment (context) {
      context.commit('increment')
    }
    
    // 使用解构的方法简化代码
    increment ({ commit }){
		commit('increment')
	}
  }
})
```

#### Module

##### 基础 module 

目录结构

```
store
	|-- index.js  # 我们组装模块并导出 store 的地方
	|-- actions.js # 根级别的 action
	|-- mutations.js # 根级别的 mutation
	|-- modules
		|-- user.js # 用户模块
		|-- cart.js # 购物车模块
```

在 main.js 中引用

```
import store from './store' # 此引入的是 store 文件夹下的 index.js

new Vue({
	el: '#app',
	store
})
```

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
	item: []
})

const getters = {
	cartProducts: (state, getters, rootState) =>{
		
	}
}

const actions = {

}

const mutations = {

}

export default {
	namespaced: true # 是否使用命名空间
	state，
	getters,
	actions,
	mutations
}
```

取值

```
store.state.user // user 的状态
store.state.cart // cart 的状态
```

未使用命名空间时读取 vuex 中的数据

```
// 实用 mapstate 辅助函数
import { mapState } from 'vuex';

computed: {// info 为 info.js 文件下的 vuex state
	...mapState('info',{
		common: 'common',
	})
},

```

