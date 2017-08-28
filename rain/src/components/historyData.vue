<template>
  <div class="history">
    <el-row>
      <el-col :span="12">
        <el-form :inline="true" :model="historyDataArgs" class="demo-form-inline">
          <el-form-item label="选择地区">
            <el-select v-model="historyDataArgs.city" placeholder="活动区域">
              <el-option label="全市" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择时间">
            <el-date-picker
              v-model="historyDataArgs.date"
              type="daterange"
              placeholder="选择日期范围">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="2">
        <a href="/" class="goindex">返回首页</a>
      </el-col>
    </el-row>
    <el-col>
      <div id="dataview">

      </div>
    </el-col>
    <el-col>
      <el-table
        :data="historyDataList"
        border
        style="width: 100%">
        <el-table-column
          prop="jy"
          label="降雨量"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="yl"
          label="雨量站"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="date"
          label="时间"
          header-align="center">
        </el-table-column>
      </el-table>
    </el-col>
  </div>
</template>

<script>
import Echarts from 'echarts'
export default {
  data () {
    return {
      historyDataArgs: {
        city: null,
        date: null,
        startTime: null,
        endTime: null
      },
      historyDataList: [
        { jy: '120', yl: '100', date: '2017-12-12' },
        { jy: '120', yl: '100', date: '2017-12-12' },
        { jy: '120', yl: '100', date: '2017-12-12' },
        { jy: '120', yl: '100', date: '2017-12-12' }
      ]
    }
  },
  methods: {
    getData () {
      var myChart = Echarts.init(document.getElementById('dataview'))
      myChart.setOption({
            tooltip: {},
            xAxis: {
                data: ["2016.01","2016.02","2016.03","2016.04","2016.05","2016.06","2016.07","2016.08","2016.09","2016.10","2016.11","2016.12"]
            },
            yAxis: {},
            series: [{
                name: '降雨量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20,5, 20, 36, 10, 10, 20]
            }]
        });
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="css">
.history{
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
.goindex{
  position: absolute;
  top: 10px;
  right: 0;
}
#dataview{
  width: 1200px;
  height: 600px;
}
</style>
