<template>
  <div class="myOrder">
    <div>
      <div class="ordersNum" v-for="(items,indexs) in orders" :key="indexs">
        <block v-for="(item,index) in items.detailList" :key="index">
          <div class="titleText">
            <p>
              <span>{{items.time}}</span>
              <span v-if="items.state == 1"><span class="payment" @click="orderRefund(items.orderId,item)">申请退款</span>&nbsp;已支付</span>
              <span v-if="items.state == 3">退款成功</span>
              <span v-if="items.state == 4">退款中</span>
              <span v-if="items.state == 5">同意退款</span>
              <span v-if="items.state == 6">拒绝退款</span>
              <span v-if="items.state == -1">已取消</span>
              <span v-if="items.state == 2">已完成</span>
              <span class="payment" v-if="items.state == 0" @click="continuePay(items.orderId,item)">去付款></span>
              <!--<span class="payment" v-else @click="continuePay(items.orderId,item)">去付款></span>-->
            </p>
          </div>
          <div class="buyGoods">
            <div class="buyGoodsInfo">
              <img :src="item.filePath" alt="">
              <div>
                <p>{{item.commodityName}}</p>
                <span class="unitPrice">{{item.discountPrices}}<br/>×{{item.amount}}</span>
                <p>
                  <span class="realPrice">￥{{item.realPayment}}</span>
                  <!--<span class="virtualPrice" v-if="orders.suggestPrices">￥{{orders.suggestPrices}}</span>-->
                  <!--<span class="monthlySales">×{{item.amount}}</span>-->
                </p>
              </div>
            </div>
          </div>
        </block>
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
    onShow() {
      wx.setNavigationBarTitle({
        title: "我的订单"
      })
      Date.prototype.toLocaleString = function () {
        return this.getFullYear() + "-" + ((this.getMonth() + 1)>9?(this.getMonth() + 1):'0'+(this.getMonth() + 1)) + "-" + (this.getDate()>9?this.getDate():"0"+this.getDate() )+ " " + (this.getHours()>9?this.getHours():"0"+this.getHours()) + ":" + (this.getMinutes()>9?this.getMinutes():"0"+this.getMinutes());
      };
      this.getDetail();
    },
    created() {
    },
    data() {
      return {
        orders: []
      };
    },
    components: {},
    methods: {
      getDetail() {
        var _this = this;
        wx.request({
          url: _this.$store.state.board.urlHttp + '/wechatapi/order/findOrderList',
          method: "post",
          data: {
            sessionID: _this.$store.state.board.sessionID
          },
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            console.log(res)
            if (res.data.success) {
              var data = res.data.data;
              if (data) {
                for (var i = 0; i < data.length; i++) {
                  data[i].time = new Date(data[i].createAt).toLocaleString();
                  for (var j = 0; j < data[i].detailList.length; j++) {
                    data[i].detailList[j].filePath = _this.$store.state.board.urlHttp + data[i].detailList[j].filePath;
                    data[i].detailList[j].realPayment = data[i].detailList[j].realPayment.toFixed(2);
                    data[i].detailList[j].discountPrices = (data[i].detailList[j].realPayment/data[i].detailList[j].amount).toFixed(2);
                  }
                }
              } else {
                data = []
              }
              _this.orders = data;
              console.log(_this.data)
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
      continuePay(orderId,item){
        var that = this;
        var appId=that.$store.state.board.appid;
        var storeId ="1";
        var payRequest;
        wx.request({
          url: that.$store.state.board.urlHttp + "/wechatapi/order/prepay",
          method: "post",
          data: {"sessionID":that.$store.state.board.sessionID,"appId": appId, "storeId": storeId,"outTradeNo":orderId},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            console.log(res)
            if (res.data.success) {
              payRequest = res.data.payRequest;
              that.pay(payRequest,that,orderId,item)
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          }
        });
      },

      pay(payRequest,that,orderId,item){
        console.log(payRequest);
        wx.requestPayment({
          timeStamp: payRequest.timeStamp,
          nonceStr: payRequest.nonceStr,
          package: payRequest.packageStr,
          signType: 'MD5',
          paySign: payRequest.paySign,
          success: function (event) {
            //success
            console.log(event);
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            });
            that.completionOfPayment(that,orderId,item);
          },
          fail: function (error) {
            //fail
            console.log("支付失败")
            console.log(error)
          },
          complete: function () {
            //complete
            console.log("pay complete")
          }
        })
      },
      orderRefund(orderId,item){
        var that = this;
        console.log(orderId)
        wx.navigateTo({
          url: "/pages/refund/main?id=" + orderId
        });
        // console.log(item)
        // wx.showModal({
        //   title:"提示",
        //   content:"确认是否申请退款？",
        //   success(res){
        //     if ((res.confirm)){
        //       console.log("用户申请退款")
        //       wx.request({
        //         url: that.$store.state.board.urlHttp + "/wechatapi/order/orderRefund",
        //         method: "post",
        //         data: {"sessionID": that.$store.state.board.sessionID, orderId: orderId,storeId:"1"},
        //         header: {'content-type': 'application/x-www-form-urlencoded'},
        //         success: function (res) {
        //           if (res.data.success) {
        //             item.prices = item.unitPrice;
        //             item.buyGoodsNum = item.amount;
        //             var itemf = encodeURIComponent(JSON.stringify(item));
        //             wx.redirectTo({
        //               url: '/pages/orderCompletion/main?item='+itemf
        //             })
        //           } else {
        //             wx.showToast({
        //               title: res.data.msg,
        //               icon: 'none',
        //               duration: 2000
        //             })
        //           }
        //         }
        //       })
        //     } else if(res.cancel){
        //       console.log("用户取消退款")
        //     }
        //   }
        // })
      },
      completionOfPayment(that,orderId,item){
        console.log(item)
        console.log("订单号："+orderId)
        console.log("商品Id: "+item.commodityId)
        wx.request({
          url: that.$store.state.board.urlHttp + "/wechatapi/order/completionOfPayment",
          method: "post",
          data: {"sessionID": that.$store.state.board.sessionID, orderId: orderId},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            console.log(res)
            if (res.data.success) {
              item.prices = item.unitPrice;
              item.buyGoodsNum = item.amount;
              // var itemf = encodeURIComponent(JSON.stringify(item));
              wx.navigateTo({
                url: '/pages/orderCompletion/main?commodityId='+item.commodityId
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
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
