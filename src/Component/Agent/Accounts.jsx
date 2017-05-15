import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Table, Input, DatePicker, Select, Form, Radio, Modal } from 'antd';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

  // TODO 这里用的是本地数据需要更改为服务端请求
const mockDataFirst = { index: 1, applyTime: '1:10', channelId: '1', accounts: 222, amount: 100, bankName: 'bankChina', cardholder: 'heyMen', cardNumber: 111111, status: 1, pendingTime: '2:20', accountTime: '3:30' };
const mockDataTwo = { index: 2, applyTime: '1:10', channelId: '1', accounts: 222, amount: 100, bankName: 'bankChina', cardholder: 'heyMen', cardNumber: 111111, status: 2, pendingTime: '2:20', accountTime: '3:30' };
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
      title: '序号',
      dataIndex: 'index',
      key: 'index',
    }, {
      title: '申请时间',
      dataIndex: 'applyTime',
      key: 'applyTime',
    }, {
      title: '渠道编号',
      dataIndex: 'channelId',
      key: 'channelId',
    }, {
      title: '帐号',
      dataIndex: 'accounts',
      key: 'accounts',
    }, {
      title: '结算金额(元)',
      dataIndex: 'amount',
      key: 'amount',
    }, {
      title: '银行名称',
      dataIndex: 'bankName',
      key: 'bankName',
    }, {
      title: '持卡人',
      dataIndex: 'cardholder',
      key: 'cardholder',
    }, {
      title: '卡号',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '操作管理',
      dataIndex: 'controler',
      key: 'controler',
      render: (text, record) => <Button onClick={() => this.handleClick(record)}>查看</Button>,
    }];
  }
  handleClick(record) {
      // onEditItem(record);
    this.props.showModal();
    this.props.handleSelect(record);
    console.log(`编辑操作${record.key}`);
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

// 搜索栏组件
const Selector = function Selector(props) {
  const options = props.options;
  // 根据参数动态生成搜索栏的option
  const dynamicOpiton = options.map(option =>
    <Option key={option} value={option}>{ option }</Option>);
  return (
    <span className="gameList_selector" >
      {props.children} :
      <span className="gameList_selector_unit">
        <Select
          mode="tags"
          showSearch
          style={{ width: 200 }}
          placeholder=" 全部 "
          optionFilterProp="children"
          filterOption={(input, option) =>
          option.props.value.indexOf(input) >= 0}
        >
          {dynamicOpiton}
        </Select>
      </span>
    </span>
  );
};

Selector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired),
  children: PropTypes.String,
};

class CreateModalToWeb extends Component {
  getForm() {
    const { form, item } = this.props;
    const { getFieldDecorator } = form;
    return (<Form layout="horizontal">
      <FormItem label="帐号" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        {getFieldDecorator('index', { initialValue: item && item.index })(
          <span>{item.index}</span>,
        )}
      </FormItem>
      <FormItem label="渠道编号" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        {getFieldDecorator('channelId', { initialValue: item && item.channelId })(
          <span>{item.channelId}</span>,
        )}
      </FormItem>
      <FormItem label="渠道帐号" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        {getFieldDecorator('accounts', { initialValue: item && item.accounts })(
          <span>{item.accounts}</span>,
        )}
      </FormItem>
      <FormItem label="结算金额" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        {getFieldDecorator('amount', { initialValue: item && item.amount })(
          <span>{item.amount}</span>,
        )}
      </FormItem>
      <FormItem label="银行名称" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        {getFieldDecorator('bankName', { initialValue: item && item.bankName })(
          <span>{item.bankName}</span>,
        )}
      </FormItem>
      <FormItem label="持卡人" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        {getFieldDecorator('cardholder', { initialValue: item && item.cardholder })(
          <span>{item.cardholder}</span>,
        )}
      </FormItem>
      <FormItem label="卡号" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        {getFieldDecorator('cardNumber', { initialValue: item && item.cardNumber })(
          <span>{item.cardNumber}</span>,
        )}
      </FormItem>
      <FormItem label="申请时间" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        {getFieldDecorator('applyTime', { initialValue: item && item.applyTime })(
          <span>{item.applyTime}</span>,
        )}
      </FormItem>
      <FormItem label="状态" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} >
        {getFieldDecorator('isShow', { initialValue: item && item.status })(
          <RadioGroup >
            <Radio value={0}>待审核</Radio>
            <Radio value={1}>待财务审核</Radio>
            <Radio value={2}>已结算</Radio>
            <Radio value={3}>财务审核不通过</Radio>
            <Radio value={4}>审核不通过</Radio>
          </RadioGroup>,
        )}
      </FormItem>
      <FormItem label="审核时间" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        {getFieldDecorator('pendingTime', { initialValue: item && item.pendingTime })(
          <span>{item.pendingTime}</span>,
        )}
      </FormItem>
      <FormItem label="结算时间" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        {getFieldDecorator('accountTime', { initialValue: item && item.accountTime })(
          <span>{item.accountTime}</span>,
        )}
      </FormItem>
    </Form>);
  }
  render() {
    const { visible, onCancel } = this.props;
    console.log('visible');
    console.log(visible);

    // TODO mock 中的 image 与需要使用的fileList中数据格式不一致
    const formComponents = this.getForm();

    return (
      <Modal
        visible={visible} title="查看"
        onCancel={onCancel}
      >
        {formComponents}
      </Modal>
    );
  }
}
const WarppedCreateModal = Form.create()(CreateModalToWeb);


class Accounts extends Component {
  constructor() {
    super();
    this.state = {
      data: [mockDataFirst, mockDataTwo],
      visible: false,
      selectedData: {},
    };
    this.fetch = this.fetch.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.saveFormRef = this.saveFormRef.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentWillMount() {
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
  /**
   * [handleCreate 使 WarppedCreateModal onOk触发事件]
   * @return {[type]} [description]
   */

  saveFormRef(form) {
    this.form = form;
  }


  /**
   * [handleSelect Tabel选择编辑时调用的方法]
   * @param  {[Object]} selectedData [选择中的对应tabelItem中的数据]
   * @return {[type]}              [description]
   */
  handleSelect(selectedData) {
    this.setState({ selectedData });
  }
  fetch() {
    // this.setState({ loading: true });
    this.setState({ loading: false });
    axios.get('api/get/player/editor')
    .then((response) => {
      this.setState({
        data: response,
      });
    });
  }

  render() {
    const banksName = ['全部', '1', '2', '3'];
    const status = ['全部', '3', '2', '1'];
    return (<div className="summarizes">
      <div className="summarizes_selectBar">
        <span>时间：
        <RangePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder={['Start Time', 'End Time']}
        />
        </span>
        <span><Selector options={banksName}>银行名称</Selector></span>
        <span><Selector options={status}>状态</Selector></span>
        <span>渠道编号：<Input placeholder="请输入渠道编号" /></span>
        <span>渠道帐号：<Input placeholder="请输入渠道帐号" /></span>
        <span>持卡人：<Input placeholder="请输入持卡人" /></span>
        <span>卡号：<Input placeholder="请输入银行卡号" /></span>
        <Button >搜索</Button>
      </div>
      <TabelComponent
        data={this.state.data}
        showModal={this.showModal}
        handleSelect={this.handleSelect}
      />
      <WarppedCreateModal
        ref={this.saveFormRef}
        visible={this.state.visible} item={this.state.selectedData}
        onCancel={this.handleCancel}
      />
    </div>);
  }
}

export default Accounts;
