//sdf.js
//获取应用实例
var app = getApp();

// 处理成功请求
function doSuccess(data) {

  if (data === null) {

    doFail.apply(this, [ {message: '未查找到相关信息!'} ]);
    return false;
  }

  // 将数值转化为字符串
  function toStr(num) {

    var str = num.toString();
    return str = str.length === 1 ? '0' + str : str;;
  }

  // 对数据进行加工
  // 添加当前时间
  var newDate = new Date(),
      hours = toStr(newDate.getHours()),
      minutes = toStr(newDate.getMinutes());

  data.nowTime = (newDate.getMonth() + 1) + ' 月 ' + newDate.getDate() + ' 日 ' + hours + ':' + minutes;

  // 修改room格式
  data.room = data.room.substring(data.room.length - 3);

  this.setData({
    'renderData': data,
    'pageDispaly': false,
    'requestData.buildingNo': null,
    'requestData.floor': null,
    'requestData.room': null,
    'curBuilding': '',
    'curDormitory': ''
  });
}

// 处理失败请求
function doFail(err) {

  this.setData({
    'error.display': false,
    'error.message': err.message
  });
}

// 发送请求
function sendRequest(requestData) {

  var that = this;

  // 对请求数据进行验证
  if (requestData.buildingNo === null || requestData.floor === null || requestData.room === null) {
      this.setData({
        'error.display': false
      })
    return false;
  }
  else {

    this.setData({
      'error.display': true
    })
  }
  

  // 发送请求
  wx.request({
    url: 'http://we.cqupt.edu.cn/api/get_elec.php', 
    data: requestData,
    header: {
        'Content-Type': 'application/json'
    },
    success: function(res) {
      doSuccess.apply(that, [ res.data.data ]);
    },
    fail: function(err) {
      doFail.apply(that, [ err ]);
    }
  });
}

// 对输入的数据进行过滤
function filtration(value) {

  var errorInput = false;

  // 消除字符串首尾的空格
  function trim(str) {

    return str.replace(/(^\s*)|(\s*$)/g, '');
  }

  value = trim(value);

  // 对输入的是空格或未进行输入进行处理
  if (value === '') {

    this.setData({
      'error.display': false,
      'error.message': '输入空格或无输入无效!'
    });

    return false;
  }

  // 防止注入攻击
  function checkData(v) {

      var temp = v;
        
      v = v.replace(/\\|\/|\.|\'|\"|\<|\>|\#|\?/g, function (str) { return ''; });
      v = trim(v);

      errorInput = v.length < temp.length ? true : false;
      return v;
  }

  // 对输入进行过滤
  value = checkData(value);

  // 存在非法输入只会提示错误消息而不会发送搜索请求
  if (errorInput === true) { 

    this.setData({
      'error.display': false,
      'error.message': '请勿输入非法字符!'
    });

    return false;
  }

  // 截取前十个字符 防止手动修改长度限制
  value = value.substr(0, 3);

  return value;
}


Page({
  data: {
    userInfo: {
      userName: ''
    },
    buildingNo: ['1', '2', '3', '5', '6', '7'], // 下拉列表实现
    dormitoryNo: ['102', '205', '309', '507', '616', '717'], // 下拉列表实现
    curBuilding: '',
    curDormitory: '',
    error: {
      display: true,
      message: '请选择楼栋号和房间号!'
    },
    requestData: { // 要发送的数据对象
      buildingNo: null,
      floor: null,
      room: null
    },
    pageDispaly: true, // 页面切换显示标识
    renderData: null // result-page页面渲染的数据
  },

  // query-page
  // 下拉列表实现
  /*
  bindBuildingNoChange: function (e) {

    var curBuilding = this.data.buildingNo[ e.detail.value ];

    this.setData({
      curBuilding: curBuilding,
      'requestData.buildingNo': curBuilding
    })
  },

  bindDormitoryNoChange: function (e) {

    var curDormitory = this.data.dormitoryNo[ e.detail.value ],
        curFloor = curDormitory.substring(0, 1),
        curRoom = curDormitory.substring(1);

    curRoom = curRoom.indexOf('0') > -1 ? curRoom.substring(1) : curRoom;

    this.setData({
      curDormitory: curDormitory,
      'requestData.floor': curFloor,
      'requestData.room': curRoom
    })
  },
  */

  // 获取输入的正确楼栋号
  bindBuildingInput: function (e) {

    var curBuilding = filtration.apply(this, [ e.detail.value ]);

    // 输入过滤未通过
    if (curBuilding === false) {
      return false;
    }

    this.setData({
      curBuilding: curBuilding,
      'requestData.buildingNo': curBuilding,
      'error.display': true
    })
  },

  // 获取输入的正确房间号
  bindDormitoryInput: function (e) {

    var curDormitory = filtration.apply(this, [ e.detail.value ]);
    
    // 输入过滤未通过
    if (curDormitory === false) {
      return false;
    }

    var curFloor = curDormitory.substring(0, 1),
        curRoom = curDormitory.substring(1);

    curRoom = curRoom.indexOf('0') > -1 ? curRoom.substring(1) : curRoom;
    
    this.setData({
      curDormitory: curDormitory,
      'requestData.floor': curFloor,
      'requestData.room': curRoom,
      'error.display': true
    })
  },

  // 提交查询
  formSubmit: function () {

    // 函数节流实现函数
    function trottle(method, context, arr) {
      
      clearTimeout(method.timer);
      method.timer = setTimeout(function () {
        method.apply(context, arr);
      }, 1000);
    } 

    trottle(sendRequest, this, [ this.data.requestData ]);
  },

  // result-page
  // 重置寝室
  catchResetDormitory: function () {


  },

  // 返回查询界面
  catchReturnQuery: function () {

    this.setData({
      'renderData': null,
      'pageDispaly': true
    });
  },

  onLoad: function(){

    var that = this
    wx.checkSession({
      success: function(){
       
        //登录态未过期
      },
      fail: function(){
        //登录态过期
        wx.login();
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
        
          //更新数据
          that.setData({
            'userInfo.userName': userInfo.nickName
          })
        })
      }
    });
  }
});