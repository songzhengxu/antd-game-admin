import React, { Component } from 'react';
import { Table, Tabs, Form, Input, Upload, Icon, Modal, Button } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import DropOption from '../Common/DropOption';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const confirm = Modal.confirm;

class Pictures extends Component {
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
  fetch() {
    this.setState({ loading: true });
    axios.get('api/web/pictures')
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
      title: '图片名称',
      dataIndex: 'pictureName',
      key: 'pictureName',
    }, {
      title: '图片缩略图',
      dataIndex: 'picture',
      key: 'picture',
      render: text => <img alt={text} src={text} className="thumbnail" />,
    }, {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    }, {
      title: '编辑时间',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '操作',
      dataIndex: '',
      key: 'action',
      render: (text, record) => <DropOption onMenuClick={event => this.handleMenu(record, event)} menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]} /> },
    ];
    return (
      <div>
        <Table
          columns={columns}
          rowKey={record => record.registered}
          dataSource={this.state.data}
          pagination={{ defaultPageSize: 5 }}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}


class Edit extends Component {
  constructor() {
    super();
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleCancel() {
    this.setState({ previewVisible: false });
  }

  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange({ fileList }) {
    this.setState({ fileList });
    const filed = this.props.id;
    this.props.setFieldsValue({ [filed]: { fileList } });
  }

  render() {
    // const { getFieldDecorator } = this.props.form;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="图片中文名称"
        >
          <Input />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="URL(以http://开头)"
        >
          <Input />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="图片"
        >
          <div className="clearfix">
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        </FormItem>
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">编辑</Button>
          <Button type="primary" htmlType="submit" size="large" className="backtrack">返回</Button>
        </FormItem>
      </Form>
    );
  }
}
Edit.propTypes = {
  id: PropTypes.string.isRequired,
  setFieldsValue: PropTypes.func.isRequired,
};
const Edits = Form.create()(Edit);
class WebiteTab extends Component {
  render() {
  //  const HeaderTab = this.tab;
    return (
      <Tabs type="card">
        <TabPane tab="PC图片列表" key="1"><Pictures /></TabPane>
        <TabPane tab="添加PC图片" key="2"><Edits /></TabPane>
      </Tabs>
    );
  }
}

export default WebiteTab;
