# vue-router

## 路由类型

1）声明式

```
<router-link to="/foo">Go to Foo</router-link>
```

2）编程式

```
router.push(...)
```

## 禁止回退上一步

1）声明式路由

```
<router-link to="/foo" replace>Go to Foo</router-link>
```

2）编程式路由

```
this.$router.push({
	path: "/demo",
	replace: true 
})

# or

this.$router.replace({
	path: "/demo"
})
```

