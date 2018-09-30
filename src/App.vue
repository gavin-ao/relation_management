<script>
  import utils from "./utils/utils.js";

  export default {
    onLaunch(option) {
    },
    onShow(option) {
      console.log(option)
      var that = this;
      if(option.query.helpId){
        that.$store.state.board.otherHelpId = option.query.helpId
      }
      wx.getSetting({
        success: (res) => {
          console.log(res);
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.showLoading({
              title: '加载中',
            })
            utils.login(that, false, function (sessionId) {
              wx.redirectTo({
                url: '/pages/index/main?sessionId='+sessionId
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
  page {
    height: 100%;
    width: 100%;
  }

  .container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 100px 0;
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }

  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }
</style>
