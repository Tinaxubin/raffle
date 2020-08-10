$(function(){
  var count = 0
  var interval
  var data
  //回车键控制开始和停止
  $(document).keydown(function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0]
    if (e && e.keyCode == 13) { // enter 键
      console.log(count, 'couith')
      if(count % 2 === 0) {
        closeDialog()
        interval = setInterval(()=> {doscroll()}, 150)
      } else {
        clearInterval(interval)//停止
        startRaffle()
      }
      count++
    }
  })
  // $(document).on('keydown', startRaffle)
  $(document).on('click', closeDialog)
})
var height = 60
var doscroll = function(){
  var $parent1 = $('.box1 ul')
  var $first1 = $parent1.find('li:first')
  var height1 = $first1.height()
  var $box1 = $('.box1')
  $box1.animate({ scrollTop: height + 'px' }, 150, function(){
    height = height + 60
    var length = parseInt(data.length/3)
    // console.log(scrollTop)
    // for(var i = 1; i < 3; i++){
    //   var li=document.createElement("li");
    //   var ul = document.getElementById("ul1")
    //   li.innerHTML=data[i].toString();
    //   ul.appendChild(li);
    // }
  })
  // $first1.animate({
  //   marginTop: -height1 - 5 + 'px'
  //   // height: 0
  // }, 50, function() {// 动画结束后，把它插到最后，形成无缝
  // // $first1.css('height', height1).appendTo($parent1);
  // $first1.css('marginTop', 5).appendTo($parent1);
  // });
  var h2 = 0
  var $parent2 = $('.box2 ul')
  var $last2 = $parent2.find('li:last')
  var height2 = $last2.height()
  var $box2 = $('.box2')
  $box2.animate({ scrollTop: h2 + 'px' }, 150, function(){
    h2 = h2 - 60
    // $parent2.appendTo($box2);
  })
  // $parent2.animate({
  //   marginTop:  5 + 'px'
  // }, 50, function() {
  // $last2.css('height', height2).prependTo($('.box2 ul'));
  // });

  var $parent3 = $('.box3 ul');
  var $first3 = $parent3.find('li:first');
  var height3 = $first3.height();
  var $box3 = $('.box3')
  $box3.animate({ scrollTop: height + 'px' }, 150, function(){
    height = height + 60
    // $parent1.appendTo($box1);
  })
  // $first3.animate({
  //   height: 0
  // }, 50, function() {
  // $first3.css('height', height3).appendTo($parent3);
  // });
}

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
    window.start++
    if(window.start > window.prize.length - 1) {
      window.start = 0
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
