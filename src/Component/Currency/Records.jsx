import React, { Component } from 'react';
import { DatePicker, Input, Form, AutoComplete, Icon, Button, Col, Table } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;
// const RangePicker = DatePicker.RangePicker;
// const Option = AutoComplete.Option;
// const OptGroup = AutoComplete.OptGroup;

class Records extends Component {
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
  fetch() {
    this.setState({ loading: true });
    axios.get('api/currency/records')
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
    const { getFieldDecorator } = this.props.form;
    const columns = [{
      title: '充值时间',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '玩家帐号',
      dataIndex: 'accounts',
      key: 'accounts',
    }, {
      title: '充值金额',
      dataIndex: 'money',
      key: 'money',
    }, {
      title: '平台币数量',
      dataIndex: 'number',
      key: 'number',
    }, {
      title: '充值来源',
      dataIndex: 'source',
      key: 'source',
    }, {
      title: '发放帐号',
      dataIndex: 'grant',
      key: 'grant',
    }, {
      title: '订单号',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    }, {
      title: '备注信息',
      dataIndex: 'note',
      key: 'note',
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
    },
    ];
    return (
      <Form layout="inline">
        <FormItem
          label="时间"
          labelCol={{
            xs: { span: 24 },
            sm: { span: 5 },
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 19 },
          }}
          help
        >
          <Col span="11">
            <FormItem>
              <DatePicker />
            </FormItem>
          </Col>
          <Col span="1">
            <p className="ant-form-split">-</p>
          </Col>
          <Col span="11">
            <FormItem>
              <DatePicker />
            </FormItem>
          </Col>
        </FormItem>
        <FormItem
          label="订单号"
        >
          {getFieldDecorator('userName')(
            <Input placeholder="请输入订单号..." />,
        )}
        </FormItem>
        <FormItem
          label="订单号"
        >
          <div className="global-search-wrapper" style={{ width: 230 }}>
            <AutoComplete
              className="global-search"
              size="large"
              style={{ width: '100%' }}
            //  dataSource={dataSource.map(renderOption)}
              // onSelect={onSelect}
              // onSearch={this.handleSearch}
              placeholder="请输入注册渠道名称..."
              optionLabelProp="text"
            >
              <Input
                suffix={(
                  <Button className="search-btn" size="large" type="primary">
                    <Icon type="search" />
                  </Button>
           )}
              />
            </AutoComplete>
          </div>
        </FormItem>
        <Button type="primary" size="large">导出数据</Button>
        <FormItem />
        <div>
          <Table
            columns={columns}
            rowKey={record => record.registered}
            dataSource={this.state.data}
            pagination={{ defaultPageSize: 2 }}
            loading={this.state.loading}
            onChange={this.handleTableChange}
          />
        </div>
      </Form>


    );
  }
}

const Record = Form.create()(Records);
export default Record;
