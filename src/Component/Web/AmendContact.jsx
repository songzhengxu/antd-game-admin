import React, { Component } from 'react';
import { Form, Button, Input } from 'antd';
import LzEditor from 'react-lz-editor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;

class AmendContact extends Component {
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
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };
    return (
      <Form
        onSubmit={this.handleSubmit}
      >
        <FormItem
          {...formItemLayout}
          label="标题"
        >
          {getFieldDecorator('title')(
            <Input />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="内容"
        >
          {getFieldDecorator('content')(
            <LzEditor
              active="true"
            />,
          )}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">提交</Button>
          <Link to="/web/contact">
            <Button type="primary" htmlType="submit" size="large" className="backtrack">返回</Button>
          </Link>
        </FormItem>
      </Form>
    );
  }
}

AmendContact.propTypes = {
  form: PropTypes.shape({
    getFieldsValue: PropTypes.func,
    getFieldValue: PropTypes.func,
    setFieldsValue: PropTypes.func,
    setFields: PropTypes.func,
    validateFields: PropTypes.func,
    validateFieldsAndScroll: PropTypes.func,
    getFieldError: PropTypes.func,
    getFieldsError: PropTypes.func,
    isFieldValidating: PropTypes.func,
    isFieldTouched: PropTypes.func,
    isFieldsTouched: PropTypes.func,
    resetFields: PropTypes.func,
    getFieldDecorator: PropTypes.func,
  }).isRequired,
};
export default Form.create()(AmendContact);
