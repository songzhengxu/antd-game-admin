import React from 'react';
import { Table } from 'antd';

const data = {};
data.title = {
  name: '姓名',
  age: '年龄',
  address: '住址',
};
data.dataSource = [
  { name: '胡彦斌', age: 55, address: '中国大陆' },
  { name: '吴彦祖', age: 42, address: '美国旧金山' },
  { name: '梅西', age: 29, address: '阿根廷' },
];
const extrasCondition = {
  name: {
    render: text => <a>{ text }</a>,
  },
  age: {
    render: text => <a>{ text }</a>,
  },
  address: {
    render: text => <a>{ text }</a>,
  },
};

const MakeTable = function MakeTable(sourceData,
  columnsKey, dataSourceKey, extras, restProperties) {
  function dataSourceTransFrom(dataWaitingForTrans,
    reactColumnsKey, reactDataSourceKey, extrasConditions) {
    const columns = [];
    const title = dataWaitingForTrans.title;
    const titleKeys = Object.keys(title);
    for (let index = 0; index < titleKeys.length; index += 1) {
      const titleKey = titleKeys[index];
      let column = {};
      column.title = title[titleKey];
      column.key = reactColumnsKey + titleKey;
      column.dataIndex = titleKey;
      if (Object.prototype.hasOwnProperty.call(extrasConditions, titleKey)) {
        column = Object.assign({}, column, extrasConditions[titleKey]);
      }
      columns.push(column);
    }
    const dataSource = data.dataSource;
    for (let index = 0; index < dataSource.length; index += 1) {
      dataSource[index].key = reactDataSourceKey + index;
    }
    return { columns, dataSource };
  }
  const { columns, dataSource } =
  dataSourceTransFrom(sourceData, columnsKey, dataSourceKey, extras);
  return (
    <Table columns={columns} dataSource={dataSource} {...restProperties} />
  );
};

const TestTable = function TestTable() {
  return (
    MakeTable(data, 'testColumns', 'testData', extrasCondition, { bordered: true, size: 'small' })
  );
};

export default TestTable;
