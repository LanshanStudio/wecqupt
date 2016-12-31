var app = getApp();

Page({
  data: {
    remind: '加载中',
    userName:'',
    userSex:'',
    totalTime:0,// 服务总时长
    serverHistory:[]
  },
  renderRecord:function(data){
    var _this = this;
    _this.setData(data);
  },
  onLoad:function(){
    var _this = this;
    if (!app._user.we.info.name || !app._user.we.info.id) {
      _this.setData({
        remind: '未绑定帐号'
      });
      return false;
    }
    if (!app._user.we.volunteer_uid) {
      _this.setData({
        remind: '未完善志愿者信息'
      });
      return false;
    }
    //判断并读取缓存
    if (app.cache.fw) { _this.renderRecord(app.cache.fw); }
    wx.showNavigationBarLoading();
    wx.request({
      url: 'https://we.cqu.pt/api/get_volunteer_info.php',
      method:'post',
      data:app.key({
        openid: app._user.openid,
        volunteer_uid: app._user.we.volunteer_uid
      }),
      success(result){
        var result = result.data;
        if(result.status === 200){
          var data = result.data,
              record = data.record || [],
              len = record.length,
              items = [],
              y = {},
              i = 0;
          record.forEach(function(item,index){
            var curY = item.time.split('-')[0];
            if(y[curY] === undefined){
              y[curY] = i;
              items[i] ={
                y:curY,
                historys:[]
              };
              ++i;
            }
            items[y[curY]].historys.push({
              date: item.time,
              content: item.content,
              pos: item.place,
              time: item.hours
            });
          });
         var recordData = {
           userName: data.info.name,
           userSex: data.info.sex,
           totalTime: data.info.volunteer_time,
           serverHistory: items,
           remind: ''
         }
         app.saveCache('fw', recordData);
         _this.renderRecord(recordData);
        }else{
          _this.setData({
            remind: res.data.message || '未知错误'
          });
        }
      },
      fail: function (res) {
        if (_this.data.remind == '加载中') {
          _this.setData({
            remind: '网络错误'
          });
        }
        console.warn('网络错误');
      },
      complete: function () {
        wx.hideNavigationBarLoading();
      }
    });
  }
})