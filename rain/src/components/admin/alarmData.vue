<template>
  <div class="testProject">
    <div class="function">
      <el-row>
        <el-col :span="24" style="text-align:left;">
            <span>发布预警</span>
        </el-col><br>
        <el-col style="text-align:center;">
          <el-form>
            <el-form-item label="">
              <el-input type="textarea" v-model="addNoticeMsg.content"
              :autosize="{ minRows: 5}"></el-input>
            </el-form-item>
            <el-form-item style="text-align:center;">
              <el-button type="primary">发 布</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <hr style="border: 1px dashed #e2e2e2;"><br><br>

      <el-row>
        <el-col :span="22" style="text-align:left;">
            <span>预警通知人员</span>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click.native="addNoticeAlertShow">添加人员</el-button>
        </el-col>
      </el-row>
    </div>
    <div id="table">
      <el-table
        :data="noticeList"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="content"
          label="备注">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="editNotice(scope.row.id)">修 改</el-button>
            <el-button
              size="small"
              type="danger"
              @click="onDelClick(scope.row.id)">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="adminBlock" v-if="noticeArgs.totalPage > 1">
        <el-pagination
          @current-change="changePage"
          :current-page="noticeArgs.currentPage"
          layout="prev, pager, next"
          :page-count="noticeArgs.totalPage">
        </el-pagination>
      </div>

      <el-dialog :title="title" v-model="addNoticeAlert">
        <el-form :model="addNoticeMsg" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="addNoticeMsg.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="addNoticeMsg.phone"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="addNoticeMsg.content"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-if="addNoticeClick">确 定</el-button>
            <el-button type="primary" v-if="editNoticeClick">修 改</el-button>
            <el-button @click="addNoticeAlert = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: null,
        addNoticeAlert: false,
        addNoticeClick: false,
        editNoticeClick: false,
        addNoticeMsg: {
          name: null,
          phone: null,
          content: null
        },
        noticeArgs: {
          currentPage: 1,
          numberPerPage: 10,
          totalPage: -1
        },
        noticeList: [
          { name: 'gwt', phone: '17630035406', content: '你好' },
          { name: 'gwt', phone: '17630035406', content: '你好' },
          { name: 'gwt', phone: '17630035406', content: '你好' }
        ]
      }
    },
    methods: {
      addNoticeAlertShow () {
        this.addNoticeAlert = true
        this.title = '添加人员'
        this.addNoticeClick = true
        this.editNoticeClick = false
      },
      editNotice () {
        this.addNoticeAlert = true
        this.title = '修改信息'
        this.addNoticeClick = false
        this.editNoticeClick = true
      },
      changePage (value) {
        console.log(value)
      }
    }
  }
</script>

<style media="screen">
  .function{
    margin-bottom:10px;
    margin-top: 20px;
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
