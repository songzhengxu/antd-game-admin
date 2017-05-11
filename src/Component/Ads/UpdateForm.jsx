import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Radio, Upload, Icon } from 'antd';


const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class CreateModal extends Component {
  render() {
    const { visible, form, onCancel, onCreate, normFile, handleUpdatePicture,
       fileList, item } = this.props;
    const { getFieldDecorator } = form;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    // TODO mock 中的 image 与需要使用的fileList中数据格式不一致
    const formComponents =
      (<Form layout="horizontal">
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
            initialValue: fileList,
          })(
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
              onChange={handleUpdatePicture}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>,
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
    return (
      <Modal
        visible={visible} title="Create new One"
        okText="create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        {formComponents}
      </Modal>
    );
  }
}


const CreateModalContainer = connect(state =>
  ({ Mobile: state.AdsMobileReducer.Mobile }))(CreateModal);
const WarppedCreateModal = Form.create()(CreateModalContainer);
export default WarppedCreateModal;
