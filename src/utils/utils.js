function login(that, flag, func) {
  console.log(new Date().getTime())
  wx.login({
    success: function (res) {
      var code = res.code;
      // wx.setStorageSync('code', res.code)
      wx.getUserInfo({
        lang: "zh_CN",
        success: function (res) {
          console.log(new Date().getTime())
          var key = {};
          key.encryptedData = res.encryptedData
          key.iv = res.iv
          that.$store.state.board.nickName = res.userInfo.nickName;
          that.$store.state.board.avatarUrl = res.userInfo.avatarUrl;
          if(res.userInfo.avatarUrl){
            wx.getImageInfo({
              src: res.userInfo.avatarUrl,
              success: (res) => {
                that.$store.state.board.drawAvatarUrl = res.path;
              }
            })
          }
         var url = that.$store.state.board.urlHttp + '/wechatapi/service/newLogin';
          wx.request({
            url: url,
            method: "POST",
            data: {
              appid: that.$store.state.board.appid,
              secret: that.$store.state.board.secret,
              code: code,
              encryptedData: res.encryptedData,
              iv: res.iv
            },
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function (res) {
              if (res.data.success) {
                console.log(new Date().getTime())
                wx.hideLoading();
                that.$store.state.board.sessionID = res.data.sessionID
                var otherHelpId = that.$store.state.board.otherHelpId;
                var sessionID = that.$store.state.board.sessionID;
                console.log("111111")
                if (otherHelpId) {
                  func(sessionID, otherHelpId)
                } else {
                  var sessionID = that.$store.state.board.sessionID;
                  if (!flag) {
                    console.log("assaaa")
                    func(sessionID);
                  }

                }

              }
            }
          })
          // wx.request({
          //   url: url,
          //   method: "POST",
          //   data: {appid: that.$store.state.board.appid, secret: that.$store.state.board.secret, code: code},
          //   header: {'content-type': 'application/x-www-form-urlencoded'},
          //   success: function (res) {
          //     if (res.data.success) {
          //       // wx.setStorageSync('sessionID', )
          //       that.$store.state.board.sessionID = res.data.sessionID
          //       var sysUrl = that.$store.state.board.urlHttp+ '/wechatapi/service/syncUser?encryptedData=' + encodeURIComponent(key.encryptedData) + '&iv=' + encodeURIComponent(key.iv) + '&sessionID=' + res.data.sessionID;
          //      wx.request({
          //         url: sysUrl,
          //         success: function (res) {
          //           if (res.data.success) {
          //             // var currentPages = wx.getStorageSync('currentPages')
          //             // that.$store.state.board.headPic=[]
          //             var otherHelpId =  that.$store.state.board.otherHelpId;
          //             var actId =  that.$store.state.board.actId;
          //             var sessionID =  that.$store.state.board.sessionID;
          //             if (otherHelpId) {
          //               if(flag){
          //                 func(sessionID,otherHelpId)
          //               }else{
          //                 func(sessionID,actId,otherHelpId)
          //               }
          //             } else {
          //               var actId =  that.$store.state.board.actId;
          //               var sessionID =  that.$store.state.board.sessionID;
          //               if(!flag){
          //                 func(sessionID,actId);
          //               }
          //
          //             }
          //
          //           }
          //         }
          //       })
          //     }
          //   }
          // })
        }
      })
    }
  })
}

module.exports = {
  login: login,
  cutOutSubString:cutOutSubString,
  modelT:modelT
}
//(串,长度,增加...)
function cutOutSubString(str, len, hasDot){
  var newLength = 0;
  var newStr = "";
  var chineseRegex = /[^\x00-\xff]/g;
  var singleChar = "";
  var strLength = str.replace(chineseRegex, "**").length;
  for (var i = 0; i < strLength; i++) {
    singleChar = str.charAt(i).toString();
    if (singleChar.match(chineseRegex) != null) {
      newLength += 2;
    }
    else {
      newLength++;
    }
    if (newLength > len) {
      break;
    }
    newStr += singleChar;
  }

  if (hasDot && strLength > len) {
    newStr += "...";
  }
  return newStr;
}
function modelT(msg) {
  if (!msg) {
    msg = "数据请求失败，请稍后再试。"
  }
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  })
}
