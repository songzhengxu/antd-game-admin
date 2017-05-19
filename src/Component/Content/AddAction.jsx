import React, { Component } from 'react';
import { Input, Form, Upload, Icon, Button, Modal, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import LzEditor from 'react-lz-editor';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;


class AddAction extends Component {
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

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
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
          {...formItemLayout}
          label="起止时间"
        >
          <RangePicker />,
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="内容"
        >
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
AddAction.propTypes = {
  id: PropTypes.string.isRequired,
  setFieldsValue: PropTypes.func.isRequired,
  form: React.PropTypes.array.isRequired,
};
export default Form.create()(AddAction);
