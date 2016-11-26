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
      app.showErrorModal(res.data.message);
      return false;
    }
    app.showLoadToast();
    wx.request({
      method: 'POST',
      url: app._server + '/api/users/bind.php',
      data: app.key({
        openid: app._user.wx.openid,
        xh: _this.data.userid,
        sfzh: _this.data.passwd
      }),
      success: function(res){
        if(res.data.status === 200){
          wx.showToast({
            title: '绑定成功',
            icon: 'success',
            duration: 2000
          });
          app.getUser();
          wx.navigateBack();
        }else{
          app.showErrorModal(res.data.message);
        }
      },
      fail: function(res){
        app.showErrorModal(res.errMsg);
      },
      complete: function(){
        wx.hideToast();
      }
    });
  },
  useridInput: function(e) {
    this.setData({
      userid: e.detail.value
    });
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