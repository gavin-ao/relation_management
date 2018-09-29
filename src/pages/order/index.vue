<template>
  <div class="order">
    <div v-if="address.name" class="address">
      <div class="customerService" >
        <div class="collect">
        </div>
      </div>
      <div class="shareFriend">
        <div class="item">
          <div class="list">
            <div class="addresslist">
              <div>
                <span>收货人：{{address.name}}</span>
                <span>{{address.mobile}}</span>
              </div>
              <div class="info">
                <p>收货地址：{{address.address+address.address_detail}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="purchaseImmediately" @click="toAddressList"></div>
    </div>
    <div v-else class="seladdress">
      <div class="customerService" >
        <div class="collect">
        </div>
      </div>
      <div class="shareFriend">
        请选择收货地址
      </div>
      <div class="purchaseImmediately"  @click="toAdd" >+</div>

    </div>
    <div class="selaInfos">
      <div class="buyGoods">
        <div class="buyGoodsInfo">
          <img :src="info.list_pic_url" alt="">
          <div>
            <p>{{info.name}}</p>
            <p><span class="realPrice">￥{{info.retail_price}}</span><span class="virtualPrice">￥{{info.retail_price}}</span><span
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
    <!--<div class="orderbox">-->
      <!--<div class="item">-->
        <!--<div>商品合计</div>-->
        <!--<div>￥{{allprice}}</div>-->
      <!--</div>-->
      <!--<div class="item">-->
        <!--<div>运费</div>-->
        <!--<div>免运费</div>-->
      <!--</div>-->
      <!--<div class="item">-->
        <!--<div>优惠券</div>-->
        <!--<div>暂无</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="cartlist">-->
      <!--<div class="item" v-for="(item,index) in listData" :key="index">-->
        <!--<div class="con">-->
          <!--<div class="left">-->
            <!--<div class="img">-->
              <!--<img :src="item.list_pic_url" alt="">-->
            <!--</div>-->
            <!--<div class="info">-->
              <!--<p>{{item.goods_name}}</p>-->
              <!--<p>￥{{item.retail_price}}</p>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="right">-->
            <!--<div class="num">-->
              <!--x{{item.number}}-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
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
    onLoad(option){
      if(option.goodsId){
        this.goodsId = option.goodsId
      }else{
        this.goodsId = 1006013
      }
      this.initData();
    },
    onShow() {
      // if (wx.getStorageSync("addressId")) {
      //   this.addressId = wx.getStorageSync("addressId");
      // }
      // this.openId = getStorageOpenid();
      wx.setNavigationBarTitle({
        title: "确认订单"
      })
      this.getDetail();
    },
    created() {},
    mounted() {},
    data() {
      return {
        goodsId:'',
        addressId: "",
        openId: "",
        allprice: "",
        listData: [],
        address: {},
        info:{},
        buyGoodsNum:1,
        totalPrices:0
      };
    },
    components: {},
    methods: {
      initData() {
        this.goodsId = '';
        this.info = {};
        this.addressId = '';
        this.listData = [];
        this.address = {};
        this.goodsId = "";
        this.allPrise = "";
        this.buyGoodsNum = 1;
        this.totalPrices = 0;
      },
      pay() {
        wx.showToast({
          title: "支付功能暂未开发", //提示的内容,
          icon: "none", //图标,
          duration: 1500, //延迟时间,
          mask: false, //显示透明蒙层，防止触摸穿透,
          success: res => {}
        });
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
      reduceGoodsNum(){
        // 购买数量 减
        if(this.buyGoodsNum==1){
          wx.showToast({
            title: "购买数量不可以小于1哟！",
            icon: 'none',
            duration: 2000
          })
        }else{
          this.buyGoodsNum--;
        }
        this.totalPrices = (parseInt(this.info.retail_price) *  this.buyGoodsNum).toFixed(2)
      },
      addGoodsNum(){
        // 购买数量 加
        this.buyGoodsNum++;
        this.totalPrices = (parseInt(this.info.retail_price) *  this.buyGoodsNum).toFixed(2)
      },
      async getDetail() {
        var that = this;
        wx.request({
          url: "https://www.heyuhsuo.xyz/heyushuo/order/detailAction?openId=oQmbb4sNZdxaUQZ0sfYgvtOP2S7c&addressId="+ this.addressId,
          method: "get",
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            console.log(res)
            if (res.statusCode == 200) {
              that.allprice = res.data.allPrise;
              that.listData = res.data.goodsList;
              that.address = res.data.address;
              // that.address = [];
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
        wx.request({
          // url: "https://www.heyuhsuo.xyz/heyushuo/goods/detailaction?id="+that.goodsId+"&openId=oQmbb4sNZdxaUQZ0sfYgvtOP2S7c",
          url: "https://www.heyuhsuo.xyz/heyushuo/goods/detailaction?id=1009024&openId=" + that.openId,
          method: "get",
          // data:{categoryId: item.id},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            console.log(res)
            if (res.statusCode == 200) {
              that.info = res.data.info;
              that.totalPrices = (parseInt(res.data.info.retail_price)).toFixed(2);
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
