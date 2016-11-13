//kjs.js
//获取应用实例
var app = getApp();

// 定义常量数据
var WEEK_DATA = ['', '第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周',
                    '十一周', '十二周', '十三周', '十四周', '十五周', '十六周', '十七周', '十八周', '十九周', '二十周'],
    DAY_DATA = ['', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    CLASSTIME_DATA = [{time: '1-2', index: '1@2'}, {time: '3-4', index: '3@4'}, {time: '5-6', index: '5@6'},
                      {time: '7-8', index: '7@8'}, {time: '9-10', index: '9@10'}, {time: '11-12', index: '11@12'}],
    BUILDING_DATA = ['', '', '二教', '三教', '四教', '五教', '', '', '八教', '其他'];


// 发送请求的函数
function sendRequest(requestData){

  var that = this;

  // 对成功进行处理
  function doSuccess(data) {

    that.setData({
      'testData': data,
      'errObj.errorDisplay': true
    });
  }

  // 对失败进行处理
  function doFail(err) {

    var status = typeof err === 'string' ? '403' : err.status,
        errorMessage = typeof err === 'string' ? err : err.message;

    that.setData({
      'errObj.errorDisplay': false,
      'errObj.status': status,
      'errObj.errorMessage': errorMessage
    });
  }

  // console.log(requestData);

  if (requestData.classNo === '') {
    doFail('查询的时间段不能为空!');
    return false;
  }

  // 发送请求
  wx.request({
    url: app._server + '/api/get_empty_room.php', 
    data: requestData,
    success: function(res) {
      doSuccess(res.data.data);
    },
    fail: function(err) {
      doFail(err);
    },
    complete: function () {

      // 将请求条件状态设置为上一次请求的状态
      that.setData({
        'requestData.weekNo': requestData.weekNo,
        'requestData.weekDay': requestData.weekDay,
        'requestData.buildingNo': requestData.buildingNo,
        'requestData.classNo': requestData.classNo
      });
    }
  });
}


Page({
  data: {
    DATA: {
      WEEK_DATA: WEEK_DATA,
      DAY_DATA: DAY_DATA,
      CLASSTIME_DATA: CLASSTIME_DATA,
      BUILDING_DATA: BUILDING_DATA,
    },
    requestData: { // 发送请求的数据对象 初始为默认值
      weekNo: '1',
      weekDay: '1',
      buildingNo: '2',
      classNo: '1@2',
    },
    errObj: {
      errorDisplay: true,
      status: 500,
      errorMessage: ''
    },
    conditionSigns: { // 保存即时被点击选中的条件的显示的标识对象
      weekSign: 1,
      daySign: 1,
      classTimeSign: {
        time0: true,
        time1: false,
        time2: false,
        time3: false,
        time4: false,
        time5: false
      },
      buildingSign: 2
    },
    testData: null
  },

  // week
  chooseWeek: function (e) {
    
    var index = parseInt(e.target.dataset.weekno, 10);

    this.setData({
      'requestData.weekNo': index,
      'conditionSigns.weekSign': index
    });
  },

  weekTap: function (e) {

  },

  // day
  chooseDay: function (e) {

    var index = parseInt(e.target.dataset.dayno, 10);

    this.setData({
      'requestData.dayNo': index,
      'conditionSigns.daySign': index
    });
  },

  dayTap: function (e) {

  },

  // classTime
  chooseClaasTime: function (e) {
    
    var arrIndex = ['1@2', '3@4', '5@6', '7@8', '9@10', '11@12'],
        index = e.target.dataset.classno,
        classNo = this.data.requestData.classNo,
        arrIndexNo = arrIndex.indexOf(index),
        strSetData = '',
        curClassTimeSign = this.data.conditionSigns.classTimeSign[ 'time' + arrIndexNo ];
    
    classNo = classNo.replace(/%40/g, '@');
    classNo += '@' + index;

    // 按照字符串在classNo中出现的次数来决定删除或留下   奇——留下  偶——删除
    function delSaceStr(str) {

      var arrStr = str.split('@'),
          sameObj = {
            time12: 0,
            time34: 0,
            time56: 0,
            time78: 0,
            time910: 0,
            time1112: 0
          },
          strObj = {
            time12: '1@2',
            time34: '3@4',
            time56: '5@6',
            time78: '7@8',
            time910: '9@10',
            time1112: '11@12'
          },
          key = '',
          retStr = '';

      arrStr.forEach(function(item, index){

        switch(item) {
          case '1':
            sameObj.time12++;
            break;
          case '3':
            sameObj.time34++;
            break;
          case '5':
            sameObj.time56++;
            break;
          case '7':
            sameObj.time78++;
            break;
          case '9':
            sameObj.time910++;
            break;
          case '11':
            sameObj.time1112++;
            break;
        };
      });

      for(key in sameObj) {

        if (sameObj.hasOwnProperty(key)) {

          if (sameObj[ key ] % 2 !== 0) {
            retStr += retStr === '' ? strObj[ key ] : '@' + strObj[ key ];
          }
        }
      }

      return retStr;
    }

    classNo = delSaceStr(classNo);
    // console.log(classNo);
    strSetData = '{"conditionSigns.classTimeSign.time' + arrIndexNo + '":' + !curClassTimeSign + '}';

    this.setData(JSON.parse(strSetData));
    this.setData({
      'requestData.classNo': classNo // classNo中含有'@'特殊字符  作为属性字符串在JSON字符串中不能转换为JSON对象
    });
  },

  classTimeTap: function (e) {

  },

  // building
  chooseBuilding: function (e) {
    
    var index = parseInt(e.target.dataset.buildingno, 10);

    this.setData({
      'requestData.buildingNo': index,
      'conditionSigns.buildingSign': index
    });
  },

  buildingTap: function (e) {

  },


  // query
  catchQuery: function () {

    // 函数节流实现函数
    function trottle(method, context, arr) {
      
      clearTimeout(method.timer);
      method.timer = setTimeout(function () {
        method.apply(context, arr);
      },1000);
    } 

    trottle(sendRequest, this, [ this.data.requestData ]);

    return false;
  },


  onLoad: function(){

    // 初始默认显示
    sendRequest.apply(this, [ this.data.requestData ]);
  }
});