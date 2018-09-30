import Vue from "vue";
import store from "./store";
import App from "./App";
import './iconfont/iconfont.css';

// import 'mp-weui/lib/style.css'
var Fly = require("flyio/dist/npm/wx");


var fly = new Fly();

Vue.prototype.$ajax = fly; //将fly实例挂在vue原型上
Vue.prototype.$store = store;

Vue.config.productionTip = false;
App.mpType = "app";


const app = new Vue({
  store,
  ...App
});
app.$mount();


export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去 addressSelect
    pages: ["pages/logs/main", "pages/authorize/main", "pages/instrustor/main", "pages/activePower/main", "pages/showPages/main", "^pages/index/main", "pages/goods/main", "pages/order/main", "pages/addressSelect/main", "pages/addaddress/main", "pages/my/main", "pages/myOrder/main","pages/orderCompletion/main",],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#000",
      navigationBarTitleText: "",
      navigationBarTextStyle: "white"
    },
    "tabBar": {
      "backgroundColor": "rgba(247, 247, 247, 0.8)",
      "borderStyle": "white",
      "selectedColor": "#ED1709",
      "color": "#666",
      "list": [{
        "pagePath": "pages/index/main",
        "iconPath": "static/images/home_page_no.png",
        "selectedIconPath": "static/images/home_page_sel.png",
        "text": "首页"
      },
        {
          "pagePath": "pages/myOrder/main",
          "iconPath": "static/images/my_order_no.png",
          "selectedIconPath": "static/images/my_order_sel.png",
          "text": "我的订单"
        },
        {
          "pagePath": "pages/my/main",
          "iconPath": "static/images/personal_center_no.png",
          "selectedIconPath": "static/images/personal_center_sel.png",
          "text": "个人中心"
        }
      ]
    }
  }
};
