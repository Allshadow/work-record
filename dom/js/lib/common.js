/**
 * base64 转化为 file 对象
 * @param {*} dataurl base64完整路径
 * @param {*} filename 文件名称
 */
const convertBase64UrlToBlob = (dataurl, filename) => {
   let arr = dataurl.split(",");
   let mime = arr[0].match(/:(.*?);/)[1];
   let bstr = atob(arr[1]);
   let n = bstr.length;
   let u8arr = new Uint8Array(n);

   while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
   }

   return new File([u8arr], filename, { type: mime });
 };

/**
 *  深拷贝
 */
const deepClone = (obj) =>{
  let o;
  if (typeof obj === 'object') {
      if (obj === null) {
          o = null
      } else {
          // 数组
          if (obj instanceof Array) {
              o = [];
              for (const item of obj) {
                  o.push(deepClone(item))
              }
          }
          // 对象
          else {
              o = {};
              for (const j in obj) {
                  o[j] = deepClone(obj[j])
              }
          }
      }
  }
  else {
      o = obj;
  }
  return o;
}

/**
 * 封装 ajax 请求
 * @param {*} method 
 * @param {*} url 
 * @param {*} data 
 * @param {*} callback 
 * @param {*} flag 
 */
const ajax = (method, url, data, callback, flag) =>{
    //封装兼容性方法创建ajax对象
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    //状态改变的事件触发器 onreadystatechange
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            callback(xhr.responseText);
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

/**
 * 封装 校验手机号
 * @param {*} value 
 * @returns 
 */
const checkPhone = (value) => {
    var pattern = /^1[3456789]\d{9}$/;
    if (pattern.test(value)){
        return true;
    }
    return false;
}

/**
 * 封装 校验邮箱
 * @param {*} value
 * @returns
 */
const checkEmail = (value) => {
    let reg = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/
    return reg.test(value) // true 正确 false 错误
}

/**
 * 封装兼容性事件处理函数
 * @param {*} ele 
 * @param {*} type 
 * @param {*} handle 
 */
const addEvent = (ele, type, handle) => {
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

