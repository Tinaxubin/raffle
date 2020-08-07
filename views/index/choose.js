const fs = require('fs')
const kind = 3 // 从三等奖开始
$(document).on('keydown', startRaffle)
function startRaffle () {
  readData()
  raffle()
}