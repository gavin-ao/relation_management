<template>
  <div class="orderCompletion">
    <div class="titleText">
      <p>感谢您购买我们的产品，我们会尽快为您发货！<br/>
        即刻起，您已成为我们的VIP会员，之后的每次购物都将享受95折优惠！<br/>
        此外，您可以在商品页将喜爱的商品推荐给好友，好友通过您的邀请链接购买商品可立刻获得95折优惠，好友成功下单，您也将获得商品原价的5%作为回报。
      </p>
      <table>
        <tr>
          <th>累计返利(元)</th>
          <th>奖励比例</th>
          <th>奖励金额(元)</th>
        </tr>
        <tr>
          <td>1000~2000</td>
          <td>10%</td>
          <td>100~200</td>
        </tr>
        <tr>
          <td>2001~3000</td>
          <td>15%</td>
          <td>300.15~450</td>
        </tr>
        <tr>
          <td>3001以上</td>
          <td>25%</td>
          <td>750.25+</td>
        </tr>
      </table>
    </div>
    <p class="middleText">心动不如行动，快和好友一起分享好东西吧！<br/>这是您刚购买的商品，试试快速分享！</p>

    <div class="buyGoods">
      <div class="buyGoodsInfo">
        <img :src="orders.filePath" alt="">
        <div>
          <p>{{orders.commodityName}}</p>
          <span class="unitPrice">{{orders.discountPrices}}<br/>×{{orders.buyGoodsNum}}</span>
          <p>
            <span class="realPrice">￥{{orders.totalPrices}}</span>
            <!--<span class="virtualPrice" v-if="orders.suggestPrices">￥{{orders.suggestPrices}}</span>-->
            <!--<span class="monthlySales">×{{item.amount}}</span>-->
          </p>
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
    onShow() {
      wx.setNavigationBarTitle({
        title: "订单完成"
      })
      if (this.$store.state.board.productInfos.buyGoodsNum) {
        this.orders = this.$store.state.board.productInfos;
      }
      console.log(this.orders)
    },
    mounted() {
      // if (this.$root.$mp.query.res) {
      //   this.orders = JSON.parse(decodeURIComponent(this.$root.$mp.query.res));
      //   console.log(this.res);
      // }
    },
    data() {
      return {
        userInfo: {},
        content: '',
        phone: '',
        orders: {}
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
              _this.$store.state.board.myInvitation = res.data.invitation;
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
