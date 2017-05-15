import React from 'react';
import { Table } from 'antd';

// 假设返回数据结果如下
const data = {
  title: {
    name: '姓名',
    age: '年龄',
    address: '住址',
    picture: '图片',
  },
  dataSource: [
    { name: '胡彦斌', age: 55, address: '中国大陆', picture: 'http://file03.16sucai.com/2015/09/2015m4otokzkzc5.jpg' },
    { name: '吴彦祖', age: 42, address: '美国旧金山', picture: 'http://file03.16sucai.com/2015/09/2015m4otokzkzc5.jpg' },
    { name: '梅西', age: 29, address: '阿根廷', picture: 'http://file03.16sucai.com/2015/09/2015m4otokzkzc5.jpg' },
    { name: 'hopperhuang', age: 24, address: '中国广州', picture: 'http://file03.16sucai.com/2015/09/2015m4otokzkzc5.jpg' },
  ],
};

// extrasCondition 定义 columns 参数除了title, dataIndex 和 key意外的其他参数
const extrasCondition = {
  name: {
    render: text => <a>{ text }</a>,
    filters: true,
    onFilter: (value, record) => {
      console.log('');
      return (value === '显示全部') ? record.name : record.name.includes(value);
    },
  },
  age: {
    render: text => <a>{ text }</a>,
  },
  address: {
    render: text => <a>{ text }</a>,
  },
  picture: {
    render: text => <img width="50px" height="50px" alt={text} src={text} />,
  },
};

/**
 * [MakeTable 根据数据动态生成表格]
 * @param {[Object]} sourceData     [数据结果需要像上面的data变量那样组织]
 * @param {[String]} columnsKey     [columns参数的react-key，用于react对vm的监听]
 * @param {[String]} dataSourceKey  [datasource参数的react-key，用于react对vm的监听]
 * @param {[Object]} extras         [用于确定coluns里面，除了title, dataIndex， key以为iade其他参数]
 * @param {[Objcet]} restProperties [用于定义除了columns和dataSource以外的其他参数，例如;bordered, size等]
 *
 * 支持动态生成filters，只需要将extra[key].filters 的参数设置为true即可以，例子可以看上面extrasConditions的写法
 *
 *之后会对生成器的功能进行扩展和代码优化。。。。。。chain
 */
const MakeTable = function MakeTable(sourceData,
  columnsKey, dataSourceKey, extras, restProperties) {
    // 下面这个函数主要对数据进行转换
  function dataSourceTransFrom(dataWaitingForTrans,
    reactColumnsKey, reactDataSourceKey, extrasConditions) {
      // 获取extrasConditions的keys
    const extrasConditionsKeys = Object.keys(extrasConditions);
    // 根据extrasConditions 来确定哪些columns是需要动态生成filter参数的
    const waitToFilter = [];
    for (let index = 0; index < extrasConditionsKeys.length; index += 1) {
      if (extrasConditions[extrasConditionsKeys[index]].filters === true) {
        waitToFilter.push(extrasConditionsKeys[index]);
      }
    }
    // 根据waitToFilter 来组织好filterDatas的数据结构
    const filterDatas = {};
    for (let index = 0; index < waitToFilter.length; index += 1) {
      filterDatas[waitToFilter[index]] = [];
      filterDatas[waitToFilter[index]].push({ text: '显示全部', value: '显示全部' });
    }

    // 遍历dataSource , 生成Table组件可以直接使用的dataSource, 同时生成filters需要的数据
    const dataSource = dataWaitingForTrans.dataSource;
    for (let index = 0; index < dataSource.length; index += 1) {
      // 处理datasource
      dataSource[index].key = reactDataSourceKey + index;
      // 将datasource里面需要排序的数据全部存放到filterDatas里面
      for (let waitToFilterIndex = 0;
        waitToFilterIndex < waitToFilter.length; waitToFilterIndex += 1) {
        const filterData = {};
        filterData.text = dataSource[index][waitToFilter[waitToFilterIndex]];
        filterData.value = dataSource[index][waitToFilter[waitToFilterIndex]];
        filterDatas[waitToFilter[waitToFilterIndex]].push(filterData);
      }
    }
    // 生成columns
    const columns = [];
    const title = dataWaitingForTrans.title;
    const titleKeys = Object.keys(title);
    for (let index = 0; index < titleKeys.length; index += 1) {
      // 对表头进行最简单的处理,生成key, title， dataIndex
      const titleKey = titleKeys[index];
      let column = {};
      column.title = title[titleKey];
      column.key = reactColumnsKey + titleKey;
      column.dataIndex = titleKey;
      const filters = {};
      // 判断 某一列是否需要筛选
      if (Object.prototype.hasOwnProperty.call(filterDatas, titleKey)) {
        filters.filters = filterDatas[titleKey];
      }
      // 合并数据
      if (Object.prototype.hasOwnProperty.call(extrasConditions, titleKey)) {
        column = Object.assign({}, column, extrasConditions[titleKey], filters);
      }
      columns.push(column);
    }
    return { columns, dataSource };
  }
  const { columns, dataSource } =
  dataSourceTransFrom(sourceData, columnsKey, dataSourceKey, extras);
  return (
    <Table columns={columns} dataSource={dataSource} {...restProperties} />
  );
};

// 疑问的同学可以导出这个例子来看看一看。
export const TestTable = function TestTable() {
  return (
    MakeTable(data, 'testColumns', 'testData', extrasCondition, { bordered: true })
  );
};

export default MakeTable;
