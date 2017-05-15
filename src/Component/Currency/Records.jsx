import React, { Component } from 'react';
import { DatePicker, Input, Form, AutoComplete, Icon, Button, Col } from 'antd';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

class Records extends Component {

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 20 },
      wrapperCol: { span: 20 },
    };
    return (
      <Form layout="inline">
        <FormItem
          label="时间"
          labelCol={{
            xs: { span: 24 },
            sm: { span: 5 },
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 19 },
          }}
          help
        >
          <Col span="11">
            <FormItem>
              <DatePicker />
            </FormItem>
          </Col>
          <Col span="1">
            <p className="ant-form-split">-</p>
          </Col>
          <Col span="11">
            <FormItem>
              <DatePicker />
            </FormItem>
          </Col>
        </FormItem>
        <FormItem
          label="订单号"
        >
          {getFieldDecorator('userName')(
            <Input placeholder="请输入订单号..." />,
        )}
        </FormItem>
        <FormItem
          label="订单号"
        >
          <div className="global-search-wrapper" style={{ width: 230 }}>
            <AutoComplete
              className="global-search"
              size="large"
              style={{ width: '100%' }}
            //  dataSource={dataSource.map(renderOption)}
              // onSelect={onSelect}
              // onSearch={this.handleSearch}
              placeholder="请输入注册渠道名称..."
              optionLabelProp="text"
            >
              <Input
                suffix={(
                  <Button className="search-btn" size="large" type="primary">
                    <Icon type="search" />
                  </Button>
           )}
              />
            </AutoComplete>
          </div>
        </FormItem>
      </Form>

    );
  }
}

const Record = Form.create()(Records);
export default Record;
