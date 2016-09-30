//cj.js
//获取应用实例
var app = getApp();
Page({
  data: {
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
    wx.request({
      url: "https://we.cqu.pt/api/get_kscj.php",
      data: {
        xh: "2014211418",
        sfzh: "204875"
      },
      success: function(res) {
        console.log(res);

        var _data = res.data.data;

        var term = _data[0].term;
        var xh = _data[0].xh;
        var year = term.slice(0,4);
        var semester = term.slice(4);
        var yearIn = xh.slice(0,4);
        var xqNum_grade = year + '-' + (+year+1);
        var xqNum_semester = semester;
        var xqName_grade = changeNum(year - yearIn + 1);
        var xqName_semester = (semester == 1) ? '上' : '下';
        var xqNum = {
          grade: xqNum_grade,
          semester: xqNum_semester
        }
        var xqName = {
          grade: xqName_grade,
          semester: xqName_semester
        }
        
        _this.setData({
          cjInfo: _data,
          xqNum: xqNum,
          xqName: xqName
        });

      }
    });

    function changeNum(num){  
      var china = new Array('零','一','二','三','四','五','六','七','八','九');  
      var arr = new Array();  
      var n = ''.split.call(num,''); 
      for(var i = 0; i < n.length; i++){  
        arr[i] = china[n[i]];  
      }  
      return arr.join("")  
    }  


  }
});