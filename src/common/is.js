const toString = Object.prototype.toString;

// 判断值是否是某个类型
export function is(val, type) {
  return toString.call(val) === `[object ${type}]`;
}

// 是否是数值
export function isNumber(val) {
  return is(val, "Number");
}

// 是否是字符串
export function isString(val) {
  return is(val, "String");
}

// 是否是布尔值
export function isBoolean(val) {
  return is(val, "Boolean");
}

// 是否是数组
export function isArray(val) {
  return is(val, "Array");
}

// 是否是函数
export function isFunction(val) {
  return is(val, "Function");
}

// 是否是对象
export function isObject(val) {
  return is(val, "Object");
}

// 是否是Promise对象
export function isPromise(val) {
  return is(val, "Promise");
}

// 是否是日期对象
export function isDate(val) {
  return is(val, "Date");
}

// 是否是AsyncFunction
export function isAsyncFunction(val) {
  return is(val, "AsyncFunction");
}

// 是否已定义
export function isDef(val) {
  return typeof val !== "undefined";
}

// 是否是客户端
export function isClient() {
  return typeof window !== "undefined";
}

// 是否是浏览器
export function isWindow(val) {
  return typeof window !== "undefined" && is(val, "Window");
}

// 是否是外部链接
export function isExternal(path) {
  return /^https?:/.test(path);
}

// 判断打包环境
export function isDev() {
  return process.env.VUE_APP_MODE === "development";
}
// 判断打包环境
export function isPro() {
  return process.env.VUE_APP_MODE === "production";
}
// 判断打包环境
export function isTest() {
  return process.env.VUE_APP_MODE === "test";
}
