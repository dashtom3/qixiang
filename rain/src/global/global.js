import axios from 'axios'
export default {
  baseUrl: 'http://47.93.48.111:6180/rainfull/api/',
  success (obj, msg, url) {
    obj.$message({
      message: msg,
      type: 'success',
      duration: '1000',
      onClose: function () {
        if (url !== '') {
          obj.$router.push(url)
        }
      }
    })
  },
  error (obj, msg, url) {
    obj.$message({
      message: msg,
      type: 'error',
      duration: '1000',
      onClose: function () {
        if (url !== '') {
          obj.$router.push(url)
        }
      }
    })
  },
  getHttpData: function (data) {
    var temp = ''
    for (var i in data) {
      if (data[i] != null && data[i] !== 'null') {
        temp = temp + '&' + i + '=' + data[i]
      }
    }
    return temp
  },
  postHttpData: function (data) {
    var temp = new FormData()
    for (var i in data) {
      if (data[i] != null) {
        temp.append(i, data[i])
      }
    }
    return temp
  },
  axiosGetReq (url, msg) {
    return axios.get(this.baseUrl + url + this.getHttpData(msg))
  },
  axiosPostReq (url, msg) {
    return axios.post(this.baseUrl + url, this.postHttpData(msg))
  },
  filterTime (value) {
    var month = (value.getMonth()+1) > 10 ? (value.getMonth()+1) : '0' + (value.getMonth()+1)
    var day = value.getDate() > 10 ? value.getDate() : '0' + value.getDate()
    var hours = value.getHours() > 10 ? value.getHours() : '0' + value.getHours()
    var minutes = value.getMinutes() > 10 ? value.getMinutes() : '0' + value.getMinutes()
    var seconds = value.getSeconds() > 10 ? value.getSeconds() : '0' + value.getSeconds()
    return `${value.getFullYear()}-` + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  },
  emptyData (data) {
    for (let i in data) {
      data[i] = null
    }
  }
}
