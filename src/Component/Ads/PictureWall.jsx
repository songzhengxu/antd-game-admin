import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Upload, Icon } from 'antd';


class PicturesWall extends Component {
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

  // 用于按 modal cancel 时重置图片为空
  componentWillReceiveProps() {
    const { visible } = this.props;
    if (!visible) {
      const files = [];
      this.setState({ fileList: [] });
      const file = this.props.id;
      this.props.setFieldsValue({ [file]: { files } });
    }
  }


  handleCancel() { this.setState({ previewVisible: false }); }

  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange({ fileList }) {
    this.setState({ fileList });
    const file = this.props.id;
    this.props.setFieldsValue({ [file]: { fileList } });
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
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
    );
  }
}

PicturesWall.propTypes = {
  id: PropTypes.string,
  setFieldsValue: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
PicturesWall.defaultProps = {
  id: '',
};


export default PicturesWall;
