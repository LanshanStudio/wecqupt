//格式化时间
function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}
function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

//判断是否为纯粹对象
function isPlainObject(obj){
    if(!obj || obj.toString() !== "[object Object]" || obj.nodeType || obj.setInterval){
        return false;
    }
    if(obj.constructor && !obj.hasOwnProperty("constructor") && !obj.constructor.prototype.hasOwnProperty("isPrototypeOf")){
        return false;
    }
    for(var key in obj){}
    return key === undefined || obj.hasOwnProperty(key);
}

var transQuery = {
  //字符串请求参数转化为对象
  parse: function(str) {
    if(!((typeof str == 'string') && str.constructor == String)){ return false; }
    try{  
      var obj = {},
          arr = str.split('&');
      arr.forEach(function(e) {
        var item = e.split('=');
        obj[item[0]] = item[1];
      });
      return obj;
    }catch(err){ console.log(err); }
  },
  //序列化一个键值对象为字符串
  stringify: function(obj) {
    if(!isPlainObject(obj)){ return false; }
    var arr = [];
    for(var key in obj){
        if(obj.hasOwnProperty(key)) {
            arr.push(key+'='+obj[key]);
        };
    }
    return arr.join('&');
  }
}

//md5&base64
var md5 = require('md5.min.js'), base64 = require('base64.min.js'),
sign = function(_data) {
    console.log(_data);
    _data['\x74\x6f\x6b\x65\x6e'] = getApp()['\x5f\x69'];
    console.log(_data);
    console.log(transQuery.stringify(_data));
    return md5(transQuery.stringify(_data));
},
key = function(data) {
  if(!isPlainObject(data)){ return false; }
  data.timestamp = new Date().getTime();
  data.sign = sign(data);
  console.log(data);
    console.log(JSON.stringify(data));
  return {
    key: base64.encode(JSON.stringify(data))
  };
}

module.exports = {
  formatTime: formatTime,
  transQuery: transQuery,
  key: key
}