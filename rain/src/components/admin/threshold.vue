<template>
  <div class="testProject">
    <el-row>
      <el-col :span="10">
        <el-form label-width="100px" :model="thresholdForm">
          <el-form-item label="当前阀值:" style="text-align:left;">
            <span>{{oldThreshold}}</span>
          </el-form-item>
          <el-form-item label="设置新阀值" style="text-align:left;">
            <el-input v-model="thresholdForm.threshold" class="w500"></el-input>
          </el-form-item>
          <el-form-item style="text-align:left;">
            <el-button type="primary" @click="editThreshold">确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        oldThreshold: null,
        thresholdForm: {
          threshold: null
        }
      }
    },
    created () {
      this.getThreshold()
    },
    methods: {
      getThreshold () {
        this.global.axiosGetReq('data/getThreshold')
        .then((res) => {
          // console.log(res)
          res.data.callStatus == 'SUCCEED' ? this.oldThreshold = res.data.data : this.global.error(this, res.data.data, '')
        })
      },
      editThreshold () {
        if (this.thresholdForm.threshold) {
          this.global.axiosPostReq('data/updateThreshold', this.thresholdForm)
          .then((res) => {
            // res.data.callStatus == ''
            // console.log(res)
            if (res.data.callStatus == 'SUCCEED') {
              this.global.success(this, '修改成功', '')
              this.oldThreshold = this.thresholdForm.threshold
              this.thresholdForm.threshold = null
            } else {
              this.global.error(this, res.data.data, '')
            }
          })
        } else {
          this.global.error(this, '请输入新的阀值', '')
        }
      }
    }
  }
</script>

<style media="screen">
  .function{
    margin-bottom:10px;
  }
  .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.adminBlock{
  float: right;
  margin-top: 20px;
}
.w500{
  width: 500px;
}
</style>
