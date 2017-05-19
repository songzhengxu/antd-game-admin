// Copyright (c) 2017 5 18 Thursday by Jiangdewei. Mail:228575834@qq.com
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Table, Input, DatePicker, Select } from 'antd';

const { RangePicker } = DatePicker;

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
      title: '申请时间',
      dataIndex: 'applyTime',
      key: 'applyTime',
    }, {
      title: '渠道编号',
      dataIndex: 'channelId',
      key: 'channelId',
    }, {
      title: '帐号',
      dataIndex: 'accounts',
      key: 'accounts',
    }, {
      title: '结算金额(元)',
      dataIndex: 'amount',
      key: 'amount',
    }, {
      title: '银行名称',
      dataIndex: 'bankName',
      key: 'bankName',
    }, {
      title: '持卡人',
      dataIndex: 'cardholder',
      key: 'cardholder',
    }, {
      title: '卡号',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '操作管理',
      dataIndex: 'controler',
      key: 'controler',
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

TabelComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string.isRequired),
};

TabelComponent.defaultProps = {
  data: [],
};

// 搜索栏组件
const Selector = function Selector(props) {
  const options = props.options;
  // 根据参数动态生成搜索栏的option
  const dynamicOpiton = options.map(option =>
    <Option key={option} value={option}>{ option }</Option>);
  return (
    <span className="gameList_selector" >
      {props.children} :
      <span className="gameList_selector_unit">
        <Select
          mode="combobox"
          showSearch
          style={{ width: 200 }}
          placeholder=" 全部 "
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
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  children: PropTypes.string.isRequired,
};


class Pendinglists extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
    this.fetch = this.fetch.bind(this);
  }
  componentWillMount() {
    this.fetch();
  }
  fetch() {
    this.setState({ loading: true });
    axios.get('api/get/player/editor')
    .then((response) => {
      this.setState({
        data: response,
      });
    });
  }

  render() {
    const banksName = ['全部', '1', '2', '3'];
    return (<div className="summarizes">
      <div className="summarizes_selectBar">
        <span>时间：
        <RangePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder={['Start Time', 'End Time']}
        />
        </span>
        <span><Selector options={banksName}>银行名称</Selector></span>
        <span>渠道编号：<Input placeholder="请输入渠道编号" /></span>
        <span>渠道帐号：<Input placeholder="请输入渠道帐号" /></span>
        <span>持卡人：<Input placeholder="请输入持卡人" /></span>
        <span>卡号：<Input placeholder="请输入银行卡号" /></span>
        <Button >搜索</Button>
      </div>
      <TabelComponent
        showModal={this.showModal}
        handleSelect={this.handleSelect}
      />
    </div>);
  }
}

export default Pendinglists;
