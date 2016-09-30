//xf.js
//获取应用实例
var app = getApp();
Page({
  data: {
    xfData: [], // 学费数据
    stuInfo: {}, // 学生数据
    listAnimation: {} // 列表动画
  },

  // 页面加载
  onLoad: function() {
    var _this = this;
    app.showLoadToast();
    wx.request({
      url: app._server + "/api/get_jzsf.php",
      data: {
        yktID: app._user.xs.ykt_id
      },
      success: function(res) {

        if(res.data.status === 200) {
          // 为每一个学年设置是否显示当前学年学费详情的标志open, false表示不显示
          var list = res.data.data.reverse();
          for (var i = 0, len = list.length; i < len; ++i) {
            list[i].open = false;         
          }

          _this.setData({
            xfData: list,
            stuInfo: {
              sno: list[0].StuID,
              sname: list[0].StuName
            }
          });
        } else {
          //doFail
        }

      },
      
      fail: function(res) {
          //doFail
      },

      complete: function() {

        wx.hideToast();
      }
    });
  },

  // 展示学费详情
  slideDetail: function(e) {
   
    var id = e.currentTarget.id, 
        list = this.data.xfData;

    // 每次点击都将当前open换为相反的状态并更新到视图，视图根据open的值来切换css
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].Schoolyears == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      xfData: list
    });
  }
});