### 自定义指令模板

vue-cli 中模板用法

```js
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
