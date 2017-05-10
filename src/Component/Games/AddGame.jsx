import React from 'react';
import { Form, Icon, Input, Button, Radio, Checkbox } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

/*
const GameTypeRadio = function GameTypeRadio() {
  return (
    <RadioGroup>
      <Radio value={1}>网游</Radio>
      <Radio value={2}>单机</Radio>
    </RadioGroup>
  );
};

class TestRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 1 };
    this.onchangHandler = this.onchangHandler.bind(this);
  }
  onchangHandler(event) {
    this.setState({
      value: event.target.value,
    });
  }
  render() {
    return (
      <RadioGroup value={this.state.value} onChange={this.onchangHandler} >
        <Radio value={1}>网游</Radio>
        <Radio value={2}>单机</Radio>
      </RadioGroup>
    );
  }
}
*/
class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hasErrors = this.hasErrors.bind(this);
  }
  /*
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  */
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      console.log(err);
    });
  }
  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    // const youximingchengError = isFieldTouched('userName') && getFieldError('userName');
    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        <FormItem
          label="游戏名称"
          hasFeedback
        >
          {getFieldDecorator('youximingcheng', {
            rules: [{ required: true, message: '请输入游戏名称' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入游戏名称" />,
          )}
        </FormItem>
        <FormItem label="游戏类型" >
          {getFieldDecorator('youxileixing', {
            rules: [{ required: true, message: '请选择游戏类型' }],
          })(
            <RadioGroup>
              <Radio value={1}>网游</Radio>
              <Radio value={2}>单机</Radio>
            </RadioGroup>,
          )}
        </FormItem>
        <FormItem label="游戏标签" >
          {getFieldDecorator('youxibiaoqian', {
            initialValue: ['tiyu'],
            rules: [{ required: true, message: '请选择游戏标签' }],
          })(
            <CheckboxGroup
              options={[
            { label: '体育', value: 'tiyu' },
            { label: '动作', value: 'dongzuo' },
            { label: '策略', value: 'celue' },
            { label: '冒险', value: 'maoxian' },
              ]}
            />,
          )}
        </FormItem>
        <FormItem label="游戏点击量" hasFeedback >
          {getFieldDecorator('youxidianjiliang', {
            rules: [{ required: true, message: '请输入游戏点击量' }],
          })(
            <Input
              prefix={<Icon
                type="lock"
                style={{ fontSize: 13 }}
              />}
              placeholder="请输入游戏点击量"
            />,
          )}
        </FormItem>
        <FormItem label="游戏自定义排序" hasFeedback >
          {getFieldDecorator('youxizidingyipaixu', {
            rules: [{ required: true, message: '没有输入游戏序号' }],
          })(
            <Input
              prefix={<Icon
                type="lock"
                style={{ fontSize: 13 }}
              />}
              placeholder="请输入游戏序号，越小越靠前"
            />,
          )}
        </FormItem>
        <FormItem label="推荐星级" hasFeedback >
          {getFieldDecorator('tuijianxingji', {
            rules: [{ required: true, message: '没有推荐星级' }],
          })(
            <Input
              prefix={<Icon
                type="lock"
                style={{ fontSize: 13 }}
              />}
              placeholder="请输入推荐星级"
            />,
          )}
        </FormItem>
        <FormItem label="SEO标题" hasFeedback >
          {getFieldDecorator('SEO_biaoti', {
            rules: [{ required: true, message: '没有SEO标题' }],
          })(
            <Input
              prefix={<Icon
                type="lock"
                style={{ fontSize: 13 }}
              />}
              placeholder="请输入SEO标题"
            />,
          )}
        </FormItem>
        <FormItem label="SEO关键字" hasFeedback >
          {getFieldDecorator('SEO_guanjianzi', {
            rules: [{ required: true, message: '没有SEO关键字' }],
          })(
            <Input
              prefix={<Icon
                type="lock"
                style={{ fontSize: 13 }}
              />}
              placeholder="请输入SEO关键字"
            />,
          )}
        </FormItem>
        <FormItem label="SEO描述" >
          {getFieldDecorator('SEO_miaoshu', {
            rules: [{ required: true, message: '没有SEO描述' }],
          })(
            <Input
              type="textarea"
              rows={4}
              placeholder="请输入SEO描述"
            />,
          )}
        </FormItem>
        <FormItem label="游戏地址" >
          {getFieldDecorator('youxidizhi', {
            rules: [{ required: true, message: '没有输入游戏地址' }],
          })(
            <Input
              type="textarea"
              rows={4}
              placeholder="请输入游戏地址"
            />,
          )}
        </FormItem>
        <FormItem label="游戏支付回调地址" >
          {getFieldDecorator('youxizhifuhuitiaodizhi', {
            rules: [{ required: true, message: '没有输入游戏支付回调地址' }],
          })(
            <Input
              type="textarea"
              rows={4}
              placeholder="请输入游戏支付回调地址"
            />,
          )}
        </FormItem>
        <FormItem label="游戏简介" >
          {getFieldDecorator('youxijianjie', {
            rules: [{ required: true, message: '没有输入游戏简介,或者字段过长', whitespace: true, max: 200 }],
          })(
            <Input
              type="textarea"
              rows={4}
              placeholder="请输入200字以内的游戏简介"
            />,
          )}
        </FormItem>
        <FormItem label="当前状态" >
          {getFieldDecorator('dangqianzhuangtai', {
            rules: [{ required: true, message: '请选择当前状态' }],
          })(
            <RadioGroup>
              <Radio value={1}>程序接入</Radio>
              <Radio value={2}>上线</Radio>
              <Radio value={3}>下线</Radio>
            </RadioGroup>,
          )}
        </FormItem>
        <FormItem label="渠道通付费" hasFeedback >
          {getFieldDecorator('qudaotongfufei', {
            rules: [{ required: true,
              validator(rule, value, callback) {
                const errors = [];
                const testValue = value * 1;
                if (testValue < 0 || testValue > 1 || isNaN(testValue)) {
                  errors.push(
                  new Error('less or more'),
                );
                  const somerule = rule;
                  somerule.message = '请输入0-1之间的数字';
                }
                if (!value) {
                  errors.push(
                  new Error('no input value'),
                );
                  const somerule = rule;
                  somerule.message = '请输入分成范围';
                }
                callback(errors);
              } }],
          })(
            <Input
              prefix={<Icon
                type="lock"
                style={{ fontSize: 13 }}
              />}
              placeholder="默认分成范围为0-1"
            />,
          )}
        </FormItem>
        <FormItem label="渠道默认分成" hasFeedback >
          {getFieldDecorator('qudaomorenfencheng', {
            rules: [{ required: true,
              validator(rule, value, callback) {
                const errors = [];
                const testValue = value * 1;
                if (testValue < 0 || testValue > 1 || isNaN(testValue)) {
                  errors.push(
                  new Error('less or more'),
                );
                  const somerule = rule;
                  somerule.message = '请输入0-1之间的数字';
                }
                if (!value) {
                  errors.push(
                  new Error('no input value'),
                );
                  const somerule = rule;
                  somerule.message = '请输入分成范围';
                }
                callback(errors);
              } }],
          })(
            <Input
              prefix={<Icon
                type="lock"
                style={{ fontSize: 13 }}
              />}
              placeholder="默认分成范围为0-1"
            />,
          )}
        </FormItem>
        <FormItem label="提交" >
          <Button
            type="primary"
            htmlType="submit"
            disabled={this.hasErrors(getFieldsError())}
          >
            提交
          </Button>
          <Button
            type="danger"
          >
              取消
            </Button>
        </FormItem>
      </Form>
    );
  }
}
const WrappedHorizontalLoginForm = Form.create()(Hello);
export default WrappedHorizontalLoginForm;
