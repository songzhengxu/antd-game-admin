import React, { Component } from 'react';
import { Table, Tabs, Form, Input, Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
// import PropTypes from 'prop-types';
import DropOption from '../Common/DropOption';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const confirm = Modal.confirm;

/* 生成编辑表单*/
class Update extends Component {
  get() {
    const { form, item, visible } = this.props;
    const { getFieldDecorator } = form;
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
    return (<Form layout="horizontal">
      <Form>
        <FormItem
          {...formItemLayout}
          label="配置英文名称"
        >
          {getFieldDecorator('name', { initialValue: item && item.name })(
            <Input />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="配置的值"
        >
          {getFieldDecorator('message', { initialValue: item && item.message })(
            <Input />,
          )}
        </FormItem>
      </Form>
    </Form>);
  }

  render() {
    const { visible, onCancel, onCreate, item } = this.props;

    // TODO mock 中的 image 与需要使用的fileList中数据格式不一致
    const formComponents = this.get();

    return (
      <Modal
        visible={visible} title="Update"
        okText={item.key ? '更新' : '创建'}
        onCancel={onCancel}
        onOk={onCreate}
      >
        {formComponents}
      </Modal>
    );
  }
}
const Updateform = Form.create()(Update);
class Company extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pagination: {},
      loading: false,
      visible: false,
      selectedData: {},
    };
    this.fetch = this.fetch.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.saveFormRef = this.saveFormRef.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }
  /**
   * [showModal 使 WarppedCreateModal 改为展示状态]
   * @return {[type]} [description]
   */
  showModal() {
    this.setState({ visible: true });
  }
  /**
   * [handleCancel  WarppedCreateModal cancel 时触发的事件 把表单清空]
   * @return {[type]} [description]
   */
  handleCancel() {
    const form = this.form;
    form.resetFields();
    this.setState({ selectedData: {}, visible: false });
  }
  saveFormRef(form) {
    this.form = form;
  }
  /**
   * [handleCreate 使 WarppedCreateModal onOk触发事件]
   * @return {[type]} [description]
   */

  handleCreate() {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
        // TODO需要该为向服务端发送请求
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ selectedData: {}, visible: false });
    });
  }
  /**
   * [handleSelect Tabel选择编辑时调用的方法]
   * @param  {[Object]} selectedData [选择中的对应tabelItem中的数据]
   * @return {[type]}              [description]
   */
  handleSelect(selectedData) {
    this.setState({ selectedData });
  }

  handleMenu(record, event) {
    console.log(record);
    if (event.key === '1') {
      this.showModal();
      this.handleSelect(record);
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
    axios.get('api/web/company')
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
      title: '配置信息名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '配置信息',
      dataIndex: 'message',
      key: 'message',
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
          loading={this.state.loading}
          pagination={false}
          onChange={this.handleTableChange}
          showModal={this.showModal}
          handleSelect={this.handleSelect}
        />
        <Updateform
          ref={this.saveFormRef}
          visible={this.state.visible} item={this.state.selectedData}
          onCancel={this.handleCancel} onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

/**
 * [AddMessage 添加配置信息]
 * @type {class}
 */

class AddMessage extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // 发送异步请求
        // 等待异步请求返回状态码
        // 改变gamelst数据状态为refresh
        // 跳转到games页面
        // this.props.history.push('/games/games');
      }
      console.log(err);
    });
  }
  render() {
    // const { getFieldDecorator } = this.props.form;
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
      <Form onSubmit={this.handleSubmit}>
        {/* <FormItem
          {...formItemLayout}
          label="配置英文名称"
        >
          {getFieldDecorator('name')(
            <Input placeholder="配置英文名称" />,
          )}
        </FormItem> */}
        <FormItem
          {...formItemLayout}
          label="配置英文名称"
        >
          <Input placeholder="配置英文名称" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="配置中文名称"
        >
          <Input placeholder="配置中文名称" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="配置的值"
        >
          <Input placeholder="配置的值" />
        </FormItem>
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">添加</Button>
        </FormItem>
      </Form>
    );
  }
}


AddMessage.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
  }).isRequired,

};
class CompanyTab extends Component {
  render() {
    return (
      <Tabs type="card">
        <TabPane tab="公司配置信息列表" key="1"><Company /></TabPane>
        <TabPane tab="添加配置信息" key="2"><AddMessage /></TabPane>
      </Tabs>
    );
  }
}

AddMessage.propTypes = {
  form: PropTypes.shape({
    getFieldsValue: PropTypes.func,
    getFieldValue: PropTypes.func,
    setFieldsValue: PropTypes.func,
    setFields: PropTypes.func,
    validateFields: PropTypes.func,
    validateFieldsAndScroll: PropTypes.func,
    getFieldError: PropTypes.func,
    getFieldsError: PropTypes.func,
    resetFields: PropTypes.func,
    getFieldDecorator: PropTypes.func,
  }).isRequired,
};


export default CompanyTab;
