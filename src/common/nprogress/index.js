// 引入进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

//全局进度条的配置
NProgress.configure({
  easing: 'ease',  // 动画方式    
  speed: 1000,  // 递增进度条的速度    
  showSpinner: false, // 是否显示右上角螺旋加载提示  
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
});

export default {
  start: () => {
    NProgress.start()
  },
  close: () => {
    NProgress.done()
  }
}