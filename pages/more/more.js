//more.js
//获取应用实例
var app = getApp();
Page({
  data: {
    user: {}
  },
  onLoad: function(){
    var _this = this;
    _this.setData({
      'user': app._user
    });
  }
});