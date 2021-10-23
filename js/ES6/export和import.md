#### `export`

##### 简介

`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。

##### 基本语法

1）输出变量

```
export var firstName = 'Michael';

# or 
var firstName = 'Michael';
export {
	firstName
}
```

2）输出函数或类

```
export function use(){}

# or
function use(){}

export {
	use
}
```

3）变量重命名

```
function use(){}

export {
	use as newName
}
```

4）错误写法

```
// 报错
export 1;

// 报错
var m = 1;
export m;
```

#### `import`

##### 简介

使用`import`在其他`js`文件加载`export`命令定义的模块

`import`命令接受一对大括号，里面指定要从其他模块导入的变量名。

大括号里面的变量名，必须与被导入模块（`profile.js`）对外接口的名称相同。

##### 基础语法

```
import { firstName } from './profile.js';

function setName(element) {
  element.textContent = firstName ;
}
```

##### 模块整体加载

```
// util.js
export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}

// main.js
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};
```

#### `export default`

##### 简介

使用 `export default` 时 `import` 是不用花括号导出

```
// export-default.js
export default function () {
  console.log('foo');
}

import customName from './export-default';
```

