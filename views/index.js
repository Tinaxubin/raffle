$(function(){
  var count = 0
  var interval

  //回车键控制开始和停止
  $(document).keydown(function (event) {
    $('#csvFileInput').attr('disabled','disabled');
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) { // enter 键
      if(count % 2 === 0) { //开始滚动
        var start = localStorage.getItem('start') || 0
        if(start <= window.prize.length - 1) {
          closeDialog()
          interval = setInterval(scroll, 5);
        }
      } else { //停止滚动，弹出抽奖弹框
        startRaffle()
        clearInterval(interval);//停止
      }
      count++
    }
  })
  $(document).on('click', closeDialog) // 关闭dialog
　　
  var div1 = document.getElementById("demo1")
  var div2 = document.getElementById("demo2")
  var div3 = document.getElementById("demo3")
  var ul1 = document.getElementById("ul1")
  var ul2 = document.getElementById("ul2")
  var ul3 = document.getElementById("ul3")
  div1.scrollTop = 0;
  div2.scrollTop = ul2.scrollHeight;
  div3.scrollTop = 0;
  var h1 = 6;
  // 三栏滚动
  function scroll(){
    if(div1.scrollTop >= ul1.scrollHeight) {
      div1.scrollTop = 0;
    } else {
      div1.scrollTop += h1;
    }
    if(div3.scrollTop >= ul3.scrollHeight) {
      div3.scrollTop = 0;
    } else {
      div3.scrollTop += h1;
    }
    if(div2.scrollTop <= 0) {
      div2.scrollTop =  ul2.scrollHeight;
    } else {
      div2.scrollTop -= h1;
    }
  }
})
// 抽奖结果渲染
function startRaffle () {
  let dataBase = localStorage.getItem('csvarry')
  dataBase = dataBase.split(',')
  if (dataBase.length > 0) {
    var start = localStorage.getItem('index') || 0
    if(start > window.prize.length - 1) {
      window.selected = []
    } else {
      const selected = raffle(dataBase, start)
      window.selected = window.selected.concat(selected)
      $('#dialog-box').fadeIn()
      $('.dialog-content').empty()
      let tempObj = ''
      let index = 0;
      let newArray = [];
      while(index < selected.length) {
        if(selected.length <= 10 && selected.length > 5 ){
          newArray.push(selected.slice(index, index += 5));
        } else {
          newArray.push(selected.slice(index, index += 9));
        }
      }
      newArray.map(perArray => {
        tempObj += `<div class="content-box">`
        perArray.map(item => {
          tempObj += `<p>${item}</p>`
        })
        tempObj += '</div>'
      })
      $('.dialog-content').append(tempObj)
      $('.dialog-title').text(window.prize[start].name+'获奖名单')
      start++
      localStorage.setItem('start', start)
    }
  } else {
    $('#dialog-box').fadeIn()
    $('.dialog-content').text('请导入数据')
  }
}
function closeDialog () {
  $('#dialog-box').fadeOut()
}
// 抽奖
function raffle (arr = [], start) {
  let defaultPer = window.prize[start] ? window.prize[start].default : []
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
  for(let j = 0; j < window.prize[start].count - defaultPer.length; j++) {
    let item = tempArr[Math.floor(Math.random() * tempArr.length)]
    while (selectedPer.indexOf(item) > -1) {
      item = tempArr[Math.floor(Math.random() * tempArr.length)]
    }
    selectedPer.push(item)
  }
  return selectedPer.concat(defaultPer)
}
