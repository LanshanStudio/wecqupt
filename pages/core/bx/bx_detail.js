//bx_detail.js
//获取应用实例
var app = getApp();

function sendRequest (app, urlFooter, data, method){

  var url = app._server + urlFooter,
      that = this;

  console.log(url, data, method);

    // 对成功进行处理
  function doSuccess(data) {
    
    that.data.detail.push(data);//存入数组
    

    var dataLen = data.length;
    that.data.lastData = data[dataLen - 1];

  }

  // 对失败进行处理
  function doFail(err) {
    console.log(err);
    
  }

    // 发送请求
  wx.request({
    url: url, 
    data: data,
    method: method,
    header: {
      'Content-Type': 'application/json'
    },
    success: function(res) {
      console.log(res.data.data)
      doSuccess(res.data.data);
    },
    fail: function(err) {
      doFail(err);
    },
    complete: function () {

      console.log(that.data);
      
    }
  });
};




Page({
  data: {
    detail:[{
           wx_djh:"登记号报修记录ID",
           wx_bt:"标题",
           wx_bxlxh:"报修类型号",
           wx_bxlxm:"报修类型名",
           wx_bxrrzm:"报修人同意识别码",
           wx_bxr:"报修人",
           wx_bxsj:"报修时间",
           wx_bxdh:"报修电话",
           wx_fwqyh:"服务区域号",
           wx_bxdd:"报修地点",
           wx_bxnr:"报修内容",
           wx_slr:"受理人",
           wx_shr:"审核人",
           wx_cxr:"承修人",
           wx_ysfz:"用时分钟",
           wx_ysqk:"验收情况",
           wx_hfr:"回访人",
           wx_hfmyd:"回访满意度",
           wx_fwqym:"服务区域名",
           wx_wxztm:"维修状态名",
           wx_wxgm:"维修工名",
           wx_cxbmm:"承修部门名",
           wx_xysj:"响应时间",
           wx_wxdh:"维修单据号",
           wx_bxip:"报修ip",
           wx_sfkhf:"是否可回访"
    }],
    lastDetail:{
           wx_djh:"登记号报修记录ID",
           wx_bt:"标题",
           wx_bxlxh:"报修类型号",
           wx_bxlxm:"报修类型名",
           wx_bxrrzm:"报修人同意识别码",
           wx_bxr:"报修人",
           wx_bxsj:"报修时间",
           wx_bxdh:"报修电话",
           wx_fwqyh:"服务区域号",
           wx_bxdd:"报修地点",
           wx_bxnr:"报修内容",
           wx_slr:"受理人",
           wx_shr:"审核人",
           wx_cxr:"承修人",
           wx_ysfz:"用时分钟",
           wx_ysqk:"验收情况",
           wx_hfr:"回访人",
           wx_hfmyd:"回访满意度",
           wx_fwqym:"服务区域名",
           wx_wxztm:"维修状态名",
           wx_wxgm:"维修工名",
           wx_cxbmm:"承修部门名",
           wx_xysj:"响应时间",
           wx_wxdh:"维修单据号",
           wx_bxip:"报修ip",
           wx_sfkhf:"是否可回访"
    }
  },
  onLoad: function(){
    console.log("页面启动");
  },
  onReady: function(){

    this.repairDetail();
  },
  repairDetail: function ( ) {
    var repairId = "1";

    var repairDetailUrl = "/api/bx/get_repair_detail.php",
        data = {
          "yktID": app._user.xs.ykt_id,
          "bxID": repairId
        },
        method = "GET";

    console.log(repairDetailUrl, data, method);
    sendRequest.apply(this, [ app, repairDetailUrl, data, method ]);
  }
  
});