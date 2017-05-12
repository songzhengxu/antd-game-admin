import * as appConfig from '../Config/Config';

const Tool = {};

// 封装常用的工具库

/**
 * 本地数据存储或读取
 *
 * @param {any} key
 * @param {any} value
 * @returns
 */
Tool.localItem = function localItem(key, value) {
  if (arguments.length === 1) {
    return localStorage.getItem(key);
  }
  return localStorage.setItem(key, value);
};

/**
 * 删除本地数据
 *
 * @param {any} key
 * @returns
 */
Tool.removeLocalItem = function localItem(key) {
  if (key) {
    return localStorage.removeItem(key);
  }
  return localStorage.removeItem();
};


export { Tool, appConfig };
