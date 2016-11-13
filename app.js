//app.js
App({
  onLaunch: function() {
    //调用函数登录
    this.getUser();
    //调用API从本地缓存中获取数据
  },
  onShow: function() {
    //判断是否绑定
  },
  getUser: function(){
    var _this = this;
    //登录
    wx.login({
      success: function(res){
        if(res.code){
          //调用函数获取微信用户信息
          _this.getUserInfo(function(info){
            _this._user.wx = info.userInfo;
            console.log(info);
            //发送code与微信用户信息，获取学生信息
            // wx.request({
            //   method: 'POST',
            //   url: 'https://we.cqu.pt/api/users/get_info.php',
            //   data: {
            //     code: res.code,
            //     key: info.encryptedData,
            //     iv: info.iv
            //   },
            //   success: function(res){
            //     console.log(res);
            //   }
            // });
          });
        }
      }
    });
  },
  getUserInfo: function(cb){
    //获取微信用户信息
    wx.getUserInfo({
      success: function(res){
        typeof cb == "function" && cb(res);
      }
    });
  },
  showLoadToast: function(title, duration){
    wx.showToast({
      title: title || '加载中',
      icon: 'loading',
      duration: duration || 10000
    });
  },
  _server: 'https://we.cqu.pt',
  _user: {
    wx: {},
    xs: { name: '闵聪', xh: 2013211664, sfz_h6: 176053, ykt_id: 1634355, room: { buildingNo: 15, floor: 4, room: 15 } }
  }
});