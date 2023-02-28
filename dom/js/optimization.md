### 代码优化

#### 替代`switch...case`

```
//switch 语句将返回给定普通宠物的品种
const getBreeds = pet =>{
  switch (pet){
    case 'dog':
   		return ['Husky', 'Poodle', 'Shiba'];
    case 'cat':
    	return ['Korat', 'Donskoy'];
    case 'bird':
    	return ['Parakeets', 'Canaries'];
    default:
    	return [];
  }
}

// 使用以下方法替代
const breeds = {
 	dog: ["Husky", "Poodle", "Shiba"],
 	cat: ["Korat", "Donskoy"],
 	bird: ["Parakeets", "Canaries"],
};
const getBreeds = (pet) => {
 	return breeds[pet] || [];
};

const dogBreeds = getBreeds("cat");
```

#### 多重`if...else`

很多时候我们需要写很多的判断条件，如下：

```
https://juejin.cn/post/7172147708914827300
黄河财险 496 行
```

```
// 如果name 为字符串时，可能有多种条件判断

function getSome(name){
	if(name.length > 3){
		// ...
	}else if(name === '张三' || name === '李四'){
		// ...
	}else if(name.lenth > 2){
		// ...
	}else{
		// ...
	}
}

// 如果是数字时候
function getValue(num){
	if(num > 0 && num <= 9){
		// ...
	}else if(num > 10 && num <= 19){
		// ...
	}else{
		// ...
	}
}
```

由于太多的判断导致代码耦合性太强，使用抽离分支的方法进行优化：

```
const des = [
	[
		(name) => name.length > 3, // 判断条件
		() => // ... //执行函数
	],
	[
		(name) => name.length > 3, // 判断条件
		() => // ... //执行函数
	],
]

function getUserDescribe(name) {
    // 获取符合条件的子数组
    const getDescribe = describeForNameMap.find((item) => item[0](name));
    // 子数组存在则运行子数组中的第二个元素（执行函数）
    getDescribe ? getDescribe[1]() : console.log("此人比较神秘！");
}
```

### 项目命名规则

```
// 项目名称 小写中划线（my-project）
// 目录名 小驼峰命名（myDir）
// 组件命名 大驼峰（AddComponent）
// js/ts/html/css、图片 小写字母命名，多个用下划线连接（uttils_js.js）
// class/id 统一用中划线连接
```

