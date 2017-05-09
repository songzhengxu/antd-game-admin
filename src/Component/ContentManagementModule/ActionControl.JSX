import React, { Component } from 'react';
import { Table, Modal } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DropOption from '../Common/DropOption';

// const FormItem = Form.Item;
// const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

class Action extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pagination: {},
      loading: false,
    };
    this.fetch = this.fetch.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }
  componentDidMount() {
    this.fetch();
  }
  handleMenu(record, event) {
    if (event.key === '1') {
      console.log('编辑专题$({record.key})');
    } else if (event.key === '3') {
      confirm({
        title: 'Are you delect this record?',
        onOk() {
          console.log('删除$({record.key})');
        },
      });
    }
  }
  fetch() {
    this.setState({ loading: true });
    axios.get('api/content/action')
    .then((response) => {
      const pagination = { ...this.state.pagination };
      pagination.total = 200;
      this.setState({
        loading: false,
        data: response.data.datas,
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
      title: '序号',
      dataIndex: 'index',
      key: 'index',
    }, {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '图片',
      dataIndex: 'pictureUrl',
      key: 'pictureUrl',
    }, {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
    }, {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
    }, {
      title: '操作',
      dataIndex: '',
      key: 'action',
      render: (text, record) => <DropOption onMenuClick={event => this.handleMenu(record, event)} menuOptions={[{ key: '1', name: '编辑活动' }, { key: '2', name: '删除' }]} /> },
    ];
    return (
      <div>
        <Link to="/addContent">
          <button className="add-subject">添加活动</button>
        </Link>
        <Table
          columns={columns}
          rowKey={record => record.registered}
          dataSource={this.state.data}
          pagination={{ defaultPageSize: 2 }}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default Action;
