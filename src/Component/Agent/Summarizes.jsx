import React, { Component } from 'react';
import axios from 'axios';
import { Button, Table, Input, DatePicker } from 'antd';

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
      title: '充值时间',
      dataIndex: 'rechargeTime',
      key: 'rechargeTime',
    }, {
      title: '游戏名称',
      dataIndex: 'gameName',
      key: 'gameName',
    }, {
      title: '充值玩家',
      dataIndex: 'rechargePlayer',
      key: 'rechargePlayer',
    }, {
      title: '充值金额',
      dataIndex: 'recharge',
      key: 'recharge',
    }, {
      title: '所属渠道编号',
      dataIndex: 'channelId',
      key: 'channelId',
    }, {
      title: '所属渠道',
      dataIndex: 'channel',
      key: 'channel',
    }, {
      title: '订单号',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
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


class Summarizes extends Component {
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
    return (<div className="summarizes">
      <div className="summarizes_selectBar">
        <span>游戏：<Input placeholder="请输入游戏" /></span>
        <span>充值玩家：<Input placeholder="请输入玩家帐号" /></span>
        <span>所属渠道：<Input placeholder="请输入所属渠道" /></span>
        <span>订单号：<Input placeholder="请输入订单号" /></span>
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
        showModal={this.showModal}
        handleSelect={this.handleSelect}
      />
    </div>);
  }
}

export default Summarizes;
