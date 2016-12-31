//sdf.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    userName: '',
    renderData: {}
  },

  onLoad: function(){
    var _this = this;
    if(!app._user.we.info.name || !app._user.we.info.id){
      _this.setData({
        remind: '未绑定帐号'
      });
      return false;
    }
    if(!app._user.we.room || !app._user.we.build){
      _this.setData({
        remind: '未完善寝室信息'
      });
      return false;
    }
    _this.setData({
      userName: app._user.we.info.name,
      userYkth: app._user.we.ykth
    });
    //判断并读取缓存
    if(app.cache.sdf){ sdfRender(app.cache.sdf); }
    function sdfRender(info){
      _this.setData({
        'renderData': info,
        'renderData.room_name': info.room.split('-').join('栋'),
        'renderData.record_time': info.record_time.split(' ')[0].split('/').join('-'),
        remind: ''
      });
    }
    wx.showNavigationBarLoading();
    // 发送请求
    wx.request({
      url: app._server + '/api/get_elec.php', 
      method: 'POST',
      data: app.key({
        openid: app._user.openid,
        buildingNo: app._user.we.build,
        floor: app._user.we.room.slice(0,1),
        room: parseInt(app._user.we.room.slice(1))
      }),
      success: function(res) {
        if(res.data && res.data.status === 200){
          var info = res.data.data;
          if(info) {
            //保存电费缓存
            app.saveCache('sdf', info);
            sdfRender(info);
          }else{ _this.setData({ remind: '暂无数据' }); }

        }else{
          app.removeCache('sdf');
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
  }
});