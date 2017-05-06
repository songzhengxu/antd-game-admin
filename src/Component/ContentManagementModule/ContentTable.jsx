import React, { Component } from 'react';
import { Table } from 'antd';
import data from '../Component/tableData';

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
  title: '是否热门',
  dataIndex: 'isHot',
  key: 'isHot',
}, {
  title: '时间',
  dataIndex: 'time',
  key: 'time',
}, {
  title: '操作',
  dataIndex: '',
  key: 'action',
  render: () => (
    <span>
      <a href={undefined}>编辑专题</a>
      <span className="ant-divider" />
      <a href={undefined}>编辑游戏列表</a>
      <span className="ant-divider" />
      <a href={undefined} className="ant-dropdown-link">
      删除
      </a>
    </span>
  ) },
];

class DataTable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pagination: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.fetch(data);
  }
  fetch(tableData) {
    this.setState({ loading: true });
    const pagination = { ...this.state.pagination };
    pagination.total = tableData.totalCount;
    this.setState({
      loading: false,
      data: data.results,
      pagination,
    });
  }

  handleTableChange(pagination, filters, sorter) {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  render() {
    return (
      <Table
        columns={columns}
        rowKey={record => record.registered}
        dataSource={data}
        pagination={{ defaultPageSize: 2 }}
        // loading={this.state.loading}
        // onChange={this.handleTableChange}
      />
    );
  }

}
export default DataTable;
