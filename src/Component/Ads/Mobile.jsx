import React, { Component } from 'react';

import { Button } from 'antd';
import Table from './Tabel';
import WarppedCreateModal from './UpdateForm';

// class PicturesWall extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       previewVisible: false,
//       previewImage: '',
//       fileList: [],
//     };
//     this.handleCancel = this.handleCancel.bind(this);
//     this.handlePreview = this.handlePreview.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }
//
//
//   handleCancel() { this.setState({ previewVisible: false }); }
//
//   handlePreview(file) {
//     this.setState({
//       previewImage: file.url || file.thumbUrl,
//       previewVisible: true,
//     });
//   }
//
//   handleChange({ fileList }) { this.setState({ fileList }); }
//   render() {
//     const { previewVisible, previewImage, fileList } = this.state;
//     const uploadButton = (
//       <div>
//         <Icon type="plus" />
//         <div className="ant-upload-text">Upload</div>
//       </div>
//     );
//     return (
//       <div className="clearfix">
//         <Upload
//           action="//jsonplaceholder.typicode.com/posts/"
//           listType="picture-card"
//           fileList={fileList}
//           onPreview={this.handlePreview}
//           onChange={this.handleChange}
//         >
//           {fileList.length >= 1 ? null : uploadButton}
//         </Upload>
//         <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
//           <img alt="example" style={{ width: '100%' }} src={previewImage} />
//         </Modal>
//       </div>
//     );
//   }
// }


class Mobile extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      fileList: [],
    };
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.saveFormRef = this.saveFormRef.bind(this);
    this.normFile = this.normFile.bind(this);
    this.handleUpdatePicture = this.handleUpdatePicture.bind(this);
  }
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
    return (<div>
      <Button className="editable-add-btn" onClick={this.showModal}>Create</Button>
      <Table />
      <WarppedCreateModal
        ref={this.saveFormRef}
        visible={this.state.visible}
        onCancel={this.handleCancel} onCreate={this.handleCreate}
        normFile={this.normFile} fileList={this.state.fileList}
        handleUpdatePicture={this.handleUpdatePicture}
      />
    </div>);
  }
}

export default Mobile;
