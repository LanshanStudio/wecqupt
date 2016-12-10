//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    userid: '',
    passwd: ''
  },
  onLoad: function(){

  },
  bind: function() {
    var _this = this;
    if(!_this.data.userid || !_this.data.passwd){
      app.showErrorModal('账号及密码不能为空', '提醒');
      return false;
    }
    app.showLoadToast();
    wx.request({
      method: 'POST',
      url: app._server + '/api/users/bind.php',
      data: app.key({
        openid: app._user.openid,
        yktid: _this.data.userid,
        passwd: _this.data.passwd
      }),
      success: function(res){
        if(res.data.status === 200){
          wx.showToast({
            title: '绑定成功',
            icon: 'success',
            duration: 2000
          });
          app.showLoadToast('登录中');
          app.getUser(function(){
            wx.hideToast();
            wx.showModal({
              title: '提示',
              content: '部分功能需要完善信息才能正常使用，是否前往完善信息？',
              cancelText: '以后再说',
              confirmText: '完善信息',
              success: function(res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: 'append'
                  });
                } else {
                  wx.navigateBack();
                }
              }
            });
          });
        }else{
          wx.hideToast();
          app.showErrorModal(res.data.message);
        }
      },
      fail: function(res){
        wx.hideToast();
        app.showErrorModal(res.errMsg);
      }
    });
  },
  useridInput: function(e) {
    this.setData({
      userid: e.detail.value
    });
    if(e.detail.value.length >= 7){
      wx.hideKeyboard();
    }
  },
  passwdInput: function(e) {
    this.setData({
      passwd: e.detail.value
    });
  },
  inputFocus: function(e){
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
  },
  tapHelp: function(e){
    if(e.target.id == 'help'){
      this.hideHelp();
    }
  },
  showHelp: function(e){
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function(e){
    this.setData({
      'help_status': false
    });
  }
});