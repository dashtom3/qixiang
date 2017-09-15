<template>
    <div class="amap-wrapper">
      <el-row class="w1000">
        <el-col :span="6">
          <span class="f12">选择地区:</span>
          <el-select placeholder="请选择地区" class="w160" value-key="areaName" v-model="city" @change="changePlace">
            <el-option
            v-for="item in areaList.areaList2"
            :key="item.areaName"
            :label="item.areaName"
            :value="item">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <span class="f12">实时数据查询:</span>
          <el-select placeholder="请选择小时数" class="w160" v-model="time" @change="queryPreData">
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
        <el-col :span="8">
          <span class="f12">历史数据查询:</span>
          <el-date-picker
            type="daterange"
            placeholder="选择日期范围" v-model="historyTime" @change="e => queryHisData(e)">
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
            <span v-if="city != null">{{city.areaName}}&nbsp;&gt;&nbsp;</span>
            <span v-if="time != null">实时数据查询:&nbsp;{{time}}小时</span>
            <span v-if="time == null">历史数据查询:&nbsp;{{info.startTime}}至{{info.endTime}}</span>
          </el-col>
        </div>
      </el-row>

      <div class="mapContain" v-loading="loading" element-loading-text="地图加载中">
        <div id="container" ref="map">
          <!-- <el-amap-marker v-for="item in data" :position="[item.lgTD,item.ltTD]"
                    :content="item.content" :visible="true">
          </el-amap-marker> -->
        </div>
        <div class="change">
          <button type="button" name="button" @click="toggleHotmap(1)" :class="{'active':isShowHeatmap == false}">数据图</button>
          <button type="button" name="button" @click="toggleHotmap(0)" :class="{'active':isShowHeatmap == true}">色斑图</button>
        </div>
      </div>
    </div>
</template>

<script>

import areaList from '@/global/cityList'
export default {
  data () {
    return {
      loading: false,
      time: 1,
      city:areaList.areaList2[0],
      historyTime: [[],[]],
      info: {
        startTime: null,
        endTime: null
      },
      isShowHeatmap:false,
      areaList: areaList,
      map: null,
      polygon: null,
      data:null
    }
  },
  mounted () {
    this.loading = true
    this.info.startTime = this.historyTime[0] = this.timeFilter(new Date().getTime())
    this.info.endTime = this.historyTime[1] = this.timeFilter(new Date().getTime())

    setTimeout(this.changeInfo,2000)
    this.initMap()
    this.getData()
    console.log(this.historyTime)
  },
  methods: {
    changePlace() {
      this.loading = true
      this.setMap();
    },
    queryPreData(val){
      this.loading = true
      // this.info.startTime = this.historyTime[0] = this.timeFilter(new Date(new Date().setMonth((new Date().getMonth()-1))))
      // this.info.endTime = this.historyTime[1] = this.timeFilter(new Date())
      this.time = val
      this.info.startTime = this.timeFilter(new Date().getTime()-val*1000*60*60)
      this.info.endTime = this.timeFilter(new Date().getTime())
      this.getData()
    },
    queryHisData(val) {
      this.loading = true
      this.info.startTime =  this.timeFilter(this.historyTime[0].getTime())
      this.info.endTime = this.timeFilter(this.historyTime[1].getTime())
      this.time = null;
      this.getData();
    },
    initMap(){
      var self = this
      this.map = new AMap.Map('container', {
          center: self.city.center,
          zoom: self.city.zoom,
          zooms: [9,12]
      });
      this.setMap()
    },
    setMap(){
      if (this.city.zoom == 10) {
        this.map.setMapStyle('amap://styles/6ed2898a5817e7c65b2b5e15989d555c')
      } else {
        this.map.setMapStyle('amap://styles/e55ccbefb27c3aeffea1800f15d88ae7')
      }
      this.setBoundary()
    },
    setBoundary(){
      var self = this
      if(this.polygon != null) {
        this.polygon.setMap(null);
      }
      AMap.service('AMap.DistrictSearch',function(){//回调函数
        var districtSearch = new AMap.DistrictSearch({
              extensions: 'all',  //返回行政区边界坐标组等具体信息
          });
        districtSearch.search(self.city.areaName, function(status, result){
            var bounds = result.districtList[0].boundaries;
            self.polygon = new AMap.Polygon({  //行政区边界渲染，使用多边形覆盖物实现
                map: self.map,
                strokeWeight: 1,
                path: bounds,
                fillOpacity: 0.1,
                fillColor: '#fff',
                strokeColor: '#66bb6a'
            });
            self.map.setFitView();
            self.loading = false;
        });
      })
    },
    setHtmlContent(value, name) {
      const temp1 = `<div style="text-align:center;width:100px" ><div><span style="color:#2196f3">${value}</span></div><div style="width:3px;height:3px;background-color:#000000;border-radius:1.5px;margin:-3px auto"></div>`;
      const temp2 = `<div style="margin-top:-3px"><span style="font-size:12px;color:black">${name}</span></div></div>`;
      return temp1 + temp2;
    },
    setMarker(){
      console.log(1);
      var self = this
      this.data.forEach(function(item){
        item.marker = new AMap.Marker({
             content: item.content,
             position: [item.lgTD, item.ltTD]
         });
         item.marker.setMap(self.map);
      })
    },
    setHeatmap(){
      // var heatmap;
      //  this.map.plugin(["AMap.Heatmap"], function() {
      //      //初始化heatmap对象
      //      heatmap = new AMap.Heatmap(map, {
      //          radius: 100, //给定半径
      //          opacity: [0, 0.8],
      //          gradient:{
      //           0.5: 'blue',
      //           0.65: 'rgb(117,211,248)',
      //           0.7: 'rgb(0, 255, 0)',
      //           0.9: '#ffea00',
      //           1.0: 'red'
      //           }
      //      });
      //      heatmap.setDataSet({
      //          data: [
      //              {"lng":118.3157440000,"lat":29.7084410000,"count":100},
      //              {"lng":118.3153290000,"lat":29.6961090000,"count":60},
      //              {"lng":118.1415680000,"lat":30.2729420000,"count":200},
      //              {"lng":118.3367510000,"lat":29.8272790000,"count":30},
      //              {"lng":118.4153560000,"lat":29.8613080000,"count":200},
      //              {"lng":118.1991790000,"lat":29.7890950000,"count":10},
      //              {"lng":117.9383730000,"lat":29.9248050000,"count":150},
      //              {"lng":117.7173960000,"lat":29.8540550000,"count":150}
      //          ],
      //          max: 100
      //      });
      //  });
      //  this.heatMap = heatmap
    },
    getData (){
      var self = this
      if(this.data != null) {
        this.data.forEach(function(item){
          self.map.remove(item.marker)
        })
      }
      // 发送请求
      this.global.axiosGetReq('data/queryData?',this.info)
      .then((res) => {
        this.loading = false
        if (res.data.callStatus != 'SUCCEED') {
          this.global.error(this,res.data.data,'')
          return false
        }
        self.data = res.data.data[0].data
        console.log(res.data,self.data)
        self.showMap()

      })
    },
    showMap(){
      var self = this
      this.data.forEach(function(item){
        item.content = self.setHtmlContent(item.value, item.stName);
      })
      this.setMarker()
    },
    timeFilter (time) {
      var temp = new Date(parseInt(time))
      if (temp) {
        const month = (temp.getMonth()+1) >= 10 ? (temp.getMonth()+1) : '0' + (temp.getMonth()+1)
        const day = temp.getDate() >= 10 ? temp.getDate() : '0' + temp.getDate()
        return temp.getFullYear() + '-' + month + '-' + day
      }
      return null
    },
    toggleHotmap (type) {
      type == 1 ? this.isShowHeatmap = false : this.isShowHeatmap = true
      // this.changeCity()
    },
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
  height: 600px;
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
