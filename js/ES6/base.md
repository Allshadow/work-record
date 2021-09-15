#### 设置默认参数

```
//以前javescript原先定义方式
var link = function(height, color, url){
  var height = height || 50;
  var color = color || 'red';
  var url = url || 'http://baidu.com'
}

//ES6中
var link = function(height = 50, color = 'red', url = 'http://baidu.com'){}
```

