## @font-face

### 简介

@font-face 是 css3 中允许使用自定义字体的一个模块

### 字体格式

- TureTpe( .ttf ) 格式

  .ttf 格式字体是 windows 和 Mac 最常见的字体 , 支持此字体的浏览器 [IE9 +, Firefox3.5+, Chrome4+, Safari3+, Opera10+, IOS Mobile Safari4.2+]

- OpenType(.otf) 格式

  .otf 字体被认为是一种原始的字体格式，支持此字体格式的浏览器有 [Firefox3.5+, Chrome4.0+, Safari3.1+, Opera10.0+, iOS Mobile Safari4.2+]

- Web Open Font Format(.woff) 格式

  支持此字体格式的浏览器 [IE9+, Firefox3.5+, Chrome6+, Safari3.6+, Opera11.1+]

- Embedded Open Type(.eot)格式

  .eot 是 ie 专用字体，支持这种字体的有 [IE4+]

- SVG(.svg) 格式

  [Chrome4+, Safari3.1+, Opera10.0+, iOS Mobile Safari3.2+]

### 兼容性写法

@font-face 中我们至少需要 .woff .eot 两种格式字体，甚至还需要 .svg 等字体达到更多浏览器版本的支持

```
@font-face {
	font-family: 'YourWebFontName';
	src: url('YourWebFontName.eot'); /* IE9 Compat Modes */
	src: url('YourWebFontName.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('YourWebFontName.woff') format('woff'), /* Modern Browsers */
         url('YourWebFontName.ttf')  format('truetype'), /* Safari, Android, iOS */
         url('YourWebFontName.svg#YourWebFontName') format('svg'); /* Legacy iOS */
    font-weight: normal;
  	font-style: normal;
}
```

### 页面中使用

```
font-family:  'YourWebFontName'
```