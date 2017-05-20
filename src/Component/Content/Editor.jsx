import React, { Component } from 'react';
import { Input, Radio, Form, Upload, Icon, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import LzEditor from 'react-lz-editor';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;

/**
 * [Addsubject 添加专题表单]
 * @type {[class]}
 */
class Main extends Component {
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

/**
 * [handleSubmit 提交form表单]
 * @param  {[object]} e [事件]
 */
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
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
    const { getFieldDecorator } = this.props.form;  // 用于与表单双向绑定的属性
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    // 定义表单的样式
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="专题题目"
          hasFeedback
        >
          {getFieldDecorator('name')(
            <Input type="text" name="title" />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="图片"
        >
          {getFieldDecorator('piture')(
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
            </div>,
          )}

        </FormItem>
        <FormItem
          {...formItemLayout}
          label="专题内容"
        >
          {getFieldDecorator('content')(
            <LzEditor
              active="true"
            />,
          )}

        </FormItem>

        <FormItem
          {...formItemLayout}
          label="热门"
        >
          {getFieldDecorator('radio-group')(
            <RadioGroup>
              <Radio value="a">是</Radio>
              <Radio value="b">否</Radio>
            </RadioGroup>,
          )}
        </FormItem>

        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">添加</Button>
          <Link to="/content/subjects">
            <Button type="primary" htmlType="submit" size="large" className="backtrack">返回</Button>
          </Link>
        </FormItem>
      </Form>
    );
  }
}

Main.propTypes = {
  form: React.PropTypes.array.isRequired,
};

export default Form.create()(Main);
