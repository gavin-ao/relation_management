<template>
  <div class="goods">
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
          <block v-for="(item, index) in goods_desc " :key="index">
            <image :src="item" class="slide-image" mode="aspectFit"/>
          </block>

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
  </div>
</template>

<script>
  // import { get, post, toLogin, login, getStorageOpenid } from "../../utils";
  import wxParse from "mpvue-wxparse";

  export default {
    onLoad() {
      this.initData();
      //判断是否登录获取用户信息
      // if (login()) {
      //   this.userInfo = login();
      // }
      this.id = this.$root.$mp.query.id;
      this.paths = this.$root.$mp.query.paths;
      console.log(this.id)
      this.goodsDetail();
      wx.setNavigationBarTitle({
        title: "商品详情页"
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
        paths: "",
        userInfo: "",
        goodsId: "",
        allPrise: "",
        currentNum: 0,
        scrollTop: 0,
        salesVolume:0
      };
    },
    components: {
      wxParse
    },
    methods: {
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
              _this.$store.state.board.myInvitation= res.data.invitation;
              wx.navigateTo({
                url: "/pages/showPages/main"
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
        wx.request({
          url: that.$store.state.board.urlHttp + '/wechatapi/commodity/getCommodityById',
          method: "post",
          data:{commodityId: that.id,sessionID:that.$store.state.board.sessionID},
          // data: {commodityId: 3, sessionID: that.$store.state.board.sessionID},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            console.log(res)
            var data = res.data;
            if (data.success) {
              that.salesVolume = data.salesVolume;
              that.$store.state.board.share = data.share;
              that.gallery.push(that.paths);
              that.$store.state.board.goToLink = that.paths;
              if ( that.$store.state.board.goToLink) {
                wx.getImageInfo({
                  src:  that.$store.state.board.goToLink,
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
      share(){
        return this.$store.state.board.share;
      }
    }
  };
</script>
<style lang='scss' scoped>
  @import url("~mpvue-wxparse/src/wxParse.css");
  @import "./style.scss";
</style>
