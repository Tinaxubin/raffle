// const fs = require('fs')
$(function(){
  $(document).on('keydown', startRaffle)
  $(document).on('click', closeDialog)
})
function startRaffle () {
  if (window.base.length > 0) {
    const selected = raffle(window.base)
    window.selected = window.selected.concat(selected)
    $('#dialog').fadeIn()
    $('.dialog-content').empty()
    let tempObj = ''
    for(let k = 0; k < selected.length; k++) {
      tempObj += `<p>${selected[k]}</p>`
    }
    $('.dialog-content').append(tempObj)
    $('.dialog-title').text(window.prize[window.start].name+'获奖名单')
    window.start--
    if(window.start < 0) {
      window.start = window.prize.length - 1
      window.selected = []
    }
  } else {
    $('#dialog').fadeIn()
    $('.dialog-content').text('请导入数据')
  }
}
function closeDialog () {
  $('#dialog').fadeOut()
}
function raffle (arr = []) {
  let defaultPer = window.prize[window.start].default
  let tempArr = arr
  if (defaultPer.length > 0) { // 默认的不再参与抽奖
    for(let i = 0; i < defaultPer.length; i++) {
      tempArr = arr.filter(item => {
        return item !== defaultPer[i]
      })
    }
  }
  if (window.selected.length > 0) { // 中过奖的不再中奖
    for(let i = 0; i < window.selected.length; i++) {
      tempArr = tempArr.filter(item => {
        return item !== window.selected[i]
      })
    }
  }
  let selectedPer = []
  for(let j = 0; j < window.prize[window.start].count - defaultPer.length; j++) {
    let item = tempArr[Math.floor(Math.random() * tempArr.length)]
    while (selectedPer.indexOf(item) > -1) {
      item = tempArr[Math.floor(Math.random() * tempArr.length)]
    }
    selectedPer.push(item)
  }
  return selectedPer.concat(defaultPer)
}