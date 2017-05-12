import React, { Component } from 'react';
import { Table, Input, Form, Upload, Icon, Button, Modal, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LzEditor from 'react-lz-editor';
import DropOption from '../Common/DropOption';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const RangePicker = DatePicker.RangePicker;

class Action extends Component {
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
  handleMenu(record, event) {
    if (event.key === '1') {
      console.log(`编辑专题${record.key}`);
    } else if (event.key === '2') {
      confirm({
        title: 'Are you delect this record?',
        onOk() {
          console.log(`删除${record.key}`);
          console.log(`删除${record.key}`);
        },
      });
    }
  }
  fetch() {
    this.setState({ loading: true });
    axios.get('api/content/action')
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
      title: '序号',
      dataIndex: 'index',
      key: 'index',
    }, {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '图片',
      dataIndex: 'pictureUrl',
      key: 'pictureUrl',
    }, {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
    }, {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
    }, {
      title: '操作',
      dataIndex: '',
      key: 'action',
      render: (text, record) => <DropOption onMenuClick={event => this.handleMenu(record, event)} menuOptions={[{ key: '1', name: '编辑活动' }, { key: '2', name: '删除' }]} /> },
    ];
    return (
      <div>
        <Link to="/addAction">
          <button className="add-subject">添加活动</button>
        </Link>
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

class AddAction extends Component {
  // handleSubmit(e) {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //     }
  //   });
  // }
  // normFile(e) {
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.fileList;
  // }
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
          label="专题题目"
          hasFeedback
        >
          <Input type="text" />,
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="图片【建议尺寸：640*280】"
          extra="显示图片"
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="起止时间"
        >
          <RangePicker />,
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
          <Link to="/content/activitys">
            <Button type="primary" htmlType="submit" size="large" className="backtrack">返回</Button>
          </Link>
        </FormItem>
      </Form>
    );
  }
}
const Addaction = Form.create()(AddAction);
export { Action, Addaction };
