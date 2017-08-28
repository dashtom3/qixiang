<template>
  <div class="projectForm">
    <el-tabs v-model="activeTab" @tab-click="tabChanges">
      <el-tab-pane label="工情填表" name="1">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
            <el-form-item label="所属雨量站" prop="stationName">
              <el-input v-model="ruleForm.stationName"></el-input>
            </el-form-item>
            <el-form-item label="雨量站状态" prop="stationStatus">
              <el-input v-model="ruleForm.stationStatus"></el-input>
            </el-form-item>
            <el-form-item label="归属单位" prop="organization">
              <el-input v-model="ruleForm.organization"></el-input>
            </el-form-item>
            <el-form-item label="填报人" prop="personName">
              <el-input v-model="ruleForm.personName"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="填报内容" prop="message">
              <el-input type="textarea" v-model="ruleForm.message"></el-input>
            </el-form-item>
            <!-- <el-form-item label="填报时间" required>
              <el-col :span="5">
                <el-form-item prop="date">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" @click="submitForm">立即创建</el-button>
              <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </el-form-item>
          </el-form>
      </el-tab-pane>
      <el-tab-pane label="工情统计" name="2">
        <el-row>
          <el-col :span="21">
            <el-col :span="8">
              <span style="font-size:14px;">历史数据查询:</span>
              <el-date-picker
                v-model="timeArray"
                type="daterange"
                placeholder="选择日期范围" @change="selectTime">
              </el-date-picker>
            </el-col>
          </el-col>
          <el-col :span="3">
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
      </el-tab-pane>

    </el-tabs>
    <a href="/" class="goIndex">返回首页</a>
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
      ruleForm: {
        stationName: null,
        stationStatus: null,
        organization: null,
        personName: null,
        phone: null,
        message: null
      },
      historysInfo: {
        startTime: null,
        endTime: null,
        currentPage: 1,
        numberPerPage: 10,
        totalPage: -1
      },
      rules: {
        stationName: [{ required: true, message: '请输入所属雨量站', trigger: 'blur' }],
        stationStatus: [{ required: true, message: '请输入雨量站状态', trigger: 'blur' }],
        organization: [{ required: true, message: '请输入归属单位', trigger: 'blur' }],
        personName: [{ required: true, message: '请输入填报人', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
        message: [{ required: true, message: '请输入填报内容', trigger: 'blur' }]
      },
      historyData: []
    }
  },
  methods: {
    tabChanges (event) {
      this.global.emptyData(this.ruleForm)
      this.historysInfo.startTime = null
      this.historysInfo.endTime = null
      if (event.index == 1) {
        this.getData(this.historysInfo)
      }
    },
    submitForm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.global.axiosPostReq('work/add', this.ruleForm)
          .then((res) => {
            if (res.data.callStatus == 'SUCCEED') {
              this.global.success(this, '添加成功', '')
              this.global.emptyData(this.ruleForm)
            } else {
              this.global.error(this, res.data.data, '')
            }
          })
        } else {
          return false
        }
      })
    },
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
        window.location.href = res.config.url
        // res.data.callStatus == 'SUCCEED' ? window.location.href = res.config.url : this.global.error(this,res.data.data, '')
      })
    },
    handleCurrentChange (value) {
      this.historysInfo.currentPage = value
      this.getData(this.historysInfo)
    }
  },
  mounted () {

  }
}
</script>

<style lang="css">
.projectForm{
  position: relative;
  width: 1200px;
  margin: 0 auto;
}
.goIndex{
  position: absolute;
  right: 0px;
  text-decoration: none;
  top: 10px;
}
.goIndex:hover{
  color: #2097d5;
}
.ruleForm{
  width: 800px;
  /*text-align: center;*/
  margin: 0 auto;
}
.h40{
  height: 40px;
}
</style>
