<template>
  <div class="vist-userInfo">
    <div class="containes">
      <span class="activeRule" @click="activeRules" :class="{rulesCondition:rulesOfActivity===false}">活动规则</span>
      <img :src="goLink" alt="">
    </div>
    <div class="record" :class="{rewardCondition:rulesOfActivity===true}">
      <div class="recordTitle">
        <p>
          <span @click="activeRules">活动规则</span>
          <span class="verLine">  </span>
          <span @click="exchangeProcess">兑换流程</span>
        </p>
      </div>

      <div class="invitation">
        <div class="helpZero" v-if="headPic.length==0">
          <img class="noneImg" src="/static/img/none.png" alt="">
          <p>还没有人助力</p>
        </div>
        <div class="helpPeo" v-else-if="headPic.length<=partakeNums">
          <p><span class="helpNum"> {{headPic.length}}</span><br/>邀请记录</p>
          <!--<span class="helpText">邀请记录</span>-->
          <scroll-view scroll-y>
            <p class="helpUserImg">
              <img :src="item.img" v-for="(item,index) in headPic" :key="index" alt="">
            </p>
          </scroll-view>
          <p class="helpLackNum" v-if="headPic.length<partakeNums">还差（{{partakeNums - headPic.length}}）位</p>
          <p class="helpLackNum" v-else>助力完成</p>

        </div>
      </div>
    </div>
    <!--<div class="menu" >-->
    <div class="menu">
      <button class="menuss" open-type="getUserInfo" @getuserinfo="getUserInfoInvite"
              :class="{rewardCondition:getInfoInvite=='getInfoInvite'}" hover-class="hoverNone" hover-stay-time="800">
        {{btnText.bxt_invite}}
      </button>
      <div class="menus" @click="existDoHelps" :class="{rewardCondition:manIsFull=='manIsFull'}" hover-class="hoverNone"
           hover-stay-time="800">
        {{btnText.bxt_full}}
      </div>
      <button class="menus" @getuserinfo="bindGetUserInfo" :class="{rewardCondition:giveHelp=='giveHelp'}"
              open-type="getUserInfo" hover-class="hoverNone" hover-stay-time="800"> {{btnText.bxt_help}}
      </button>
      <div class="menus" @click="existDoHelps" :class="{rewardCondition:alreadyHelp=='alreadyHelp'}"
           hover-class="hoverNone" hover-stay-time="800">
        {{btnText.bxt_alhelp}}
      </div>
      <div class="menus" @click="continueHelp" :class="{rewardCondition:continueToInvite=='continueToInvite'}"
           hover-class="hoverNone" hover-stay-time="800">
        <span v-if="headPic.length==0">{{btnText.bxt_continue}}</span>
        <span v-else>{{btnText.bxt_continue1}}</span>

      </div>
      <div class="menus" @click="receiveAreward" :class="{rewardCondition:receiveReward=='receiveReward'}" hover-class="hoverNone" hover-stay-time="800">{{btnText.bxt_reward}}
      </div>
    </div>
    <div class="mask" :class="{menuStyle:checked == true}">
      <!--<div class="mask menuStyle">-->
      <div class="modelTask">
        <div style="">
          <!--<img src="/static/img/close.png" class="closeMask" @click="closeMash"/>-->
          <p class="modelTitle">{{contentTitle}}</p>
          <p class="modelContent">
            {{contentHead}}
          </p>
          <span class="codes" @longtap="copyTBL">
                {{contentMid}}
          </span>
          <p class="copy" @longtap="copyTBL"> （长按复制）</p>
          <p class="copy">
            {{contentFoot}}
          </p>
          <!--<div class="btn" @click="receiveFood">去绑定</div>-->
          <div class="btn modelMyHelp" @click="existDoHelps">{{contentBtn}}</div>
        </div>
      </div>
    </div>
    <div class="maskRule" :class="{menuStyle:checkedRule == true}">
      <!--<div class="maskRule menuStyle">-->
      <div class="modelTask">
        <div style="">
          <p class="maskClose" @click="closeMash">
            <img src="/static/img/close.png" class="closeMask"/>
          </p>
          <p class="modelTitle">{{contentTitle}}</p>
          <p class="modelContent">
            {{contentHead}}
          </p>
          <text class="codes" @longtap="copyTBL">
            {{contentMid}}
          </text>
          <p class="copy" @longtap="copyTBL">（长按复制）</p>
          <p class="copy">{{contentFoot}}</p>
        </div>
      </div>
    </div>
    <div class="maskRules" :class="{menuStyle:checkedRules == true}">
      <!--<div class="maskRules menuStyle" >-->
      <div class="modelTask">
        <div style="">
          <p class="maskClose" @click="closeMash">
            <img src="/static/img/close.png" class="closeMask"/>
          </p>
          <p class="modelTitle">活动规则</p>
          <img src="/static/img/line.png" class="lines" alt="" style="">
          <scroll-view scroll-y>
            <p v-html="actRule"></p>
          </scroll-view>
        </div>
      </div>
    </div>
    <div class="exchangeProces" :class="{menuStyle:exchangeProc == true}">
      <!--<div class="exchangeProcess menuStyle">-->
      <div class="modelTask">

        <div style="">
          <p class="maskClose" @click="closeMash">
            <img src="/static/img/close.png" class="closeMask"/>
          </p>
          <p class="modelTitle">兑换流程</p>
          <img src="/static/img/line.png" class="lines" alt="" style="">
          <scroll-view scroll-y>
            <p v-html="exchangeRule">
            </p>
          </scroll-view>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
  import utils from "../../utils/utils.js";

  export default {
    data() {
      return {
        actRule: '',  //活动规则
        exchangeRule: '', //兑换流程
        arrImage: [],
        rulesOfActivity: '',
        exithelpId: '',
        contactsCondition: '',
        commandText: '',
        contentTitle: '', //领取奖励标题
        contentHead: '', //领取奖励头部
        contentMid: '', //领取奖励中部
        contentFoot: '', //领取奖励脚部
        contentBtn: '', //领取奖励按钮
      }
    },
    onLoad(option) {
      console.log(option)
      var that = this
      that.$store.state.board.otherHelpId = ''
      that.$store.state.board.myHelpId = ''
      if (option.helpId) {
        that.$store.state.board.otherHelpId = option.helpId
      }
      if (option.actId) {
        that.$store.state.board.actId = option.actId
      }

    },
    onShow(option) {
      var that = this
      that.$store.state.board.checked = false;
      that.$store.state.board.checkedRule = false;
      that.$store.state.board.checkedRules = false;
      that.$store.state.board.exchangeProcess = false;
      that.$store.state.board.existDoHelp = ''
      that.$store.state.board.myExistDoHelp = ''
      that.exithelpId = ''
      that.rulesOfActivity = ''
      that.contactsCondition = ''
      that.commandText = ''


      var sysUrl = that.$store.state.board.urlHttp + '/wechatapi/nologin/activity/getCurrentActivityInfo';
      console.log(new Date().getTime())
      wx.request({
        url: sysUrl,
        method: "POST",
        data: {appid: that.$store.state.board.appid},
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function (res) {
          console.log(new Date().getTime())
          if (res.data.success) {
            that.$store.state.board.actId = res.data.actId;
            that.$store.state.board.goLink = that.$store.state.board.urlHttp + res.data.url;
            that.actRule = res.data.actRule;
            that.exchangeRule = res.data.exchangeRule;
            that.$store.state.board.actShareTitle = res.data.actShareTitle;
            that.$store.state.board.actTitle = res.data.actTitle;
            that.$store.state.board.partakeNums = res.data.partakeNum;
            that.$store.state.board.btnText = res.data.btnText;
            that.$store.state.board.actShareCopywriting = res.data.actShareCopywriting;
            wx.setNavigationBarTitle({
              title: res.data.actTitle
            })
            if (res.data.url) {
              wx.getImageInfo({
                src: that.$store.state.board.goLink,
                success: (res) => {
                  that.$store.state.board.drawPoster = res.path;
                }
              })
            }
            // // 查看是否授权
            wx.getSetting({
              success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                  var otherHelpId = that.$store.state.board.otherHelpId
                  // var sessionID = wx.getStorageSync('sessionID')
                  if (otherHelpId) {
                    var sysUrl = that.$store.state.board.urlHttp + '/wechatapi/nologin/help/findHelpDetailUserList';
                    wx.request({
                      url: sysUrl,
                      method: "POST",
                      data: {helpId: otherHelpId},
                      header: {'content-type': 'application/x-www-form-urlencoded'},
                      success: function (res) {
                        that.$store.state.board.headPic = [];
                        if (res.data.success) {
                          // this.friendsNum = res.data.data.length;
                          that.headPicArr(that, res.data.data)
                        }
                        utils.login(that, true, function (sessionID, otherHelpId) {
//                    var myHelpId = wx.getStorageSync('myHelpId');
                          var actId = that.$store.state.board.actId;
                          wx.request({
                            url: that.$store.state.board.urlHttp + "/wechatapi/help/existDoHelpByActId",
                            method: "POST",
                            data: {actId: actId, sessionID: sessionID, helpId: otherHelpId,},
                            header: {'content-type': 'application/x-www-form-urlencoded'},
                            success: function (res) {
                              that.$store.state.board.checked = false
                              if (res.data.success) {
                                if (res.data.commandType == 2) {
                                  // that.commandText = res.data.command;
                                  if (res.data.rewardActContent) {
                                    that.contentTitle = res.data.rewardActContent.contentTitle;
                                    that.contentHead = res.data.rewardActContent.contentHead;
                                    that.contentMid = res.data.rewardActContent.contentMid;
                                    that.contentFoot = res.data.rewardActContent.contentFoot;
                                    that.contentBtn = res.data.rewardActContent.contentBtn;
                                    that.$store.state.board.checked = true
                                  }

                                }
                                that.$store.state.board.existDoHelp = false
                                that.$store.state.board.myExistDoHelp = true
                                that.exithelpId = true;
                                that.rulesOfActivity = true;
                              } else {
                                if (res.data.code == '102') {
                                  that.$store.state.board.existDoHelp = true;
                                  that.$store.state.board.myExistDoHelp = false;
                                  that.exithelpId = true;
                                  that.rulesOfActivity = true;
                                  that.$store.state.board.myHelpId = otherHelpId;
                                  console.log(that.$store.state.board.myHelpId)
                                } else {
                                  that.$store.state.board.existDoHelp = true
                                  that.$store.state.board.myExistDoHelp = true
                                  that.exithelpId = true;
                                  that.rulesOfActivity = true;
                                }
                              }
                            }
                          })
                        })
                      }
                    })


                  }
                  else {
                    utils.login(that, false, function (sessionID, actId) {
                      wx.request({
                        url: that.$store.state.board.urlHttp + "/wechatapi/help/findHelpDetailUserList",
                        // url: "http://10.29.74.223:8888/wechatapi/help/findHelpDetailUserList",
                        method: "POST",
                        data: {actId: actId, sessionID: sessionID},
                        header: {'content-type': 'application/x-www-form-urlencoded'},
                        success: function (res) {
                          console.log(new Date().getTime())
                          that.$store.state.board.headPic = [];
                          if (res.data.success) {
                            that.$store.state.board.myHelpId = res.data.helpId;
                            if (res.data.data) {
                              that.headPicArr(that, res.data.data)
                            }
                            that.$store.state.board.myExistDoHelp = false
                            that.$store.state.board.existDoHelp = true
                            that.exithelpId = true;
                            that.rulesOfActivity = true;
                          }
                          else {
                            that.exithelpId = false;
                            that.rulesOfActivity = false;
                            that.$store.state.board.existDoHelp = true
                            that.$store.state.board.myExistDoHelp = false
                          }
                        }
                      })
                    })
                  }
                }
                else {
                  var otherHelpId = that.$store.state.board.otherHelpId
                  if (otherHelpId) {
                    var sysUrl = that.$store.state.board.urlHttp + '/wechatapi/nologin/help/findHelpDetailUserList';
                    wx.request({
                      url: sysUrl,
                      method: "POST",
                      data: {helpId: otherHelpId},
                      header: {'content-type': 'application/x-www-form-urlencoded'},
                      success: function (res) {
                        that.$store.state.board.headPic = [];
                        if (res.data.success) {
                          // this.friendsNum = res.data.data.length;
                          that.headPicArr(that, res.data.data)
                        }
                        that.exithelpId = true;
                        that.rulesOfActivity = true;
                        that.$store.state.board.existDoHelp = true
                        that.$store.state.board.myExistDoHelp = true
                      }
                    })
                  } else {
                    that.exithelpId = false;
                    that.rulesOfActivity = false;
                    that.$store.state.board.existDoHelp = true
                    that.$store.state.board.myExistDoHelp = false
                  }
                }
              }
            })
          }
        }
      })

      wx.getSystemInfo({
        success: (res) => {
          this.$store.state.board.windowWidth = res.windowWidth;
          this.$store.state.board.windowHeight = res.windowHeight
        }
      })

    },
    onReady(option) {
      console.log(option)
    },
    onShareAppMessage(res) {
      var that = this;
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      var actId = this.$store.state.board.actId
      var helpId = this.$store.state.board.myHelpId
      var path = "/pages/activePower/main";

      if (actId && helpId) {
        path = path + "?actId=" + actId + "&helpId=" + helpId
      } else {
        path = path + "?actId=" + actId
      }
      return {
        title: that.$store.state.board.actShareTitle,
        path: path,
        success: function () {

        }
      }

    },
    methods: {
      ddddd() {
        wx.redirectTo({
          url: '/pages/authorize/main'
        })
      },
      getUserInfoInvite() {
        this.myToHelp()
      },
      bindGetUserInfo() {
        this.continueToHelp()
      },
      continueToHelp() {
        var that = this;
        utils.login(that, false, function (sessionID, actId, otherHelpId) {
          wx.request({
            url: that.$store.state.board.urlHttp + "/wechatapi/help/clickHelpUrl",
            method: "POST",
            data: {helpId: otherHelpId, sessionID: sessionID},
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function (res) {
              if (res.data.success) {
                var sysUrl = that.$store.state.board.urlHttp + '/wechatapi/nologin/help/findHelpDetailUserList';
                //刷新列表
                wx.request({
                  url: sysUrl,
                  method: "POST",
                  data: {helpId: otherHelpId},
                  header: {'content-type': 'application/x-www-form-urlencoded'},
                  success: function (res) {
                    that.$store.state.board.headPic = []
                    if (res.data.success) {
                      that.headPicArr(that, res.data.data)
                    }
                  }
                })
                //奖励
                wx.request({
                  url: that.$store.state.board.urlHttp + "/wechatapi/help/getRewardActCommandByOther",
                  method: "POST",
                  data: {sessionID: sessionID, actId: actId},
                  header: {'content-type': 'application/x-www-form-urlencoded'},
                  success: function (res) {
                    if (res.data.success) {
                      // contentTitle:'', //领取奖励标题
                      //   contentHead:'', //领取奖励头部
                      //   contentMid:'', //领取奖励中部
                      //   contentFoot:'', //领取奖励脚部
                      //   contentBtn:'', //领取奖励按钮
                      if (res.data.rewardActContent) {
                        that.contentTitle = res.data.rewardActContent.contentTitle;
                        that.contentHead = res.data.rewardActContent.contentHead;
                        that.contentMid = res.data.rewardActContent.contentMid;
                        that.contentFoot = res.data.rewardActContent.contentFoot;
                        that.contentBtn = res.data.rewardActContent.contentBtn;
                        that.$store.state.board.checked = true
                      }
                    } else {
                      wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 2000
                      })
                    }
                    that.$store.state.board.existDoHelp = false
                    that.$store.state.board.myExistDoHelp = true
                  }
                })

                //埋点
                wx.request({
                  url:  that.$store.state.board.urlHttp + "/wechatapi/help/getRewardActCommandOpenWindowByOther",
                  method: "POST",
                  data: {sessionID: sessionID,actId:actId},
                  header: {'content-type': 'application/x-www-form-urlencoded'},
                  success: function (res) {
                    if (res.data.success) {

                    }else{
                      wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 2000
                      })
                    }
                  }
                })
              }
            }
          })


        });
      },
      continueHelp() {
        var actId = this.$store.state.board.actId;
        var sessionID = this.$store.state.board.sessionID;
        var that = this;
        wx.request({
          url: that.$store.state.board.urlHttp + "/wechatapi/help/getHelpId",
          method: "POST",
          data: {sessionID: sessionID, actId: actId},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            if (res.data.success) {

              that.$store.state.board.myHelpId = res.data.helpId
              wx.redirectTo({
                url: '/pages/showPages/main?actId=' + actId + "&helpId=" + res.data.helpId
              })
            }
          }
        })
      },
      myToHelp() {
        var that = this;
        utils.login(that, false, function (sessionID, actId) {
          if (actId) {
            wx.request({
              url: that.$store.state.board.urlHttp + "/wechatapi/help/execuHelp",
              method: "POST",
              data: {sessionID: sessionID, actId: actId},
              header: {'content-type': 'application/x-www-form-urlencoded'},
              success: function (res) {
                if (res.data.success) {
                  that.$store.state.board.myHelpId = res.data.helpId
                  wx.redirectTo({
                    url: '/pages/showPages/main?actId=' + actId + "&helpId=" + res.data.helpId
                  })
                }
              }
            })
          }
        });
      },
      wantActivity() {
        var actId = this.$store.state.board.actId;
        var myHelpId = this.$store.state.board.myHelpId;
        wx.redirectTo({
          url: '/pages/instrustor/main?actId=' + actId + "&helpId=" + myHelpId
        })
      },
      receiveAreward() {
        var that = this;
        var myHelpId = that.$store.state.board.myHelpId;
        var sessionID = that.$store.state.board.sessionID;
        wx.request({
          url: that.$store.state.board.urlHttp + "/wechatapi/help/getRewardActCommand",
          method: "POST",
          data: {sessionID: sessionID, helpId: myHelpId},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            if (res.data.success) {
              if (res.data.rewardActContent) {
                that.contentTitle = res.data.rewardActContent.contentTitle;
                that.contentHead = res.data.rewardActContent.contentHead;
                that.contentMid = res.data.rewardActContent.contentMid;
                that.contentFoot = res.data.rewardActContent.contentFoot;
                that.contentBtn = res.data.rewardActContent.contentBtn;
                that.$store.state.board.checkedRule = true
              }
              wx.request({
                url: that.$store.state.board.urlHttp + "/wechatapi/help/getRewardActCommandOpenWindow",
                method: "POST",
                data: {helpId: myHelpId, sessionID: sessionID},
                header: {'content-type': 'application/x-www-form-urlencoded'},
                success: function (res) {
                  console.log(res)
                  if (res.data.success) {

                  } else {
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'none',
                      duration: 2000
                    })
                  }
                }
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      },
      closeMash() {
        this.$store.state.board.checkedRule = false
        this.$store.state.board.checked = false
        this.$store.state.board.checkedRules = false
        this.$store.state.board.exchangeProcess = false;
      },
      receiveFood() {
        var that = this;
        that.$store.state.board.checked = false;
      },
      exchangeProcess() {
        var that = this;
        that.$store.state.board.exchangeProcess = true;
      },
      existDoHelps() {
        var that = this;
        that.$store.state.board.existDoHelp = ''
        that.$store.state.board.myExistDoHelp = ''
        this.$store.state.board.otherHelpId = ''
        var actId = that.$store.state.board.actId;
        var sessionID = that.$store.state.board.sessionID;
        wx.request({
          url: that.$store.state.board.urlHttp + "/wechatapi/help/findHelpDetailUserList",
          method: "POST",
          data: {actId: actId, sessionID: sessionID},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            console.log(new Date().getTime())
            that.$store.state.board.headPic = [];
            if (res.data.success) {
              that.$store.state.board.myHelpId = res.data.helpId;
              that.headPicArr(that, res.data.data)
              that.$store.state.board.myExistDoHelp = false
              that.$store.state.board.existDoHelp = true
              that.exithelpId = true;
              that.rulesOfActivity = true;
              that.$store.state.board.checked = false;
            }
            else {
              that.exithelpId = false;
              that.rulesOfActivity = false;
              that.$store.state.board.existDoHelp = true
              that.$store.state.board.myExistDoHelp = false
              that.$store.state.board.checked = false;
            }
          }
        })
      },
      nextMyToHelp() {

        var actId = this.$store.state.board.actId;
        var otherHelpId = this.$store.state.board.otherHelpId;
        if (otherHelpId) {
          wx.redirectTo({
            url: '/pages/showPages/main?actId=' + actId + "&helpId=" + otherHelpId
          })
        } else {
          wx.redirectTo({
            url: '/pages/showPages/main?actId=' + actId
          })
        }
      },
      activeRules() {
        var that = this;
        that.$store.state.board.checkedRules = true
      },
      headPicArr(that, headPic) {
        for (var i = 0; i < headPic.length; i++) {
          that.$store.state.board.headPic.push({
            img: headPic[i].avatarUrl,
            name: headPic[i].nickName.length > 10 ? headPic[i].nickName.slice(0, 9) + '...' : headPic[i].nickName
          })
        }
      },
      copyTBL(e) {
        var self = this;
        var dataSet = self.contentMid;
        wx.setClipboardData({
          data: dataSet,
          success: function (res) {
            if (res.errMsg == 'setClipboardData:ok') {
              wx.showToast({
                title: '复制成功',
                icon: 'success',
                duration: 1500
              })
            } else {
              wx.showToast({
                title: '复制失败，请重新复制',
                icon: 'success',
                duration: 1500
              })
            }
          }
        });

      }
    },

    created() {
    },
    computed: {
      headPic() {
        return this.$store.state.board.headPic
      },
      goLink() {
        return this.$store.state.board.goLink
      },
      checked() {
        return this.$store.state.board.checked
      },
      checkedRule() {
        return this.$store.state.board.checkedRule
      },
      checkedRules() {
        return this.$store.state.board.checkedRules
      },
      exchangeProc() {
        return this.$store.state.board.exchangeProcess
      },
      myExistDoHelp() {
        return this.$store.state.board.myExistDoHelp
      },
      existDoHelp() {
        return this.$store.state.board.existDoHelp
      },
      partakeNums() {
        return this.$store.state.board.partakeNums
      },
      btnText() {
        return this.$store.state.board.btnText
      },
      getInfoInvite() {
        if (this.exithelpId === false) {
          return 'getInfoInvite';
        } else {
          return ""
        }
      },
      manIsFull() {
        if (this.headPic.length >= this.partakeNums && this.myExistDoHelp === true && this.existDoHelp === true && this.exithelpId) {
          return 'manIsFull';
        } else {
          return ""
        }
      },
      giveHelp() {
        if (this.headPic.length < this.partakeNums && this.myExistDoHelp === true && this.existDoHelp === true && this.exithelpId) {
          return 'giveHelp';
        } else {
          return ""
        }
      },
      alreadyHelp() {
        if (this.myExistDoHelp === true && this.existDoHelp === false && this.exithelpId) {
          return 'alreadyHelp';
        } else {
          return ""
        }
      },
      continueToInvite() {
        if (this.headPic.length < this.partakeNums && this.myExistDoHelp === false && this.exithelpId) {
          return 'continueToInvite';
        } else {
          return ""
        }
      },
      receiveReward() {
        if (this.headPic.length >= this.partakeNums && this.myExistDoHelp === false && this.exithelpId) {
          return 'receiveReward';
        } else {
          return ""
        }
      }
    },
    mounted() {
    }

  }
</script>

<style lang="scss" scoped>
  .vist-userInfo {
    font-size: 22px;
    width: 100%;
    height: 100%;
    .containes {
      width: calc(100% - 24px);
      height: calc(100% - 80px);
      padding: 12px;
      .contacts {
        position: fixed;
        top: 10px;
        right: 10px;
        display: none;
        width: 65px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
        background-color: rgba(16, 16, 16, 0.5);
        color: #fff;
        border-radius: 15px;
      }
      button.contactsCondition {
        display: block;
      }
      .activeRule {
        position: fixed;
        top: 24px;
        right: 24px;
        display: none;
        width: 75px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        font-size: 13px;
        background-color: rgba(0, 0, 0, 0.44);
        color: #fff;
        border-radius: 13px;
      }
      span.activeRule.rulesCondition {
        display: inline-block;
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
    }
    .record {
      position: fixed;
      bottom: 0px;
      left: 12px;
      width: calc(100% - 24px);
      /*padding: 12px;*/
      height: 310px;
      /*color: #EF6D00;*/
      margin: 0 auto;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, .3);
      /*padding-bottom: 4px;*/
      display: none;
      .recordTitle {
        color: #9397A4;
        font-size: 14px;
        text-align: center;
        margin-bottom: 15px;
        margin-top: 10px;
        padding: 0 10px;
        .verLine {
          display: inline-block;
          position: relative;
          top: 5px;
          width: 1px;
          height: 19px;
          margin: 0 20px;
          border-left: 1px solid #CED0D5;
        }
      }
      .invitation {
        text-align: center;
        padding: 0 10px;
        margin-top: 20px;
        .helpZero {
          img {
            display: block;
            margin: 0 auto;
          }
          .noneImg {
            width: 182px;
            height: 121px;
          }
          .noneTextImg {
            margin-top: 8px;
            width: 134px;
            height: 12px;
          }
          p {
            margin-top: 5px;
            font-size: 14px;
            color: #A5A5A5;
          }
        }
        .helpPeo {
          text-align: center;
          color: #F05522;
          font-size: 14px;
          .helpNum {
            font-size: 28px;
          }
          scroll-view{
            height: 80px;
            .helpUserImg {
              margin-top: 15px;
              img {
                width: 55px;
                height: 55px;
                border-radius: 50%;
                display: inline-block;
                margin: 0 4px;
                border: 1px solid #F05522;
              }
            }
          }

          .helpLackNum {
            color: #4A4A4A;
            margin-top: 22px;
          }
        }
      }
      .noHelp {
        text-align: center;
        color: #575757;
        font-size: 14px;
      }
    }
    div.record.rewardCondition {
      display: block;
    }
    .menu {
      width: 100%;
      position: fixed;
      bottom: 0px;
      /*background: #fff;*/
      text-align: center;
      z-index: 1000;
      padding-bottom: 14px;
      .menus {
        margin: 0 auto;
        width: 195px;
        height: 40px;
        display: none;
        background: #fff;
        border: 1px solid #F05522;
        font-size: 14px;
        color: #F05522;
        text-align: center;
        line-height: 40px;
        border-radius: 20px;
      }
      .menuss {
        margin: 0 auto;
        width: 270px;
        height: 40px;
        display: none;
        background: #EF6D00;
        font-size: 13px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 40px;
        border-radius: 24px;
        /*box-shadow: 0px 1px 1px 0px #EF6D00 ;*/
        border: none;
      }
      div.menus.rewardCondition, button.menus.rewardCondition {
        display: block;
      }
      button.menuss.rewardCondition {
        display: block;
      }
      .hoverNone {
        /*background-color: #ccc;*/
        pointer-events: none;
      }
    }
    .mask {
      display: none;
      width: calc(100% - 24px);
      height: 320px;
      position: fixed;
      bottom: -10px;
      left: 12.5px;
      z-index: 1000;
      /*padding: 0 7px;*/
      background: #fff;
      border-radius: 8px;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, .3);
      .modelTask {
        margin: 0 auto;
        /*margin-top: 30%;*/
        width: calc(100% - 50px);
        height: 100%;
        /*border-radius: 8px;*/
        background: #fff;
        div {
          padding: 0 10px;
          padding-top: 20px;
          position: relative;
          color: #4A4A4A;
          font-size: 12px;
          .modelTitle {
            text-align: center;
            font-size: 18px;
            color: #F05522;
            margin-bottom: 15px;
          }
          .modelContent {

            line-height: 24px;
            /*color: #4A4A4A;*/
            margin-top: 20px;
            font-weight: lighter;
            text-align: center;
            line-height: 17px;

          }
          .closeMask {
            position: absolute;
            top: 15px;
            right: 0px;
            width: 14px;
            height: 14px;
            /*font-size: 14px;*/
          }
          .codes {
            font-size: 15px;
            display: block;
            text-align: center;
            margin-top: 25px;
            line-height: 20px;
            font-weight: normal;
            border: 1px solid #ccc;
            /*font-weight: bold;*/
            padding: 8px 0px;
          }
          .copy {
            /*font-size: 15px;*/
            /*display: inline-block;*/
            text-align: center;
            font-weight: lighter;
            line-height: 17px;
            margin-top: 10px;
          }
          .btn {
            padding: 0px;
            width: 150px;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            text-align: center;
            color: #F05522;
            background: #FFF;
            border: 1px solid #F05522;
            border-radius: 20px;
            margin: 0 auto;
            margin-top: 22px;
          }
          .modelMyHelp {
            color: #EF6D00;
            background: #fff;
            border: 1px solid #EF6D00;
          }
        }

      }

    }
    .maskRule {
      display: none;
      width: calc(100% - 24px);
      height: 320px;
      position: fixed;
      bottom: -10px;
      left: 12.5px;
      z-index: 1000;
      /*padding: 0 7px;*/
      background: #fff;
      border-radius: 8px;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, .3);
      .modelTask {
        margin: 0 auto;
        /*margin-top: 30%;*/
        width: calc(100% - 50px);
        height: 100%;
        /*border-radius: 8px;*/
        background: #fff;
        div {
          padding: 0 10px;
          padding-top: 25px;
          position: relative;
          line-height: 17px;
          color: #4A4A4A;
          font-size: 12px;
          text-align: center;
          .modelTitle {

            font-size: 18px;
            color: #F05522;
            margin-bottom: 15px;
          }

          .modelContent {
            margin-top: 25px;
            /*font-weight: lighter;*/
          }
          .maskClose {
            position: absolute;
            top: 12px;
            right: -9px;
            width: 30px;
            height: 30px;
            .closeMask {
              display: block;
              width: 14px;
              height: 14px;
              margin: 0 auto;
              margin-top: 8px;
            }
          }

          .codes {
            font-size: 15px;
            display: block;
            text-align: center;
            margin-top: 30px;
            line-height: 20px;
            font-weight: normal;
            border: 1px solid #ccc;
            /*font-weight: bold;*/
            padding: 8px 0px;
          }
          .copy {
            /*font-weight: lighter;*/
            /*display: inline-block;*/
            margin-top: 15px;
          }
        }

      }

    }

    .maskRules {
      display: none;
      width: 100%;
      height: 343px;
      position: fixed;
      bottom: -20px;
      left: 0px;
      z-index: 1000;
      background: url("../../../static/img/ruler.png");
      background-size: 100% 100%;
      .modelTask {
        width: calc(100% - 30px);
        height: calc(100% - 15px);
        margin: 0 auto;
        scroll-view {
          height: 240px;
        }
        div {
          padding: 30px;
          /*margin-left: 15px;*/
          position: relative;
          .modelTitle {
            text-align: center;
            font-size: 17px;
            color: #F05522;
            margin-top: 0px;
            /*margin-bottom: 15px;*/
          }
          .lines {
            width: 100%;
            height: 1px;
            display: block;
            margin: 10px 0px;
          }
          .modelContent {
            font-size: 14px;
            line-height: 18px;
            color: #4A4A4A;
            margin-top: 5px;
            font-weight: lighter;
            span {
              display: inline-block;
            }
            .modelNum {
              width: 7%;
              float: left
            }
            .modelTe {
              width: 92%;
            }
          }
          .maskClose {
            position: absolute;
            top: 18px;
            right: 5px;
            width: 30px;
            height: 30px;
            .closeMask {
              display: block;
              width: 14px;
              height: 14px;
              margin: 0 auto;
              margin-top: 8px;
            }
          }
        }

      }

    }

    .exchangeProces {
      display: none;
      width: 100%;
      height: 343px;
      position: fixed;
      bottom: -20px;
      left: 0px;
      z-index: 1000;
      background: url("../../../static/img/ruler.png");
      background-size: 100% 100%;
      .modelTask {
        margin: 0 auto;
        width: calc(100% - 30px);
        height: calc(100% - 15px);
        /*border-radius: 8px;*/
        /*background: #fff;*/
        scroll-view {
          height: 240px;
        }
        div {
          padding: 30px;
          /*margin-left: 15px;*/
          position: relative;
          p {
            font-size: 14px;
          }
          .modelTitle {
            text-align: center;
            font-size: 17px;
            color: #F05522;
            margin-top: 0px;
          }
          .lines {
            width: 100%;
            height: 1px;
            display: block;
            margin: 10px 0px;
          }
          .modelContent {
            font-size: 14px;
            line-height: 18px;
            color: #4A4A4A;
            margin-top: 5px;
            font-weight: lighter;
            span {
              display: inline-block;
            }
            .modelNum {
              width: 7%;
              float: left
            }
            .modelTe {
              width: 92%;
            }
          }
          .maskClose {
            position: absolute;
            top: 18px;
            right: 5px;
            width: 30px;
            height: 30px;
            .closeMask {
              display: block;
              width: 14px;
              height: 14px;
              margin: 0 auto;
              margin-top: 8px;
            }
          }
        }

      }

    }
    div.mask.menuStyle {
      display: block;
    }
    div.maskRule.menuStyle {
      display: block;
    }
    div.maskRules.menuStyle {
      display: block;
    }
    div.exchangeProces.menuStyle {
      display: block;
    }

  }
</style>
