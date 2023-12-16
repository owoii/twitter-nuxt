export default function (timeStr: string) {
  console.log(timeStr)
  const map: any = {
    months: '月',
    weeks: '周',
    days: '天',
    hours: '小时',
    minutes: '分钟',
    seconds: '秒',
    year: '年',
    month: '月',
    week: '周',
    day: '天',
    hour: '小时',
    minute: '分钟',
    second: '秒',
    years: '年',
  }
  // 对英文进行替换为中文
  // 对英文进行替换为中文
  for (const key in map) {
    timeStr = timeStr.replace(new RegExp(key, 'g'), map[key])
  }

  return timeStr.replace(' ago', '前')
}
