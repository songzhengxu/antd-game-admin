import React, { Component } from 'react';
import { Radio, Input, Form, Button } from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

/**
 * [Editor 平台币发放表单]
 * @type {class}
 */
class Editor extends Component {
  constructor() {
    super();
    this.state = {
      value: 1,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * [handleSubmit 表单提交校验]
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
   * [render 渲染元素到页面]
   */
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="请填写帐号"
        >
          <RadioGroup value={this.state.value}>
            <Radio className="radioStyle" value={this.state.value}>充值玩家</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="请填写帐号"
        >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '用户不存在!' }],
          })(
            <Input />,
        )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="已有平台币数量"
        >
          <Input disabled="true" value="0" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="请填写平台币充值数量"
        >
          {getFieldDecorator('input')(
            <Input />,
        )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="请填写充值金额"
        >
          {getFieldDecorator('input')(
            <Input />,
        )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="请填写备注"
        >
          {getFieldDecorator('input')(
            <Input />,
        )}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">添加</Button>
        </FormItem>
      </Form>

    );
  }
}


const Editors = Form.create()(Editor);
export default Editors;
