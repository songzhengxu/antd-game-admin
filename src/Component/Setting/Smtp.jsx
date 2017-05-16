import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';

const FormItem = Form.Item;
class Stmp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hasErrors = this.hasErrors.bind(this);
  }
  componentDidMount() {
    this.props.form.setFieldsValue({ stmp_sender: 4645464 });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
          // 发送异步请求
          // 等待异步请求返回状态码
          // 改变gamelst数据状态为refresh
          // 跳转到games页面
        this.props.history.push('/games/games');
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
        <FormItem label="发件人" >
          {getFieldDecorator('stmp_sender', {
            rules: [{ required: true, message: '请输入发件人' }],
          })(
            <Input style={{ width: 200 }} placeholder="请输入发件人" />,
          )}
        </FormItem>
        <FormItem label="邮箱地址" >
          {getFieldDecorator('stmp_email', {
            rules: [{ required: true, message: '请输入邮件地址', type: 'email' }],
          })(
            <Input style={{ width: 200 }} placeholder="请输入邮件地址" />,
          )}
        </FormItem>
        <FormItem label="STMP服务器" >
          {getFieldDecorator('stmp_server', {
            rules: [{ required: true, message: '请输入服务器地址' }],
          })(
            <Input style={{ width: 200 }} placeholder="请输入服务器地址" />,
          )}
        </FormItem>
        <FormItem label="STMP服务器端口号" >
          {getFieldDecorator('stmp_port', {
            rules: [{ required: true, message: '请输入STMP服务器端口号' }],
          })(
            <Input style={{ width: 200 }} placeholder="请输入STMP服务器端口号" />,
          )}
        </FormItem>
        <FormItem label="发件箱账号" >
          {getFieldDecorator('stmp_sender_accout', {
            rules: [{ required: true, message: '请输入发件箱账号' }],
          })(
            <Input style={{ width: 200 }} placeholder="请输入发件箱账号" />,
          )}
        </FormItem>
        <FormItem label="发件箱密码" >
          {getFieldDecorator('stmp_sender_secret', {
            rules: [{ required: true, message: '请输入发件箱密码' }],
          })(
            <Input type="password" style={{ width: 200 }} placeholder="请输入发件箱密码" />,
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

Stmp.propTypes = {
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

const NewForm = Form.create()(Stmp);


export default NewForm;
