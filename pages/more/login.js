//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    userid_focus: false,
    passwd_focus: false,
    array: ['美国', '中国', '巴西', '日本']
  },
  onReady: function(){

  },
  inputFocus: function(e){
    console.log(e.target.id == 'userid')
    if(e.target.id == 'userid'){
      this.setData({
        'userid_focus': true
      });
    }else if(e.target.id == 'passwd'){
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function(e){
    if(e.target.id == 'userid'){
      this.setData({
        'userid_focus': false
      });
    }else if(e.target.id == 'passwd'){
      this.setData({
        'passwd_focus': false
      });
    }
  }
});