<script>
  import utils from "./utils/utils.js";

  export default {
    onLaunch(option) {
      // console.log(option)

    },
    onShow(option) {

      console.log(option)
      var that = this;
      if(option.path == 'pages/logs/main'||option.path == 'pages/authorize/main'||option.path == 'pages/showPages/main'||option.path == 'pages/index/main'||option.path == 'pages/goods/main'||option.path == 'pages/order/main'||option.path == 'pages/my/main'||option.path == 'pages/myOrder/main'||option.path == 'pages/orderCompletion/main'){
        if(option.query.myInvitation){
          that.$store.state.board.otherInvitation = option.query.myInvitation
        }else{
          that.$store.state.board.otherInvitation=''
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
                console.log(333333)
                wx.switchTab({
                  url: '/pages/index/main'
                })
                // wx.redirectTo({
                //   // url: '/pages/addaddress/main'
                //   url: '/pages/addressSelect/main'
                // })
              })
            }
            else {
              wx.redirectTo({
                url: '/pages/authorize/main'
              })
            }
          }
        })
      }
      wx.getSystemInfo({
        success: (res) => {
          this.$store.state.board.windowWidth = res.windowWidth;
          this.$store.state.board.windowHeight = res.windowHeight
        }
      })

    },
    created() {

    }
  }
</script>

<style>
  page {
    width: 100%;
    height: 100%;
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
