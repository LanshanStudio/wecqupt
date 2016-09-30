//kb.js
//获取应用实例
var app = getApp();
Page({
  data: {
    _weeks : ['第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周','第九周','第十周','十一周','十二周','十三周','十四周','十五周','十六周','十七周','十八周','十九周','二十周'],    
    _current: 0,
    targetCid: 0,
    scrollX: true,
    scrollY: true,
    scroll: {
      top: 0,
      left: 0
    },
    infoMarginLeft: ['0','480rpx','600rpx'],
    lowerFlag: true,
    scrollFlag: 'lb',
    _marginTop: '0',
    _bottomHeight: '0',
    blur: '',
  },
  onLoad: function(){
    // onLoad时获取一次课表
    var xh = "2014210868";  
    this.get_kb(xh);
  },
  overLower: function(){
    // scroll到达右边界或下边界之一时执行，标记已到达边界
    this.setData({
      lowerFlag: true
    })
  },
  infoCardTap: function(e){
    // 底部详情卡片的切换，由于可能存在超过3个课的情况，所以之后可能会修改。。
    var cid = e.currentTarget.dataset.cid;
    if (cid == 0){
      this.setData({
        infoMarginLeft: ['0','480rpx','600rpx'],
      })
    } else if (cid == 1){
      this.setData({
        infoMarginLeft: ['0','120rpx','600rpx'],
      })
    } else if (cid == 2){
      this.setData({
        infoMarginLeft: ['0','120rpx','240rpx'],
      })
    }
  },
  showDetail: function(e){
    // 点击课程卡片后执行
    var data = e.currentTarget.dataset;
    // 首先更新被点击课的cid
    this.setData({
      targetCid: data.cid
    });
    // 判断被点击课是前3节还是后3节，是不是周末
    if (data.class < 3&&data.week<=4){
      this.setData({
        scrollFlag: 'lt'
      })
    } else if(data.class >= 3&&data.week>4){
      this.setData({
        scrollFlag: 'rb'
      })
    } else if(data.class < 3&&data.week>4){
      this.setData({
        scrollFlag: 'rt'
      })
    } else if(data.class >= 3&&data.week<=4){
      this.setData({
        scrollFlag: 'lb'
      })
    }
    var animation;
    var that = this;
    var _top = this.data.scroll.top,
        _left = this.data.scroll.left;
    // 根据之前判断的不同情况执行不同动画效果
      if(that.data.scrollFlag=='lb'){
        // 左下        
        function scrollAnimation() {
          //到头时就停止动画
          if(that.data.lowerFlag&&_left==0){
            clearTimeout(animation);
            // 设定遮罩层的位置，加号是用来类型转换的
            var _fixedMarginTop = '-'+(+that.data.scroll.top + 205);
            that.setData({
              tapTarget: {
                week : data.week,
                class: data.class
              },
              _marginTop: '-205',
              _bottomHeight: '205',
              _fixedMarginTop: _fixedMarginTop,
              _fixedMarginLeft: '0',
              blur: 'blur',
              detail: 'detail',
              scrollX: false,
              scrollY: false
            });
            return true;
          }
          if(_left < 5){
            _left = 0;
          } else {
            _left -= 5;
          }
          // 这个动画其实就是在不断改变scroll的top和left值
          that.setData({
            scroll: {
              top: _top,
              left: _left
            },
          });
          // 真机调试时发现没有requestAnimationFrame
          animation = setTimeout(scrollAnimation,10);
        }
        animation = setTimeout(scrollAnimation,10);
      } else if (this.data.scrollFlag=='lt') {
        // 左上
        function scrollAnimation() {
          if(_top==0&&_left==0){
            clearTimeout(animation);
            that.setData({
              tapTarget: {
                week : data.week,
                class: data.class
              },
              _marginTop: '0',
              _bottomHeight: '205',
              _fixedMarginTop: '0',
              _fixedMarginLeft: '0',
              blur: 'blur',
              detail: 'detail',
              scrollX: false,
              scrollY: false
            });
            return true;
          }
          if(_top < 5){
            _top = 0;
          } else {
            _top -= 5;
          }
          if(_left < 5){
            _left = 0;
          } else {
            _left -= 5;
          }
          that.setData({
            scroll: {
              top: _top,
              left: _left
            },
          });
          animation = setTimeout(scrollAnimation,10);
        }
        animation = setTimeout(scrollAnimation,10);
      } else if (this.data.scrollFlag=='rt') {
        // 右上
        function scrollAnimation() {
          if(_top==0&&that.data.lowerFlag){
            clearTimeout(animation);
            var _fixedMarginLeft = '-104';
            that.setData({
              tapTarget: {
                week : data.week,
                class: data.class
              },
              _marginTop: '0',
              _bottomHeight: '205',
              _fixedMarginTop: '0',
              _fixedMarginLeft: _fixedMarginLeft,
              blur: 'blur',
              detail: 'detail',
              scrollX: false,
              scrollY: false
            });
            return true;
          }
          if(_top < 5){
            _top = 0;
          } else {
            _top -= 5;
          }
          if(!that.data.lowerFlag){
            _left += 5;
          }
          that.setData({
            scroll: {
              top: _top,
              left: _left
            },
          });
          animation = setTimeout(scrollAnimation,10);
        }
        animation = setTimeout(scrollAnimation,10);
      }  else if (this.data.scrollFlag=='rb') {
        // 右下
        function scrollAnimation() {
          if(that.data.lowerFlag){
            clearTimeout(animation);
            var _fixedMarginTop = '-'+(+that.data.scroll.top + 205);
            var _fixedMarginLeft = '-104';
            that.setData({
              tapTarget: {
                week : data.week,
                class: data.class
              },
              _marginTop: '-205',
              _bottomHeight: '205',
              _fixedMarginTop: _fixedMarginTop,
              _fixedMarginLeft: _fixedMarginLeft,
              blur: 'blur',
              detail: 'detail',
              scrollX: false,
              scrollY: false
            });
            return true;
          }
          if(!that.data.lowerFlag){
            _top += 5;
          }
          if(!that.data.lowerFlag){
            _left += 5;
          }
          that.setData({
            scroll: {
              top: _top,
              left: _left
            },
          });
          animation = setTimeout(scrollAnimation,10);
        }
        animation = setTimeout(scrollAnimation,10);
      }
  },
  onScroll: function(e){
    // 滚动时触发，更新当前坐标，并将边界标记置为false
    this.setData({
      scroll: {
        top: e.detail.scrollTop,
        left: e.detail.scrollLeft
      },
      lowerFlag: false
    });
  },
  hideDetail: function(){
    // 点击遮罩层时触发，取消主体部分的模糊，更新部分数据，并将边界标记置为true
    if (this.data.blur != ''){
      this.setData({
        blur: '',
        detail: '',
        scrollX: true,
        scrollY: true,
        _marginTop: '0',
        _bottomHeight: '0',
        lowerFlag: true
      });
    }
  },
  currentChange: function(e){
    // 更改底部周数时触发，修改当前选择的周数
    var current = e.detail.current
    this.setData({
      _current: current,
      week : current+1
    });
  },
  get_kb: function(xh){
    // 根据获取课表
    var _this = this;
    wx.request({
      url: "https://we.cqu.pt/api/get_kebiao.php",
      data: {
        xh: xh
      },
      success: function(res) {
        if (res.data.status == 200){
          var _data = res.data.data;
          var colors = ['red','green','purple','yellow'];
          var i,j,k,c=0;
          var colorsDic = {};
          var _lessons = [];
          // 为课程添加颜色
          for( i = 0 ; i < _data.lessons.length; i++){
            _lessons[i] = _data.lessons[i];
            for( j = 0; j < _lessons[i].length; j++){
              _lessons[i][j] = _data.lessons[i][j];
              for( k = 0; k < _lessons[i][j].length; k++){
                if(_lessons[i][j][k].class_id){
                  if (!colorsDic[_lessons[i][j][k].class_id]) {
                    if (i>0 && _lessons[i-1][j][k] && _lessons[i-1][j][k].color == colors[c]) {
                      c++;  // 与左边相同时改变颜色（这里好像有些问题）
                      c = (c == 4)?0:c;
                    }
                    colorsDic[_lessons[i][j][k].class_id] = colors[c];
                  }
                  _lessons[i][j][k].color = colorsDic[_lessons[i][j][k].class_id];
                }
                c++; // k值相同不需要改变颜色
                c = (c == 4)?0:c;
              }
            }
          }

          var day = _data.day;
          var week = _data.week;
          var mon = _data.lessons[0];
          var tue = _data.lessons[1];
          var wed = _data.lessons[2];
          var thu = _data.lessons[3];
          var fri = _data.lessons[4];
          var sat = _data.lessons[5];
          var sun = _data.lessons[6];
          var day_cn = '';
          // 转换中文
          switch(day){
            case '0': day_cn = '星期天';
                    break;
            case '1': day_cn = '星期一';
                    break;
            case '2': day_cn = '星期二';
                    break;
            case '3': day_cn = '星期三';
                    break;
            case '4': day_cn = '星期四';
                    break;
            case '5': day_cn = '星期五';
                    break;
            case '6': day_cn = '星期六';
                    break;

          }

          _this.setData({
            day : day,
            day_cn : day_cn,
            week : week,
            _current : week-1,
            lessons : _data.lessons,
            mon: mon,
            tue: tue,
            wed: wed,
            thu: thu,
            fri: fri,
            sat: sat,
            sun: sun,
            mon0 : mon[0],
            mon1 : mon[1],
            mon2 : mon[2],
            mon3 : mon[3],
            mon4 : mon[4],
            mon5 : mon[5],
            tue0 : tue[0],
            tue1 : tue[1],
            tue2 : tue[2],
            tue3 : tue[3],
            tue4 : tue[4],
            tue5 : tue[5],
            wed0 : wed[0],
            wed1 : wed[1],
            wed2 : wed[2],
            wed3 : wed[3],
            wed4 : wed[4],
            wed5 : wed[5],
            thu0 : thu[0],
            thu1 : thu[1],
            thu2 : thu[2],
            thu3 : thu[3],
            thu4 : thu[4],
            thu5 : thu[5],
            fri0 : fri[0],
            fri1 : fri[1],
            fri2 : fri[2],
            fri3 : fri[3],
            fri4 : fri[4],
            fri5 : fri[5],
            sat0 : sat[0],
            sat1 : sat[1],
            sat2 : sat[2],
            sat3 : sat[3],
            sat4 : sat[4],
            sat5 : sat[5],
            sun0 : sun[0],
            sun1 : sun[1],
            sun2 : sun[2],
            sun3 : sun[3],
            sun4 : sun[4],
            sun5 : sun[5],
          });
          

        }

      }
    });
  }
});