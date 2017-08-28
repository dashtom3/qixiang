<template>

  <div class="">
    <div class="h20">

    </div>
    <el-row>
      <el-col :span="20">
        <el-col :span="6">
          <el-col :span="10" style="position:relative;top:7px;">
            <span style="font-size:14px;">历史数据查询:</span>
          </el-col>
          <el-col :span="14">
            <el-date-picker
              v-model="timeArray"
              type="daterange"
              placeholder="选择日期范围" @change="selectTime">
            </el-date-picker>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="1" :offset="2">
        <el-button type="primary" @click="outExcel">导出工情</el-button>
      </el-col>
    </el-row>
    <div class="h40"></div>
    <el-row>
      <el-table
        :data="historyData"
        v-loading.body="loading"
        border
        style="width: 100%">
        <el-table-column
          prop="message"
          label="填报内容"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="stationStatus"
          label="雨量站状态"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="stationName"
          label="所属雨量站"
          align="center">
        </el-table-column>
        <el-table-column
          prop="organization"
          label="所属单位"
          align="center">
        </el-table-column>
        <el-table-column
          prop="personName"
          label="填报人"
          align="center">
        </el-table-column>
        <el-table-column
          label="时间"
          align="center">
          <template scope="scope">
            <span>{{scope.row.time | time}}</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="block" v-if="historysInfo.totalPage > 1">
        <el-pagination
          :current-page.sync="historysInfo.currentPage"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-count="historysInfo.totalPage">
        </el-pagination>
      </div>
    </el-row>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      activeTab:'1',
      loading: null,
      timeArray: [],
      historysInfo: {
        startTime: null,
        endTime: null,
        currentPage: 1,
        numberPerPage: 10,
        totalPage:-1
      },
      historyData: []
    }
  },
  created () {
    this.getData(this.historysInfo)
  },
  methods: {
    selectTime () {
      if (this.timeArray[0]) {
        this.historysInfo.startTime = this.global.filterTime(this.timeArray[0])
        this.historysInfo.endTime = this.global.filterTime (this.timeArray[1])
      } else {
        this.historysInfo.startTime = null
        this.historysInfo.endTime = null
      }
      this.getData(this.historysInfo)
    },
    // 获取数据
    getData (args) {
      this.loading = true
      this.global.axiosGetReq('work/query?', args)
      .then((res) => {
        if (res.data.callStatus == 'SUCCEED') {
          this.loading = false
          this.historyData = res.data.data
          this.historysInfo.currentPage = res.data.page.currentPage
          this.historysInfo.totalPage = res.data.page.totalPage
        } else {
          this.global.error(this, res.data.data, '')
        }
      })
    },
    gettHistoryData () {
      if (this.historysInfo.startTime && this.historysInfo.endTime) {
        if (this.historysInfo.startTime < this.historysInfo.endTime) {
          this.getData(this.historysInfo)
        } else {
          this.global.error(this, '开始时间要小于结束时间', '')
        }
      }
    },
    outExcel () {
      this.global.axiosGetReq('work/outputExcel?', this.historysInfo)
      .then((res) => {
        res.data.callStatus == 'SUCCEED' ? window.location.href = res.config.url : this.global.error(this,res.data.data, '')
      })
    },
    handleCurrentChange (value) {
      this.historysInfo.currentPage = value
      this.getData(this.historysInfo)
    }
  }
}
</script>

<style lang="css">
.h20{
  height: 20px;
}
.h40{
  height: 40px;
}
</style>
