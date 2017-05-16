import React, { Component } from 'react';
import { Input, Radio, Form, Upload, Icon, Button } from 'antd';
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
  /**
   * [normFile 点击上传图片]
   * @param  {[object]} e [事件]
   * @return {[object]}   [返回上传图片的信息]
   */
  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render() {
    const { getFieldDecorator } = this.props.form;  // 用于与表单双向绑定的属性
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
          <Input type="text" name="title" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="图片【建议尺寸：640*280】" extra="显示图片"
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="专题内容"
        >
          <LzEditor
            active="true"
          />
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
