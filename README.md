# mobile

## 多语言支持相关数据结构

### 语言相关全局变量
> Sample Code
```js
//app.js
App({
  onLaunch: function () {
    //进入应用时检查语言设置
    var language = wx.getStorageSync('selectedLanguage');
    if(language){
      this.globalData.settings.language = language;
    }else{
      //TODO 使用系统语言设定 user-info COUNTRY      
      this.globalData.settings.language = 0; //暂时默认为中文 
    },
  globalData:{
    settings:{
      language: null
    },
    userInfo:null
  }
})
```
- App启动时读取LocalStorage, 取得当前语言设置, 并写入全局变量
- 各页面通过读取全局变量 ```settings.language``` 来确定当前使用语言


### Setting界面
> Sample Code
```js
  // pages/settings/settings.js
  languages: ["简体中文", "English"], // "繁体中文", "日本語" may be supported in the future
```
### [Picker组件](https://mp.weixin.qq.com/debug/wxadoc/dev/component/picker.html)

> Sample Code

```js
  // pages/timecard/normal/normal.js
  checkType: [
    [{id: "clockIn", msg: "上班"}, {id: "clockOut", msg: "下班"}]                 // Simplified Chinese Support
    ,[{id: "clockIn", msg: "Clock In"}, {id: "clockOut", msg: "Clock Out"}]      // English Support
    ,[......]                                                                    // Other possible languages
  ]
```
