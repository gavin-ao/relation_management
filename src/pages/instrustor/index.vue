<template>
  <div class="instructor-toueist">
    <div class="containes" >
      <span class="activeRule" @click="activeRules">活动规则</span>
      <img :src="goLink" alt="" style="">
    </div>
    <!--<div class="record">-->
      <!--<div class="invitation" v-if="headPic.length>0">-->
        <!--<p class="pRecord"><span>邀请记录</span>-->
        <!--</p>-->
        <!--<hr style=""/>-->
        <!--<p>累计邀请{{headPic.length}}位好友,为您助力{{headPic.length*10}}元代金券</p>-->
        <!--<div>-->
          <!--<p v-for="(item,index) in headPic" :key="index">-->
            <!--<img class="headImg" :src="item.img" alt="">-->
            <!--<span>{{item.name}} 为TA助力，增加10元</span>-->
          <!--</p>-->

          <!--<p v-if="headPic.length<5">-->
            <!--还差{{5 - headPic.length}}位-->
          <!--</p>-->
        <!--</div>-->

      <!--</div>-->
    <!--</div>-->
    <!--<button  v-if="headPic.length==0" open-type="getUserInfo"  @getuserinfo="bindGetUserInfo">邀请好友助力领取民宿优惠券</button>-->
    <button class="btn"  open-type="getUserInfo"  @getuserinfo="bindGetUserInfo">邀请好友助力领取民宿优惠券</button>
    <!--<button  v-if="headPic.length==0"  @click="touristLink">邀请好友助力领取民宿优惠券</button>-->
    <!--<button v-else-if="headPic.length<5"   @click="continueHelp">继续邀请</button>-->
    <!--&lt;!&ndash;<button v-else-if="headPic.length<5"  @click="touristLink">继续邀请</button>&ndash;&gt;-->
    <!--<button v-else @click="receiveAreward">领取奖励</button>-->

    <!--<div class="mask" :class="{menuStyle:checked == true}">-->
      <!--<div class="modelTask">-->
        <!--<div >-->
          <!--<p class="modelTitle">领取成功</p>-->
          <!--<p class="modelContent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;复制下列兑换码，打开途家APP，前往 我的→红包→添加红包，选择“兑换码兑换”-->
          <!--</p>-->
          <!--<p class="codes">-->
            <!--“EDFREO1236”-->
          <!--</p>-->
          <!--<p>长按复制</p>-->
          <!--<span class="closeMask" @click="closeMash">关闭</span>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="maskRule" :class="{menuStyle:checkedRule == true}">
      <div class="modelTask">
        <div style="">
          <img src="/static/img/close.png" class="closeMask" @click="closeMash"/>
          <p class="modelTitle">活动规则</p>
          <p class="modelContent">
            1. 邀请5位好友点击助力即可领取50元民宿代金券；
          </p>
          <p class="modelContent">
            2. 代金券以兑换码方式发放，领取后复制兑换码至途家app我的→红包→添加红包，选择“兑换码兑换”即可兑换；
          </p>
          <p class="modelContent">
            3. 兑换码有效期7天，代金券有效期3个月；
          </p>
          <p class="modelContent">
            4. 为好友助力也可以获得10元代金券，关注微信公众号绑定微信账号后自动发放。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .instructor-toueist {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-size: 14px;
    /*margin-bottom: 30px;*/
    .containes{
      width: 100%;
      height: calc(100% - 50px);
      .activeRule {
        position: fixed;
        top: 10px;
        right: 10px;
        display: inline-block;
        width: 90px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
        background-color: rgba(16, 16, 16, 0.5);
        color: #fff;
        border-radius: 15px;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }

    .btn {
      width: 100%;
      position: fixed;
      bottom: 0px;
      background-color: #EF6D00;
      color: #fff;
      font-size: 18px;
      border-radius: 0px;
      border: 0px;
      padding: 0px;
      height: 50px;
      line-height: 50px;
      z-index: 1000;
      text-align: center;
    }
    .record {
      width: 100%;
      color: #EF6D00;
      margin-bottom: 65px;
      .recordTitle {
        font-size: 12px;
        text-align: center;
        margin-bottom: 15px;
        padding: 0 10px;
      }
      .invitation {
        text-align: center;
        padding: 0 10px;
        p {
          margin-bottom: 10px;
          font-size: 12px;
        }
        .pRecord {
          font-size: 14px;
          font-weight: bold;
          span {
            background-color: #fff;
            z-index: 1000;
            display: inline-block;
            width: 75px;
            position: relative;
          }
        }
        hr {
          background-color: #FDC73F;
          height: 1px;
          width: 100%;
          position: relative;
          top: -18px;
        }
        div {
          margin-top: 10px;
          p {
            font-size: 14px;
          }
          span {
            display: inline-block;
            color: #101010;
          }
          .headImg {
            border: 1px dotted #ccc;
            width: 30px;
            height: 30px;
            border-radius: 15px;
            vertical-align: middle;
            margin-right: 10px;
          }
        }

      }
    }
    .mask {
      display: none;
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      background: rgba(84, 84, 84, .5);
      .modelTask {
        margin: auto;
        margin-top: 30%;
        width: 260px;
        height: 350px;
        border-radius: 10px;
        background: #fff;
        div {
          padding: 20px;
          p {
            text-align: center;
          }
          .modelTitle {
            font-size: 18px;
            color: #CBA567;
            margin-bottom: 15px;
          }
          .modelContent {
            font-size: 14px;
            line-height: 24px;
          }
          .codes {
            margin-top: 10px;
          }
          .closeMask {
            display: inline-block;
            width: 100%;
            height: 30px;
            line-height: 30px;
            font-size: 13px;
            color: #fff;
            background: rgba(16, 16, 16, 0.5);
            border: 1px solid rgba(16, 16, 16, 0.5);
            border-radius: 6px;
            margin-top: 15px;
          }
        }

      }

    }
    .maskRule {
      display: none;
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      background: rgba(84, 84, 84, .5);
      .modelTask {
        margin: auto;
        margin-top: 30%;
        width: 250px;
        height: 335px;
        border-radius: 10px;
        background: #fff;
        div {
          padding: 20px;
          position: relative;
          .modelTitle {
            text-align: center;
            font-size: 18px;
            color: #CBA567;
            margin-bottom: 15px;
          }
          .modelContent {
            font-size: 14px;
            line-height: 24px;
          }
          .closeMask {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 14px;
            height: 14px;
            font-size: 13px;
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
  }
</style>

<script>
  import utils from "../../utils/utils.js";
  export default {
    name: '',
    props: [],
    data() {
      return {
        checked: false,
        checkedRule: false
      }
    },
    onLoad(option){
      console.log(option)
      if(option.actives == '88'){
        var actId = wx.getStorageSync('actId');
        var sessionID = wx.getStorageSync('sessionID');
        wx.request({
          url: "https://www.hejinkai.com/wechatapi/help/getHelpId",
          method: "POST",
          data: {actId: actId, sessionID: sessionID},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            if (res.data.success) {
              wx.setStorageSync("myHelpId", res.data.helpId)
              var myHelpId = res.data.helpId
              console.log(res.data.helpId)
              if (res.data.helpId) {
                var sysUrl = 'https://www.hejinkai.com/wechatapi/nologin/help/findHelpDetailUserList';
                wx.request({
                  url: sysUrl,
                  method: "POST",
                  data: {helpId: res.data.helpId},
                  header: {'content-type': 'application/x-www-form-urlencoded'},
                  success: function (res) {
                    console.log(res);
                    that.$store.state.board.headPic = [];
                    if (res.data.success) {

                      // this.friendsNum = res.data.data.length;
                      for (var i = 0; i < res.data.data.length; i++) {
                        that.$store.state.board.headPic.push({
                          img: res.data.data[i].avatarUrl,
                          name: res.data.data[i].nickName
                        })
                      }
                    }
                    console.log(344444444)
                    that.$store.state.board.myExistDoHelp = false
                    wx.redirectTo({
                      url:'/pages/activePower/main?actId='+actId+"&helpId="+myHelpId
                    })
                  }
                })

              }
            }
          }
        })
      }

    },
    computed: {
      headPic() {
        return this.$store.state.board.headPic
      },
      goLink() {
        return this.$store.state.board.goLink
      }
    },
    methods: {
      bindGetUserInfo(){
        this.touristLink()
      },
      touristLink() {
        var that = this;
        utils.login(that,false,function (sessionID,actId) {
          if(actId){
            wx.request({
              url: "https://www.hejinkai.com/wechatapi/help/execuHelp",
              method: "POST",
              data: {sessionID: sessionID, actId: actId},
              header: {'content-type': 'application/x-www-form-urlencoded'},
              success: function (res) {
                if (res.data.success) {
                  wx.setStorageSync("myHelpId", res.data.helpId)
                  wx.redirectTo({
                    // url: '/pages/showPages/main'
                    url: '/pages/showPages/main?actId='+actId+"&helpId="+res.data.helpId
                  })
                }
              }
            })
          }
        });
      },
      continueHelp(){
        var actId = wx.getStorageSync('actId');
        var sessionID = wx.getStorageSync('sessionID');
        wx.request({
          url: "https://www.hejinkai.com/wechatapi/help/getHelpId",
          method: "POST",
          data: {sessionID: sessionID, actId: actId},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            if (res.data.success) {
              wx.setStorageSync("myHelpId", res.data.helpId)
              wx.redirectTo({
                // url: '/pages/showPages/main'
                url: '/pages/showPages/main?actId='+actId+"&helpId="+res.data.helpId
              })
            }
          }
        })
      },
      receiveAreward() {
        this.checked = true;
      },
      activeRules() {
        this.checkedRule = true
      },
      closeMash() {
        this.checkedRule = false
        this.checked = false;
      }

    },
    created() {
    },
    mounted() {
      var that = this;
      that.checked = false
      that.checkedRule = false
      wx.setNavigationBarTitle({
        title: "盛夏狂欢季"
      })

      wx.getSystemInfo({
        success: (res) => {
          this.$store.state.board.windowWidth = res.windowWidth;
          this.$store.state.board.windowHeight = res.windowHeight
        }
      })

      // var QQMapWX = require('../../../static/qqmap-wx-jssdk.min.js');
      // var qqmapsdk;
      // qqmapsdk = new QQMapWX({
      //   key: 'OISBZ-SUKW6-LJ7SS-MXQHI-GC5FF-CQBGM'
      // });
      // wx.getLocation({
      //   type: 'gcj02',
      //   altitude: true,
      //   success: (res) => {
      //     qqmapsdk.reverseGeocoder({
      //       location: {
      //         latitude: res.latitude,
      //         longitude: res.longitude
      //       },
      //       success: (addressRes) => {
      //         this.$store.state.board.address = addressRes.result.address_component.province + '' + addressRes.result.address_component.district;
      //         this.$store.state.board.location = addressRes.result.address_component.province;
      //       }
      //     })
      //   }
      // })

    },
    components: {}
  }
</script>
