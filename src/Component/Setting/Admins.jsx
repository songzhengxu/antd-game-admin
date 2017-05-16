import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Menu, Dropdown, Form, Input, Button, Checkbox } from 'antd';
import MakeTable from '../../utils/TableMaker';


const { TabPane } = Tabs;
const CheckboxGroup = Checkbox.Group;


const data = {};
data.title = {
  id: 'ID',
  userName: '用户名',
  lastLoginIp: '最后登录IP',
  lastLoginTime: '最后登录时间',
  email: '邮箱',
  status: '状态',
  action: '操作',
};
data.dataSource = [
  {
    id: 113,
    userName: 'ceshiqudao',
    lastLoginIp: '183.234.61.206',
    lastLoginTime: '2017-05-11 11:58:24',
    email: '2467483609@qq.com',
    status: '正常',
    action: ['编辑', '删除', '拉黑'],
  },
  {
    id: 110,
    userName: 'laoliu',
    lastLoginIp: '119.130.228.250',
    lastLoginTime: '2017-05-16 13:55:52',
    email: 'yuyang@lhgroup.com.cn',
    status: '正常',
    action: ['编辑', '删除', '拉黑'],
  },
  {
    id: 105,
    userName: 'qiaoba',
    lastLoginIp: '119.129.118.228',
    lastLoginTime: '2017-05-16 13:18:56',
    email: 'weilh@xuanyuyouxi.com',
    status: '正常',
    action: ['编辑', '删除', '拉黑'],
  },
];

const extrasConditions = {
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

const AdminsManagement = function AdminsManagement() {
  return MakeTable(data, 'Rbac_columns', 'Rbac_datasource', extrasConditions, { bordered: true });
};

const FormItem = Form.Item;
class AddRole extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hasErrors = this.hasErrors.bind(this);
  }
  componentDidMount() {
    this.props.form.setFieldsValue({ AddRole_sender: 4645464 });
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
        <FormItem label="用户名" >
          {getFieldDecorator('AddManager_username', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input style={{ width: 200 }} placeholder="请输入用户名" />,
          )}
        </FormItem>
        <FormItem label="密码" >
          {getFieldDecorator('AddManager_secret', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input type="password" style={{ width: 200 }} placeholder="请输入密码" />,
          )}
        </FormItem>
        <FormItem label="邮箱" >
          {getFieldDecorator('AddManager_email', {
            rules: [{ required: true, message: '请输入邮箱', type: 'email' }],
          })(
            <Input style={{ width: 200 }} placeholder="请输入邮箱" />,
          )}
        </FormItem>
        <FormItem label="二级支付密码" >
          {getFieldDecorator('AddManager_second_level_secret', {
            rules: [{ required: true, message: '请输入二级支付密码' }],
          })(
            <Input type="password" style={{ width: 200 }} placeholder="请输入二级支付密码" />,
          )}
        </FormItem>
        <FormItem label="角色" >
          {getFieldDecorator('AddRole_status', {
            rules: [{ required: true, message: '请选择角色' }],
          })(
            <CheckboxGroup options={[{ label: '乔巴', value: '乔巴' }, { label: '导演', value: '导演' }]} />,
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

AddRole.propTypes = {
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

const NewForm = Form.create()(AddRole);

const AdminsWithTabs = function AdminsWithTabs(props) {
  const { history } = props;
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="角色管理" key="1">{<AdminsManagement />}</TabPane>
      <TabPane tab="添加角色" key="2">{<NewForm history={history} />}</TabPane>
    </Tabs>

  );
};

AdminsWithTabs.propTypes = {
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

export default AdminsWithTabs;
