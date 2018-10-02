<template>
  <div class="addaddress">
    <div class="item">
      <span>收货人</span>
      <input type="text" placeholder="请输入收货人姓名" v-model="userName"  placeholder-style="color: rgba(136, 136, 136, 1);font-size: 28rpx;">
    </div>
    <div class="item">
      <span>手机号码</span>
      <input type="text" placeholder="请输入手机号码" v-model="telNumber" placeholder-style="color: rgba(136, 136, 136, 1);font-size: 28rpx;">
    </div>
    <div class="item">
      <span>省市地区</span>
      <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
        <input type="text" placeholder="点击选择" v-model="address" placeholder-style="color: rgba(136, 136, 136, 1);font-size: 28rpx;">
      </picker>
    </div>
    <div class="item detailadress">
      <span>详细地址</span>
      <textarea type="text" placeholder="请输入详细地址（5-120个字）" class="detailadress" v-model="detailadress"  placeholder-style="color: rgba(136, 136, 136, 1);font-size: 28rpx;">
      </textarea>
    </div>
    <div class="item itemend">
      <div>
        <span>设置为默认地址</span>
        <switch @change="checkboxChange"/>
      </div>
      <!--<checkbox-group @change="checkboxChange">-->
        <!--<label class="checkbox">-->
          <!--<checkbox class="box" value="true" :checked="checked" color="#B4282D" />设置为默认地址-->
        <!--</label>-->
      <!--</checkbox-group>-->
    </div>
    <div  class="bottom">
      <div @click="saveAddress">
        保存
      </div>
      <div @click="wxaddress">一键导入微信地址</div>
    </div>

  </div>
</template>

<script>
  // import {
  //   get,
  //   post,
  //   getStorageOpenid
  // } from "../../utils";
  export default {
    onLoad() {
      this.initData()
    },
    created() {},
    mounted() {
      wx.setNavigationBarTitle({
        title: "新增地址"
      })
      // this.openId = getStorageOpenid();
      if (this.$root.$mp.query.res) {
        this.res = JSON.parse(decodeURIComponent(this.$root.$mp.query.res));
        console.log(this.res);
        this.userName = this.res.userName;
        this.telNumber = this.res.telNumber;
        this.address = `${this.res.provinceName} ${this.res.cityName} ${this.res.countyName}`;
        this.detailadress = this.res.detailInfo;
      }
      if (this.$root.$mp.query.id) {
        console.log(this.$root.$mp.query.id)
        this.id = this.$root.$mp.query.id;
        this.getDetail();
      }
    },
    data() {
      return {
        region: [],
        customItem: "全部",
        id: "",
        openId: "",
        res: {},
        userName: "",
        telNumber: "",
        address: "",
        detailadress: "",
        checked: false
      };
    },
    methods: {
      initData() {
        this.region = [],
          this.customItem = "全部",
          this.id = "",
          this.res = {},
          this.userName = "",
          this.telNumber = "",
          this.address = "",
          this.detailadress = "",
          this.checked = false
      },
      bindRegionChange(e) {
        var value = e.mp.detail.value;
        console.log(value)
        this.address = value[0] + " " + value[1] + " " + value[2];
      },
      async getDetail() {
        const data = await get("/address/detailAction", {
          id: this.id
        });
        var detail = data.data;
        this.userName = detail.name;
        this.telNumber = detail.mobile;
        this.address = detail.address;
        this.detailadress = detail.address_detail;
        this.checked = detail.is_default == 1 ? true : false;
      },
      checkboxChange(e) {
        console.log(e)
        this.checked = e.mp.detail.value[0];
      },
      async saveAddress() {
        var _this = this;
        // var obj = {
        //   userName: _this.userName,
        //   telNumber: _this.telNumber,
        //   address: _this.address,
        //   detailadress: _this.detailadress,
        //   checked: _this.checked,
        //   openId: _this.openId,
        //   addressId: _this.id
        // };
        const data = await post("/address/saveAction", {
          userName: _this.userName,
          telNumber: _this.telNumber,
          address: _this.address,
          detailadress: _this.detailadress,
          checked: _this.checked,
          openId: _this.openId,
          addressId: _this.id
        });
        if (data.data) {
          wx.showToast({
            title: "添加成功", //提示的内容,
            icon: "success", //图标,
            duration: 2000, //延迟时间,
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: res => {
              wx.navigateBack({
                delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
              });
            }
          });
        }
      },
      wxaddress() {
        var _this = this;
        wx.chooseAddress({
          success: function (res) {
            _this.userName = res.userName;
            _this.telNumber = res.telNumber;
            _this.address = `${res.provinceName} ${res.cityName} ${res.countyName}`;
            _this.detailadress = res.detailInfo;
          }
        });
      }
    }
  };

</script>

<style lang='scss' scoped>
  @import "./style.scss";

</style>
