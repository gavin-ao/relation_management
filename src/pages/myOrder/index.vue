<template>
  <div class="myOrder">
    <div>
      <div class="ordersNum" v-for="(item,index) in orders" :key="index">
        <div class="titleText">
          <p>
            <span>{{item.time}}</span>
            <span v-if="item.flag">已完成</span>
            <span class="payment" v-else>去付款></span>
          </p>
        </div>
        <div class="buyGoods">
          <div class="buyGoodsInfo">
            <img :src="item.imgUrl" alt="">
            <div>
              <p>{{item.text}}</p>
              <p><span class="realPrice">￥{{item.prices}}</span><span
                class="monthlySales">×{{item.number}}</span></p>
            </div>
          </div>
        </div>
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
    },
    created() {},
    data() {
      return {
        orders:[
          {
            time:'2018-09-12 13:25',
            imgUrl:'https://yanxuan.nosdn.127.net/31da695c84cabd0eaff054265da29e5c.jpg',
            text:'53度飞天茅台500ml酱香型+家常久 家常小酒500ml 浓香型',
            prices:1999.00,
            number: 1,
            id:1,
            flag:true
          },
          {
            time:'2018-09-12 13:26',
            imgUrl:'https://yanxuan.nosdn.127.net/31da695c84cabd0eaff054265da29e5c.jpg',
            text:'53度飞天茅台500ml酱香型+家常久 家常小酒500ml 浓香型',
            prices:1999.00,
            number: 2,
            id:2,
            flag:false
          }
        ]
      };
    },
    components: {},
    methods: {

      },
    computed: {

    }
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
