import React, { Component } from 'react';
import { Table } from 'antd';
// import logo from '~/Assets/testPic.png';
import data from './mockData';


// TODO img的 src 用 import from 路径 可以 直接 使用不可用
class TabelComponent extends Component {
  render() {
    const columns = [{
      title: '序号',
      dataIndex: 'index',
      key: 'index',
    }, {
      title: '游戏名称',
      dataIndex: 'gameName',
      key: 'gameName',
    }, {
      title: '图片缩略图',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: src => <img src={src} width="20" height="20" className="App-logo" alt="logo" />,
    }, {
      title: 'URL',
      dataIndex: 'URL',
      key: 'URL',
    }, {
      title: '编辑时间',
      dataIndex: 'editTime',
      key: 'editTime',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '操作',
      dataIndex: 'control',
      key: 'control',
    }];
    return (
      <Table bordered columns={columns} dataSource={data} />
    );
  }
}

export default TabelComponent;
