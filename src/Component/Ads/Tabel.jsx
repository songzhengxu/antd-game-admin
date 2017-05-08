import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'antd';


// TODO img的 src 用 import from 路径 可以 直接 使用不可用
class TabelComponent extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pagination: {},
      loading: false,
    };
    this.handleTableChange = this.handleTableChange.bind(this);
    this.fetch = this.fetch.bind(this);
  }


  // fetch(params = {}) {
  //   return function fetchNew() {
  //     this.setState({ loading: true });
  //   }.bind(this);
  // }

  componentDidMount() {
    this.fetch();
  }
  handleTableChange(pagination) {
    const paper = { ...this.status.pagination };
    paper.current = pagination.current;
    this.setState({
      pagination: paper,
    });
  }
  fetch() {
    this.setState({ loading: true });
    axios.get('api/get/Ads/mobile')
    .then((data) => {
      const pagination = { ...this.state.pagination };
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.gameList,
        pagination,
      });
    });
  }
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
      <Table
        bordered columns={columns} dataSource={this.state.data}
        pagination={this.pagination}
        loading={this.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default TabelComponent;
