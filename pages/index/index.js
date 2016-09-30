//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    isBind: false,
    core: [
      { id: 'kb', name: '课表查询' },
      { id: 'cj', name: '成绩查询' },
      { id: 'ks', name: '考试安排' },
      { id: 'kjs', name: '空教室' },
      { id: 'xs', name: '学生查询' },
      { id: 'ykt', name: '一卡通' },
      { id: 'jy', name: '借阅信息' },
      { id: 'xf', name: '学费信息' },
      { id: 'sdf', name: '电费查询' },
      { id: 'bx', name: '物业报修' }
    ],
    card: {
      'kb': {
        show: true,
        data: {
          'list': [
            { what: '计算机新技术', when: '1 - 2 节', where: '5201' },
            { what: '专业综合实验', when: '7 - 8 节', where: '信科楼S331' }
          ]
        }
      },
      'ykt': {
        show: false,
        data: {
          'last_time': '',
          'balance': 0,
          'cost_status': false,
          'today_cost': {
            value: [],
            total: 0
          }
        }
      },
      'jy': {
        show: true,
        data: {
          'list': [
            { 'book_name': '从你的全世界路过', 'pickup_time': '16-04-02', 'return_time': '16-06-02', 'timing': 61 },
            { 'book_name': '一次又一次再一次的从你的全...', 'pickup_time': '16-04-02', 'return_time': '16-06-02', 'timing': 61 }
          ]
        }
      },
      'sdf': {
        show: false,
        data: {
          'room': '',
          'record_time': '',
          'cost': 0,
          'spend': 0
        }
      }
    }
  },
  onLoad: function(){
    var _this = this;
    //绑定状态
    _this.setData({
      'isBind': !app._user.xs.is_bind
    });
    if(!app._user.xs.is_bind){
      return false;
    }
    //获取课表数据
    wx.request({
      url: app._server + '/api/get_kebiao.php',
      data: {
        xh: app._user.xs.xh
      },
      success: function(res) {
        
      }
    });
    //获取一卡通数据
    wx.request({
      url: app._server + '/api/get_yktcost.php',
      data: {
        yktID: app._user.xs.ykt_id
      },
      success: function(res) {
        if(res.data.status === 200){
          var list = res.data.data;
          if(list.length > 0){
            var last = list[0],
                last_time = last.time.split(' ')[0],
                now_time = app.util.formatTime(new Date()).split(' ')[0];
            //筛选并计算当日消费
            for(var i = 0, today_cost = [], cost_total = 0; i < list.length; i++){
              if(list[i].time.split(' ')[0] == now_time && list[i].cost.indexOf('-') == 0){
                var cost_value = Math.abs(parseInt(list[i].cost));
                today_cost.push(cost_value);
                cost_total += cost_value;
              }
            }
            if(today_cost.length){
              _this.setData({
                'card.ykt.data.today_cost.value': today_cost,
                'card.ykt.data.today_cost.total': cost_total,
                'card.ykt.data.cost_status': true
              });
            }
            _this.setData({
              'card.ykt.data.last_time': last_time,
              'card.ykt.data.balance': parseFloat(last.balance),
              'card.ykt.show': true	  //设为false（一卡通数据有一定延迟，无法成功获取到今日数据，主页卡片可不予展示）
            });
          }
        }
      }
    });
    //获取水电费数据
    wx.request({
      url: app._server + '/api/get_elec.php',
      data: app._user.xs.room,
      success: function(res) {
        if(res.data.status === 200){
          var info = res.data.data;
          _this.setData({
            'card.sdf.data.room': info.room.split('-').join('栋'),
            'card.sdf.data.record_time': info.record_time.split(' ')[0],
            'card.sdf.data.cost': info.elec_cost,
            'card.sdf.data.spend': info.elec_spend,
            'card.sdf.show': true
          });
        }
      }
    });
  }
});