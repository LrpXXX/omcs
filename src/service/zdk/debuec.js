
export default {
    // 函数防抖
  _debounce: function (fn, delay = 300) {
    var timer = null;
    return function () {
      var _this = this;
      var args = arguments;
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(_this, args);
      }, delay);
    };
  },
   /**
  * @desc 函数节流 固定函数执行的速率，即所谓的“节流”，通过记录时间差，来判断是否执行func
  * @param fn {Function}   实际要执行的函数
  * @param delay {Number}  执行间隔，单位是毫秒（ms）  *
  * @return {Function}     返回一个“节流”函数
  */
   throttle (fn, threshhold) {
    // 记录上次执行的时间
    let last
    // 定时器
    let timer
    // 默认间隔为 250ms
    threshhold || (threshhold = 30000)
    // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
    return function () {
      // 保存函数调用时的上下文和参数，传递给 fn
      let context = this
      let args = arguments

      let now = +new Date()
      // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
      // 执行 fn，并重新计时
      if (last && now < last + threshhold) {
        clearTimeout(timer)
        // 保证在当前时间区间结束后，再执行一次 fn
        timer = setTimeout(function () {
          last = now
          fn.apply(context, args)
        }, threshhold)

      // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
      } else {
        last = now
        fn.apply(context, args)
      }
    }
  }

};
