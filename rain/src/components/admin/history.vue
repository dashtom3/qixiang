<template>
  <div class="testProject">
    <div id="table">
      <el-table
        :data="historyList"
        border
        style="width: 100%">
        <el-table-column
          prop="content"
          label="发布内容">
        </el-table-column>
        <el-table-column
          prop="time"
          label="发布时间">
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="adminBlock" v-if="historyArgs.totalPage > 1">
        <el-pagination
          @current-change="changePage"
          :current-page="historyArgs.currentPage"
          layout="prev, pager, next"
          :page-count="historyArgs.totalPage">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      historyArgs: {
        currentPage: 1,
        numberPerPage: 10,
        totalPage: -1
      },
      historyList: [
        { content: '这里是历史信息', time: '2016-12-12' },
        { content: '这里是历史信息', time: '2016-12-12' },
        { content: '这里是历史信息', time: '2016-12-12' },
        { content: '这里是历史信息', time: '2016-12-12' }
      ]
    }
  },
  methods: {
    changePage (value) {
      this.historyArgs.currentPage = value
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
</style>
