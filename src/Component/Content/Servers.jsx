import React, { Component } from 'react';
import { Table, Select } from 'antd';
import axios from 'axios';
import DropOption from '../Common/DropOption';

// const confirm = Modal.confirm;
// const Option = Select.Option;

const children = [];
const Selector = function Selector(props) {
  const options = props.options;
  for (const value of options) {
    children.push(<Option key={value} value={value}>{ value }</Option>);
  }
  console.log(children);

  //
  // const dynamicOpiton = options.map(option =>
  //   children.push(<Option key={option} value={option}>{ option }</Option>));
  return (
    <span className="gameList_selector" >
      {props.children} :
      <span className="gameList_selector_unit">
        <Select
          showSearch="true"
          style={{ width: 200 }}
          placeholder=" 请选择 "
          optionFilterProp="children"
          filterOption={(input, option) =>
          option.props.value.indexOf(input) >= 0}
        >
          {children}
        </Select>
      </span>
    </span>
  );
};

class Servers extends Component {
  constructor() {
    super();
    this.state = {
      selectData: [],
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
    } else if (event.key === '2') {
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
    axios.get('api/content/servers')
    .then((response) => {
      const pagination = { ...this.state.pagination };
      pagination.total = 200;
      this.setState({
        loading: false,
        selectData: response.data.games,
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
    const selectData = this.state.selectData;

    const columns = [{
      title: '序号',
      dataIndex: 'index',
      key: 'index',
    }, {
      title: '游戏名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '新服名称',
      dataIndex: 'pictureUrl',
      key: 'pictureUrl',
    }, {
      title: '开服时间',
      dataIndex: 'startTime',
      key: 'startTime',
    }, {
      title: '管理操作',
      dataIndex: '',
      key: 'action',
      render: (text, record) => <DropOption onMenuClick={event => this.handleMenu(record, event)} menuOptions={[{ key: '1', name: '编辑活动' }, { key: '2', name: '删除' }]} /> },
    ];
    return (
      <div>
        <div className="gameList_selectBar" >
          <Selector options={selectData}>游戏</Selector>
        </div>
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
export default Servers;
