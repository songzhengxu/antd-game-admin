import React, { Component } from 'react';
import { DatePicker, Form, AutoComplete, Button, Col, Table } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';

const FormItem = Form.Item;


const dataSource = ['guest', '13232379219', '3333'];

class Summarize extends Component {
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
    axios.get('api/currency/summarize')
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
    // const { getFieldDecorator } = this.props.form;
    const columns = [{
      title: '帐号',
      dataIndex: 'account',
      key: 'account',
    }, {
      title: 'G币总额',
      dataIndex: 'total',
      key: 'total',
    }, {
      title: 'G币余额',
      dataIndex: 'remaining',
      key: 'remaining',
    }, {
      title: '帐号注册时间',
      dataIndex: 'registerTime',
      key: 'registerTime',
    }, {
      title: '最近充值时间',
      dataIndex: 'rechargeTime',
      key: 'rechargeTime',
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
          label="玩家帐号"
        >
          <AutoComplete
            style={{ width: 200 }}
            dataSource={dataSource}
            placeholder="请输入玩家帐号"
            filterOption={
              (inputValue, option) =>
              option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
          />
        </FormItem>
        <Button type="primary" size="large">搜索</Button>
        <Button type="primary" size="large" style={{ marginLeft: 10 }}>导出数据</Button>
        <FormItem />
        <div>
          <Table
            columns={columns}
            rowKey={record => record.registered}
            dataSource={this.state.data}
            loading={this.state.loading}
            onChange={this.handleTableChange}
          />
        </div>
      </Form>


    );
  }
}
Summarize.propTypes = {
  form: PropTypes.shape({
    getFieldsValue: PropTypes.func,
    getFieldValue: PropTypes.func,
    setFieldsValue: PropTypes.func,
    setFields: PropTypes.func,
    validateFields: PropTypes.func,
    validateFieldsAndScroll: PropTypes.func,
    getFieldError: PropTypes.func,
    getFieldsError: PropTypes.func,
    isFieldValidating: PropTypes.func,
    isFieldTouched: PropTypes.func,
    isFieldsTouched: PropTypes.func,
    resetFields: PropTypes.func,
    getFieldDecorator: PropTypes.func,
  }).isRequired,
};
export default Form.create()(Summarize);
