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
    
    wx.request({
      method: 'POST',
      url: app._server + '/api/users/bind.php',
      data: {
        code: res.code,
        key: info.encryptedData,
        iv: info.iv
      },
      success: function(res){
        console.log(res);
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