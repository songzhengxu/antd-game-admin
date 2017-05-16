import React, { Component } from 'react';
import { Table, Tabs, Form, Input, Modal, Button } from 'antd';
import axios from 'axios';
// import PropTypes from 'prop-types';
import DropOption from '../Common/DropOption';

const TabPane = Tabs.TabPane;

class Blogroll extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pagination: {},
      loading: false,
    };
    this.fetch = this.fetch.bind(this);
  }
  componentDidMount() {
    this.fetch();
  }
  fetch() {
    this.setState({ loading: true });
    axios.get('api/web/blogroll')
    .then((response) => {
      const pagination = { ...this.state.pagination };
      pagination.total = 200;
      this.setState({
        loading: false,
        data: response,
        pagination,
      });
    });
  }
  render() {
    const columns = [{
      title: '排序',
      dataIndex: 'index',
      key: 'index',
    }, {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '链接名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '链接地址',
      dataIndex: 'url',
      key: 'url',
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => <DropOption onMenuClick={event => this.handleMenu(record, event)} menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]} /> },
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };
    return (
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={this.state.data}
        loading={this.state.loading}
        pagination={false}
      />
    );
  }
}

class AddBlogroll extends Component {
  render() {
    return (
      <div>555</div>
    );
  }
}

class BlogrollTab extends Component {
  render() {
    return (
      <Tabs type="card">
        <TabPane tab="友情链接" key="1"><Blogroll /></TabPane>
        <TabPane tab="添加友情链接" key="2"><AddBlogroll /></TabPane>
      </Tabs>
    );
  }
}

export default BlogrollTab;
