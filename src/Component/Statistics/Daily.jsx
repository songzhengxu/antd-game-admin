import React, { Component } from 'react';
import axios from 'axios';
import { Button, Table, DatePicker, Input } from 'antd';

const { RangePicker } = DatePicker;


// TODO 这里用的是本地数据需要更改为服务端请求
const mockDataFirst = { date: '2017-09-08', game: 'game', income: 100, orderQuantity: 10, playerNumber: 100 };
const mockDataTwo = { date: '2017-09-08', game: 'game', income: 100, orderQuantity: 10, playerNumber: 100 };

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
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: '游戏',
      dataIndex: 'game',
      key: 'game',
    }, {
      title: '收入',
      dataIndex: 'income',
      key: 'income',
    }, {
      title: '订单数',
      dataIndex: 'orderQuantity',
      key: 'orderQuantity',
    }, {
      title: '玩家数',
      dataIndex: 'playerNumber',
      key: 'playerNumber',
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


class Daily extends Component {
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
    return (<div className="summarizes">
      <div className="summarizes_selectBar">
        <span>游戏名称：<Input placeholder="请输入游戏名称" /></span>
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

export default Daily;
