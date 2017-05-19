import React, { Component } from 'react';

import { Form, Input, Table, Button } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;


class FormComponent extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    {
      const { form, item } = this.props;
      const { getFieldDecorator } = form;
      return (<Form layout="horizontal">
        <FormItem label="游戏ID" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          {getFieldDecorator('playerID', { initialValue: item && item.id })(
            <span>{item && item.id}</span>,
          )}
        </FormItem>
        <FormItem label="玩家帐号" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          {getFieldDecorator('accounts', { initialValue: item && item.accounts })(
            <span>{item && item.accounts}</span>,
          )}
        </FormItem>
        <FormItem label="玩家昵称" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          {getFieldDecorator('nickname', { initialValue: item && item.nickname })(
            <span>{item && item.nickname}</span>,
          )}
        </FormItem>
        <FormItem label="平台币历史总额" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          {getFieldDecorator('currencyHistoryAmount', { initialValue: item && item.currencyHistoryAmount })(
            <span>{item && item.currencyHistoryAmount}</span>,
          )}
        </FormItem>
        <FormItem label="平台币数量" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          {getFieldDecorator('currencyAmount', { initialValue: item && item.currencyAmount })(
            <span>{item && item.currencyAmount}</span>,
          )}
        </FormItem>
        <FormItem label="性别" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          {getFieldDecorator('sex', { initialValue: item && item.sex })(
            <span>{item && item.sex}</span>,
          )}
        </FormItem>
        <FormItem label="手机" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          {getFieldDecorator('phone', { initialValue: item && item.phone })(
            <span>{item && item.phone}</span>,
          )}
        </FormItem>
        <FormItem label="QQ" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          {getFieldDecorator('QQ', { initialValue: item && item.QQ })(
            <span>{item && item.QQ}</span>,
          )}
        </FormItem>
        <FormItem label="帐号来源" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          {getFieldDecorator('accountsSource', { initialValue: item && item.accountsSource })(
            <span>{item && item.accountsSource}</span>,
          )}
        </FormItem>
        <FormItem label="密码" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          {getFieldDecorator('password', { initialValue: item && item.password })(
            <Input />,
          )}
        </FormItem>
        <FormItem label="连续签到" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          {getFieldDecorator('days', { initialValue: item && item.days })(
            <span>{item && item.days}</span>,
          )}
        </FormItem>
        <FormItem >
          <Button type="primary" htmlType="submit" size="large">更新</Button>
        </FormItem>
      </Form>);
    }
  }
}
const WarppedFormComponent = Form.create()(FormComponent);

// TODO img的 src 用 import from 路径 可以 直接 使用不可用
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
      title: '玩过的游戏',
      dataIndex: 'games',
      key: 'games',
    }, {
      title: '开始玩时间',
      dataIndex: 'beginningTime',
      key: 'beginningTime',
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

// TODO 用接口去获取数据
class Editor extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
    this.fetch = this.fetch.bind(this);
  }
  componentWillMount() {
    // this.fetch();
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
    return (
      <div>
        <WarppedFormComponent data={this.state.data} />
        <TabelComponent data={this.state.data.Gamelist} />
      </div>
    );
  }
}


export default Editor;
