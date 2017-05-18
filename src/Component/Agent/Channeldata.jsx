import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Table, Select, Modal, Input } from 'antd';
import DropOption from '../Common/DropOption';


const confirm = Modal.confirm;

  // TODO 这里用的是本地数据需要更改为服务端请求
const mockDataFirst = { channelId: 1, linkman: 'heyman', bankName: 'bankChina', subsidiaryBank: 'subBank', cardholder: 'keeper', cardNumber: '1111111', identityDocument: 'http://placeholder.qiniudn.com/20x40', updateTime: '22:22', status: '通过' };
const mockDataTwo = { channelId: 2, linkman: 'heyman', bankName: 'bankChina', subsidiaryBank: 'subBank', cardholder: 'keeper', cardNumber: '1111111', identityDocument: 'http://placeholder.qiniudn.com/20x40', updateTime: '22:22', status: '通过' };
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
      title: '渠道ID',
      dataIndex: 'channelId',
      key: 'channelId',
    }, {
      title: '联系人',
      dataIndex: 'linkman',
      key: 'linkman',
    }, {
      title: '银行名称',
      dataIndex: 'bankName',
      key: 'bankName',
    }, {
      title: '分行名称',
      dataIndex: 'subsidiaryBank',
      key: 'subsidiaryBank',
    }, {
      title: '持卡人',
      dataIndex: 'cardholder',
      key: 'cardholder',
    }, {
      title: '卡号',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
    }, {
      title: '身份证件',
      dataIndex: 'identityDocument',
      key: 'identityDocument',
      render: src => <img src={src} width="20" height="20" className="App-logo" alt="logo" />,
    }, {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '操作',
      dataIndex: 'controler',
      key: 'controler',
      render: (text, record) => <DropOption onMenuClick={e => this.handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '通过' }, { key: '2', name: '不通过' }]} />,
    }];
  }

  handleMenuClick(record, e) {
    if (e.key === '1') {
      // onEditItem(record);
      confirm({
        title: '确定要通过吗?',
        onOk() {
          // onDeleteItem(record.id);
        },
      });
    } else if (e.key === '2') {
      confirm({
        title: '确定要禁止吗?',
        onOk() {
          // onDeleteItem(record.id);
        },
      });
    }
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
TabelComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string.isRequired),
};

TabelComponent.defaultProps = {
  data: [],
};

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
          placeholder=" 请选择 "
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
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  children: PropTypes.string.isRequired,
};


class Channeldata extends Component {
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
    return (<div className="summarizes">
      <div className="summarizes_selectBar">
        <span>渠道ID：<Input placeholder="请输入渠道ID" /></span>
        <Button >搜索</Button>
      </div>
      <TabelComponent
        data={this.state.data}
        showModal={this.showModal}
        handleSelect={this.handleSelect}
      />
    </div>);
  }
}

export default Channeldata;
