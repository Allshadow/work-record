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