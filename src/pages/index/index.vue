<template>
  <div class="index">
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in banner " :key="index">
          <swiper-item class="swiper-item">
            <image :src="item" class="slide-image" />
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
            <span class="rewardTextSpan" :class="{changeColor:item.flag == true}">{{item.catgName}}</span>
            <span class="spanLine"  :class="{changeHideShow:item.flag == true}" ></span>
          </li>
        </scroll-view>
      </ul>
    </div>
    <div class="newcategory">
      <div class="list" v-for="(subitem, subindex) in newCategoryList" :key="subindex">
        <div class="sublist">
          <div >
            <img :src="subitem.filePath" alt="">
            <p>{{subitem.commodityName}}</p>
            <p><span class="realPrice">￥{{subitem.prices}}</span><span class="virtualPrice">￥{{subitem.suggestPrices}}</span><span class="purchaseImmediately" @click="goodsDetail(subitem.commodityId,subitem.filePath)">立即购买</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  onLoad() {

  },
  onShow() {
  console.log(6666)

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
      var that =  this;
      console.log(5555)
      wx.request({
        url: that.$store.state.board.urlHttp + '/wechatapi/commodity/findCommodityCatgList',
        method: "POST",
        data:{sessionID:that.$store.state.board.sessionID},
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function (res) {
          console.log(res)
          var data = res.data;
          if (data.success) {
            that.banner = [];
            for(var i = 0;i<data.filePathList.length;i++){
              that.banner.push(that.$store.state.board.urlHttp+data.filePathList[i])
            }
            that.channel = data.catgList;
            that.categoryList(that.channel[0],0)
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
      if(that.$store.state.board.otherInvitation){
        wx.request({
          url: that.$store.state.board.urlHttp + '/wechatapi/service/syncInvitation',
          method: "POST",
          data:{sessionID:that.$store.state.board.sessionID,invitationId: that.$store.state.board.otherInvitation},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            console.log(res)
            var data = res.data;
            if (data.success) {

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
    goodsDetail(id,paths) {
      wx.navigateTo({
        url: "/pages/goods/main?id=" + id+"&paths="+paths
      });
    },
    categoryList(item,index) {
      var that = this;
      console.log(index)
      for(var i=0;i<that.channel.length;i++){
        if(i == index){
          console.log("bbbb")
          that.channel[i].flag = true;
        }else{
          that.channel[i].flag = false;
        }
      }
      wx.request({
        url:that.$store.state.board.urlHttp+ "/wechatapi/commodity/findCommodityListByCatgId",
        method: "post",
        data:{catgId: item.catgId,sessionID:that.$store.state.board.sessionID},
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function (res) {
          console.log(res)
          if (res.statusCode == 200 ) {
            that.newCategoryList = res.data.commodityList;
            for(var i = 0;i<that.newCategoryList.length;i++){
              that.newCategoryList[i].filePath = that.$store.state.board.urlHttp+ that.newCategoryList[i].filePath
            }
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
