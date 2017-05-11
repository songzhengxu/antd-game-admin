import React, { Component } from 'react';
import axios from 'axios';
import { Table, Modal } from 'antd';
import DropOption from '../Common/DropOption';
import WarppedCreateModal from './UpdateForm';

const confirm = Modal.confirm;
// TODO img的 src 用 import from 路径 可以 直接 使用不可用
class TabelComponent extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      data: [],
      pagination: {},
      loading: false,
      selectedData: {},
    };
    this.handleTableChange = this.handleTableChange.bind(this);
    this.fetch = this.fetch.bind(this);

    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.saveFormRef = this.saveFormRef.bind(this);
    this.normFile = this.normFile.bind(this);
    this.handleUpdatePicture = this.handleUpdatePicture.bind(this);
  }
  componentDidMount() {
    this.fetch();
  }
  handleMenuClick(record, e) {
    if (e.key === '1') {
      console.log('record');
      console.log(record);
      // onEditItem(record);
      this.setState({ selectedData: record, visible: true });
      console.log(`编辑操作${record.key}`);
    } else if (e.key === '2') {
      confirm({
        title: 'Are you sure delete this record?',
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
  fetch() {
    console.log(axios.get('api/get/ads/mobile'));
    this.setState({ loading: true });
    axios.get('api/get/ads/mobile')
    .then((response) => {
      console.log(response);
      const pagination = { ...this.state.pagination };
      pagination.total = 200;
      this.setState({
        loading: false,
        data: response.data.gameList,
        pagination,
      });
    });
  }

  // UpdateForm 方法
  showModal() {
    this.setState({ visible: true });
  }
  handleCancel() {
    this.setState({ visible: false });
  }
  handleCreate() {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  saveFormRef(form) {
    this.form = form;
  }

  normFile(event) {
    if (Array.isArray(event)) {
      return event;
    }
    return event && event.fileList;
  }

  handleUpdatePicture({ fileList }) { this.setState({ fileList }); }

  render() {
    console.log('refresh');
    const columns = [{
      title: '序号',
      dataIndex: 'index',
      key: 'index',
    }, {
      title: '游戏名称',
      dataIndex: 'gameName',
      key: 'gameName',
    }, {
      title: '图片缩略图',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: src => <img src={src} width="20" height="20" className="App-logo" alt="logo" />,
    }, {
      title: 'URL',
      dataIndex: 'URL',
      key: 'URL',
    }, {
      title: '编辑时间',
      dataIndex: 'editDate',
      key: 'editDate',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '操作',
      dataIndex: 'control',
      key: 'control',
      render: (text, record) => <DropOption onMenuClick={e => this.handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />,
    }];
    return (
      <div>
        <Table
          bordered columns={columns} dataSource={this.state.data}
          pagination={this.pagination}
          loading={this.loading}
          onChange={this.handleTableChange}
        />
        <WarppedCreateModal
          ref={this.saveFormRef}
          visible={this.state.visible} item={this.state.selectedData}
          onCancel={this.handleCancel} onCreate={this.handleCreate}
          normFile={this.normFile}
          fileList={this.state.selectedData.picture || []}
          handleUpdatePicture={this.handleUpdatePicture}
        />
      </div>
    );
  }
}

export default TabelComponent;
