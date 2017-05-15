import React, { Component } from 'react';
import { Table, Form, Button, Input } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LzEditor from 'react-lz-editor';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { Editor } from 'react-draft-wysiwyg';
// import styles from './../../Style/editor.less';


const FormItem = Form.Item;

class Service extends Component {
  constructor() {
    super();
    this.state = {
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
    axios.get('api/web/service')
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
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    }, {
      title: '操作',
      dataIndex: '',
      key: 'action',
      render: () => <span style={{ cursor: 'pointer' }}>修改</span> },
    ];
    return (
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
    );
  }
}

class Amend extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="标题"
          hasFeedback
        >
          <Input type="text" />,
        </FormItem>
        <FormItem>
          <LzEditor
            active="true"
          />
        </FormItem>


        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">添加</Button>
          <Link to="/web/service">
            <Button type="primary" htmlType="submit" size="large" className="backtrack">返回</Button>
          </Link>
        </FormItem>
      </Form>
    );
  }
}

const Amends = Form.create()(Amend);
export { Service, Amends };
