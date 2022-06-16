/*
 * @Desc:
 * @Author: jqw
 * @Date: 2022-06-15 18:17:15
 */
import Vue from "vue";

// input自动获取焦点
const focus = Vue.directive("focus", {
  inserted: function (e) {
    e.querySelector("input").focus();
  },
});

const directives = [focus];

export default {
  install(Vue) {
    for (let key in directives) {
      Vue.directive(key, directives[key]);
    }
  },
};
