### 嵌套

Sass 允许将一套 CSS 样式嵌套进另一套样式中，内层的样式将它外层的选择器作为父选择器

基本语法：

```
.master{
	color: red;
	.child{
		&:hover{
			
		}
		&-item{
		
		}
	}
}
```



## 1.变量

### 1.变量声明

```scss
//变量可以批量替换某个样式
//新版sass 以 $ 来声明变量
$highlight-color: #f90; //声明变量

例子：
$nav-color: #f90;
nav{
   $width: 100px; //在块内定义的，也只能在块中使用
   width: $width;
   color: $nav-color;
}
```

### 2.变量中可以嵌套变量

```scss
$highlight-color: #f90;
$highlight-border: 1px solid $highlight-color;
```

### 3.嵌套css规则

```scss
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
  aside { background-color: #EEE }
}

& //会直接替换父级

//继续看嵌套规则
https://www.sass.hk/guide/
```

## 2、使用scss

### 1）安装

```
npm i node-sass sass-loader style-loader -D
```

### 2）配置loder

```bash
{
        test: /\.scss$/,
        loader: 'sass-loader!style-loader!css-loader',
}
```

### 3）使用

```
//在style标签使用
<style lang="scss"></style>
```

# 



# sass

## 静默注释

1）使用 // 开头的注释不会出现在生成的css文件中

```css
body {
  color: #333; // 这种注释内容不会出现在生成的css文件中
  padding: 0; /* 这种注释内容会出现在生成的css文件中 */
}
```

