import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Radio, Select } from 'antd';

const RadioGroup = Radio.Group;

const FormItem = Form.Item;
class MessageEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hasErrors = this.hasErrors.bind(this);
  }
  componentDidMount() {
    this.props.form.setFieldsValue({ MessageEditor_sender: 4645464 });
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
        <FormItem label="发送方" >
          {getFieldDecorator('sender', {
            rules: [{ required: true, message: '请选择发送方' }],
          })(
            <RadioGroup>
              <Radio value={1}>游戏平台</Radio>
              <Radio value={2}>游戏官方</Radio>
            </RadioGroup>,
          )}
        </FormItem>
        <FormItem label="游戏名称" >
          {getFieldDecorator('gameName', {
            rules: [{ required: true, message: '请选择游戏名称' }],
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder=" 请选择 "
              optionFilterProp="children"
              filterOption={(input, option) =>
              option.props.value.indexOf(input) >= 0}
            >
              <Option key="show" value="精灵皮卡丘">精灵皮卡丘</Option>
              <Option key="hide" value="吉姆战棋">吉姆战棋</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem label="内容" >
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '请输入推送内容' }],
          })(
            <Input style={{ width: 200 }} placeholder="请输入推送内容" />,
          )}
        </FormItem>
        <FormItem label="URL" >
          {getFieldDecorator('AddManager_second_level_secret', {
            rules: [{ required: true, message: '请输入URL' }],
          })(
            <Input style={{ width: 200 }} placeholder="请输入URL" />,
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

MessageEditor.propTypes = {
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

const NewForm = Form.create()(MessageEditor);
export default NewForm;
