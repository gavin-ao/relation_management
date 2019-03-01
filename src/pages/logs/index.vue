<template>
  <div>

  </div>
</template>

<script>
  import utils from "../../utils/utils.js";
  export default {

    data() {
      return {
        logs: []
      }
    },
    onLoad() {
      var that = this;
      wx.getSetting({
        success: (res) => {
          console.log(res);
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.showLoading({
              title: '加载中',
            })
            utils.login(that, false, function (sessionId) {
              console.log(333333)
              wx.switchTab({
                url: '/pages/index/main'
              })
            })
          }
          else {
            wx.redirectTo({
              url: '/pages/authorize/main'
            })
          }
        }
      })
    },
    created() {

    }
  }
</script>

<style>

</style>
