var config = {
  holiday: getHoliday(), // 放假日期
  hworkday: getHworkday(), // 调班日期
}



/**
 *   2020年节日放假安排时间日历表：对比2019年
 *　　一、元旦放假安排：1月1日放假	无调休 共1天。
 *　　二、春节放假安排：1月24日(除夕)~1月30日 1月19日(周日)、2月1日(周六)上班 共7天。
 *　  三、清明节放假安排：4月4日~4月6日 无调休 共3天。
 *　　四、劳动节放假安排：5月1日~5月5日 4月26日(周日)、5月9日(周六)上班 共5天
 *　　五、端午节放假安排：6月25日~6月27日 6月28日(周日)上班 共3天。
 *　　六、中秋节放假安排：10月1日~10月8日 9月27日(周日)、10月10日(周六)上班 共8天。
 *　　七、国庆节放假安排：10月1日~10月8日 9月27日(周日)、10月10日(周六)上班 共8天。
 */

// 放假日期
function getHoliday() {
  var day = [];
  day.push(20200101); //元旦
  for (var i = 0; i < 7; i++) { //春节
    day.push(20200124 + i);
  }
  for (var i = 0; i < 3; i++) { //清明节
    day.push(20200404 + i);
  }
  for (var i = 0; i < 5; i++) { //劳动节
    day.push(20200501 + i);
  }
  for (var i = 0; i < 3; i++) { //端午节
    day.push(20200625 + i);
  }
  for (var i = 0; i < 8; i++) { //中秋节 国庆节
    day.push(20201001 + i);
  }
  return day;
}

// 调班日期
function getHworkday() {
  return [20200119, 20200201, 20200426, 20200509, 20200628, 20200927, 20201010];
}
