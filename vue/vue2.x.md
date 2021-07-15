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

