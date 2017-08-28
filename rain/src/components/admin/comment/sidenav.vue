<template>
    <el-menu class="el-menu-vertical-demo" :default-active="routerActive" router>
    <el-menu-item index="/admin/alarmData"><i class="el-icon-menu"></i>预警信息</el-menu-item>
    <el-menu-item index="/admin/threshold"><i class="el-icon-message"></i>阀值信息</el-menu-item>
    <el-menu-item index="/admin/projectData"><i class="el-icon-star-on"></i>工情信息</el-menu-item>
    <el-menu-item index="/admin/history"><i class="el-icon-menu"></i>历史预警</el-menu-item>
  </el-menu>
  </el-col>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      routerActive: this.$route.path
    }
  }
}
</script>
