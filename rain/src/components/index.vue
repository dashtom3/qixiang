<template>
  <div class="echarts">

      <div id="myChart" :style="{width: '100%', height: '600px'}">

      </div>
  </div>
</template>

<script>
import allmap from '../../china.json'
import axios from 'axios'
import IEcharts from 'echarts'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    // console.log(anhui)
    this.get()
  },
  methods: {
    randomData() {
      return Math.round(Math.random()*1000);
    },
    get () {
        IEcharts.registerMap('china', allmap)
        let myChart = IEcharts.init(document.getElementById('myChart'))
          // 绘制图表
          myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            series: [{
                type: 'map',
                map: 'china',
                // roam: false,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [{name: '北京',value: this.randomData() },
                    {name: '天津',value: this.randomData() },
                    {name: '上海',value: this.randomData() },
                    {name: '重庆',value: this.randomData() },
                    {name: '河北',value: this.randomData() },
                    {name: '河南',value: this.randomData() },
                    {name: '云南',value: this.randomData() },
                    {name: '辽宁',value: this.randomData() },
                    {name: '黑龙江',value: this.randomData() },
                    {name: '湖南',value: this.randomData() },
                    {name: '安徽',value: this.randomData() },
                    {name: '山东',value: this.randomData() },
                    {name: '新疆',value: this.randomData() },
                    {name: '江苏',value: this.randomData() },
                    {name: '浙江',value: this.randomData() },
                    {name: '江西',value: this.randomData() },
                    {name: '湖北',value: this.randomData() },
                    {name: '广西',value: this.randomData() },
                    {name: '甘肃',value: this.randomData() },
                    {name: '山西',value: this.randomData() },
                    {name: '内蒙古',value: this.randomData() },
                    {name: '陕西',value: this.randomData() },
                    {name: '吉林',value: this.randomData() },
                    {name: '福建',value: this.randomData() },
                    {name: '贵州',value: this.randomData() },
                    {name: '广东',value: this.randomData() },
                    {name: '青海',value: this.randomData() },
                    {name: '西藏',value: this.randomData() },
                    {name: '四川',value: this.randomData() },
                    {name: '宁夏',value: this.randomData() },
                    {name: '海南',value: this.randomData() },
                    {name: '台湾',value: this.randomData() },
                    {name: '香港',value: this.randomData() },
                    {name: '澳门',value: this.randomData() }
                  ]
            }],
            visualMap: {
                min: 0,
                max: 2500,
                left: 'left',
                top: 'bottom',
                text: ['高','低'],           // 文本，默认为数值文本
                calculable: true
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.echarts{
  width: 1200px;
  margin: 0 auto;
}
</style>
