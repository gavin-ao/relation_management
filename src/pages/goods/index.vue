<template>
  <div class="goods">
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
        <block v-for="(item, index) in gallery " :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.img_url" class="slide-image"/>
          </swiper-item>
        </block>
      </swiper>
      <!--<button class="share" hover-class="none" open-type="share" value="">分享商品</button>-->
    </div>
    <!--<div class="swiper-b">-->
    <!--<div class="item">30天无忧退货</div>-->
    <!--<div class="item">48小时快速退款</div>-->
    <!--<div class="item">满88元免邮费</div>-->
    <!--</div>-->
    <div class="goods-info">
      <div class="c">
        <p>{{info.name}}</p>
        <!--<p>{{info.goods_brief}}</p>-->
        <p><span class="realPrice">￥{{info.retail_price}}</span><span class="virtualPrice">￥{{info.retail_price}}</span><span
          class="monthlySales">月销： {{info.sell_volume}}{{info.goods_unit}}</span></p>

      </div>
    </div>
    <!--<div @click="showType" class="section-nav">-->
    <!--<div>请选择规格数量</div>-->
    <!--<div></div>-->
    <!--</div>-->
    <!-- <div @click="showType" class="section-nav">
      <div>用户评价</div>
      <div></div>
    </div> -->
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
        <div v-if="goods_desc" class="detail">
          <!--<p v-html="goods_desc"></p>-->
          <wxParse :content="goods_desc"/>
        </div>
      </div>
      <div class="detailsInfo" :class="{detailText: currentNum==1}">
        <div v-if="attribute.length!=0" class="attribute">
          <div v-for="(item,index) in attribute" :key="index" class="item">
            <div>{{item.name}}</div>
            <div>{{item.value}}</div>
          </div>
        </div>
      </div>
      <div class="detailsInfo" :class="{detailText: currentNum==2}">
        <div class="common-problem">
          <div class="b">
            <div class="item" v-for="(item, index) in issueList" :key="index">
              <div class="question-box">
                <text class="spot"></text>
                <text class="question">{{item.question}}</text>
              </div>
              <div class="answer">
                {{item.answer}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--&lt;!&ndash; 常见问题 &ndash;&gt;-->
    <!--<div class="common-problem">-->
    <!--<div class="h">-->
    <!--<div class="line"></div>-->
    <!--<text class="title">常见问题</text>-->
    <!--<div class="line"></div>-->
    <!--</div>-->
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
    <!--&lt;!&ndash; 常见问题 &ndash;&gt;-->
    <!--&lt;!&ndash; 大家都在看 &ndash;&gt;-->

    <!--<div class="common-problem">-->
    <!--<div class="h">-->
    <!--<div class="line"></div>-->
    <!--<text class="title">大家都在看</text>-->
    <!--<div class="line"></div>-->
    <!--</div>-->
    <!--<div class="sublist">-->
    <!--<div @click="togoodsDetail(subitem.id)" v-for="(subitem, subindex) in productList" :key="subindex">-->
    <!--<img :src="subitem.list_pic_url" alt="">-->
    <!--<p>{{subitem.name}}</p>-->
    <!--<p>￥{{subitem.retail_price}}</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->

    <!--&lt;!&ndash; 大家都在看 &ndash;&gt;-->
    <div class="bottom-fixed">
      <div class="customerService" @click="collect">
        <div>
          <img class="collect" alt="" src="/static/images/kefu.png">
        </div>
        <div><span>客服</span></div>
      </div>
      <div class="shareFriend" @click="shareFriend">
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
      this.openId = wx.getStorageSync("openId");
      this.goodsDetail();
      wx.setNavigationBarTitle({
        title: "商品详情页"
      })
    },
    //商品转发
    onShareAppMessage() {
      console.log(this.info.name);
      console.log(this.info.id);
      console.log(this.gallery[0].img_url);

      return {
        title: this.info.name,
        path: "/pages/goods/main?id=" + this.info.id,
        imageUrl: this.gallery[0].img_url //拿第一张商品的图片
      };
    },
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
        goods_desc: "",
        id: "",
        userInfo: "",
        goodsId: "",
        allPrise: "",
        currentNum: 0,
        scrollTop: 0
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
        this.gallery = [];
        this.info = {};
        this.brand = {};
        this.attribute = [];
        this.issueList = [];
        this.productList = [];
        this.goods_desc = "";
        this.id = "";
        this.goodsId = "";
        this.allPrise = "";
        this.currentNum = 0;
        this.scrollTop = 0;
      },
      detailContent(index) {
        this.currentNum = index;
        this.scrollTop = 0;
      },
      async bug() {
        var that = this;
        wx.request({
          url: "https://www.heyuhsuo.xyz/heyushuo/order/submitAction?goodsId="+this.goodsId+"&openId=oQmbb4sNZdxaUQZ0sfYgvtOP2S7c&allPrise="+ this.allPrise,
          method: "get",
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            console.log(res)
            if (res.statusCode == 200) {
              wx.navigateTo({
                url: "/pages/order/main?goodsId=" + that.goodsId
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
      shareFriend() {
        wx.navigateTo({
          url: "/pages/showPages/main"
        });
      },
      async goodsDetail() {
        var that = this;
        wx.request({
          url: "https://www.heyuhsuo.xyz/heyushuo/goods/detailaction?id="+that.id+"&openId=oQmbb4sNZdxaUQZ0sfYgvtOP2S7c",
          // url: "https://www.heyuhsuo.xyz/heyushuo/goods/detailaction?id=1009024&openId=" + that.openId,
          method: "get",
          // data:{categoryId: item.id},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            console.log(res)
            if (res.statusCode == 200) {
              that.gallery = res.data.gallery;
              that.info = res.data.info;
              that.allPrise = res.data.info.retail_price;
              that.goodsId = res.data.info.id;
              that.brand = res.data.brand;
              that.attribute = res.data.attribute;
              that.goods_desc = res.data.info.goods_desc;
              that.issueList = res.data.issue;
              that.collectFlag = res.data.collected;
              that.allnumber = res.data.allnumber;
              that.productList = res.data.productList;
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
    computed: {}
  };
</script>
<style lang='scss' scoped>
  @import url("~mpvue-wxparse/src/wxParse.css");
  @import "./style.scss";
</style>
