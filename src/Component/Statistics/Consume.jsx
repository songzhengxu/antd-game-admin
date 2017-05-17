import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Table, Input, DatePicker, Select } from 'antd';

const { RangePicker } = DatePicker;


// TODO 这里用的是本地数据需要更改为服务端请求
const mockDataFirst = { index: 1, date: '2017-09-12', playerId: '111', playerAccounts: '123', gameName: 'game', goods: 'goods', value: '300', rechargeStyle: '淘宝', orderNumber: '2222', status: '成功' };
const mockDataTwo = { index: 2, date: '2017-09-12', playerId: '111', playerAccounts: '123', gameName: 'game', goods: 'goods', value: '300', rechargeStyle: '淘宝', orderNumber: '2222', status: '成功' };
class TabelComponent extends Component {
  constructor() {
    super();
    this.state = {
      pagination: {},
    };
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
      title: '时间',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: '玩家ID',
      dataIndex: 'playerId',
      key: 'playerId',
    }, {
      title: '玩家帐号',
      dataIndex: 'playerAccounts',
      key: 'playerAccounts',
    }, {
      title: '游戏名称',
      dataIndex: 'gameName',
      key: 'gameName',
    }, {
      title: '购买商品',
      dataIndex: 'goods',
      key: 'goods',
    }, {
      title: '价值金额(元)',
      dataIndex: 'value',
      key: 'value',
    }, {
      title: '充值方式',
      dataIndex: 'rechargeStyle',
      key: 'rechargeStyle',
    }, {
      title: '订单号',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '操作',
      dataIndex: 'control',
      key: 'control',
    }];
  }


  handleTableChange(pagination) {
    const paper = { ...this.status.pagination };
    paper.current = pagination.current;
    this.setState({
      pagination: paper,
    });
  }


  render() {
    const columns = this.getColumns();
    const data = this.props.data;
    return (
      <Table
        bordered columns={columns} dataSource={data}
        pagination={this.pagination}
        onChange={this.handleTableChange}
      />

    );
  }
}

// 搜索栏组件
const Selector = function Selector(props) {
  const options = props.options;
  const placeholder = props.placeholder;
  // 根据参数动态生成搜索栏的option
  const dynamicOpiton = options.map(option =>
    <Option key={option} value={option}>{ option }</Option>);
  return (
    <span className="gameList_selector" >
      {props.children} :
      <span className="gameList_selector_unit">
        <Select
          mode="tags"
          showSearch
          style={{ width: 200 }}
          placeholder={placeholder}
          optionFilterProp="children"
          filterOption={(input, option) =>
          option.props.value.indexOf(input) >= 0}
        >
          {dynamicOpiton}
        </Select>
      </span>
    </span>
  );
};

Selector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired),
  placeholder: PropTypes.String,
  children: PropTypes.String,
};


class Consume extends Component {
  constructor() {
    super();
    this.state = {
      data: [mockDataFirst, mockDataTwo],
    };
    this.fetch = this.fetch.bind(this);
  }
  componentWillMount() {
    this.fetch();
  }
  fetch() {
    this.setState({ loading: false });
    axios.get('api/get/player/editor')
    .then((response) => {
      this.setState({
        data: response,
      });
    });
  }

  render() {
    const rechargeStatus = ['全部', '1', '2', '3'];
    return (<div className="summarizes">
      <div className="summarizes_selectBar">
        <span>玩家帐号：<Input placeholder="请输入玩家帐号" /></span>
        <span>玩家ID：<Input placeholder="请输入玩家ID" /></span>
        <span>订单号：<Input placeholder="请输入订单号" /></span>
        <span>游戏名称：<Input placeholder="请输入游戏名称" /></span>
        <span><Selector options={rechargeStatus} placeholder="全部">充值状态</Selector></span>
        <span>时间：
        <RangePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder={['Start Time', 'End Time']}
        />
        </span>
        <Button >搜索</Button>
        <Button >导出数据</Button>
      </div>
      <TabelComponent
        data={this.state.data}
      />
    </div>);
  }
}

export default Consume;
