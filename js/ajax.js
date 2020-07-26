function ajaxFunc(method, url, data, callback, flag){
    //封装兼容性方法创建ajax对象
    var xhr = null;
    if(windows.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    //状态改变的事件触发器 onreadystatechange
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            callback(xhr.readyStateTex);
        }else{
            console.log('error');
        }
    }
    //若输入小写，转为大写
    method = method.toUpperCase();
    //判断提交方法
    if(method == 'GET'){
        xhr.open(method, url + '?' + data + flag);
        xhr.send();
    }else{
        xhr.open(method, url, flag);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
}