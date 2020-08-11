$(function(){
  var count = 0
  var interval
  var MyMar
  var start = localStorage.getItem('start') || 0
  //回车键控制开始和停止
  $(document).keydown(function (event) {
    $('#csvFileInput').attr('disabled','disabled');
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) { // enter 键
      if(count % 2 === 0) {
        if(start <= window.prize.length - 1) {
          closeDialog()
          interval = setInterval(()=> {doscroll()}, 5);
          MyMar = setInterval(Marquee, 2); //设置定时器
        }
      } else {
        startRaffle()
        clearInterval(interval);//停止
        clearInterval(MyMar);//停止
      }
      count++
    }
  })
  $(document).on('click', closeDialog) // 关闭dialog
  var drawLetters = document.getElementById("demo3")
  var dl = document.getElementById("ul2")
  // var speed = 0; //滚动速度值，值越大速度越慢
  var height22 = 100000
  function Marquee() {
    // console.log(drawLetters.offsetTop)
    height22 = height22 - 5
    drawLetters.scrollTop = height22
    var newNode = document.createElement("ul")　　
    newNode.innerHTML = dl.innerHTML　　
    drawLetters.insertBefore(newNode, null)
  }
})　　
var height1 = 1
var height3 = 1
var ulHeight1 = 0
var ulHeight3 = 0
var doscroll = function(){
  var $parent1 = $('.box1 ul')
  var $box1 = $('.box1')
  ulHeight1 = $parent1.height()
  $box1.animate({ scrollTop: height1 + 'px' }, 0, function(){
    height1 = height1 + 6
  });
  if(height1 > ulHeight1 - 500){
    var length = parseInt(window.base.length/3)
    for(var i = 1; i < length; i++){
      var li=document.createElement("li")
      var ul = document.getElementById("ul1")
      li.innerHTML=window.base[i].toString()
      ul.appendChild(li)
    }
  }
  var $parent3 = $('.box3 ul');
  var $box3 = $('.box3')
  ulHeight3 = $parent3.height()
  $box3.animate({ scrollTop: height3 + 'px' }, 0, function(){
    height3 = height3 + 6
  });
  if(height3 > ulHeight3 - 500){
    var length = parseInt(window.base.length/3)
    for(var i = length * 2; i < length * 3; i++){
      var li=document.createElement("li");
      var ul = document.getElementById("ul3")
      li.innerHTML=window.base[i].toString();
      ul.appendChild(li);
    }
  }
};
/**
 * 开始抽奖
 */
function startRaffle () {
  const dataBase = localStorage.getItem('csvarry')
  if (dataBase.length > 0) {
    var start = localStorage.getItem('start') || 0
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
        newArray.push(selected.slice(index, index += 9));
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
