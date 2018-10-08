<template>
  <div class="vist-userInfo">
    <div style="width: 100%;height: 1300px;margin-top: -1300px;">
    <!--<div style="width: 100%;height: 1300px;">-->
      <canvas canvas-id="shareCanvas" style="width: 100%;" :style="{height:ctxHeight+'px'}"></canvas>
    </div>
    <div class="containers">
      <div class="nickname">
        <img :src="avatarUrl" alt="" style="display: inline-block">
        <span class="names">{{nickName}}</span>
        <!--<img src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIbWFEIJj8IpGeHM7dGic1aTFZALjWcMm9ltWfFiaQfVRYticWBfgGfzXWMt2EkJWiaicPtftHAlWxUibxQ/132" alt="" style="">-->
      </div>
      <img class="conImg" :src="goToLink" alt="">
      <!--<img class="conImg" src="https://yanxuan.nosdn.127.net/31da695c84cabd0eaff054265da29e5c.jpg" alt="">-->

      <!--<img class="backText" src="/static/img/shareBack1.png" alt="">-->
      <div class="shareTexts">
        <p>
          找我买茅台，全单95折！折上折！
        </p>

      </div>
      <div class="qrcodes" style="">
        <img class="codeImg" :src="qrcodeUrl" alt="" style="">
      </div>
    </div>
    <div class="menu" style="">
      <p class="shareText">
        这是你的专属海报，保存图片或直接发送给好友，<br/>好友获得立减5%，您也会得到商品原价5%的返利！

      </p>
      <button class="shares" open-type="share">
        分享
      </button>

      <button class="posters" @click="preview">
        保存图片
      </button>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        arrImage: [],
        checked: false,
        qrcodeUrl: '',
        ctxHeight: 650,
        backImg: require('../../../static/img/shareBack.png')
      }
    },

    onLoad() {

    },
    onShareAppMessage(res) {
      var that = this;
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }

      var myInvitation = that.$store.state.board.myInvitation
      var path = "/pages/index/main";

      if ( myInvitation) {
        path = path + "?myInvitation=" + myInvitation
      } else {

      }
      console.log(path)
      return {
        // title: that.$store.state.board.actShareTitle,
        title: "分享",
        path: path,
        success: function () {

        }
      }

    },
    methods: {
      drawImage() {
        wx.showLoading({
          title: '绘制中...',
        })
        let that = this;
        const ctx = wx.createCanvasContext('shareCanvas');
        ctx.setFillStyle('#fff');
        ctx.fillRect(0, 0, this.getWindowWidth, that.ctxHeight);
        ctx.draw(true);
        ctx.beginPath()
        ctx.setStrokeStyle('rgba(187, 141, 94, 1)')
        ctx.strokeRect(13, 5, (this.getWindowWidth-26), (that.ctxHeight-20));
        ctx.draw(true);
        var heights = that.ctxHeight - 20;
        ctx.drawImage(that.drawPoster, 13, 63, (that.getWindowWidth - 26), heights - 200);
        ctx.draw(true);
        // ctx.drawImage('/static/img/shareBack1.png', 13, 53, (that.getWindowWidth - 26), heights-20);
        // ctx.draw(true);
        ctx.setFontSize(22);
        ctx.setFillStyle('rgba(251, 90, 25, 1)');
        ctx.fillText('找我买茅台，全单', 20, heights - 80);
        ctx.fillText('95折！折上折！', 25, heights - 45);
        ctx.draw(true);
        if (that.drawAvatarUrl) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(48, 35, 20, 0, Math.PI * 2, false);
          ctx.clip();
          ctx.drawImage(that.drawAvatarUrl, 28, 15, 40, 40);
          ctx.restore();
          ctx.draw(true);
        }
        ctx.setFontSize(16);
        ctx.setFillStyle('red');
        ctx.fillText(that.nickName, 75, 40);
        ctx.draw(true);

        var qrcodeUrl = that.$store.state.board.qrcodeUrl;
        //画二维码
        console.log('444444   ' + qrcodeUrl);
        wx.getImageInfo({
          src: qrcodeUrl,
          success: (res) => {
            ctx.save();
            ctx.beginPath();
            ctx.arc((that.getWindowWidth - 76), heights - 75, 50, 0, Math.PI * 2, false);
            ctx.setFillStyle('rgba(255, 255, 255, 0.7)');
            ctx.fill();
            ctx.clip();
            ctx.drawImage(res.path, (that.getWindowWidth - 126), heights - 125, 100, 100);
            ctx.restore();
            ctx.draw(true);
            ctx.setFontSize(10);
            ctx.setFillStyle('rgba(87, 87, 87, 1)');
            ctx.fillText('长按识别小程序码', (that.getWindowWidth - 116),  heights-10);
            ctx.draw(true);
            wx.hideLoading();
          }
        })

      },
      preview() {
        wx.canvasToTempFilePath({
          canvasId: 'shareCanvas',
          success: (res) => {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: (res) => {
                wx.showToast({
                  title: '已保存到相册',
                  success: (res) => {

                  }
                })
              },
              fail: (res) => {
              }
            })


          }
        })
      },
      closePrev() {
        this.checked = false;
        wx.hideLoading()
      },
      saveImg() {

      }
    },
    async onPullDownRefresh() {
      // 停止下拉刷新
      wx.stopPullDownRefresh();
    },

    created() {
    },
    computed: {
      nickName() {
        return this.$store.state.board.nickName
      },
      getGoLink() {
        return this.$store.state.board.goLink
      },
      getAddress() {
        return this.$store.state.board.address

      },
      getWindowWidth() {
        return this.$store.state.board.windowWidth
      },
      getWindowHeight() {
        return this.$store.state.board.windowHeight
      },
      avatarUrl() {
        return this.$store.state.board.avatarUrl;
      },
      drawAvatarUrl() {
        return this.$store.state.board.drawAvatarUrl;
      },
      drawPoster() {
        return this.$store.state.board.drawPoster;
      },
      goToLink() {
        return this.$store.state.board.goToLink;
      }
    },
    mounted() {
      var that = this;
      this.checked = false
      wx.setNavigationBarTitle({
        title: '分享'
      })
      wx.showShareMenu({
        withShareTicket: true
      })
      that.ctxHeight = that.getWindowHeight + 64
      var sessionID = that.$store.state.board.sessionID
      var myInvitation = that.$store.state.board.myInvitation
      that.$store.state.board.qrcodeUrl = ''
      that.qrcodeUrl = ''

      // 二维码获取
      var sysUrls = that.$store.state.board.urlHttp + '/wechatapi/qrcode/createWXQrcodeA';
      wx.request({
        url: sysUrls,
        method: "POST",
        data: {
          appid: that.$store.state.board.appid,
          secret: that.$store.state.board.secret,
          sessionID: sessionID,
          path: 'pages/index/main?myInvitation=' + myInvitation
        },
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function (res) {
          if (res.data.success) {
            that.$store.state.board.qrcodeUrl = that.$store.state.board.urlHttp + res.data.qrcodeUrl
            that.qrcodeUrl = that.$store.state.board.urlHttp + res.data.qrcodeUrl;
            that.drawImage();
          }
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  page{
    height: 100%!important;
  }
  .vist-userInfo {
    font-size: 22px;
    width: 100%;
    height: 100%;
    .containers {
      /*border: 1px solid #CAA363;*/
      width: calc(100% - 26px);
      /*padding: 5px;*/
      height: 79%;
      margin: 0 auto;
      margin-top: 12px;
      position: relative;
      border-radius: 10px;
      .nickname {
        /*margin-top: 10px;*/
        z-index: 100;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          float: left;
          /*border: 1px solid #CAA363;*/
          /*position: absolute;*/
          /*top: 12px;*/
          /*left: 15px;*/
          z-index: 200;
        }
        span {
          display: inline-block;
          color: #CAA363;
        }
        .names {
          margin-top: 5px;
          font-size: 16px;
          font-weight: bold;
          margin-left: 5px;
          vertical-align: middle;
        }
      }
      .conImg {
        width: 100%;
        /*margin-top: 5px;*/
        height: calc(100% - 130px);
        border-radius: 8px;
        position: relative;
        z-index: 100;
      }

      .qrcodes {
        position: relative;
        height: 50px;
        z-index: 400;
        .helpText {
          position: absolute;
          left: 3px;
          top: 10px;
          font-size: 20px;
          color: #CAA363;
        }
        .codeImg {
          width: 84px;
          height: 84px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, .7);
          position: absolute;
          right: 13px;
          top: -2.5px;
        }
        .codeText {
          position: absolute;
          right: 0px;
          top: 35px;
          font-size: 10px;
          color: #575757;
        }
      }
      .backText {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 100
      }
      .shareTexts{
        float: left;
        height: 150px;
        width: 240px;
        p{
          line-height: 41px;
          color: rgba(251, 90, 25, 1);
          font-size: 28px;
          text-align: center;
          font-family: Arial;
        }
      }
    }

    .menu {
      width: 100%;
      height: 14%;
      background: #fff;
      text-align: center;
      position: fixed;
      bottom: 0px;
      left: 0px;
      padding-bottom: 20px;
      .shareText {
        font-size: 14px;
        text-align: center;
        color: #4A4A4A;
        margin-bottom: 5px;
      }
      button {
        display: inline-block;
        margin-top: 10px;
        width: 99px;
        height: 34px;
        border-radius: 17px;
        background-size: cover;
        font-size: 13px;
        text-align: center;
        line-height: 32px;
        cursor: pointer;
      }
      .shares {
        border: 1px solid #F05522;
        color: #F05522;
        background: #fff;
      }
      .posters {
        border: 1px solid #F05522;
        background-color: #F05522;
        color: rgba(255, 255, 255, 1);
        margin-left: 20px;
      }
    }
  }
</style>
