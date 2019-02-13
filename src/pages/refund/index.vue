<template>
  <div class="refund">
    <div class="seladdress">
      <div class="seladdressCon">
        <div class="shareFriend">
          商品名称
        </div>
        <div class="purchaseImmediately">{{commodityName}}</div>
      </div>
      <div class="seladdressCon">
        <div class="shareFriend">
          订单金额
        </div>
        <div class="purchaseImmediately">￥{{totalFee}}</div>
      </div>
      <div class="seladdressCon">
        <div class="shareFriend">
          订单编号
        </div>
        <div class="purchaseImmediately">{{orderId}}</div>
      </div>
      <div class="seladdressCon">
        <div class="shareFriend">
          交易时间
        </div>
        <div class="purchaseImmediately">{{transactionDate}}</div>
      </div>
    </div>

    <div class="selerefund">
      <div class="seladdressCon">
        <div class="shareFriend">
          处理方式
        </div>
        <div class="purchaseImmediately">
          <picker @change="processingModeChange" :data-value="processingModeIndex" :range="processingModeArray">
            <view v-if="processingModeIndex == -1">
              <text>请选择处理方式</text>
            </view>
            <view v-else>
              <text>{{processingModeArray[processingModeIndex]}}</text>
            </view>
          </picker>
        </div>
      </div>
      <div class="seladdressCon">
        <div class="shareFriend">
          退款原因
        </div>
        <div class="purchaseImmediately">
          <picker @change="refundReasonChange" :data-value="refundReasonIndex" :range="refundReasonArray">
            <view v-if="refundReasonIndex == -1">
              <text>请选择退款原因</text>
            </view>
            <view v-else>
              <text>{{refundReasonArray[refundReasonIndex]}}</text>
            </view>
          </picker>
        </div>
      </div>
      <div class="seladdressCon">
        <div class="shareFriend">
          退款金额
        </div>
        <div class="purchaseImmediately">￥{{refundFee}}</div>
      </div>
      <div class="seladdressCon">
        <div class="shareFriend">
          手机号码
        </div>
        <div class="purchaseImmediately">
          <input type="text" placeholder="请输入手机号码" v-model="mobilePhone" style="font-size: 14px"/>
        </div>
      </div>
      <div class="seladdressCon">
        <div class="shareFriend">
          备注
        </div>
        <div class="purchaseImmediately">
          <input type="text" placeholder="请输入备注" v-model="remarks" style="font-size: 14px"/>
        </div>
        <div class="seladdressCon">
          <div class="shareFriend">
            图片举报
          </div>
          <div class="purchaseImmediately">
            可上传5张图片
          </div>
          <div class="relImg" style="display: block;">
            <div class="uploadImg" v-if="selFlag == true">
              <div v-for="(item,index) in selImg" :key="index">
                <img :src="item" alt="">
                <p @click="deleteImg" :data-index="index"><i class="icon iconfont icon-shanchu"></i></p>
              </div>
            </div>
            <div class="relSelImg">
              <i class="icon iconfont icon-xiangji1" @click="changeImg"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class='btn1' @click="submissionRefund">
      <view>提交</view>
    </button>
    <!--<view class="section off" :class="{'on':repaly==true}">-->
    <!--<input name="other" placeholder="请输入所预约项目" type="text"/>-->
    <!--</view>-->
  </div>
</template>

<script>
  import {
    cutOutSubString,
    modelT
  } from "../../utils/utils.js";

  export default {
    onLoad(option) {
      // this.initData();
      var that = this;
      this.orderId = option.id
      console.log("订单id: " + this.orderId)
      this.refundDetail();
      that.selImg = [];
      that.urlTobase64 = [];
      that.$store.state.board.uploadPictures = [];
    },
    onShow() {
      wx.setNavigationBarTitle({
        title: "申请退款"
      });
      Date.prototype.toLocaleString = function () {
        return this.getFullYear() + "-" + ((this.getMonth() + 1) > 9 ? (this.getMonth() + 1) : '0' + (this.getMonth() + 1)) + "-" + (this.getDate() > 9 ? this.getDate() : "0" + this.getDate()) + " " + (this.getHours() > 9 ? this.getHours() : "0" + this.getHours()) + ":" + (this.getMinutes() > 9 ? this.getMinutes() : "0" + this.getMinutes());
      };
    },
    created() {
    },
    mounted() {
    },
    data() {
      return {
        openId: "",
        commodityName: "",
        commodityNameAll:"",
        totalFee: 0,
        refundFee: 0,
        firstJump: undefined, //不允许重复点击
        orderId: '', //订单id
        processingModeArray: ['退款', '退款并退货'], //退款处理方式
        processingModeIndex: -1,
        // reply:false,
        refundReasonArray: ['发货问题', '商品破损问题', '生产日期、批号与卖家承若不符', '其它'], //退款原因
        refundReasonIndex: -1,
        transactionDate: '',
        // nowText: '',
        selImg: [],
        selFlag: false,
        nowTextNum: 0,
        urlTobase64: [],
        mobilePhone: "",//电话号码
        remarks: "" //备注

      };
    },
    components: {},
    methods: {
      /**
       * 退款处理方式
       */
      processingModeChange(e) {
        // console.log('乔丹选的是', this.processingModeArray[e.mp.detail.value])
        // if (e.mp.detail.value == 4) {
        //   this.reply = true;
        // } else {
        //   this.reply = false;
        // }
        this.processingModeIndex = e.mp.detail.value
      },
      /**
       * 退款原因
       * @param e
       */
      refundReasonChange(e) {
        // console.log('乔丹选的是', this.refundReasonArray[e.mp.detail.value])
        this.refundReasonIndex = e.mp.detail.value
      },
      async refundDetail() {
        var that = this;
        console.log(that.orderId)
        wx.request({
          url: that.$store.state.board.urlHttp + "/wechatapi/order/refundDetail",
          method: "post",
          data: {"sessionID": that.$store.state.board.sessionID, "orderId": that.orderId},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function (res) {
            console.log(res);
            if (res.data.success) {
              that.commodityName = cutOutSubString(res.data.commodityName, 20, true);
              that.commodityNameAll = res.data.commodityName;
              that.totalFee = res.data.totalFee;
              that.refundFee = res.data.refundFee;
              that.transactionDate = new Date(res.data.transactionDate).toLocaleString()
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
      submissionRefund() {
        //提交申请退款信息
        var that = this;
        if (that.selImg.length != 0) {
          if (Number(that.processingModeIndex) == -1) {
            modelT("请选择退款方式");
          } else if (Number(that.refundReasonIndex) == -1) {
            modelT("请选择退款原因");
          } else if (!that.mobilePhone.trim()) {
            modelT("请填写电话号码");
          } else if (!that.remarks.trim()) {
            modelT("请填写备注");
          } else {
            var datas = {}
            datas.sessionID = that.$store.state.board.sessionID;
            datas.storeId = "1";
            datas.paramJsonArr = JSON.stringify(that.urlTobase64);
            datas.orderId = that.orderId;
            datas.processingMode = that.processingModeArray[that.processingModeIndex];
            datas.refundReason = that.refundReasonArray[that.refundReasonIndex];
            datas.mobilePhone = that.mobilePhone.trim();
            datas.remarks = that.remarks.trim();
            datas.commodityName = that.commodityNameAll;
            console.log(datas)
            wx.request({
              url: that.$store.state.board.urlHttp + "/wechatapi/order/uploadRefundInfo",
              method: "POST",
              data: datas,
              header: {'content-type': 'application/x-www-form-urlencoded'},
              success: function (res) {
                if (res.data.success) {
                  modelT("退款申请成功");
                  wx.switchTab({
                    url: '/pages/myOrder/main'
                  })
                } else {
                  utils.modelT("上传失败，请重新上传。");
                }
              }
            });
          }
        } else {
          modelT("请上传图片");
        }
      },
      changeImg() {
        var that = this;
        if (that.selImg.length < 5) {
          var len = 5 - that.selImg.length;
          wx.chooseImage({
            count: len, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: (res) => {
              res.tempFiles.forEach(function (item, index) {
                var flag = false;
                var sizes = item.size / 1024;
                if (sizes > 1024) {
                  flag = true;
                }
                if (flag) {
                  modelT("上传图片过大。");
                } else {
                  if (that.selImg.length < 5) {
                    wx.getImageInfo({
                      src: item.path,
                      success: (res) => {
                        that.$store.state.board.uploadPictures.push({
                          width: res.width,
                          height: res.height,
                          temp: res.path
                        });
                      }
                    });
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    that.selImg.push(item.path);
                    wx.getFileSystemManager().readFile({
                      filePath: item.path, //选择图片返回的相对路径
                      encoding: 'base64', //编码格式
                      success: res => { //成功的回调
                        that.urlTobase64.push('data:image/png;base64,' + res.data);
                      }
                    });
                    that.selFlag = true;
                  } else {
                    modelT("最多上传5张图片。");
                  }
                }
              })

            },
            complete: function (res) {

            }
          })
        } else {
          modelT("最多上传5张图片。");
        }
      },
      deleteImg(e) {
        var index = e.currentTarget.dataset.index;
        this.selImg.splice(index, 1);
        this.urlTobase64.splice(index, 1);
        this.$store.state.board.uploadPictures.splice(index, 1);
        if (this.selImg.length == 0) {
          this.selFlag = false;
        }
      }
    },
    computed: {
      discount() {
        return Boolean(this.$store.state.board.share || this.$store.state.board.otherInvitation);
      }
    }
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
