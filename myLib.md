# 日期

```js
//在月份、日期、小时等小于10时前面补0
/*
*  @value 传入数字
* */
$m.padDate = function (value) {
    return value < 10 ? '0' + value : value ;
}

//将秒数转化为时间
/*
    @second 时间戳与时间戳之差、或者直接毫秒数
 */
$m.formatSecond = function(second) {
    var sec = Math.floor(second % 60)
    var min = Math.floor(second / 60) % 60
    var hour = Math.floor(second / 60 / 60) % 24
    var day = Math.floor(second / 60 / 60 / 24)

    sec = sec < 10 ? '0' + sec : sec
    min = min < 10 ? '0' + min : min
    hour = hour < 10 ? '0' + hour : hour
    day = day < 10 ? '0' + day : day

    return day + ':' + hour + ':' + min + ':' + sec;
},


//将时间转化为 2019-08-06 11:32:50 格式
/*
*  @value new Date()  需要过滤的数据
*  new Date("month dd,yyyy hh:mm:ss") 英文表示月份名称，从January到December ,缩写也行（Jan....Dec）一个月中的第几天（1-31）4位数的年份 小时（0-23）分钟数（0-59）秒数（0-59）
*  new Date("Jun 2,2017 12:00:00"); //Fri Jun 02 2017 12:00:00 GMT+0800 (中国标准时间)
*
*  new Date("month dd,yyyy")
*  new Date("Jun 2,2017"); //Fri Jun 02 2017 00:00:00 GMT+0800 (中国标准时间)
*
*  new Date(yyyy,mth,dd,hh,mm,ss); 注意：这种方式下，必须传递整型； 月份（0-11）
*  new Date(2017,5,2,12,0,0); //Fri Jun 02 2017 12:00:00 GMT+0800 (中国标准时间)
*
*  new Date(yyyy,mth,dd);
*  new Date(2017,5,2); //Fri Jun 02 2017 00:00:00 GMT+0800 (中国标准时间)
*
*  new Date(ms); 注意：ms:是需要创建的时间和 GMT时间1970年1月1日之间相差的毫秒数 时间戳
*  new Date(1496376000000); //Fri Jun 02 2017 12:00:00 GMT+0800 (中国标准时间)
* */
$m.formatDate = function (timestamp) {
    var date;
    if(arguments.length == 0){
        date = new Date();
    }else{
        date = new Date(timestamp);
    }
    var year= date.getFullYear();
    var month= $m.padDate(date.getMonth() + 1);
    var day= $m.padDate(date.getDate());
    var hours= $m.padDate(date.getHours());
    var minutes = $m.padDate(date.getMinutes());
    var seconds = $m.padDate(date.getSeconds());
    return year + '-' + month + '-' + day  + ' ' + hours + ':' + minutes + ':' + seconds
}

//将时间转化为时间戳
/*
* value 2017/03/19 new Date()中的
* */
$m.timeStamp = function (value) {
    //返回自定义时间戳
    Date.parse(value);

    //返回当前的时间戳
    Date.parse(new Date()) || new Date().getTime()
}

//显示几分钟前，几小时前
/*
* @time 2018-05-25 18:14:02
* */
$m.getDateDiff = function(time) {
    // 当前时间
    var nowTime = new Date();
    var year = nowTime.getFullYear();
    var month = nowTime.getMonth() + 1;
    var day = nowTime.getDate();
    var hours = parseInt(nowTime.getHours());
    var minutes = nowTime.getMinutes();
    // 传来time 2018-05-25 18:14:02 分解
    var timeyear = time.substring(0, 4);
    var timemonth = time.substring(5, 7);
    var timeday = time.substring(8, 10);
    var timehours = parseInt(time.substring(11, 13));
    var timeminutes = time.substring(14, 16);
    var timesecond = time.substring(17, 19);
    var d_year = year - timeyear;
    var d_month = Math.abs(month - timemonth);
    var d_day = Math.abs(day - timeday);
    var d_hours = Math.abs(hours - timehours);
    var d_minutes = Math.abs(minutes - timeminutes);
    if (d_day > 1) {
        return timeyear + '-' + timemonth + '-' + timeday + '\n' + timehours + ':' + timeminutes + ':' + timesecond;
    } else if (d_day == 0 && d_hours > 0 && d_hours <= 24) {
        return d_hours + '小时前';
    } else if (d_day == 1) {
        if (d_hours > 0 && d_hours <= 24){
            return hours + (24 - timehours) + '小时前';
        }else{
            return timeyear + '-' + timemonth + '-' + timeday + '\n' + timehours + ':' + timeminutes + ':' + timesecond;
        }
    } else if (d_minutes > 0 && d_minutes <= 60) {
        return d_minutes + '分钟前';
    } else {
        return '1分钟前';
    }
};

//显示几分钟前，几小时前
/*
* @time  13位时间戳
* */
$m.dealTimeStamp = function(timestamp){
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - timestamp;

    // 如果本地时间反而小于变量时间
    if (diffValue < 0) {
        return '不久前';
    }

    // 计算差异时间的量级
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;

    // 数值补0方法
    var zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };

    // 使用
    if (monthC > 12) {
        // 超过1年，直接显示年月日
        return (function () {
            var date = new Date(timestamp);
            return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
        })();
    } else if (monthC >= 1) {
        return parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
        return parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        return parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        return parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        return parseInt(minC) + "分钟前";
    }
    return '刚刚';
}


//显示星期几
/*
*   value 时间格式
* */
$m.getWeek = function (value) {
    var date = new Date(value).getDay();
    switch (date) {
        case 0:
            return '星期天';
        case 1:
            return '星期一';
        case 2:
            return '星期二';
        case 3:
            return '星期三';
        case 4:
            return '星期四';
        case 5:
            return '星期五';
        case 6:
            return '星期六';
        default:
    }
}
```

# 验证

## 判断手机号

```js
var checkPhone = function(value){
    var pattern = /^1[34578]\d{9}$/;
    if (pattern.test(value)){
        return true;
    }
    return false;
}
```

# 封装函数

## 兼容性的事件处理函数

```js
/*
*  @ele dom对象
*  @type 事件类型
*  @handle 事件函数
* */
var addEvent = function (ele, type, handle) {
    if(ele.addEventListener){
        ele.addEventListener(type, handle, false);
    }else if(ele.attachEvent){
        ele.attachEvent('on' + type, function () {
            handle.call(ele);
        })
    }else{
        ele['on' + type] = handle;
    }
}
```

