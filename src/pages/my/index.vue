<template>
  <div class="my">
    <div class="myinfo">
      <img @click="toLogin" :src="avator" alt="">
      <div @click="toLogin">
        <p>{{userInfo.nickName}}</p>
        <p v-if="userInfo.nickname">点击登录</p>
        <p v-else>微信用户</p>
      </div>
      <div>
        <p><img src="/static/images/huangguan.png" alt="">上月排名:12</p>
      </div>
    </div>
    <div class="gainARebate">
        <p>
          累计获得返利<span>6666</span>元
        </p>
    </div>
    <div class="gainARebate">
      <p>
        累计邀请好友<span>888</span>人
      </p>
    </div>
    <div class="iconlist">
      <div @click="goTo(item.url)" v-for="(item, index) in listData" :key="index">
        <span class="iconfont" :class="item.icon"></span>
        <span>{{item.title}}</span>
      </div>
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
        allcheck: false,
        listData: [],
        Listids: [],
        userInfo: {},
        listData: [

        ]
      };
    },
    components: {},
    methods: {
      goTo(url) {
        if (toLogin()) {
          wx.navigateTo({
            url: url
          });
        }
      },
      toLogin() {
        if (!this.userInfo.avatarUrl) {
          wx.navigateTo({
            url: "/pages/login/main"
          });
        }
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
