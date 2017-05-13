import React from 'react';
import { Button, Form, Input, Radio } from 'antd';
import axios from 'axios';
import PicturesWall from './PictureWall';
import TableOld from './Tabel';
import { CreateModal } from './UpdateForm';
import Mobile from './Mobile';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;

/**
 * [Component UpdateForm.CreateModal 的多态]
 * @type {String}
 */
class CreateModalToWeb extends CreateModal {
  getForm() {
    const { form, normFile, item, visible } = this.props;
    const { getFieldDecorator, setFieldsValue } = form;
    return (<Form layout="horizontal">
      <FormItem label="图片(尺寸:640*280)" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} hasFeedback>
        {getFieldDecorator('upload', {
          valuePropName: 'fileList',
          getValueFromEvent: normFile,
        })(
          <PicturesWall setFieldsValue={setFieldsValue} visible={visible} />,
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
}
const WarppedCreateModal = Form.create()(CreateModalToWeb);

/**
 * [Component Table 的多态 只修改接口的申请就可以]
 * @type {[type]}
 */
class Table extends TableOld {
  // TODO要按真实的接口去修改现在只是用api/get/ads/mobile的模拟接口
  fetch() {
    this.setState({ loading: true });
    axios.get('api/get/ads/mobile')
    .then((response) => {
      const pagination = { ...this.state.pagination };
      pagination.total = 200;
      this.setState({
        loading: false,
        data: response,
        pagination,
      });
    });
  }
}

class Gamebox extends Mobile {
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

export default Gamebox;
