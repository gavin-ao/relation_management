<template>
  <div class="goods">
    <div class="authorizes" v-if="helpInfos==true">
      <div class="logo">
        <img src="/static/images/logo.png" alt="">
        <p style="color: #000;font-size: 18px;">分销e</p>
        <p>购物商城</p>
      </div>
      <p style="border-top:1px solid #ccc;width: 100%;margin: 60px 0 0 0;"></p>
      <div class="info">
        <p>该程序将获得以下授权</p>
        <p><span class="dot">·</span><span>获得您的公开信息（头像、昵称等）</span></p>
        <p>(取消授权您可能错过很多功能哦～)</p>
      </div>
      <div class="btn">
        <div>
          <button open-type="getUserInfo" @getuserinfo="helpInfoss" class="save-btn">立即授权</button>
        </div>
      </div>
    </div>
    <block v-if="tempFlag==true">
      <div class="swiper">
        <swiper class="swiper-container" autoplay="true" interval="3000" duration="1000">
          <block v-for="(item, index) in gallery " :key="index">
            <swiper-item class="swiper-item">
              <image :src="item" class="slide-image"/>
            </swiper-item>
          </block>
        </swiper>
        <!--<button class="share" hover-class="none" open-type="share" value="">分享商品</button>-->
      </div>
      <div class="goods-info">
        <div class="c">
          <p>{{info.commodityName}}</p>
          <!--<p>{{info.goods_brief}}</p>-->
          <p><span class="realPrice">￥{{info.prices}}</span><span class="virtualPrice">￥{{info.suggestPrices}}</span>
            <span class="monthlySales">月销： {{salesVolume}}</span>
          </p>

        </div>
      </div>
      <div class="productDetail">
        <div class="productTopNav">
          <div class="productNav" @click="detailContent('0')">
            <p :class="{ bottomLines: currentNum==0}">图文详情</p>
          </div>
          <div class="productNav" @click="detailContent('1')">
            <p :class="{ bottomLines: currentNum==1}">产品参数</p>
          </div>
          <div class="productNav" @click="detailContent('2')">
            <p :class="{ bottomLines: currentNum==2}">购买须知</p>
          </div>

        </div>
        <div class="detailsInfo" :class="{detailText: currentNum==0}">
          <div class="detail">
            <!--<p v-html="goods_desc"></p>-->
            <!--<wxParse :content="goods_desc"/>-->
            <!--<block v-for="(item, index) in goods_desc " :key="index">-->
              <!--<image :src="item" class="slide-image" mode="widthFix"/>-->
            <!--</block>-->
            <!-- 显示商品详情-->
            <wxParse :content="introduction"/>

          </div>
        </div>
        <div class="detailsInfo" :class="{detailText: currentNum==1}">
          <div style="margin-top: 20px;font-size: 16px; color: #666666;text-align: center">
            暂无内容
          </div>
          <!--<div v-if="attribute.length!=0" class="attribute">-->
          <!--<div v-for="(item,index) in attribute" :key="index" class="item">-->
          <!--<div>{{item.name}}</div>-->
          <!--<div>{{item.value}}</div>-->
          <!--</div>-->
          <!--</div>-->
        </div>
        <div class="detailsInfo" :class="{detailText: currentNum==2}">
          <div style="margin-top: 20px;font-size: 16px; color: #666666;text-align: center">
            暂无内容
          </div>
          <!--<div class="common-problem">-->
          <!--<div class="b">-->
          <!--<div class="item" v-for="(item, index) in issueList" :key="index">-->
          <!--<div class="question-box">-->
          <!--<text class="spot"></text>-->
          <!--<text class="question">{{item.question}}</text>-->
          <!--</div>-->
          <!--<div class="answer">-->
          <!--{{item.answer}}-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
        </div>
      </div>

      <!--&lt;!&ndash; 大家都在看 &ndash;&gt;-->
      <div class="bottom-fixed">
        <div class="customerService" @click="collect">
          <div>
            <img class="collect" alt="" src="/static/images/kefu.png">
          </div>
          <div><span>客服</span></div>
        </div>
        <div class="shareFriend" @click="shareFriend" v-if="share==true">
          分享给好友
        </div>
        <div class="purchaseImmediately" @click="bug">立即购买</div>
      </div>
    </block>
  </div>
</template>

<script>
  // import { get, post, toLogin, login, getStorageOpenid } from "../../utils";
  import wxParse from "mpvue-wxparse";
  import utils from "../../utils/utils.js";

  ;

  export default {
    onLoad(option) {
      console.log("id: " + option.id)
      this.goodId = option.id;
      console.log(this.goodId)
      // this.paths = that.$root.$mp.query.paths;
      if (option.myInvitation) {
        this.myInvitation = option.myInvitation
      }

      if (option.isInvitation) {
        console.log("isTnvitation" + option.isInvitation);
        this.isInvitation = false
      } else {
        console.log("isTnvitation1" + option.isInvitation);
        this.isInvitation = true;
      }
      //判断是否登录获取用户信息
      // if (login()) {
      //   this.userInfo = login();
      // }
      // this.id = this.$root.$mp.query.id;


      wx.setNavigationBarTitle({
        title: "商品详情页"
      })
    },
    onShow(option) {
      console.log("option: " + option)
      var that = this;
      // that.id = that.id;
      // that.paths = that.$root.$mp.query.paths;
      console.log("商品id：" + that.goodId)

      if (that.myInvitation != "") {
        console.log("邀请号：" + that.myInvitation)
        that.$store.state.board.otherInvitation = that.myInvitation
      } else {
        that.$store.state.board.otherInvitation = ''
      }

      that.initData();
      wx.getSetting({
        success: (res) => {
          console.log(res);
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.showLoading({
              title: '加载中',
            })
            utils.login(that, false, function (sessionId) {
              console.log(333333)
              if (that.$store.state.board.otherInvitation) {
                that.helpMapping();
              }
              that.goodsDetail();
              // wx.redirectTo({
              //   // url: '/pages/addaddress/main'
              //   url: '/pages/addressSelect/main'
              // })
            })
            that.helpInfos = false;
          }
          else {
            // wx.redirectTo({
            //   url: '/pages/authorize/main'
            // })
            that.tempFlag = false;
            that.helpInfos = true;
          }
        }
      })
    },

    // //商品转发
    // onShareAppMessage() {
    //   console.log(this.info.name);
    //   console.log(this.info.id);
    //   console.log(this.gallery[0].img_url);
    //
    //   return {
    //     title: this.info.name,
    //     path: "/pages/goods/main?id=" + this.info.id,
    //     imageUrl: this.gallery[0].img_url //拿第一张商品的图片
    //   };
    // },
    mounted() {
    },
    data() {
      return {
        allnumber: 0,
        openId: "",
        collectFlag: false,
        number: 0,
        showpop: false,
        gallery: [],
        info: {},
        brand: {},
        attribute: [],
        issueList: [],
        productList: [],
        goods_desc: [],
        id: "",
        goodId: "",
        paths: "",
        userInfo: "",
        goodsId: "",
        allPrise: "",
        currentNum: 0,
        scrollTop: 0,
        salesVolume: 0,
        myInvitation: '',
        helpInfos: false,
        tempFlag: false,
        isInvitation: false,
        introduction:''
      };
    },
    components: {
      wxParse
    },
    methods: {
      helpMapping() {
        var that = this;
        console.log("ooooo: " + that.isInvitation)

        wx.request({
          url: that.$store.state.board.urlHttp + '/wechatapi/service/syncInvitation',
          method: "POST",
          data: {sessionID: that.$store.state.board.sessionID, invitationId: that.$store.state.board.otherInvitation},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            // console.log(res)
            var data = res.data;
            if (data.success) {

            } else {
              if (that.isInvitation) {
                console.log("哈哈哈")
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          }
        })
      },
      helpInfoss() {
        var that = this;
        console.log("授权成功");
        utils.login(that, false, function (sessionID) {
          that.helpInfos = false;
          console.log("ddd： " + that.$store.state.board.otherInvitation)
          if (that.$store.state.board.otherInvitation) {
            console.log("授权成功")
            that.helpMapping();
            that.goodsDetail();
          }
        });
        // that.utilss();
      },
      // utilss() {
      //   var that = this;
      //   utils.login(that, function (sessionID) {
      //     that.helpInfos = false;
      //     console.log("ddd： "+that.$store.state.board.otherInvitation)
      //     if (that.$store.state.board.otherInvitation) {
      //       console.log("授权成功")
      //       that.goodsDetail();
      //     }
      //   });
      // },
      initData() {
        this.gallery = [];
        this.info = {};
        this.allnumber = 0;
        this.collectFlag = false;
        this.number = 0;
        this.showpop = false;
        this.info = {};
        this.brand = {};
        this.attribute = [];
        this.issueList = [];
        this.productList = [];
        this.goods_desc = [];
        this.id = "";
        this.paths = "";
        this.goodsId = "";
        this.allPrise = "";
        this.currentNum = 0;
        this.scrollTop = 0;
        this.salesVolume = 0;
      },
      detailContent(index) {
        this.currentNum = index;
        this.scrollTop = 0;
      },
      async bug() {
        var that = this;

        wx.navigateTo({
          url: "/pages/order/main?commodityId=" + that.info.commodityId
        });

      },
      shareFriend() {
        var _this = this;
        wx.request({
          url: _this.$store.state.board.urlHttp + '/wechatapi/user/getInvitation',
          method: "post",
          data: {
            sessionID: _this.$store.state.board.sessionID
          },
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            console.log(res)
            if (res.data.success) {
              _this.$store.state.board.myInvitation = res.data.invitation;
              wx.navigateTo({
                url: "/pages/showPages/main?commodityId=" + _this.info.commodityId
              });
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
      async goodsDetail() {
        var that = this;
        that.tempFlag = true;
        console.log("sessionID：" + that.$store.state.board.sessionID)
        console.log("id：" + that.goodId)
        wx.request({
          url: that.$store.state.board.urlHttp + '/wechatapi/commodity/getCommodityById',
          method: "post",
          data: {commodityId: that.goodId, sessionID: that.$store.state.board.sessionID},
          // data: {commodityId: 3, sessionID: that.$store.state.board.sessionID},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            console.log("返回的信息")
            console.log(res)
            var data = res.data;
            if (data.success) {
              that.salesVolume = data.salesVolume;
              that.$store.state.board.share = data.share;
              that.gallery.push(that.$store.state.board.urlHttp + "/static/file/" + data.commodityVO.filePath);
              if (data.commodityVO.introduction) {
                that.introduction = data.commodityVO.introduction;
              }else{
                that.introduction ='<div style="margin-top: 20px;font-size: 16px; color: #666666;text-align: center">暂无内容</div>'
              }

              that.$store.state.board.goToLink = that.$store.state.board.urlHttp + "/static/file/" + data.commodityVO.filePath;
              if (that.$store.state.board.goToLink) {
                wx.getImageInfo({
                  src: that.$store.state.board.goToLink,
                  success: (res) => {
                    that.$store.state.board.drawPoster = res.path;
                  }
                })
              }
              that.goods_desc = data.commodityVO.commodityImageTextList;
              for (var i = 0; i < that.goods_desc.length; i++) {
                that.goods_desc[i] = that.$store.state.board.urlHttp + that.goods_desc[i]
              }
              console.log(that.goods_desc)
              that.info = data.commodityVO;
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }
    },
    computed: {
      share() {
        return this.$store.state.board.share;
      }
    }
  };
</script>
<style lang='scss' scoped>
  @import url("~mpvue-wxparse/src/wxParse.css");
  @import "./style.scss";

  .authorizes {
    margin: 0 auto;
    font-size: 14px;
    color: #ccc;
    .logo {
      img {
        display: block;
        width: 70px;
        height: 70px;
        margin: 0 auto;
      }
      p {
        text-align: center;
        margin-top: 5px;
      }
    }
    .info {
      width: 100%;
      font-size: 12px;
      padding: 10px;
      box-sizing: border-box;
      p {
        line-height: 24px;
        span {
          display: inline-block;
          vertical-align: middle;
        }
        .dot {
          /*font-size: 12px;*/
          font-weight: bold;
          padding-right: 5px;
        }
      }
    }
    .btn {
      width: 90%;
      margin: 0 auto;
      margin-top: 60px;
      div {
        width: 100%;
        display: inline-block;
        text-align: center;
        button {
          font-size: 14px;
          font-family: "Microsoft YaHei UI Light";
          border: 0;
          margin: 0 auto;
        }
        .save-btn {
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          margin-top: 15px;
          border-radius: 3px;
          box-sizing: border-box;
          background-color: #0096D6;
          color: #fff;
        }
        button[type="default"] {
          background-color: #f1f1f1;
          color: #000;
        }
      }
    }
  }
</style>
