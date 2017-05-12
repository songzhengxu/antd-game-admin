import React, { Component } from 'react';
import { Table, Select, Input, Button, Icon, Form, DatePicker } from 'antd';
import axios from 'axios';
import DropOption from '../Common/DropOption';

const FormItem = Form.Item;
const Option = Select.Option;


/**
 * TODO 下拉列表的数据接入 开服信息和添加开服信息模块
 * 把专题模块，活动模块，开服模块公共列表封装
 */

/**
 * [Selector 生成下拉列表]
 * @param  {[array]} props [数据]
 * @type {class}
 */
const children = [];
const Selector = function Selector(props) {
  const options = props.options;
  for (const value of options) {
    children.push(<Option key={value} value={value}>{ value }</Option>);
  }
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
/**
 * [Servers 生成表格]
 * @type {class}
 */
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
    const selectData = this.state.data;

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
          <Button className="search-btn" type="primary">
            <Icon type="search" />
          </Button>
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

/**
 * [AddServers 生成添加开服信息的表单模块]
 * @type {[class]}
 */
class AddServers extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
   * [handleSubmit 提交表单]
   * @param  {[object]} e [事件]
   */
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  /**
   * [render 渲染元素]
   */
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="游戏"
          hasFeedback
        >
          {getFieldDecorator('select', {
            rules: [
               { required: true, message: '请选择游戏名!' },
            ],
          })(
            <Select placeholder="请选择">
              <Option value="china">China</Option>
              <Option value="use">U.S.A</Option>
            </Select>,
           )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="新服名称"
        >
          {getFieldDecorator('input', {
            rules: [{ required: true, message: '请填写开服名称!' }],
          })(
            <Input />,
        )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="开服时间"
        >
          {getFieldDecorator('date-time-picker', {
            rules: [{ required: true, message: '请选择开服时间!' }],
          })(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
            )}
        </FormItem>

        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">添加</Button>
          <Button type="primary" className="backtrack">返回</Button>
        </FormItem>
      </Form>
    );
  }
}
const AddServer = Form.create()(AddServers);
export { Servers, AddServer };
