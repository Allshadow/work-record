### `iptv`机顶盒

#### 基础知识

```
1. 一般机顶盒内置的浏览器都是ie8以下版本
2. 浏览器分辨率 1280 * 720 （暂时不用考虑分辨率问题）
3. 单位都是px,最好用绝对定位
4. 能用的css属性：position、left、top、right、bottom、width、height、font、color(不支持rgb)、background(及其相关属性)、border、float、padding、margin、line-height、text-align，overflow、visibility、filter: Alpha(opacity=80)
5. 机顶盒没有sessionStrorage,localStrorage 支持 cookie 或者IPanel
6. json字符串转json对象用eval,例如：var data =eval(“json”);
7. img 标签最好不要有定位，最好用div包裹，在div上移动位置，达到想要的位置(不然很可能出现遥控器获取不到焦点)。
```

### 调试工具

#### 下载

1）`gitee`

```
https://gitee.com/Maxfengyan/m-console
```

2）已下载到本地

```
app/demo/epg/aconsole/aconsole.min.js
```

#### 页面使用

1）引入

```
<script type="text/javascript" src="js/console/aconsole.min.js"></script>
```

2）创建实例

```
<script>
	var _console = new Aconsole();
	_console.show();
	
	// 打印日志
	_console.log('哈哈哈哈')
</script>
```

