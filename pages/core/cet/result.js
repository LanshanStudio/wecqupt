// cet.js
const queryCET = 'https://we.cqu.pt/api/cet/get_cet_result.php';
const app = getApp();
Page({
  data: {
    remind: '加载中',
    result: { // 查询结果
      name: '',
      time: '',
      idCard: '',
      total: 0,
      listen: 0,
      read: 0,
      write: 0,
      school:''
    }
  },
  onLoad: function (options) {
    var data = options,
        that = this;
      
    data.openid = app._user.openid;
    data.name = encodeURI(data.name);
    wx.showNavigationBarLoading();
    wx.request({
      url: queryCET,
      data:app.key(data),
      method:'post',
      success:function(res){
        var data = res.data;
        if(data.status == '200' ){
          var {
              name,
              candidate_number,
              listening,
              writing,
              reading,
              score,
              school,
              time,
            } = data.data,
            result = null;
          result = {
            name: name,
            idCard: candidate_number,
            listen: listening,
            write: writing,
            read: reading,
            total: score,
            school: school,
            time:time
          };
          that.setData({
            result:result,
            remind:false
          });
        }else if(data.status == 403){
          that.setData({
            remind: '请检查您的准考证号和姓名'
          });
        }else{
          that.setData({
            remind: '网络错误'
          });
        }
      },
      fail:function(){
        if (that.data.remind == '加载中') {
          that.setData({
            remind: '网络错误'
          });
        }
        console.warn('网络错误');
      },
      complete: function () {
        wx.hideNavigationBarLoading();
      }
    })
  },
  onShareAppMessage: function () {

  }
})