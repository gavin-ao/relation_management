<template>
  <div class="orderCompletion">
      <div class="titleText">
        <p>感谢您购买我们的产品，我们会尽快为您发货！<br/>
          即刻起，您已成为我们的VIP会员，之后的每次购物都将享受95折优惠！<br/>
          此外，您可以在商品页将喜爱的商品推荐给好友，好友通过您的邀请链接购买商品可立刻获得95折优惠，好友成功下单，您也将获得商品原价的5%作为回报。<br/>
          心动不如行动，快和好友一起分享好东西吧！<br/></p>
      </div>
     <p class="middleText">这是您刚购买的商品，试试快速分享！</p>
    <div class="buyGoods">
      <div class="buyGoodsInfo">
        <img :src="orders.imgUrl" alt="">
        <div>
          <p>{{orders.text}}</p>
          <p><span class="realPrice">￥{{orders.prices}}</span><span
            class="monthlySales">×{{orders.number}}</span></p>
        </div>
      </div>
    </div>
    <div class="button" @click="shareFriend">
      我要拿返利
    </div>
  </div>
</template>

<script>
  // import {
  //   post,
  //   login,
  // } from '../../utils'
  export default {
    mounted() {
      wx.setNavigationBarTitle({
        title: "订单完成"
      })
    },
    data() {
      return {
        userInfo: {},
        content: '',
        phone: '',
        orders: {
            time:'2018-09-12 13:25',
            imgUrl:'https://yanxuan.nosdn.127.net/31da695c84cabd0eaff054265da29e5c.jpg',
            text:'53度飞天茅台500ml酱香型+家常久 家常小酒500ml 浓香型',
            prices:1999.00,
            number: 1,
            id:1,
          }

      };
    },
    components: {},
    methods: {
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

    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
