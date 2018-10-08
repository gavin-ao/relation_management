<template>
  <div class="address">

    <scroll-view scroll-y="true" class="addcont" style="height: 100%;">
      <!-- <div class="addcont"> -->
      <div v-if="listData.length!=0" class="item">
        <div class="list" v-for="(item, index) in listData" :key="index">
          <div class="addresslist">
            <div>
              <span>{{item.addressee}}</span>
              <div v-if="item.defaultAddr" class="moren">
                默认
              </div>
            </div>
            <div @click="selAddress(item.addrId)" class="info">
              <p>{{item.phoneNumber}}</p>
              <p>{{item.country + item.province +item.city+ item.region+item.detailAddr}}</p>
            </div>
            <div @click="toDetail(item.addrId)"></div>
            <div @click="deleteAdrr(item.addrId)" style="color: red;">删除</div>

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
    wx.setNavigationBarTitle({
      title: "选择地址"
    })
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
      // wx.redirectTo({ url: "/pages/order/main?addressId=" + id });
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
    deleteAdrr(id){
      var that = this;
      wx.request({
        url:that.$store.state.board.urlHttp + '/wechatapi/order/addr/deleteAddr',
        method: "post",
        data:{sessionID:that.$store.state.board.sessionID,ids:id},
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function (res) {
          console.log(res)
          if (res.data.success) {
            for(var i=0;i<that.listData.length;i++){
              if(id == that.listData[i].addrId){
                that.listData.splice(i,1)
              }
            }
            wx.showToast({
              title: "删除成功", //提示的内容,
              icon: "success", //图标,
              duration: 2000, //延迟时间,
              mask: true, //显示透明蒙层，防止触摸穿透,
              success: res => {
                // wx.navigateBack({
                //   delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
                // });
              }
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
    async getAddressList() {
      var that = this;
      wx.request({
        url:that.$store.state.board.urlHttp + '/wechatapi/order/addr/findAddrList',
        method: "post",
        data:{sessionID:that.$store.state.board.sessionID},
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function (res) {
          console.log(res)
          if (res.data.success) {
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
