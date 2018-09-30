<template>
  <div class="index">
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
      <ul>
        <scroll-view class="scroll-view" :scroll-x="true">
          <li @click="categoryList(item,index)" v-for="(item, index) in channel" :key="index">
            <span class="rewardTextSpan" :class="{changeColor:item.flag===true}">{{item.name}}</span>
            <span class="spanLine"  :class="{changeHideShow:item.flag===true}" ></span>
          </li>
        </scroll-view>
      </ul>
    </div>
    <div class="newcategory">
      <div class="list" v-for="(subitem, subindex) in newCategoryList" :key="subindex">
        <div class="sublist">
          <div >
            <img :src="subitem.list_pic_url" alt="">
            <p>{{subitem.name}}</p>
            <p><span class="realPrice">￥{{subitem.retail_price}}</span><span class="virtualPrice">￥{{subitem.retail_price}}</span><span class="purchaseImmediately" @click="goodsDetail(subitem.id)">立即购买</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  onLoad() {
    wx.hideLoading()
  },
  onShow() {


  },
  computed: {

  },
  mounted() {
    this.getData();
    wx.setNavigationBarTitle({
      title: "首页"
    })
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
    async getData() {
      // const data = await get("/index/index");
      var that =  this;
      wx.request({
        url: "https://www.heyuhsuo.xyz/heyushuo/index/index",
        method: "get",
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function (res) {
          console.log(res)
          if (res.data.success) {
            that.banner = res.data.banner;
            // that.channel = res.data.channel;
            that.brandList = res.data.brandList;
            that.newGoods = res.data.newGoods;
            that.hotGoods = res.data.hotGoods;
            that.topicList = res.data.topicList;
            that.newCategoryList = res.data.newCategoryList[0].goodsList;
            // that.channel[0].flag = true;
            wx.request({
              url: "https://www.heyuhsuo.xyz/heyushuo/category/categoryNav?id="+ res.data.channel[0].id,
              method: "get",
              header: {'content-type': 'application/x-www-form-urlencoded'},
              success: function (res) {
                console.log(res)
                if (res.statusCode == 200) {
                  that.channel = res.data.navData;
                  that.channel[0].flag = true;
                }else{
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 2000
                  })
                }
              }
            })
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
    categoryList(item,index) {
      var that = this;
      for(var i=0;i<that.channel.length;i++){
        if(i== index){
          that.channel[i].flag = true;
        }else{
          that.channel[i].flag = false;
        }
      }
      wx.request({
        url: "https://www.heyuhsuo.xyz/heyushuo/goods/goodsList?categoryId="+item.id,
        method: "get",
        // data:{categoryId: item.id},
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function (res) {
          console.log(res)
          if (res.statusCode == 200 ) {
            that.newCategoryList = res.data.data;
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
  },
  created() {}
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
