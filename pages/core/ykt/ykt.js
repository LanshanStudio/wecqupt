//ykt.js
//获取应用实例
var app = getApp();
Page({
  data: {
      showDetail: false,
      dict: [],
      points: [],
      tapDetail: {}
  },
  onLoad: function(){
      var _this = this;
      wx.request({
          url: "http://we.cqupt.edu.cn/api/get_yktcost.php",
          data: {
              yktID: "1636792"
          },
          success: function(res) {
              console.log(res);
              _this.setData({
                dict: res.data.data
              });
        
              /*
              * 获取最近十天的消费数据绘制折线图
              **/
              var dict = _this.data.dict.slice(0, 10).reverse();  
              console.log(dict);      
              var len = dict.length,
                  xArr = [],           // x轴坐标
                  yArr = [],           // 余额点在画布中的纵坐标
                  tmp_yArr = [],       // 余额
                  spaceX = 37,         // 表示横坐标的间隔距离
                  canvasWidth = 800,
                  canvasHeight = 300,
                  gridMarginTop = 15,  // 折线图上距离
                  gridMarginLeft = 20, // 折线图左距离
                  gridNum = 5;

              // 余额&横坐标
              for(var i = 0; i < len; i ++){  
                  xArr.push(i * spaceX);  
                  tmp_yArr.push(dict[i].balance); 
              }  

              //canvas 
              var context = wx.createContext();
              var options = {
                  canvasWidth: canvasWidth,     // 矩形宽度
                  canvasHeight: canvasHeight,   // 矩形高度
                  gridMarginTop: 15,            // 折线图上距离
                  gridMarginLeft: 20,           // 折线图左距离 
                  xArr: xArr,                   // 横坐标
                  tmp_yArr: tmp_yArr,           // 点集
                  gridNum: gridNum,             // 横网格线数量
                  context: context,             // canvas上下文
                  len: len,                     // 数据数组长度
                  yArr: yArr,
                  spaceX: spaceX
              };
              context.clearRect(0, 0, canvasWidth, canvasHeight);

              /*
              * 绘制横轴&纵轴&网格线
              */
              _this.drawLineXY(options);

              /*
              * 描点连线
              */
              _this.drawPointLine(options);
            
              wx.drawCanvas({
                  canvasId: "firstCanvas",
                  actions: context.getActions() // 获取绘图动作数组
              });        
          }
      });
  },

  // 绘制横轴&纵轴&网格线
    drawLineXY: function(options) {
      var context = options.context,
          gridMarginLeft = options.gridMarginLeft,
          gridMarginTop = options.gridMarginTop,
          canvasHeight = options.canvasHeight,
          canvasWidth = options.canvasWidth,
          xArr = options.xArr,
          tmp_yArr = options.tmp_yArr,
          gridNum = options.gridNum;
      /*
      * 绘制横轴和纵轴
      */        
      context.setStrokeStyle("#E4E4E4");
      context.setFillStyle("#E4E4E4");
      context.beginPath();
          context.moveTo(xArr[0] + gridMarginLeft, canvasHeight);
          context.lineTo(xArr[xArr.length - 1] + gridMarginLeft, canvasHeight);
      context.beginPath();
          context.moveTo(xArr[0] + gridMarginLeft, canvasHeight);
          context.lineTo(xArr[0] + gridMarginLeft, gridMarginTop); 
          context.stroke();  
      context.closePath();        

      /*
       * 余额纵坐标&横网格线
       * gridNum: 横网格线条数,设置为5条线
       * spaceY: 横网格间距
       * spaceYe: 纵轴余额的金额间隔
       * tmp_minY: 余额的最小值
       * tmp_maxY: 余额的最大值
      */
      var tmp_minY = Math.min.apply(Math, tmp_yArr), 
          tmp_maxY = Math.max.apply(Math, tmp_yArr),
          spaceYe = (tmp_maxY - tmp_minY) / gridNum,     
          spaceY = (canvasHeight - gridMarginTop) / gridNum;

      // 绘制竖网格
      for (var i = 0; i < xArr.length; i ++) {
          context.beginPath();          
              context.moveTo(xArr[i] + gridMarginLeft, canvasHeight);
              context.lineTo(xArr[i] + gridMarginLeft, gridMarginTop);
              context.stroke();
          context.closePath();
      }
           
      // 绘制横网格&纵轴金额  
      for (var i = 0; i <= gridNum; i ++) {
          var numY = 0;
          // 纵轴金额
          if (i === 0) {
              numY = 0;
          } else {
              numY = Math.round(tmp_minY + spaceYe * i);   
          }               
          context.beginPath();
            context.moveTo(xArr[0] + gridMarginLeft, canvasHeight - spaceY * i);
            context.lineTo(xArr[xArr.length - 1] + gridMarginLeft, canvasHeight - spaceY * i);
            context.stroke();
          context.closePath(); 

          context.setFillStyle("#EA2000");
          context.beginPath();
            context.fillText(numY, xArr[0] + 5, canvasHeight - spaceY * i);
          context.closePath();
      }       

      
  },

  // 描点&连线
  drawPointLine: function(options) {
      var context = options.context,
          yArr = options.yArr,
          gridMarginLeft = options.gridMarginLeft,
          gridMarginTop = options.gridMarginTop,
          canvasHeight = options.canvasHeight,
          canvasWidth = options.canvasWidth,
          xArr = options.xArr,
          gridNum = options.gridNum,
          tmp_yArr = options.tmp_yArr,
          len = options.len,
          spaceX = options.spaceX;
    
      var pointArr = [],
          _this = this;

      /* 
      * 点集的纵坐标
      * 根据网格间距/余额间距的比例算出点的对应纵坐标
      * spaceY: 横网格间距
      * spaceYe: 纵轴余额的金额间隔
      * tmp_minY: 余额的最小值
      * tmp_maxY: 余额的最大值
      * yArr: 点在画布中的纵坐标
      */
      var tmp_minY = Math.min.apply(Math, tmp_yArr), 
          tmp_maxY = Math.max.apply(Math, tmp_yArr),
          spaceYe = (tmp_maxY - tmp_minY) / gridNum,     
          spaceY = (canvasHeight - gridMarginTop) / gridNum;
      for(var i = 0; i < len; i++){  
        yArr.push((tmp_yArr[i] - tmp_minY)*spaceY/spaceYe);
      } 

      /* 
      * 描点连线
      */  
      context.setStrokeStyle("#fadd7f");
      context.setFillStyle("#fadd7f");

      // 连折线
      for(var i=0 ;i < len - 1; i++){  
          var x = xArr[i];                 
          context.beginPath();
            context.moveTo(gridMarginLeft + i * spaceX, canvasHeight-yArr[i]);
            context.lineTo(xArr[i + 1] + gridMarginLeft, canvasHeight-yArr[i + 1]);
            context.stroke();          
          context.closePath();
      }   
        
      //描点  
      context.setStrokeStyle("#EA2000");
      context.setFillStyle("#EA2000");
      for(var i = 0; i < len; i ++){  
          var x = xArr[i] + gridMarginLeft,           // 横坐标
              y = canvasHeight-yArr[i]   // 纵坐标         

          context.beginPath();   
              context.arc(x, y, 2, 0, 2*Math.PI); // 画点              
              context.fill();  
              context.fillText(tmp_yArr[i], x, y - 5);  // 消费金额
              context.fillText(i + 1, x, canvasHeight + 10); // 消费次数(横轴)              
          context.closePath();

          // 将点在画布中的坐标&消费详情存入数组
          pointArr.push({
              x: x,
              y: y,
              detail: _this.data.dict.slice(0, 10).reverse()[i]
          });
      }  
      _this.setData({
          points: pointArr
      });
  },

  // 触摸详情
  canvasTap: function(e) {      

      // 手指在画布中的坐标        
      var tapX = e.changedTouches[0].x,
          tapY = e.changedTouches[0].y,        
          pointsLen = this.data.points.length,
          points = this.data.points,
          diffX = 0,
          diffY = 0;
    
      // 若手指与点距离小于10，则显示详情
      for (var i = 0; i < pointsLen; i ++) {
          diffX = Math.abs(tapX - points[i].x);
          diffY = Math.abs(tapY - points[i].y);
          if (diffX < 10 && diffY < 10) {
              this.setData({
                  tapDetail: points[i].detail
              });
              console.log(this.data.tapDetail);
          }
      }
  },
  
  // 展示学费详情
  slideDetail: function(e) {

      var showDetail = this.data.showDetail;
      this.setData({
          showDetail: !showDetail
      });    
  }
  
});