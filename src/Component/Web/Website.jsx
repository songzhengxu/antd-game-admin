import React, { Component } from 'react';
import { Form, Input, Button, Tabs } from 'antd';
import Tab from '../Common/Tab';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


class Website extends Component {
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
      <Form>
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
      <Form>
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
class TabComponent extends Component {
  // constructor() {
  //   super();
  //   const components = [new Website()];
  //   const website = new Website();
  //   this.tab = new Tab('网站信息', new Website());
  //   console.log(this.tab);
  //   // this.object = { title: '网站信息', component: new Website() };
  // }
  render() {
  //  const HeaderTab = this.tab;
    return (
      <Tabs type="card">
        <TabPane tab="网站信息" key="1"><Website /></TabPane>
        <TabPane tab="SEO设置" key="2"><SEOSetting /></TabPane>
      </Tabs>
    );
  }
}

export default TabComponent;
