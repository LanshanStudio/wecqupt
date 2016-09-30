//jy.js
//获取应用实例
var app = getApp();
Page({
  data: {
    jyData: [],
    message: ''
  },
  onLoad: function() {
    this.getData();
  },
  onPullDownRefresh: function(){
    this.getData();
  },
  getData: function() {
    var _this = this;
    app.showLoadToast();
    wx.request({
      url: app._server + "/api/get_booklist.php",
      data: {
        yktID: '1636792'
      },
      success: function(res) {
        if(res.data.status === 200) {
          _this.setData({
            jyData: res.data.data
          });
        }else{
          _this.setData({
            message: res.data.message
          });
        }
      },
      fail: function(res) {
          //doFail
      },
      complete: function() {
        wx.hideToast();
        wx.stopPullDownRefresh();
      }
    });
  }
 
});