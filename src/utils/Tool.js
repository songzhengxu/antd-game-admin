import lodash from 'lodash';
import merged from 'obj-merged';
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

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
Tool.arrayToTree = function arrayToTree(array, id = 'id', pid = 'pid', children = 'children') {
  const datas = lodash.cloneDeep(array);
  const result = [];
  const hash = {};
  datas.forEach((item) => {
    hash[item[id]] = item;
  });
  datas.forEach((item) => {
    const hashValue = hash[item[pid]];
    if (hashValue) {
      if (!hashValue[children]) {
        hashValue[children] = [];
      }
      hashValue[children].push(item);
    } else {
      result.push(item);
    }
  });
  return result;
};

export { Tool, merged, appConfig };
