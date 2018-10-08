<template>
  <div class="order">
    <div v-if="address&&address.addressee&&address.phoneNumber" class="address">
      <div class="customerService">
        <div class="collect">
        </div>
      </div>
      <div class="shareFriend">
        <div class="item">
          <div class="list">
            <div class="addresslist">
              <div>
                <span>收货人：{{address.addressee}}</span>
                <span>{{address.phoneNumber}}</span>
              </div>
              <div class="info">
                <p>收货地址：{{address.country+address.province+address.city+address.region+address.detailAddr}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="purchaseImmediately" @click="toAddressList"></div>
    </div>
    <div v-else class="seladdress">
      <div class="customerService">
        <div class="collect">
        </div>
      </div>
      <div class="shareFriend">
        请选择收货地址
      </div>
      <div class="purchaseImmediately" @click="toAdd">+</div>

    </div>
    <div class="selaInfos">
      <div class="buyGoods">
        <div class="buyGoodsInfo">
          <img :src="info.filePath" alt="">
          <div>
            <p>{{info.commodityName}}</p>
            <p><span class="realPrice">￥{{info.prices}}</span><span
              class="virtualPrice" v-if="info.suggestPrices">￥{{info.suggestPrices}}</span><span
              class="monthlySales">×{{buyGoodsNum}}</span></p>
          </div>
        </div>
        <div class="buyGoodsNum">
          <div class="buyGoodsNumInfo">
            <div class="buyGoodsNumText">购买数量</div>
            <div class="buyGoodsChangeNum">
              <span @click="reduceGoodsNum">-</span>
              <span>{{buyGoodsNum}}</span>
              <span @click="addGoodsNum">+</span>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="selaGifts">
      <div class="buyGoods">
        <!--<div class="giftInfos">-->
          <!--<div class="left">满额赠红酒</div>-->
          <!--<div class="right">已无其他赠品可选</div>-->
        <!--</div>-->
        <!--<div class="buyGoodsInfo">-->
          <!--<img :src="info.list_pic_url" alt="">-->
          <!--<div>-->
            <!--<p>{{info.name}}</p>-->
            <!--<p><span class="realPrice">￥0.00</span><span class="virtualPrice">￥{{info.retail_price}}</span><span-->
              <!--class="monthlySales">×{{buyGoodsNum}}</span></p>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="buyGoodsNum">-->
          <!--<div class="buyGoodsNumText">店铺优惠</div>-->
          <!--<div class="buyGoodsChangeNum">-->
            <!--省 <span>100</span> 元：店铺优惠券1399-100-->
          <!--</div>-->
        <!--</div>-->
        <div class="buyGoodsNum">
          <div class="buyGoodsNumText">邀请折扣</div>
          <div class="buyGoodsChangeNum">
            省 <span>{{discountPrice}}</span> 元：好友邀请折扣5%
          </div>
        </div>

      </div>
    </div>
    <div class="bottom">
      <div>
        合计金额 : <span>￥{{totalPrices}}</span>
      </div>
      <div @click="pay">
        提交订单
      </div>
    </div>
  </div>
</template>

<script>
  // import {
  //   get,
  //   post,
  //   login,
  //   getStorageOpenid
  // } from "../../utils";
  export default {
    onLoad(option) {
      wx.setStorageSync("addressId", "");

      this.initData();
      if (option.commodityId) {
        this.commodityId = option.commodityId
      } else {
        this.commodityId = ''
      }
      console.log(this.commodityId)

    },
    onShow() {
      if (wx.getStorageSync("addressId")) {
        this.addressId = wx.getStorageSync("addressId");
      }
      // this.openId = getStorageOpenid();
      wx.setNavigationBarTitle({
        title: "确认订单"
      })
      this.getDetail();
    },
    created() {
    },
    mounted() {
    },
    data() {
      return {
        commodityId: '',
        addressId: "",
        openId: "",
        allprice: "",
        listData: [],
        address: {},
        info: {},
        buyGoodsNum: 1,
        totalPrices: 0,
        discountPrice:0
      };
    },
    components: {},
    methods: {
      initData() {
        this.commodityId = '';
        this.info = {};
        this.addressId = '';
        this.listData = [];
        this.address = {};
        this.allPrise = "";
        this.buyGoodsNum = 1;
        this.totalPrices = 0;
        this.discountPrice = 0;
      },
      pay() {
        // if (this.address.name && this.address.address) {
        if (this.address && this.address.addressee && this.address.phoneNumber) {
          var that = this;
          var orderJson = JSON.stringify({
            addrId: that.address.addrId,
            "detailList": [{"commodityId": that.commodityId, "amount": that.buyGoodsNum}]
          })
          wx.request({
            url: that.$store.state.board.urlHttp + "/wechatapi/order/submitOrder",
            method: "post",
            data: {"sessionID": that.$store.state.board.sessionID, orderJson: orderJson},
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function (res) {
              console.log(res)
              if (res.data.success) {
                wx.request({
                  url: that.$store.state.board.urlHttp + "/wechatapi/order/completionOfPayment",
                  method: "post",
                  data: {"sessionID": that.$store.state.board.sessionID, orderId: res.data.orderId,},
                  header: {'content-type': 'application/x-www-form-urlencoded'},
                  success: function (res) {
                    console.log(res)
                    if (res.data.success) {
                      wx.redirectTo({
                        url: '/pages/orderCompletion/main'
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
          wx.showModal({
            title: "地址无效", //提示的内容,
            content: '您尚未添加收货地址，请先设置收货地址再提交订单',
            confirmText: '去设置',
            success: function (res) {
              console.log(res)
              wx.navigateTo({
                url: "/pages/addaddress/main"
              });
            }
          })
        }
      },
      checkNullObj(obj) {
        console.log(Object.keys(obj).length)
        return Object.keys(obj).length === 0
      },
      toAddressList() {
        wx.navigateTo({
          url: "/pages/addressSelect/main"
        });
      },
      toAdd() {
        wx.navigateTo({
          url: "/pages/addaddress/main"
        });
      },
      reduceGoodsNum() {
        // 购买数量 减
        if (this.buyGoodsNum == 1) {
          wx.showToast({
            title: "购买数量不可以小于1哟！",
            icon: 'none',
            duration: 2000
          })
        } else {
          this.buyGoodsNum--;
          this.$store.state.board.productInfos.buyGoodsNum--
        }
        this.totalPrices = (parseInt(this.info.prices) * this.buyGoodsNum*0.95).toFixed(2)
        this.discountPrice = (parseInt(this.info.prices) * this.buyGoodsNum*0.05).toFixed(2)
      },
      addGoodsNum() {
        // 购买数量 加
        this.buyGoodsNum++;
        this.$store.state.board.productInfos.buyGoodsNum++;
        this.totalPrices = (parseInt(this.info.prices) * this.buyGoodsNum*0.95).toFixed(2);
        this.discountPrice = (parseInt(this.info.prices) * this.buyGoodsNum*0.05).toFixed(2);
      },
      async getDetail() {
        var that = this;
        console.log(that.commodityId)
        wx.request({
          url: that.$store.state.board.urlHttp + "/wechatapi/order/purchaseImmediately",
          method: "post",
          data: {"sessionID": that.$store.state.board.sessionID, "commodityId": that.commodityId},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            console.log(res);
            if (res.data.success) {
              that.info = res.data.commodityVO;
              that.info.filePath = that.$store.state.board.urlHttp + that.info.filePath;
              that.address = res.data.addr;
              that.totalPrices = (parseInt(that.info.prices) * that.buyGoodsNum*0.95).toFixed(2);
              that.discountPrice = (parseInt(that.info.prices) * that.buyGoodsNum*0.05).toFixed(2);
              that.$store.state.board.productInfos = that.info;
              that.$store.state.board.productInfos.buyGoodsNum = 1;
              if (that.addressId) {
                wx.request({
                  url: that.$store.state.board.urlHttp + '/wechatapi/order/addr/getAddr',
                  method: "post",
                  data: {
                    sessionID: that.$store.state.board.sessionID,
                    addrId: that.addressId,
                  },
                  header: {'content-type': 'application/x-www-form-urlencoded'},
                  success: function (res) {
                    console.log(res)
                    if (res.data.success && res.data.data) {
                      that.address = res.data.data;
                      that.address.addrId = that.addressId;
                      console.log(that.address)
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
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
        // wx.request({
        //   // url: "https://www.heyuhsuo.xyz/heyushuo/goods/detailaction?id="+that.goodsId+"&openId=oQmbb4sNZdxaUQZ0sfYgvtOP2S7c",
        //   url: "https://www.heyuhsuo.xyz/heyushuo/goods/detailaction?id=1009024&openId=" + that.openId,
        //   method: "get",
        //   // data:{categoryId: item.id},
        //   header: {'content-type': 'application/x-www-form-urlencoded'},
        //   success: function (res) {
        //     console.log(res)
        //     if (res.statusCode == 200) {
        //       that.info = res.data.info;
        //       that.totalPrices = (parseInt(res.data.info.retail_price)).toFixed(2);
        //     } else {
        //       wx.showToast({
        //         title: res.data.msg,
        //         icon: 'none',
        //         duration: 2000
        //       })
        //     }
        //   }
        // })

      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
