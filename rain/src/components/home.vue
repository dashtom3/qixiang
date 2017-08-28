<template>
    <div class="amap-wrapper">
      <el-row class="w1200">
        <el-col :span="5">
          <span class="f12">选择地区:</span>
          <el-select placeholder="请选择地区" class="w160" v-model="cityInfo" @change="changeCity">
            <el-option
            v-for="item in areaList.areaList"
            :key="item"
            :label="item.areaName"
            :value="item">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <span class="f12">实时数据查询:</span>
          <el-select placeholder="请选择地区" class="w160" v-model="selectInfo.time">
            <el-option label="1小时" value="1">
            </el-option>
            <el-option label="3小时" value="3">
            </el-option>
            <el-option label="6小时" value="6">
            </el-option>
            <el-option label="12小时" value="12">
            </el-option>
            <el-option label="24小时" value="24">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="9">
          <span class="f12">历史数据查询:</span>
          <el-date-picker
            type="daterange"
            placeholder="选择日期范围" v-model="selectInfo.historyTime">
          </el-date-picker>
        </el-col>
        <el-col :span="2" :offset="2">
          <a href="/projectForm" class="f12">工情填写</a><br>
          <a href="/historyData" class="f12">雨量统计数据</a>
        </el-col>
      </el-row>

      <el-row class="con">
        <div class="center">
          <el-col>&nbsp;&nbsp;
            <span v-if="cityInfo != null">{{cityInfo.areaName}}&gt;&nbsp;</span>
            <span v-if="selectInfo.time">实时数据查询&gt;&nbsp;{{selectInfo.time}}小时&gt;</span>
            <span v-if="selectInfo.historyTime[0]">历史数据查询&gt;&nbsp;{{startTime}} — {{endTime}}</span>
          </el-col>
        </div>
      </el-row>
      <!-- <button type="button" name="button" @click="changeCenter">迪娜几</button> -->
      <!-- <div id="map" ref="map">
        <el-amap :vid="'amap-vue'" :zoom="mapInfo.zoom" :map-manager="mapInfo.amapManager" :center="mapInfo.center" :mapStyle="mapInfo.mapStyle"></el-amap>

      </div> -->
      <div class="mapContain">
        <div id="container" ref="map">

        </div>
        <div class="change">
          <button type="button" name="button" @click="this.heatMap.hide()">数据图</button>
          <button type="button" name="button" @click="this.heatMap.show()">热力图</button>
        </div>
      </div>
    </div>
</template>

<!-- <script type="text/javascript" src="http://a.amap.com/jsapi_demos/static/resource/heatmapData.js"></script> -->
<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&key=51304144e1f6fe73d3b8b1c47e976cd0"></script>
<script>
// import AMapManager from 'vue-amap'
import Vue_AMap from 'vue-amap'
import areaList from '@/global/cityList'
export default {
  data () {
    // let amapManager = new VueAMap.AMapManager();
    return {
      // mapInfo: null,
      mapInfo: {},
      selectInfo: {
        city: null,
        time: null,
        historyTime: []
      },
      cityInfo: {
        center: [118.3157440000,29.7084410000],
        zoom: 10,
        areaName: "黄山市"
      },
      map: null,
      // center: [118.3157440000,29.7084410000],
      areaList: areaList,
      points: [
          {"lng":116.191031,"lat":39.988585,"count":100},
          {"lng":116.389275,"lat":39.925818,"count":60},
          {"lng":116.287444,"lat":39.810742,"count":200},
          {"lng":116.481707,"lat":39.940089,"count":30},
          {"lng":116.410588,"lat":39.880172,"count":200},
          {"lng":116.394816,"lat":39.91181,"count":10},
          {"lng":116.416002,"lat":39.952917,"count":150}
      ],
      heatMap: ''
    }
  },
  created () {
    setTimeout(this.changeCity,2000)
  },
  mounted () {
    this.$refs.map.style.height = document.body.scrollHeight - 70 + 'px'
  },
  computed: {
    startTime () {
      return this.timeFilter(this.selectInfo.historyTime[0])
    },
    endTime () {
      return this.timeFilter(this.selectInfo.historyTime[1])
    },
    center () {
      return this.cityInfo.center
    }
  },
  methods: {
    changeCity () {
      this.init(this.cityInfo)
    },
    init (obj) {
      var map = new AMap.Map('container', {
          center: obj.center,
          zoom: obj.zoom
          // mapStyle: obj.zoom == 10 ? 'amap://styles/6ed2898a5817e7c65b2b5e15989d555c' : 'amap://styles/e55ccbefb27c3aeffea1800f15d88ae7'
      });
      if (obj.zoom == 10) {
        // console.log(123)
        map.setMapStyle('amap://styles/6ed2898a5817e7c65b2b5e15989d555c')
      } else {
        // console.log(456)
        map.setMapStyle('amap://styles/e55ccbefb27c3aeffea1800f15d88ae7')
      }
      var heatmap;
       map.plugin(["AMap.Heatmap"], function() {
           //初始化heatmap对象
           heatmap = new AMap.Heatmap(map, {
               radius: 100, //给定半径
               opacity: [0, 0.8],
               gradient:{
                0.5: 'blue',
                0.65: 'rgb(117,211,248)',
                0.7: 'rgb(0, 255, 0)',
                0.9: '#ffea00',
                1.0: 'red'
                }
           });
           heatmap.setDataSet({
               data: [
                   {"lng":118.3157440000,"lat":29.7084410000,"count":100},
                   {"lng":118.3153290000,"lat":29.6961090000,"count":60},
                   {"lng":118.1415680000,"lat":30.2729420000,"count":200},
                   {"lng":118.3367510000,"lat":29.8272790000,"count":30},
                   {"lng":118.4153560000,"lat":29.8613080000,"count":200},
                   {"lng":118.1991790000,"lat":29.7890950000,"count":10},
                   {"lng":117.9383730000,"lat":29.9248050000,"count":150},
                   {"lng":117.7173960000,"lat":29.8540550000,"count":150}
               ],
               max: 100
           });
       });
       this.heatMap = heatmap
      //  console.log(this.heatMap,heatmap)
      AMap.service('AMap.DistrictSearch',function(){//回调函数
      var districtSearch = new AMap.DistrictSearch({
            extensions: 'all',  //返回行政区边界坐标组等具体信息
        });
      // districtSearch.setLevel('city');
      // districtSearch.setSubDistrict(1);
      districtSearch.search(obj.areaName, function(status, result){
          var bounds = result.districtList[0].boundaries;
          var polygon = new AMap.Polygon({  //行政区边界渲染，使用多边形覆盖物实现
              map: map,
              strokeWeight: 1,
              path: bounds,
              fillOpacity: 0.1,
              fillColor: '#fff',
              strokeColor: '#CC66CC'
          });
          map.setFitView();
      });
    })
    },
    timeFilter (date) {
      if (date) {
        const month = (date.getMonth()+1) > 10 ? (date.getMonth()+1) : '0' + (date.getMonth()+1)
        const day = date.getDate() > 10 ? date.getDate() : '0' + date.getDate()
        return date.getFullYear() + '-' + month + '-' + day
      }
    }
  }
}
</script>

<style lang="css">
.amap-wrapper {
  width: 100%;
  margin: 20px auto;
  height: 500px;
}
.w1200{width: 1200px;margin: 0 auto;}
.w160{
  width: 160px;
}
.f12{
  font-size: 14px;
  color: rgba(0,0,0,.8);
  text-decoration: none;
}
.f12:hover{
  color: #2097d5;
}
#map{
  width: 100%;
  background-color: #fff!important;
  position: relative;
  /*height: 1000px;*/
}
.change{
  position: absolute;
  left: 20px;
  bottom:20px;
}
.change button{
  border: none;
  outline: none;
  padding: 4px 10px;
  color: #fff;
  border-radius: 5px;
  display: block;
  margin: 10px;
  cursor: pointer;
}
.change button.active, .change button:hover{
  background-color: #fff;
  color: #2097d5;
}
#container{
  width: 100%;
  height: 500px;
  }
.center{
  text-align: left;
  width: 1200px;
  margin:10px auto;
}
.center span{
  font-size: 14px;
}
</style>
