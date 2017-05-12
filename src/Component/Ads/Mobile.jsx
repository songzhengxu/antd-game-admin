import React, { Component } from 'react';

import { Button } from 'antd';
import Table from './Tabel';
import WarppedCreateModal from './UpdateForm';

/**
 * [Mobile]
 * @type {Component}
 */
class Mobile extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      fileList: [],
      selectedData: {},
    };
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.saveFormRef = this.saveFormRef.bind(this);
    this.normFile = this.normFile.bind(this);
    this.handleUpdatePicture = this.handleUpdatePicture.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  showModal() {
    console.log(this.state.fileList);
    this.setState({ visible: true });
  }
  handleCancel() {
    this.setState({ selectedData: {}, visible: false, fileList: [] });
  }
  handleCreate() {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ selectedData: {}, visible: false, fileList: [] });
      // this.setState({ selectedData: {} });
      // this.setState({ visible: false });
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
        normFile={this.normFile} fileList={this.state.fileList}
        handleUpdatePicture={this.handleUpdatePicture}
      />
    </div>);
  }
}

export default Mobile;
