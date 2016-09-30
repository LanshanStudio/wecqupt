//ks.js
//获取应用实例
var app = getApp();
Page({
  data: {
    ks: {},
    first: 1,
    class: []
  },
  togglePage: function (e) {
    var id = e.currentTarget.id, data = {};
    data.show = [];
    console.log(this.data.class.length);
    for (var i = 0, len = this.data.class.length; i < len; i++) {
        data.show[i] = false;
    }
    if(this.data.first){
      this.setData(data);
      this.data.first = 0;
    }
    data.show[id] = !this.data.show[id];
    this.setData(data);
  },
  onLoad: function(){
    var _this = this;
    wx.request({
      url: "http://we.cqupt.edu.cn/api/get_ks.php",
      data: {
        xh: "2014211418",
        sfzh: "204875"
      },
      success: function(res) {
        console.log(res);

        if (res.data.status == 200){

          var _data = res.data.data;
        
          var _class = [],temp;
          var ks = {
            ksName: '2016-2017年度上学期期末考试',
            stuId: _data[0].xh,
            stuName: _data[0].name
          }

          for(var i = 0; i < _data.length; i++){
            (function(i){
              temp = {
                id: i,
                ksName: _data[i].course_name,
                ksDate: _data[i].date,
                ksTime: _data[i].time,
                ksPlace: _data[i].place,
                ksSeat: _data[i].number
              }
              _class.push(temp);
            })(i);
          }

          console.log(_class);

          _this.setData({
            class: _class,
            ks: ks
          });

        } else {
          wx.showToast({
            title: res.data.message,
            duration: 4000
          })
        }

      }
    });
  }
});