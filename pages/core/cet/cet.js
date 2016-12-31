// cet.js
const orderQuery = 'https://we.cqu.pt/api/cet/post_cet_info.php';
const app = getApp();

function checkValue(value,type){  
  var warn = '';
  switch (type){
    case 'name':
      if(!/\S{1,}/.test(value)){
        warn =　"姓名不能为空";
      }
      break;
    case 'tel':
      if(!/\S{1,}/.test(value)){
        warn = "手机号不能为空";
      }
      else if (!/^[0-9]{11}$/.test(value)){
        warn = "手机号格式错误";
      }
      break;
    case 'idCard':
      if (!/\S{1,}/.test(value)) {
        warn = "准考证号不能为空";
      } else if (!/^\S{15}$/.test(value)){
        warn = "准考证号格式错误";
      }
     break;
    case 'email':
      if (value.length>0&&!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){
        warn = "邮箱格式错误";
      }
    break; 
    default:
    break;
  }
  return warn;
}

Page({
  data: {
    curselected:true, // 0 - 成绩查询, 1 - 预约
    nameWarn:'',
    nameFlag:false,
    idCardWarn:'',
    idCardFlag:false,
    idCard_focus:false,
    telWarn:'',
    telFlag:false,
    emailWarn:'',
    emailFlag:false
  },
  inputFocus: function (e) {
    var id = e.target.id,
      newData = {};
      console.log(id);
    newData[id + '_focus'] = true;
    this.setData(newData);
  },
  inputBlur: function (e) {
    var id = e.target.id,
      newData = {};
    newData[id + '_focus'] = false;
    this.setData(newData);
  },
  checkInput:function(e){
    var name = e.target.dataset.name,
        value = e.detail.value,
        warn = this.data[name + 'Warn'],
        flag = this.data[name + 'Flag'];
    if(warn || flag){
      if(!flag)
        flag = true;  
      warn = checkValue(value, name);
      if(warn != this.data[name + 'Warn']){
        var newData = {};
        newData[name + 'Warn'] = warn;
        newData[name + 'Flag'] = flag;
        this.setData(newData);
      }
    }
  },
  submitForm:function(e){
    var formData = e.detail.value,
        warn = '',
        flag = true,
        curselected = this.data.curselected;
    for(var key in formData ){
      if (warn = checkValue(formData[key], key)){
        var newData = {};
        newData[key + 'Warn'] = warn;
        this.setData(newData);
        flag = false;
      }
    }
  
    if(flag ){
      if (curselected){
        wx.navigateTo({
          url: 'result?candidate_number=' + formData.idCard + '&name=' + formData.name
        });
      }else{
        let orderData = {
          openid: app._user.openid,
          candidate_number: formData.idCard,
          phone: formData.tel,
          email: formData.email,
          name: formData.name
        };
        wx.request({
          url: orderQuery,
          data: app.key(orderData),
          method: 'post',
          success: function (res) {
            var data = res.data;
            if (data.status == 200) {
              wx.showToast({
                title: '预约成功',
                icon: 'success',
                duration: 2000
              })
            } else if (data.status == 405) {
              wx.showToast({
                title: '已预约',
                image: '../../../images/core/fail.png',
                duration: 2000
              })
            }else{
              wx.showToast({
                title: '预约失败',
                image: '../../../images/core/fail.png',
                duration: 2000
              })
            }
          },
          fail: function () {
            wx.showToast({
              title: '预约失败',
              image: '../../../images/fail.png',
              duration: 2000
            })
          }
        })
      }
    }
  },
  changeModule:function(){
    // this.setData({
    //   curselected:!this.data.curselected,
    //   nameWarn: '',
    //   idCardWarn: '',
    //   idCardFlag: false,
    //   telWarn: '',
    //   telFlag: false,
    //   emailWarn: '',
    //   emailFlag: false
    // });
    wx.showToast({
      title: '敬请期待',
      image: '../../../images/core/close.png',
      duration: 2000
    })
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onUnload: function () {
  
  },

  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})