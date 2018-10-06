<template>
  <div class="my">
    <div class="myinfo">
      <img @click="toLogin" :src="avator" alt="">
      <div @click="toLogin">
        <p>{{userInfo.nickName}}</p>
        <!--<p v-if="userInfo.nickname">点击登录</p>-->
        <!--<p v-else>微信用户</p>-->
      </div>
      <div>
        <p><img src="/static/images/huangguan.png" alt="">上月排名:12</p>
      </div>
    </div>
    <div class="gainARebate">
        <p>
          累计获得返利<span>{{rebateMoney}}</span>元
        </p>
    </div>
    <div class="gainARebate">
      <p>
        累计邀请好友<span>{{inviterNum}}</span>人
      </p>
    </div>
  </div>
</template>

<script>
  // import {
  //   get,
  //   toLogin,
  //   login
  // } from "../../utils";
  export default {
    onShow() {
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      // if (login()) {
      //   this.userInfo = login();
      //   console.log(this.userInfo);
      //   this.avator = this.userInfo.avatarUrl;
      // }
      this.getDetail()
    },
    created() {},
    mounted() {
      wx.setNavigationBarTitle({
        title: "个人中心"
      })
    },
    data() {
      return {
        avator: "http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png",
        userInfo:{nickName:"王五"},
        inviterNum:0,
        rebateMoney:0
      };
    },
    components: {},
    methods: {
      getDetail() {
        var _this = this;
        wx.request({
          url: _this.$store.state.board.urlHttp + '/wechatapi/user/getInviterNumAndRebateMoney',
          method: "post",
          data: {
            sessionID: _this.$store.state.board.sessionID
          },
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            console.log(res)
            if (res.data.success) {
              _this.inviterNum= res.data.inviterNum
              _this.rebateMoney= res.data.rebateMoney
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
