//append.js
//获取应用实例
var app = getApp();
Page({
  data: {
    building_list: ['1','2','3','4','5','6','8','9',
      '10','11','12','15','16','17','18','19',
      '20','21','22','23A','23B','24','25','26','27','28','29',
      '30','31','32','33','34','35','36','37','39'],  //寝室楼栋
    buildings: ['1栋（知行苑1舍）', '2栋（知行苑2舍）', '3栋（知行苑3舍）', '4栋（知行苑4舍）', '5栋（知行苑5舍）', '6栋（知行苑6舍）', '8栋（宁静苑1舍）', '9栋（宁静苑2舍）',
      '10栋（宁静苑3舍）', '11栋（宁静苑4舍）', '12栋（宁静苑5舍）', '15栋（知行苑7舍）', '16栋（知行苑8舍）', '17栋（兴业苑1舍）', '18栋（兴业苑2舍）', '19栋（兴业苑3舍）',
      '20栋（兴业苑4舍）', '21栋（兴业苑5舍）', '22栋（兴业苑6舍）', '23A栋（兴业苑7舍）', '23B栋（兴业苑8舍）', '24栋（明理苑1舍）', '25栋（明理苑2舍）', '26栋（明理苑3舍）', '27栋（明理苑4舍）', '28栋（明理苑5舍）', '29栋（明理苑6舍）',
      '30栋（明理苑7舍）', '31栋（明理苑8舍）', '32栋（宁静苑6舍）', '33栋（宁静苑7舍）', '34栋（宁静苑8舍）', '35栋（宁静苑9舍）', '36栋（四海苑1舍）', '37栋（四海苑2舍）', '39栋（明理苑9舍）'], // picker-range
    ibuilding: false,  // picker-index
    room_focus: false,
    sfz_focus: false
  },
  onLoad: function(){

  },
  buildingPicker: function(e) {
    this.setData({
      ibuilding: e.detail.value
    });
  },
  inputFocus: function(e){
    if(e.target.id == 'room'){
      this.setData({
        'room_focus': true
      });
    }else if(e.target.id == 'sfz'){
      this.setData({
        'sfz_focus': true
      });
    }
  },
  inputBlur: function(e){
    if(e.target.id == 'room'){
      this.setData({
        'room_focus': false
      });
    }else if(e.target.id == 'sfz'){
      this.setData({
        'sfz_focus': false
      });
    }
  },
});