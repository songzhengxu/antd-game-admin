import React, { Component } from 'react';
import axios from 'axios';
import { Button, Table, DatePicker } from 'antd';

const { RangePicker } = DatePicker;


// TODO 这里用的是本地数据需要更改为服务端请求
const mockDataFirst = { date: '2017-09-08', enrollment: 7, twoDays: 0, threeDays: 0, fourDays: 0, fiveDays: 0, sixDays: 0, sevenDays: 0, fifteenDays: 0, thirtyDays: 0 };
const mockDataTwo = { date: '2017-09-09', enrollment: 8, twoDays: 0, threeDays: 0, fourDays: 0, fiveDays: 0, sixDays: 0, sevenDays: 0, fifteenDays: 0, thirtyDays: 0 };

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
      title: '注册人数',
      dataIndex: 'enrollment',
      key: 'enrollment',
    }, {
      title: '二日',
      dataIndex: 'twoDays',
      key: 'twoDays',
    }, {
      title: '三日',
      dataIndex: 'threeDays',
      key: 'threeDays',
    }, {
      title: '四日',
      dataIndex: 'fourDays',
      key: 'fourDays',
    }, {
      title: '五日',
      dataIndex: 'fiveDays',
      key: 'fiveDays',
    }, {
      title: '六日',
      dataIndex: 'sixDays',
      key: 'sixDays',
    }, {
      title: '七日',
      dataIndex: 'sevenDays',
      key: 'sevenDays',
    }, {
      title: '15日',
      dataIndex: 'fifteenDays',
      key: 'fifteenDays',
    }, {
      title: '30日',
      dataIndex: 'thirtyDays',
      key: 'thirtyDays',
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


class Keep extends Component {
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
      <div>*隔天数据*</div>
      <TabelComponent
        data={this.state.data}
        showModal={this.showModal}
        handleSelect={this.handleSelect}
      />
    </div>);
  }
}

export default Keep;
