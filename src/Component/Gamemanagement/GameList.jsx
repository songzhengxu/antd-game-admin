import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';

// 纯组件
const GameList = function GameList(props) {
  const { columns, dataSource } = props.gameList;
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      bordered
    />
  );
};


// container
export default connect(state => ({ gameList: state.GameManagement.gameList }))(GameList);
