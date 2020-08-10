window.switches = false // 抽奖状态，true：正在抽奖；false：结束
window.prize = [
  { count: 4, name: '三等奖', default: [] },
  { count: 3, name: '二等奖', default: [] },
  { count: 2, name: '一等奖', default: ['2018'] }
]
window.start = 0 // 从第一个开始
window.selected = []
window.base = []