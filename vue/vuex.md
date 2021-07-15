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
import { mapState } from 'Vuex'

computed: mapState({
	// 箭头函数可使代码更简练
	count: state => state.count,
	
	// 传字符串参数 'count' 等同于 'state = > state.count'
	countAlias: 'count', // 类似使用别名
	
	// 映射 this.count 为 store.state.count
	// 计算属性名称 与 子节点名称相同时
	'count',
	
	// mapState 把 computed 直接赋值为对象，则为了使用局部函数
	countPlusLocalState (state) {
      return state.count + this.localCount
    }
})
```

##### `...mapState` （推荐）

使用 `...mapState ` 对象展开符，可以将 mapState 与

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

Getter 接受 state 作为其第一个参数：

```
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

#### Actions

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

