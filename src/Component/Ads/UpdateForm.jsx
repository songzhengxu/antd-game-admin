import React, { Component } from 'react';
import { Modal, Form, Input, Radio, Upload, Icon } from 'antd';


const RadioGroup = Radio.Group;
const FormItem = Form.Item;


class PicturesWall extends React.Component {
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

class CreateModal extends Component {
  getForm() {
    const { form, normFile, item } = this.props;
    const { getFieldDecorator, setFieldsValue } = form;
    return (<Form layout="horizontal">
      <FormItem label="游戏ID" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} hasFeedback>
        {getFieldDecorator('gameID', { rules: [{ required: true, message: '请输入游戏ID' }], initialValue: item && item.key })(
          <Input />,
        )}
      </FormItem>
      <FormItem label="游戏名称" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} hasFeedback>
        {getFieldDecorator('gameName', { rules: [{ required: true, message: '请输入游戏名称' }], initialValue: item && item.gameName })(
          <Input />,
        )}
      </FormItem>
      <FormItem label="图片" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} hasFeedback>
        {getFieldDecorator('upload', {
          valuePropName: 'fileList',
          getValueFromEvent: normFile,
        })(
          <PicturesWall setFieldsValue={setFieldsValue} isCreate={!item.key} />,
        )}
      </FormItem>
      <FormItem label="URL(以http://开头)" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} hasFeedback>
        {getFieldDecorator('URl', { rules: [{ required: true }], initialValue: item && item.URL })(
          <Input addonBefore="Http://" addonAfter=".com" />,
        )}
      </FormItem>
      <FormItem label="是否显示" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} hasFeedback>
        {getFieldDecorator('isShow')(
          <RadioGroup>
            <Radio value="show">显示</Radio>
            <Radio value="hide">隐藏</Radio>
          </RadioGroup>,
        )}
      </FormItem>
      <FormItem label="排名(越小越前)" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} hasFeedback>
        {getFieldDecorator('rank', { rules: [{ required: true, message: '请输数字' }], initialValue: item && item.index })(
          <Input />,
        )}
      </FormItem>
    </Form>);
  }
  render() {
    const { visible, onCancel, onCreate, item } = this.props;

    // TODO mock 中的 image 与需要使用的fileList中数据格式不一致
    const formComponents = this.getForm();

    return (
      <Modal
        visible={visible} title="Create new One"
        okText={item.key ? '更新' : '创建'}
        onCancel={onCancel}
        onOk={onCreate}
      >
        {formComponents}
      </Modal>
    );
  }
}


const WarppedCreateModal = Form.create()(CreateModal);
export default WarppedCreateModal;
