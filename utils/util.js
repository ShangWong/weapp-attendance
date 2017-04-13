function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDateForPicker(date, flag) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  if(flag === 'start'){
    return [year, month, 1].map(formatNumber).join('-')
  }else if(flag === 'end'){
    return [year, month+1, 1].map(formatNumber).join('-')
  }else{
    return [year, month, day].map(formatNumber).join('-')
  }
}

function currentTime(){
  var date = new Date(Date.now());

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [hour, minute, second].map(formatNumber).join(':');
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDateForPicker,
  currentTime: currentTime
}
