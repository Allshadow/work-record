# 一、URL的合法字符

- URL元字符：分号（;）, 逗号（,） , 斜杠（/）,问号（?）,冒号（:）,at（@），&，等号（=）, 加号（+）,美元符号（$）,井号（#）

- 语义字符：英文字母（a-z，A-z）,数字（0-9），连词号（-）,下划线（_）,点（,）,感叹号（!）,波浪线（~）,星号（*），单引号（‘）,圆括号（()）

```text
备注：
	除以上字符外，其他字符出现在URL上都必须进行转义
	规则是根据操作系统的默认编码，将每个字节转为百分号（%）加上两个大写的十六进制字母
```

# 二、URL的编码/解码方法

- encodeURI() / decodeURI() 

encodeURI() 方法用于转码整个url。他会将元字符和语义字符之外的字符进行转义	

```js
//传入整个url，进行转义，不会转义?,=, + ...等等encodeURI('http://www.example.com/q=春节')
// "http://www.example.com/q=%E6%98%A5%E8%8A%82"
```

decodeURI() 用于解码整个url

- encodeURIComponent() / decodeURIComponent()

encodeURIComponent() 方法用于转码url的组成部分，会转码除语义字符之外的的所有字符，所以不能用于转码整个url，只能接受一个url字段

```
//如果用于整个url编码，会使网站不能访问
//用于编码，url后带的参数
encodeURIComponent('春节')
// "%E6%98%A5%E8%8A%82"
encodeURIComponent('http://www.example.com/q=春节')
// "http%3A%2F%2Fwww.example.com%2Fq%3D%E6%98%A5%E8%8A%82"
```

decodeURIComponent() 用于解码部分的url