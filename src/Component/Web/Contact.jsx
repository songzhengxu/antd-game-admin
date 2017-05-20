import React, { Component } from 'react';
import { Table } from 'antd';
import axios from 'axios';


import DropOption from '../Common/DropOption';

class Contact extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pagination: {},
      loading: false,
      selectedData: {},
    };
    this.fetch = this.fetch.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }
  componentDidMount() {
    this.fetch();
  }
  handleMenu(record, event) {
    const { history } = this.props;
    if (event.key === '1') {
      history.push(`/web/contact/amendContact?id=${record.key}`);
    }
  }
  fetch() {
    this.setState({ loading: true });
    axios.get('api/web/contact')
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

  handleTableChange(pagination) {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
  }
  render() {
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    }, {
      title: '操作',
      dataIndex: '',
      key: 'action',
      render: (text, record) => <DropOption onMenuClick={event => this.handleMenu(record, event)} menuOptions={[{ key: '1', name: '修改' }]} /> },
    ];
    return (
      <div>
        <Table
          columns={columns}
          rowKey={record => record.registered}
          dataSource={this.state.data}
          bordered
          pagination={false}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

Contact.propTypes = {
  history: React.PropTypes.object.isRequired,
};
export default Contact;
