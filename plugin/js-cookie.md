# js-cookie

## 安装

```
npm install js-cookie --save
```

## 引用

```
import Cookies from 'js-cookie'
```

## 使用

```js
//保存到cookie

// Create a cookie, valid across the entire site:
Cookies.set('name', 'value');

// Create a cookie that expires 7 days from now, valid across the entire site:
Cookies.set('name', 'value', { expires: 7 });

// Create an expiring cookie, valid to the path of the current page:
Cookies.set('name', 'value', { expires: 7, path: '' });

//从cookie中取出
// Read cookie:
Cookies.get('name'); // => 'value'
Cookies.get('nothing'); // => undefined

// Read all visible cookies:
Cookies.get(); // => { name: 'value' }

//删除cookie
// Delete cookie:
Cookies.remove('name');

// Delete a cookie valid to the path of the current page:
Cookies.set('name', 'value', { path: '' });
Cookies.remove('name'); // fail!
Cookies.remove('name', { path: '' }); // removed!
```

## 特殊使用

```js
//跟一般使用不同的是，从Cookie中取出的时候，要从字符串转换成json格式：
const user = {
  name: 'lia',
  age: 18
}
Cookies.set('user', user)
const liaUser = JSON.parse(Cookies.get('user'))
```

## 设置cookies过期时间

1）参考链接

https://github.com/js-cookie/js-cookie/wiki/Frequently-Asked-Questions#expire-cookies-in-less-than-a-day

2）从现在开始15分钟后过期

```js
var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
Cookies.set('foo', 'bar', {
    expires: inFifteenMinutes
});
```

## 删除所有cookie

```js
Object.keys(Cookies.get()).forEach(
    function(cookieName) {
  		var neededAttributes = {
    		// Here you pass the same attributes that were used when the cookie was created
    		// and are required when removing the cookie
  };
  Cookies.remove(cookieName, neededAttributes);
});
```

