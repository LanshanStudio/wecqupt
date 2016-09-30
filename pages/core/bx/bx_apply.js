//bx_apply.js
//获取应用实例
var app = getApp();

var sendRequest = function (app, dataBelong, urlFooter, data, method){

  var url = app._server + urlFooter,
      that = this;

  console.log(url, data, method);

    // 对成功进行处理 
  function doSuccess(data) {
    if(dataBelong == "serviceType"){

      for(var item in data){//遍历 data

        that.data.list[0].item.push(item);//存入数组
        that.data.serviceObject.push(data[item]);

      }


    }else if(dataBelong == "serviceArea"){

       that.data.list[2].item = data;//存入数组
       
    }else if(dataBelong == "serviceApply"){
      console.log(data);
    }
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
    list:[
      {
        id: 'serviceType',
        name: '服务类型',
        cItem: '服务类型',
        open: false,
        item:[]
      },
      {
        id: 'serviceObject',
        name: '服务项目',
        cItem: '具体服务项目',
        CategoryId: 0,
        SpecificId: 0,
        open: false,
        item:[]
      },
      {
        id: 'serviceArea',
        name: '服务区域',
        cItem: '重庆邮电大学',
        AddressId: 0,
        open: false,
        item:[]
      }
    ],
    serviceObject:[]
  },
  onLoad: function(){
    this.serviceType();
    this.serviceArea();
  },
  onReady: function(){
    
  },
  onShow: function(){
    
  },
  serviceType: function ( ) {
    var serviceItemUrl = "/api/bx/get_repair_type.php",
        data = {},
        method = "GET",
        dataBelong = "serviceType";

    sendRequest.apply(this, [ app, dataBelong, serviceItemUrl, data, method ]);
    
  },
  serviceObject: function () {
    
  },
  serviceArea: function () {
    var serviceAreasUrl = "/api/bx/get_repair_areas.php",
        data = {},
        method = "GET",
        dataBelong = "serviceArea";

   sendRequest.apply(this, [ app, dataBelong, serviceAreasUrl, data, method ]);
    
  },
  serviceToggle: function (e) {
    var id = e.currentTarget.id,
        list = this.data.list;
    console.log(id, list);
    for(var i=0, len = list.length; i< len; i++){
      if(list[i].id == id){
        list[i].open = !list[i].open;
      }else{
        list[i].open = false;
      }
    }
    this.setData({
      list: list
    });
    console.log(this.data);
  },
  chooseItem: function (e) {
    var dataBelong = e.currentTarget.dataset.dataBelong,
        dataBind = e.currentTarget.dataset.dataBind,
        objectIndex = e.currentTarget.dataset.objectIndex,
        list = this.data.list;      
    console.log(dataBelong, dataBind);
    for(var i=0, len = list.length; i< len; i++){
      if(list[i].id == dataBelong){
        list[i].cItem = dataBind;
      }
    }
    if(dataBelong == "serviceType"){
      

      
      list[1].item = [];

      if( this.data.serviceObject[objectIndex][0] instanceof Array ){
        list[1].item = this.data.serviceObject[objectIndex][0];
        list[1].CategoryId = this.data.serviceObject[objectIndex][0][0].CategId;
        list[1].SpecificId = this.data.serviceObject[objectIndex][0][0].Id;
        list[1].cItem = list[1].item[0].Name;
      }else{
        list[1].item.push(this.data.serviceObject[objectIndex][0]);
        list[1].CategoryId = this.data.serviceObject[objectIndex][0].CategId;
        list[1].SpecificId = this.data.serviceObject[objectIndex][0].Id;
        list[1].cItem = list[1].item[0].Name;
      }
    }else if(dataBelong == "serviceArea"){
      var addressId = e.currentTarget.dataset.addressId;
      list[2].AddressId = addressId;
    }else if(dataBelong == "serviceObject"){
      var categId= e.currentTarget.dataset.categId,
          specificId = e.currentTarget.dataset.specificId;

          list[1].CategoryId = categId,
          list[1].SpecificId = specificId;
    }
    this.setData({
      list: list
    });
    console.log(this.data);
  },
  listenerAddress: function(e) {
    this.data.address = e.detail.value;
  },
  listenerTel: function(e) {
    this.data.tel = e.detail.value;
  },
  listenerTextarea: function(e) {
    this.data.content = e.detail.value;
  },
  submitApply: function(e) {
    console.log(this.data);
    var dataBelong = "serviceApply",
        serviceApplyUrl = "/api/bx/bx.php",
        method = "GET";

    var Title = this.data.list[0].cItem,
        CategoryId = this.data.list[1].CategoryId,
        SpecificId = this.data.list[1].SpecificId,
        Phone = this.data.tel,
        AddressId = this.data.list[2].AddressId,
        Address = this.data.address,
        Content = this.data.content;

    var data = {
      "Id": app._user.xs.ykt_id,
      "Name": app._user.xs.name,
      "Ip": app._server,
      "Title": "We重邮项目测试,请勿派单",
      "CategoryId": CategoryId,
      "SpecificId": SpecificId,
      "AddressId": AddressId,
      "Phone": Phone,
      "Content": "We重邮项目测试,期间给您带来的不便,请谅解",
      "Address": Address
    }

    

    sendRequest.apply(this, [ app, dataBelong, serviceApplyUrl, data, method ]);

  }
  
});

