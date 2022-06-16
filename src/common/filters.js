// 定义全局过滤器

import dict from "./dictionary";
/**
 * @desc 格式化字典中对应的对象数据值
 * @key 需要过滤的对象key(必传)
 * @args 包含key的对象(必传)
 * */
export const formatDict = (key, args) => {
  // args必传
  if (args && dict[args]) {
    const origin = dict[args];
    // 如果dict[args]是数组,则先数组过滤
    if (Array.isArray(origin)) {
      const resultObj = origin.filter((item) => item["key"] == key);
      if (resultObj.length) {
        console.log(resultObj);
        return resultObj[0]["value"];
      } else {
        return key;
      }
    }
    // 如果是对象
    else {
      return origin[key] || key;
    }
  }
  return key;
};

/**
 * @desc 格式化时间
 * @fmt 需要返回的时间格式
 * */
export const formatDate = (time = Date.now(), fmt = "yyyy-MM-dd hh:mm:ss") => {
  let date = new Date(time);
  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return fmt;
};
