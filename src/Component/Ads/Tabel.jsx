import React, { Component } from 'react';
import axios from 'axios';
import { Table, Modal } from 'antd';
import DropOption from '../Common/DropOption';

const confirm = Modal.confirm;
// TODO img的 src 用 import from 路径 可以 直接 使用不可用
class TabelComponent extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      data: [],
      pagination: {},
      loading: false,
      selectedData: {},
    };
    this.handleTableChange = this.handleTableChange.bind(this);
    this.fetch = this.fetch.bind(this);
  }
  componentWillMount() {
    this.fetch();
  }

  /**
   * [getColumns 获取 columns 可覆盖用于多态]
   * @return {[Array]} [description]
   */
  getColumns() {
    return [{
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
      dataIndex: 'editDate',
      key: 'editDate',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '操作',
      dataIndex: 'control',
      key: 'control',
      render: (text, record) => <DropOption onMenuClick={e => this.handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />,
    }];
  }

  handleMenuClick(record, e) {
    if (e.key === '1') {
      // onEditItem(record);
      this.props.showModal();
      this.props.handleSelect(record);
      console.log(`编辑操作${record.key}`);
    } else if (e.key === '2') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk() {
          // onDeleteItem(record.id);

          console.log(`删除当前元素id${record.key}`);
        },
      });
    }
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
    axios.get('api/get/ads/mobile')
    .then((response) => {
      const pagination = { ...this.state.pagination };
      pagination.total = 200;
      this.setState({
        loading: false,
        data: response.data.gameList,
        pagination,
      });
    });
  }


  render() {
    const columns = this.getColumns();
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
