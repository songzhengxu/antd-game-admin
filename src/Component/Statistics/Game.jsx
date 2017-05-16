import React, { Component } from 'react';
import axios from 'axios';
import { Button, Table, DatePicker, Input } from 'antd';

const { RangePicker } = DatePicker;


// TODO 这里用的是本地数据需要更改为服务端请求
const mockDataFirst = { index: '1', gameId: '1', gameName: 'gameName', rechargeAmount: 100, rechargeTimes: 10, rechargeNumber: 9, biggestSingleAmount: 102, biggestSinglePlayer: 'tim', activePlayersNumber: 11, newPlayersNumber: 12, rechargeRate: '7.69%', ARPU: 0.11, ARPPU: 0.21 };
const mockDataTwo = { index: '2', gameId: '1', gameName: 'gameName', rechargeAmount: 100, rechargeTimes: 10, rechargeNumber: 9, biggestSingleAmount: 102, biggestSinglePlayer: 'tim', activePlayersNumber: 11, newPlayersNumber: 12, rechargeRate: '7.69%', ARPU: 0.11, ARPPU: 0.21 };

const mockStatisticsData = { rechargeAmount: 33666462, rechargeTimes: 5999, rechargeNumber: 222, activePlayersNumber: 1111, newPlayersNumber: 999 };

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
      title: '游戏ID',
      dataIndex: 'gameId',
      key: 'gameId',
    }, {
      title: '游戏名称',
      dataIndex: 'gameName',
      key: 'gameName',
    }, {
      title: '充值金额(元)',
      dataIndex: 'rechargeAmount',
      key: 'rechargeAmount',
    }, {
      title: '充值次数',
      dataIndex: 'rechargeTimes',
      key: 'rechargeTimes',
    }, {
      title: '充值人数',
      dataIndex: 'rechargeNumber',
      key: 'rechargeNumber',
    }, {
      title: '最大单笔金额',
      dataIndex: 'biggestSingleAmount',
      key: 'biggestSingleAmount',
    }, {
      title: '最大单笔用户',
      dataIndex: 'biggestSinglePlayer',
      key: 'biggestSinglePlayer',
    }, {
      title: '活跃玩家数',
      dataIndex: 'activePlayersNumber',
      key: 'activePlayersNumber',
    }, {
      title: '新增玩家数',
      dataIndex: 'newPlayersNumber',
      key: 'newPlayersNumber',
    }, {
      title: '充值率',
      dataIndex: 'rechargeRate',
      key: 'rechargeRate',
    }, {
      title: 'ARPU值',
      dataIndex: 'ARPU',
      key: 'ARPU',
    }, {
      title: 'ARPPU值',
      dataIndex: 'ARPPU',
      key: 'ARPPU',
    }];
  }


  handleTableChange(pagination) {
    const paper = { ...this.status.pagination };
    paper.current = pagination.current;
    this.setState({
      pagination: paper,
    });
  }

  getFooter(statistics) {
    return (
      <div className="statisticsFooter">
        <span>总充值金额：<span>{statistics.rechargeAmount}</span></span>
        <span>总充值次数：<span>{statistics.rechargeTimes}</span></span>
        <span>总充值人数：<span>{statistics.rechargeNumber}</span></span>
        <span>总活跃玩家：<span>{statistics.activePlayersNumber}</span></span>
        <span>总新增玩家：<span>{statistics.newPlayersNumber}</span></span>
      </div>
    );
  }

  render() {
    const columns = this.getColumns();
    const { data, statisticsData } = this.props;

    return (
      <Table
        footer={() => this.getFooter(statisticsData)}
        bordered columns={columns} dataSource={data}
        pagination={this.pagination}
        onChange={this.handleTableChange}
      />

    );
  }
}


class Game extends Component {
  constructor() {
    super();
    this.state = {
      data: [mockDataFirst, mockDataTwo],
      statisticsData: mockStatisticsData,
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
        <Button >当天</Button>
        <Button >昨天</Button>
        <Button >当月</Button>
        <Button >上月</Button>
        <Button >总计</Button>
        <Button >导出数据</Button>
      </div>
      <TabelComponent
        data={this.state.data}
        statisticsData={this.state.statisticsData}
      />
    </div>);
  }
}

export default Game;
