import React, { Component } from 'react';

import { Button } from 'antd';
import Table from './Tabel';
import { WarppedCreateModal } from './UpdateForm';

/**
 * [Mobile]
 * @type {Component}
 */
class Mobile extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      selectedData: {},
    };
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.saveFormRef = this.saveFormRef.bind(this);
    this.normFile = this.normFile.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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
    console.log('000');
    console.log(form);
    console.log(this);
    form.resetFields();
    this.setState({ selectedData: {}, visible: false });
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
  saveFormRef(form) {
    this.form = form;
  }

  normFile(event) {
    if (Array.isArray(event)) {
      return event;
    }
    return event && event.fileList;
  }


  /**
   * [handleSelect Tabel选择编辑时调用的方法]
   * @param  {[Object]} selectedData [选择中的对应tabelItem中的数据]
   * @return {[type]}              [description]
   */
  handleSelect(selectedData) {
    this.setState({ selectedData });
  }

  render() {
    return (<div>
      <Button className="editable-add-btn" onClick={this.showModal}>Create</Button>
      <Table
        showModal={this.showModal}
        handleSelect={this.handleSelect}
      />
      <WarppedCreateModal
        ref={this.saveFormRef}
        visible={this.state.visible} item={this.state.selectedData}
        onCancel={this.handleCancel} onCreate={this.handleCreate}
        normFile={this.normFile}
      />
    </div>);
  }
}

export default Mobile;
