// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import AMap from 'vue-amap';
import global from './global/global'

Vue.config.productionTip = false
Vue.use(AMap);
AMap.initAMapApiLoader({
  key: '51304144e1f6fe73d3b8b1c47e976cd0',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Heatmap', 'AMap.DistrictSearch']
})
Vue.use(ElementUI)
Vue.prototype.global = global
Vue.filter('time', function (value) {
    value = new Date(value)
    const month = (value.getMonth()+1) > 10 ? (value.getMonth()+1) : '0' + (value.getMonth()+1)
    const day = value.getDate() > 10 ? value.getDate() : '0' + value.getDate()
    return `${value.getFullYear()}-` + month + '-' + day
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
