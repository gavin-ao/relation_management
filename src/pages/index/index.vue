<template>
  <div class="index">
    <!--<div class="search">-->
      <!--<div @click="toMappage">{{cityName}}</div>-->
      <!--<div @click="toSearch">-->
        <!--<input type="text" placeholder="搜索商品">-->
        <!--<span class="icon"></span>-->
      <!--</div>-->
    <!--</div>-->
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in banner " :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.image_url" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="swiperReward">
      <swiper class="swiper-container" autoplay="true" interval="3000" circular="true" vertical="true" duration="500">
        <block v-for="(item, index) in rewardText " :key="index">
          <swiper-item class="swiper-item">
            <image src="https://yanxuan.nosdn.127.net/31da695c84cabd0eaff054265da29e5c.jpg" class="slide-image" />
            <span> {{item}}</span>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="channel">
      <!--<div @click="categoryList(item.id)" v-for="(item, index) in channel" :key="index">-->
        <!--<img :src="item.icon_url" alt="">-->
        <!--<p>{{item.name}}</p>-->
      <!--</div>-->
      <ul>
        <scroll-view class="scroll-view" :scroll-x="true">
          <li @click="goodsDetail(item.id)" v-for="(item, index) in rewardText" :key="index">
            <span class="rewardTextSpan" :class="{changeColor:item.flag===true}">{{item}}</span>
            <span class="spanLine"  :class="{changeHideShow:item.flag===true}" ></span>
          </li>
        </scroll-view>
      </ul>
    </div>
    <div class="brand">
      <div @click="tobrandList" class="head">
        品牌制造商直供
      </div>
      <div class="content">
        <div @click="branddetail(item.id)" v-for="(item, index) in brandList" :key="index">
          <div>
            <p>{{item.name}}</p>
            <p>{{item.floor_price}}元起</p>
          </div>
          <img :src="item.new_pic_url" alt="">
        </div>
      </div>
    </div>
    <div class="newgoods">
      <div @click="goodsList('new')" class="newgoods-top">
        <div class="top">
          <p>新品首发</p>
          <p>查看全部</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" scroll-x>
            <li @click="goodsDetail(item.id)" v-for="(item, index) in newGoods" :key="index">
              <img :src="item.list_pic_url" alt="">
              <p>{{item.name}}</p>
              <p>{{item.goods_brief}}</p>
              <p>￥{{item.retail_price}}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="newgoods hotgoods">
      <div @click="goodsList('hot')" class="newgoods-top">
        <div class="top">
          <p>人气推荐
            <span></span> 好物精选</p>
          <p>查看全部</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li @click="goodsDetail(item.id)" v-for="(item, index) in hotGoods" :key="index">
              <img :src="item.list_pic_url" alt="">
              <p>{{item.name}}</p>
              <p>{{item.goods_brief}}</p>
              <p>￥{{item.retail_price}}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="topicList">
      <div @click="totopic" class="topicList-top">
        专题精选
        <span class="icon"></span>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li @click="topicdetail(item.id)" v-for="(item, index) in topicList" :key="index">
              <img :src="item.item_pic_url" alt="">
              <div class="btom">
                <div>
                  <p>{{item.title}}</p>
                  <p>{{item.subtitle}}</p>
                </div>
                <div>
                  {{item.price_info}}元起
                </div>
              </div>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="newcategory">
      <div class="list" v-for="(item, index) in newCategoryList" :key="index">
        <div class="head">{{item.name}}好物</div>
        <div class="sublist">
          <div @click="goodsDetail(subitem.id)" v-for="(subitem, subindex) in item.goodsList" :key="subindex">
            <img :src="subitem.list_pic_url" alt="">
            <p>{{subitem.name}}</p>
            <p>￥{{subitem.retail_price}}</p>
          </div>
          <div @click="categoryList(item.id)">
            <div class="last">
              <p>{{item.name}}好物</p>
              <span class="icon"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
// import { get } from "../../utils";
import { mapState, mapMutations } from "vuex";
export default {
  onLoad() {
    // this.getCityName();
  },
  onShow() {
    if (wx.getStorageSync("cityName")) {
      this.cityName = wx.getStorageSync("cityName");
      wx.removeStorageSync("cityName");
    }
  },
  computed: {
    // ...mapState(["cityName"])
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      banner: [],
      channel: [],
      brandList: [],
      newGoods: [],
      hotGoods: [],
      topicList: [],
      newCategoryList: [],
      rewardText:["北京的XXX获得50元返利1","北京的XXX获得50元返利2","北京的XXX获得50元返利3","北京的XXX获得50元返利4","北京的XXX获得50元返利5"]
    };
  },
  components: {},
  methods: {
    // ...mapMutations(["update"]),
    toMappage() {
      var _this = this;
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      wx.getSetting({
        success(res) {
          //如果没有同意授权,打开设置
          if (!res.authSetting["scope.userLocation"]) {
            wx.openSetting({
              success: res => {
                console.log(2222)
                _this.getCityName();
              }
            });
          } else {
            console.log(1111)
            wx.navigateTo({
              url: "/pages/mappage/main"
            });
          }
        }
      });
    },
    getCityName() {
      var _this = this;
      var myAmapFun = new amapFile.AMapWX({
        key: "e545e7f79a643f23aef187add14e4548"
      });
      myAmapFun.getRegeo({
        success: function(data) {
          //成功回调
          console.log(data);
          // data[0].regeocodeData.formatted_address
          _this.cityName = data[0].regeocodeData.formatted_address;
          _this.update({ cityName: data[0].regeocodeData.formatted_address });
        },
        fail: function(info) {
          //失败回调
          console.log(info);
          //如果用户拒绝授权
          // 默认为北京
          _this.cityName = "北京市";
          // _this.update({ cityName: "北京市" });
        }
      });
    },
    toSearch() {
      wx.navigateTo({
        url: "/pages/search/main"
      });
    },
    async getData() {
      // const data = await get("/index/index");
      // 埋点
      var that =  this;
      wx.request({
        url: "https://www.heyuhsuo.xyz/heyushuo/index/index",
        method: "get",
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function (res) {
          console.log(res)
          if (res.data.success) {
            that.banner = res.data.banner;
            that.channel = res.data.channel;
            that.brandList = res.data.brandList;
            that.newGoods = res.data.newGoods;
            that.hotGoods = res.data.hotGoods;
            that.topicList = res.data.topicList;
            that.newCategoryList = res.data.newCategoryList;
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })

    },
    goodsDetail(id) {
      wx.navigateTo({
        url: "/pages/goods/main?id=" + id
      });
    },
    categoryList(id) {
      wx.navigateTo({
        url: "/pages/categorylist/main?id=" + id
      });
    },
    goodsList(info) {
      if (info == "hot") {
        wx.navigateTo({
          url: "/pages/newgoods/main?isHot=" + 1
        });
      } else {
        wx.navigateTo({
          url: "/pages/newgoods/main?isNew=" + 1
        });
      }
    },
    topicdetail(id) {
      wx.navigateTo({
        url: "/pages/topicdetail/main?id=" + id
      });
    },
    totopic() {
      wx.navigateTo({
        url: "/pages/topic/main"
      });
    },
    tobrandList() {
      wx.navigateTo({
        url: "/pages/brandlist/main"
      });
    },
    branddetail(id) {
      wx.navigateTo({
        url: "/pages/branddetail/main?id=" + id
      });
    }
  },
  created() {}
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
