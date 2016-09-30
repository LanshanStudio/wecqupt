//app.js
App({
  onLaunch: function() {
    //调用函数登录
    this.getUser();
    //调用API从本地缓存中获取数据
  },
  onShow: function() {
    wx.showModal({
      title: '未绑定帐号',
      content: 'We重邮需要绑定帐号才能够正常使用，是否前往绑定？',
      confirmText: '前往',
      success: function(res) {
        if(res.confirm){
          wx.navigateTo({
            url: '/pages/more/login'
          });
        }
      }
    });
  },
  getUser: function() {
    var _this = this;
    //登录
    wx.login({
      success: function(res){
        if(res.code){
          //调用函数获取微信用户信息
          _this.getUserInfo(function(info){
            _this._user.wx = info.userInfo;
            //发送code与微信用户信息，获取学生数据
            wx.request({
              // method: 'POST',
              url: _this._server + '/api/users/get_info.php',
              data: {
                code: res.code,
                key: info.encryptedData,
                iv: info.iv
              },
              success: function(res){
                console.log(res);
                if(res.data.status === 200 || res.data.status === 203){
                  _this._user.xs = res.data.data;
                }else{
                  console.log('登录异常');
                }
              },
              fail: function(res){
                console.log('请求失败');
              }
            });
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
  util: require('./utils/util'),
  key: function(data){ return this.util.key(data) },
  _i: 'test',
  _server: 'https://we.cqu.pt',
  _user: {
    //微信数据
    wx: {},
    //学生数据
    xs: { name: '闵聪', xh: 2013211664, sfz_h6: 176053, ykt_id: 1634355, room: { buildingNo: 15, floor: 4, room: 15 } }
  }
});