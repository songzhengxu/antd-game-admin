import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Select, DatePicker } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class UserInfo extends React.Component {
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
        <FormItem label="昵称" >
          {getFieldDecorator('modified_personal_information_nickname', {
            rules: [{ required: true, message: '请输入昵称' }],
          })(
            <Input style={{ width: 200 }} />,
          )}
        </FormItem>
        <FormItem label="性别" >
          {getFieldDecorator('modified_personal_information_sex', {
            rules: [{ required: true, message: '请选择性别' }],
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder=" 请选择 "
              optionFilterProp="children"
              filterOption={(input, option) =>
              option.props.value.indexOf(input) >= 0}
            >
              <Option key="show" value="保密">保密</Option>
              <Option key="hide" value="男">男</Option>
              <Option key="hide" value="女">女</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem label="生日" >
          {getFieldDecorator('modified_personal_information_birthday', {
            rules: [{ required: true, message: '请选择生日' }],
          })(
            <DatePicker />,
          )}
        </FormItem>
        <FormItem label="个人地址" >
          {getFieldDecorator('modified_personal_information_blog', {
            rules: [{ required: true, message: '请输入个人地址' }],
          })(
            <Input style={{ width: 200 }} placeholder="请输入个人地址" />,
          )}
        </FormItem>
        <FormItem label="个性签名" >
          {getFieldDecorator('modified_personal_information_signature', {
            rules: [{ required: true, message: '请输入个性签名' }],
          })(
            <Input type="textarea" rows={3} style={{ width: 200 }} placeholder="请输入个性签名" />,
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

UserInfo.propTypes = {
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

const NewForm = Form.create()(UserInfo);


export default NewForm;
