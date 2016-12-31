//cj.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    cjInfo : [

    ],
    xqNum : {
      grade: '',
      semester: ''
    },
    xqName : {
      grade: '',
      semester: ''
    }
  },
  onLoad: function(){
    var _this = this;
    if(!app._user.we.info.id || !app._user.we.info.name){
      _this.setData({
        remind: '未绑定'
      });
      return false;
    }
    _this.setData({
      id: app._user.we.info.id,
      name: app._user.we.info.name
    });
    //判断并读取缓存
    if(app.cache.cj){ cjRender(app.cache.cj); }
    function cjRender(_data){
      var term = _data[0].term.trim();
      var xh = _data[0].xh;
      var year = term.slice(0,4);
      var semester = term.slice(-3,-2);
      var yearIn = xh.slice(0,4);
      var xqName_grade = changeNum(year - yearIn + 1);
      var xqName_semester = (semester == 1) ? '上' : '下';
      var xqName = {
        grade: xqName_grade,
        semester: xqName_semester,
        term: term
      };
      
      _this.setData({
        cjInfo: _data,
        xqName: xqName,
        remind: ''
      });
    }
    wx.showNavigationBarLoading();
    wx.request({
      url: app._server + "/api/get_kscj.php",
      method: 'POST',
      data: app.key({
        openid: app._user.openid,
        id: app._user.we.info.id
      }),
      success: function(res) {

        if(res.data && res.data.status === 200) {
          var _data = res.data.data;
          if(_data) {
            //保存成绩缓存
            app.saveCache('cj', _data);
            cjRender(_data);
          } else { _this.setData({ remind: '暂无数据' }); }

        } else {
          app.removeCache('cj');
          _this.setData({
            remind: res.data.message || '未知错误'
          });
        }

      },
      fail: function(res) {
        if(_this.data.remind == '加载中'){
          _this.setData({
            remind: '网络错误'
          });
        }
        console.warn('网络错误');
      },
      complete: function() {
        wx.hideNavigationBarLoading();
      }
    });

    function changeNum(num){  
      var china = ['零','一','二','三','四','五','六','七','八','九'];
      var arr = [];
      var n = ''.split.call(num,''); 
      for(var i = 0; i < n.length; i++){  
        arr[i] = china[n[i]];  
      }  
      return arr.join("")  
    }  


  }
});