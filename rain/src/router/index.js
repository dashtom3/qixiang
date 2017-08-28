import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import projectForm from '@/components/projectForm'
import home from '@/components/home'
import historyData from '@/components/historyData'
import adm from '@/components/admin/adm'
// import admin from '@/components/admin/admin'
import alarmData from '@/components/admin/alarmData'
import projectData from '@/components/admin/projectData'
import threshold from '@/components/admin/threshold'
import history from '@/components/admin/history'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: home },
    { path: '/index', component: index },
    { path: '/projectForm', component: projectForm },
    { path: '/historyData', component: historyData },
    // { path: '/admin', component: admin },
    { path: '/adm', component: adm,
      children: [
        { path: '/admin/alarmData', name: '预警信息', component: alarmData },
        { path: '/admin/threshold', name: '阀值信息', component: threshold },
        { path: '/admin/projectData', name: '工情信息', component: projectData },
        { path: '/admin/history', name: '历史预警', component: history }
      ]
    }
  ]
})
