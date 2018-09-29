<template>
  <div class="address">

    <scroll-view scroll-y="true" class="addcont" style="height: 100%;">
      <!-- <div class="addcont"> -->
      <div v-if="listData.length!=0" class="item">
        <div class="list" v-for="(item, index) in listData" :key="index">
          <div class="addresslist" :style="item.textStyle">
            <div>
              <span>{{item.name}}</span>
              <div v-if="item.is_default" class="moren">
                默认
              </div>
            </div>
            <div @click="selAddress(item.id)" class="info">
              <p>{{item.mobile}}</p>
              <p>{{item.address+item.address_detail}}</p>
            </div>
            <div @click="toDetail(item.id)"></div>

          </div>
        </div>

      </div>

      <div v-else class="center">
        <p>收货地址在哪里?</p>
      </div>
    </scroll-view>

    <div class="bottom">
      <div @click="wxaddress(1)">+新建地址</div>
      <div @click="wxaddress">一键导入微信地址</div>
    </div>
  </div>
</template>

<script>
// import { get, getStorageOpenid } from "../../utils";
export default {
  onShow() {
    // this.openId = getStorageOpenid();
    this.getAddressList();
  },
  created() {},
  computed: {},
  data() {
    return {
      listData: []
    };
  },
  components: {},
  methods: {
    selAddress(id) {
      wx.setStorageSync("addressId", id);
      // wx.redirectTo({ url: "/pages/order/main?id=" + id });
      wx.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      });
    },
    toDetail(id) {
      console.log(id);
      wx.navigateTo({
        url: "/pages/addaddress/main?id=" + id
      });
    },
    async getAddressList() {
      var that = this;
      wx.request({
        url: "https://www.heyuhsuo.xyz/heyushuo/address/getListAction?openId=oQmbb4sNZdxaUQZ0sfYgvtOP2S7c",
        // url: "https://www.heyuhsuo.xyz/heyushuo/goods/detailaction?id=1009024&openId=" + that.openId,
        method: "get",
        // data:{categoryId: item.id},
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function (res) {
          console.log(res)
          if (res.statusCode == 200) {
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].textStyle = "";
              res.data.data[i].textStyle1 = "";
            }
            that.listData = res.data.data;
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
    wxaddress(index) {
      if (index == 1) {
        wx.navigateTo({
          url: "/pages/addaddress/main"
        });
      } else {
        wx.chooseAddress({
          success: function(res) {
            var res = encodeURIComponent(JSON.stringify(res));
            wx.navigateTo({
              url: "/pages/addaddress/main?res=" + res
            });
          }
        });
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
