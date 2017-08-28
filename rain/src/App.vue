<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  /*font-family: "Microsoft YaHei";*/
}
.h20{
  height: 20px;
}
#app {
  text-align: center;
  /*width: 1200px;*/
  margin: 20px auto 0;
}
.echarts{
  width: 400px;
  height: 400px;
}
.block{
  margin-top: 20px;
  text-align: right;
}
</style>
