import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button, Row, Form, Input, message } from 'antd';
import config from '../utils/config';
// import { connect } from 'react-redux';

const FormItem = Form.Item;


class Main extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      loading: false,
    };
  }
  showerror() {
    message.error('帐号或密码错误');
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: !this.state.loading });
    this.props.form.validateFields((error, values) => {
      if (!error) {
        if (values.userName !== 'guest' && values.password !== 'guest') {
          setTimeout(() => {
            this.showerror();
            this.setState({ loading: !this.state.loading });
          }, 1000).bind(this);
        }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const loginLoading = this.state.loading;

    return (
      <div className="login">
        <div className="form">
          <div className="logo">
            <img alt={'logo'} src={config.logo} />
            <span>{config.name}</span>
          </div>
          <form>
            <FormItem hasFeedback>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input size="large" placeholder="Username" onPressEnter={this.handleSubmit} />,
         )}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input
                  size="large" type="password" placeholder="Password"
                  onPressEnter={this.handleSubmit}
                />,
         )}
            </FormItem>
            <Row>
              <Button type="primary" size="large" onClick={this.handleSubmit} loading={loginLoading}>
             Sign in
           </Button>
              <p>
                <span>Username：guest</span>
                <span>Password：guest</span>
              </p>
            </Row>

          </form>
        </div>
      </div>
    );
  }
}

const MainLogin = Form.create()(Main);
export default MainLogin;
