We重邮 - 开发记录
===

官网：https://we.cqu.pt \ http://we.cqupt.edu.cn

### 目录结构
```
wecqupt
  ├─ app.json       // 全局配置文件，决定页面文件的路径、窗口表现、设置网络超时时间、设置多tab等     
  ├─ app.js         // 全局js，如执行App()函数来初始化注册小程序
  ├─ app.wxss       // 全局样式
  ├─ utils          // 模块化文件夹，利用module.exports暴露接口，通过require(path)使用模块接口
  │    └─ util.js   // 模块化例子
  ├─ images         // 图片文件夹
  └─ pages          // 页面文件夹
       ├─ index     // 主页
       │    ├─ index.wxml
       │    ├─ index.wxss
       │    └─ index.js
       ├─ news      // 资讯
       │    ├─ news.wxml    // 列表
       │    ├─ news.wxss
       │    ├─ news.js
       │    ├─ detail.wxml   // 详情
       │    ├─ detail.wxss
       │    └─ detail.js
       ├─ more      // 更多
       │    ├─ more.wxml    // 更多 (含绑定用户)
       │    ├─ more.wxss
       │    ├─ more.js
       │    ├─ about.wxml   // 关于
       │    ├─ about.wxss
       │    └─ about.js
       └─ core      // 主页功能文件夹
            ├─ kb       // 课表
            │    ├─ kb.wxml
            │    ├─ kb.wxss
            │    └─ kb.js
            └─ [other]    // 其他
                 └─ ..
```

### 参考资料

* 官方文档：https://mp.weixin.qq.com/debug/wxadoc/introduction/
  * （重要）开发：https://mp.weixin.qq.com/debug/wxadoc/dev/
  * 设计：https://mp.weixin.qq.com/debug/wxadoc/design/
  * 运营：https://mp.weixin.qq.com/debug/wxadoc/product/
* 开发工具：https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html
* 更多资料：https://github.com/Aufree/awesome-wechat-weapp
* flex布局
  * 语法篇：http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
  * 实例篇：http://www.ruanyifeng.com/blog/2015/07/flex-examples.html
* 分页的部分样式参考：http://weui.io

> 版本号命名规则 vX.Y.Z
> 
> X: 主版本号, Y: 次版本号, Z: 修订号
> 
> 修饰后缀词(可选) - alpha: 内部版本, beta: 测试版, 无(默认): 正式版

## We重邮第1版(v1)计划

### 功能及页面
> 共17个页面，3个主tabnav页面
>
> `✘`表示无该任务、`✔`表示已完成、`~`表示需要修改或待完善、`.`表示错误情况已考虑

| 编号 | 功能        | 路径                        | 设计初稿 | 页面重构 | 后端接口 | 数据交互 | 进入测试 | 微调联调 |
|:---:| ----------- | -------------------------- |:-------:|:------:|:-------:|:-------:|:------:|:------:|
| 1   | **【主页】** | pages/index/index(.wxml)   | ✔       | ✔      | ✘       | ✔.      | ✔      |        |
| 10  | 课表查询     | pages/core/kb/kb           | ✔       | ✔      | ✔       | ✔       |        |        |
| 11  | 成绩查询     | pages/core/cj/cj           | ✔       | ✔      | ✔       | ✔.      | ✔      |        |
| 12  | 考试安排     | pages/core/ks/ks           | ✔       | ✔      | ✔~      | ✔.      | ✔      |        |
| 13  | 空教室查询   | pages/core/kjs/kjs         | ✔       | ✔      | ✔~      | ✔.      | ✔      |        |
| 14  | 学生查询     | pages/core/xs/xs           | ✔       | ✔      | ✔       | ✔.      | ✔      |        |
| 15  | 一卡通       | pages/core/ykt/ykt         | ✔       | ✔      | ✔       | ✔.      | ✔      |        |
| 16  | 借阅信息     | pages/core/jy/jy           | ✔       | ✔      | ✔       | ✔.      | ✔      |        |
| 17  | 学费信息     | pages/core/xf/xf           | ✔       | ✔      | ✔       | ✔.      | ✔      |        |
| 18  | 水电费查询   | pages/core/sdf/sdf         | ✔       | ✔      | ✔~      | ✔.      | ✔      |        |
| 19a | 物业报修 列表 | pages/core/bx/bx           | ✔       | ✔      | ✔       | ✔.      | ✔      |        |
| 19b | 物业报修 申请 | pages/core/bx/bx_apply     | ✔       | ✔      | ✔       | ✔.      | ✔      |        |
| 19c | 物业报修 详情 | pages/core/bx/bx_detail    | ✔       | ✔      | ✔       | ✔.      | ✔      |        |
| 2   | **【资讯】** | pages/news/news            | ✔       | ✔      | ✔~      | ✔.      | ✔      |        |
|     |教务公告/OA公告/会议通知/学术讲座/综合新闻|(同上)| ✘       | ✘      | ✔       | ✘      | ✘      | ✘      |
| 20  | 资讯详情     | pages/news/detail          | ✔       | ✔      | ✔~      | ✔.      | ✔      |        |
| 3a  | **【更多】** | pages/more/more            | ✔       | ✔      | ✘       | ✔.      | ✔      |        |
|     | 用户信息     | (同上)                      | ✘       | ✘      | ✔       | ✘       | ✘      | ✘      |
| 3b  | 绑定用户     | pages/more/login           | ✔~       | ✔     | ✔       | ✔       |        |        |
| 3c  | 完善信息     | pages/more/append          | ✘       | ✔      |         |         |        |        |
|     | 寝室绑定     | (同上)                      | ✘       | ✘      | ✘       | ✘       | ✘      | ✘      |
| 30  | 关于        | pages/more/about           | ✔       |        | ✘       | ✘        |        |        |
|     | 反馈        | (利用github api new-issue)  | ✔       |        |         |          |        |        |
|     | Logo       |  -                         | ✔       | ✘      | ✘       | ✘        | ✘      | ✔      |

> 页面主色调
>
> * 绿：`#7acfa6`
>
> * 蓝：`#73b4ef`
>
> * 紫：`#9f8bea`
>
> * 红：`#e78ab0`
>
> * 黄：`#ffcb63`

### 分工
> 期限安排：
> 
> * 开发周期：2016.10.08 ~ 2016.11.28
>
> * 测试微调：2016.11.12 ~ 2016.11.29 (陆续进入测试微调)
>
> * 开启内测：2016.12.01 发布v0.1.0 alpha
>
> * 开启公测：2016.12.12 (计划) 发布v0.2.0 beta
>
> * 发布正式版：2017.1.1 (计划) 发布v1.0.0

| who    | todo                  |
|:------:| --------------------- |
| 闵聪    | 项目架构，页面1、2、3    |
| 莫梦竟成 | 视觉设计交互（主页面）    |
| 杨奇奇   | 视觉设计交互（分页面）    |
| 刘浩     | 后台接口完善（基于i重邮） |
| 宋思辰   | 页面10、11、12          |
| 吴鹏举   | 页面13、14、18          |
| 苏丹     | 页面15、16、17         |
| 王晓宇   | 页面19a、19b、19c      |
| 莫小君   | 页面20、30             |

## 开发
> 每个人创建自己的分支进行开发，开发完成后再通过pull request至master分支。

#### 1、clone代码
```
$ git clone git@github.com:lanshan-studio/wecqupt.git
```
```
$ cd wecqupt
```
```
$ git remote add origin git@github.com:lanshan-studio/wecqupt.git
```

#### 2、在master主分支的基础上创建并切换你自己的分支
```
[master]:$ git checkout -b 你的分支名
```
```
[你的分支]:$ 
```

#### 3、打开微信web开发者工具，并添加项目
* **AppID**
* **项目名称** 填写为 We重邮
* **项目目录** 选择clone出的git仓库

#### 开发注意：
* 只能使用flex布局，不懂时多问下
* 注意代码可维护性，写优雅的代码和注释
* 多浏览参考资料，注意项目仓库动态
* 常更新master至你自己的分支

---

## 提交
> 每个人创建自己的分支进行开发，开发完成后再通过pull request至master分支。

#### 1、将master更新至你自己的分支
【有重大更新时才执行】
* 在github上进行create pull request，进行如下选择：
  * base: 你的分支
  * compare: master
* 自己同意 pull request
* 将远程自己分支pull
```
[你的分支]:$ git pull origin 你的分支名
```

#### 2、提交你的代码至github
```
[你的分支]:$ git push origin 你的分支名
```

#### 3、开发完成后，提交你的代码至master

* 在github上进行create pull request，进行如下选择：
  * base: master
  * compare: 你的分支
* 等待项目管理员review代码，并同意pull request