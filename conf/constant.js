window.switches = false // 抽奖状态，true：正在抽奖；false：结束
window.prize = [
  { count: 1, name: 'MacBook', default: ['cxl_oo'] },
  { count: 1, name: '华为P40手机', default: ['丸之谜'] },
  { count: 2, name: 'iPad', default: ['GolfSale', '淘哥小皮球'] },
  { count: 2, name: '坚果投影仪', default: ['小赵子rkz', '马阿鑫'] },
  { count: 3, name: '科沃斯扫地机器人', default: ['布拉德皮蛋12', '080319_多多洛', '哈ra巨苦'] },
  { count: 3, name: 'Dyson吹风机', default: ['您的外卖已被丢掉', '钢铁韭菜花', 'SomeoneUnknown'] },
  { count: 5, name: 'AirPods', default: ['慕阳明', '小丑龙鱼', '明大教主', '奥哈马的巴特菲', '不劳而获lucky'] },
  { count: 3, name: '华为Watch GT2', default: ['公子人如玉', '钓鱼蜜-泽北荣志', '望京林奇'] },
  { count: 50, name: `O'Forla能量精油`, default: [] },
  { count: 10, name: `O'Forla车载净空精油套装`, default: [] }
]
window.start = 0 // 从第一个开始
window.selected = []
window.base = []