import React, { Component } from 'react';
import { Form, Input, Button, Tabs } from 'antd';
import PropTypes from 'prop-types';
// import Tab from '../Common/Tab';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


class Website extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="后台地址加密码"
          validateStatus="error"
          help="设置加密码后必须通过以下地址访问后台,请劳记此地址，为了安全，您也可以定期更换此加密码!"
        >
          <Input id="error" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="备案信息"
        >
          <Input />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="版权管理"
        >
          <Input type="textarea" style={{ height: 100 }} />
        </FormItem>
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">保存</Button>
        </FormItem>
      </Form>
    );
  }
}

class SEOSetting extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="SEO标题"
        >
          <Input placeholder="h5在线玩游戏" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="SEO关键字"
        >
          <Input placeholder="h5、在线玩、游戏" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="SEO描述"
        >
          <Input type="textarea" style={{ height: 100 }} placeholder="很好玩的H5在线游戏" />
        </FormItem>
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">保存</Button>
        </FormItem>
      </Form>
    );
  }
}

const Websites = Form.create()(Website);
const SEOSettings = Form.create()(SEOSetting);
class TabComponent extends Component {
  render() {
    return (
      <Tabs type="card">
        <TabPane tab="网站信息" key="1"><Websites /></TabPane>
        <TabPane tab="SEO设置" key="2"><SEOSettings /></TabPane>
      </Tabs>
    );
  }
}

Websites.propTypes = {
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
export default TabComponent;
