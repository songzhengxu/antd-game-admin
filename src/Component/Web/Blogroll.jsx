import React, { Component } from 'react';
import { Table, Tabs, Form, Input, Button, Select } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import DropOption from '../Common/DropOption';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;

class Blogroll extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pagination: {},
      loading: false,
    };
    this.fetch = this.fetch.bind(this);
  }
  componentDidMount() {
    this.fetch();
  }
  fetch() {
    this.setState({ loading: true });
    axios.get('api/web/blogroll')
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
  handleMenu(record, event) {
    console.log(record);
    if (event.key === '1') {
      console.log(`编辑${record.key}`);
    } else if (event.key === '2') {
      confirm({
        title: 'Are you delect this record?',
        onOk() {
          console.log(`删除${record.key}`);
        },
      });
    }
  }
  render() {
    const columns = [{
      title: '排序',
      dataIndex: 'index',
      key: 'index',
    }, {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '链接名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '链接地址',
      dataIndex: 'url',
      key: 'url',
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => <DropOption onMenuClick={event => this.handleMenu(record, event)} menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]} /> },
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };
    return (
      <div>
        <div>
          <Button type="primary">排序</Button>
          <Button type="primary" className="backtrack">显示</Button>
          <Button type="primary" className="backtrack">隐藏</Button>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.data}
          loading={this.state.loading}
          pagination={false}
        />
        <div className="buttons">
          <Button type="primary">排序</Button>
          <Button type="primary" className="backtrack">显示</Button>
          <Button type="primary" className="backtrack">隐藏</Button>
        </div>
      </div>
    );
  }
}

class AddBlogroll extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="链接名称"
          hasFeedback
        >
          {getFieldDecorator('urlname', {
            rules: [{ required: true, message: '链接名称不能为空', whitespace: true }],
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="链接地址"
          hasFeedback
        >
          {getFieldDecorator('url', {
            rules: [{ required: true, message: '链接地址不能为空', whitespace: true }],
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="链接图标"
          hasFeedback
        >
          {getFieldDecorator('urlIcon')(
            <Input />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="打开方式"
          hasFeedback
        >
          {getFieldDecorator('way')(
            <Select
              showSearch="true"
              placeholder="Select a way"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="jack">新标签打开</Option>
              <Option value="lucy">本窗口打开</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="描述"
          hasFeedback
        >
          {getFieldDecorator('describe')(
            <Input type="textarea" style={{ height: 100 }} />,
          )}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">添加</Button>
          <Button type="primary" htmlType="submit" size="large" className="backtrack">返回</Button>
        </FormItem>
      </Form>
    );
  }
}

const AddBlogrolls = Form.create()(AddBlogroll);
class BlogrollTab extends Component {
  render() {
    return (
      <div>
        <Tabs type="card">
          <TabPane tab="友情链接" key="1"><Blogroll /></TabPane>
          <TabPane tab="添加友情链接" key="2"><AddBlogrolls /></TabPane>
        </Tabs>
      </div>
    );
  }
}

AddBlogroll.propTypes = {
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
export default BlogrollTab;
