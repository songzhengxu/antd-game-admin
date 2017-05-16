import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Radio, Checkbox, Upload, Modal } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;


class PicturesWall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleCancel() {
    this.setState({ previewVisible: false });
  }

  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange({ fileList }) {
    this.setState({ fileList });
    const filed = this.props.id;
    this.props.setFieldsValue({ [filed]: { fileList } });
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= this.props.limit ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

PicturesWall.propTypes = {
  id: PropTypes.string.isRequired,
  setFieldsValue: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
};

class Hello extends React.Component {
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
    const { getFieldDecorator, setFieldsValue, getFieldValue } = this.props.form;
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
            <Input
              prefix={<Icon
                type="lock"
                style={{ fontSize: 13 }}
              />}
              placeholder="请输入游戏名称"
            />,
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
            rules: [{ required: true,
              validator(rule, value, callback) {
                const errors = [];
                const testValue = value * 1;
                const isInt = Number.isInteger(testValue);
                if (isNaN(testValue) || !isInt) {
                  errors.push(
                  new Error('not a number'),
                );
                  const somerule = rule;
                  somerule.message = '请输入一个整数';
                }
                if (!value) {
                  errors.push(
                  new Error('no input value'),
                );
                  const somerule = rule;
                  somerule.message = '没有输入游戏点击量';
                }
                callback(errors);
              } }],
          })(
            <Input
              placeholder="请输入游戏点击量"
            />,
          )}
        </FormItem>
        <FormItem label="游戏自定义排序" hasFeedback >
          {getFieldDecorator('youxizidingyipaixu', {
            rules: [{ required: true,
              validator(rule, value, callback) {
                const errors = [];
                const testValue = value * 1;
                const isInt = Number.isInteger(testValue);
                if (isNaN(testValue) || !isInt) {
                  errors.push(
                  new Error('not a number'),
                );
                  const somerule = rule;
                  somerule.message = '请输入一个整数';
                }
                if (!value) {
                  errors.push(
                  new Error('no input value'),
                );
                  const somerule = rule;
                  somerule.message = '没有输入游戏自定义排序';
                }
                callback(errors);
              } }],
          })(
            <Input
              placeholder="请输入游戏序号，越小越靠前"
            />,
          )}
        </FormItem>
        <FormItem label="推荐星级" hasFeedback >
          {getFieldDecorator('tuijianxingji', {
            rules: [{ required: true,
              validator(rule, value, callback) {
                const errors = [];
                const testValue = value * 1;
                const isInt = Number.isInteger(testValue);
                if (testValue < 0 || testValue > 5 || isNaN(testValue) || !isInt) {
                  errors.push(
                  new Error('less or more'),
                );
                  const somerule = rule;
                  somerule.message = '请输入0-5之间的整数';
                }
                if (!value) {
                  errors.push(
                  new Error('no input value'),
                );
                  const somerule = rule;
                  somerule.message = '没有输入推荐星级';
                }
                callback(errors);
              } }],
          })(
            <Input
              placeholder="请输入推荐星级"
            />,
          )}
        </FormItem>
        <FormItem label="SEO标题" hasFeedback >
          {getFieldDecorator('SEO_biaoti', {
            rules: [{ required: true, message: '没有SEO标题' }],
          })(
            <Input
              placeholder="请输入SEO标题"
            />,
          )}
        </FormItem>
        <FormItem label="SEO关键字" hasFeedback >
          {getFieldDecorator('SEO_guanjianzi', {
            rules: [{ required: true, message: '没有SEO关键字' }],
          })(
            <Input
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
        <FormItem label="游戏icon" >
          {getFieldDecorator('youxiicon', {
            rules: [{ required: true,
              validator(rule, value, callback) {
                const errors = [];
                if (value === undefined || value.fileList.length < 1) {
                  errors.push(
                  new Error('less or more'),
                  );
                  const somerule = rule;
                  somerule.message = '请上传游戏icon';
                }
                callback(errors);
              } }],
          })(
            <PicturesWall
              id="youxiicon"
              setFieldsValue={setFieldsValue}
              getFieldValue={getFieldValue} limit={1}
            />,
          )}
        </FormItem>
        <FormItem label="游戏背景" >
          {getFieldDecorator('youxibeijing', {
            rules: [{ required: true,
              validator(rule, value, callback) {
                const errors = [];
                if (value === undefined || value.fileList.length < 1) {
                  errors.push(
                  new Error('less or more'),
                  );
                  const somerule = rule;
                  somerule.message = '请上传游戏背景';
                }
                callback(errors);
              } }],
          })(
            <PicturesWall
              id="youxibeijing"
              setFieldsValue={setFieldsValue}
              getFieldValue={getFieldValue} limit={1}
            />,
          )}
        </FormItem>
        <FormItem label="游戏截图(请上传5张游戏截图)" >
          {getFieldDecorator('youxijietu', {
            rules: [{ required: true,
              validator(rule, value, callback) {
                const errors = [];
                if (value === undefined || value.fileList.length < 5) {
                  errors.push(
                  new Error('less or more'),
                  );
                  const somerule = rule;
                  somerule.message = '请上传5张游戏截图';
                }
                callback(errors);
              } }],
          })(
            <PicturesWall
              id="youxijietu"
              setFieldsValue={setFieldsValue}
              getFieldValue={getFieldValue} limit={5}
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
              placeholder="默认分成范围为0-1"
            />,
          )}
        </FormItem>
        <FormItem label="提交" >
          <Button
            type="primary"
            htmlType="submit"
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

Hello.propTypes = {
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

const WrappedHorizontalLoginForm = Form.create()(Hello);
export default WrappedHorizontalLoginForm;
