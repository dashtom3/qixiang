<template>
  <div id="app">
    <div class="app_header">
      <data-header></data-header>
    </div>
    <div class="app_content">
      <div class="app_nav" ref="app_nav">
        <side-nav></side-nav>
      </div>
      <div class="app_right">
        <div class="breadcrumb">
          <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{pathName}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
import DataHeader from './comment/adminHeader'
import SideNav from './comment/sidenav'

export default {
  data () {
    return {
      pathName: this.$route.name
    }
  },
  components: {
    DataHeader,
    SideNav
  },
  watch: {
    '$route': function () {
      this.pathName = this.$route.name
    }
  },
  mounted () {
    this.$refs.app_nav.style.minHeight = document.body.scrollHeight - 70 + 'px'
    // console.log(, )
  }
}
</script>

<style>
.el-table .cell{
  text-align: center;
}
.hdjj table.el-table__body tr td:nth-child(8) .cell{
  max-height: 120px!important;
  overflow-y: auto!important;
}
.hdjj table.el-table__body tr td:nth-child(9) .cell img{
  max-height: 150px!important;
  max-width: 150px!important;
}
  #app{
    height: 100%;
    margin: 0;
    display: flex;
    flex-flow: column;
  }
  .app_header{
    position: relative;
    flex: 0 0 auto;
    z-index: 2;

  }
  .app_header .title{
    margin-left: 16px;
    color: #fff;
  }
  .app_content{
    flex: 1;
    display: flex;
    flex-flow: row;
  }
  .app_nav{
    position: relative;
    flex: 0 0 200px;
    background: #EFF2F7;
  }
  .app_right{
    flex: 1;
    overflow: auto;
    padding: 20px;

  }
  .breadcrumb{
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }
</style>
