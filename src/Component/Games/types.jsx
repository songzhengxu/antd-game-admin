import React from 'react';
import { Menu, Dropdown, Tabs, Button, Upload, Radio, Icon, Modal, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import MakeTable from '../../utils/TableMaker';

const { TabPane } = Tabs;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const data = {};
data.title = {
  order: '序号',
  type: '类型名称',
  picture: '图片',
  status: '状态',
  action: '操作',
};
data.dataSource = [
  {
    order: 2,
    type: '体育类',
    picture: 'http://h5admin.jimugame.com/upload/logo/3.png',
    status: '显示',
    action: ['编辑', '删除'],
  },
  {
    order: 3,
    type: '动作类',
    picture: 'http://h5admin.jimugame.com/upload/logo/1.png',
    status: '显示',
    action: ['编辑', '删除'],
  },
  {
    order: 4,
    type: '策略类',
    picture: 'http://h5admin.jimugame.com/upload/logo/4.png',
    status: '显示',
    action: ['编辑', '删除'],
  },
];

const extrasConditions = {
  picture: {
    render: text => <img alt={text} src={text} />,
  },
  action: {
    render: (text, record) => {
      const menuUnit = record.action.map((value, index) =>
        <Menu.Item key={value + index}>{value}</Menu.Item>);
      const menu = (
        <Menu>
          {menuUnit}
        </Menu>
      );
      const dropDownMenu = (
        <Dropdown.Button overlay={menu} >
          操作
        </Dropdown.Button>
      );
      return dropDownMenu;
    },
  },
};

const Types = function Types() {
  return (
    MakeTable(data, 'typeColumns', 'typeDatasource', extrasConditions, { bordered: true })
  );
};

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
        <FormItem label="游戏类型名称" >
          {getFieldDecorator('addInformations_informationType', {
            rules: [{ required: true, message: '请输入游戏类型名称' }],
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem label="缩略图" >
          {getFieldDecorator('addInformations_thumbnail', {
            rules: [{ required: true,
              validator(rule, value, callback) {
                const errors = [];
                if (value === undefined || value.fileList.length < 1) {
                  errors.push(
                  new Error('less or more'),
                  );
                  const somerule = rule;
                  somerule.message = '请上传缩略图';
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
        <FormItem label="当前状态" >
          {getFieldDecorator('dangqianzhuangtai', {
            rules: [{ required: true, message: '请选择当前状态' }],
          })(
            <RadioGroup>
              <Radio value={1}>显示</Radio>
              <Radio value={2}>隐藏</Radio>
            </RadioGroup>,
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

const NewForm = Form.create()(Hello);

const GameTypeWithInformation = function GameTypeWithInformation(props) {
  const { history } = props;
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="游戏类型" key="1">{<Types />}</TabPane>
      <TabPane tab="添加游戏类型" key="2">{<NewForm history={history} />}</TabPane>
    </Tabs>

  );
};
GameTypeWithInformation.propTypes = {
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
export default GameTypeWithInformation;
