import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, message } from 'antd';

const FormItem = Form.Item;

class PasswordComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hasErrors = this.hasErrors.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const newPassword = this.props.form.getFieldValue('modified_personal_information_newpassword');
        const repeatNewPassword = this.props.form.getFieldValue('modified_personal_information_repeatnewpassword');
        console.log(newPassword);
        console.log(repeatNewPassword);
        if (newPassword !== repeatNewPassword) {
          message.error('两次输入的密码不一致');
        } else {
          // 发送异步请求
          // 等待异步请求返回状态码
          // 改变gamelst数据状态为refresh
          // 跳转到games页面
          this.props.history.push('/games/games');
        }
      }
      console.log(err);
    });
  }
  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    // const youximingchengError = isFieldTouched('userName') && getFieldError('userName');
    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        <FormItem label="原始密码" >
          {getFieldDecorator('modified_personal_information_oldpassword', {
            rules: [{ required: true, message: '请输入原始密码' }],
          })(
            <Input type="password" style={{ width: 200 }} />,
          )}
        </FormItem>
        <FormItem label="新密码" >
          {getFieldDecorator('modified_personal_information_newpassword', {
            rules: [{ required: true, message: '请输入新密码' }],
          })(
            <Input type="password" style={{ width: 200 }} />,
          )}
        </FormItem>
        <FormItem label="重复新密码" >
          {getFieldDecorator('modified_personal_information_repeatnewpassword', {
            rules: [{ required: true, message: '请重复输入新密码' }],
          })(
            <Input type="password" style={{ width: 200 }} />,
          )}
        </FormItem>
        <FormItem label="提交" >
          <Button
            type="primary"
            htmlType="submit"
          >
            提交
          </Button>
        </FormItem>
      </Form>
    );
  }
}

PasswordComponent.propTypes = {
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
  history: PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      state: PropTypes.stirng,
      push: PropTypes.func,
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    block: PropTypes.func,
  }).isRequired,
};

const NewForm = Form.create()(PasswordComponent);

export default NewForm;
