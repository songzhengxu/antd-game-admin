import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Menu, Dropdown, Form, Input, Button, Checkbox, Spin } from 'antd';
import { connect } from 'react-redux';
import MakeTable from '../../utils/TableMaker';
import AsyncAction from '../../utils/asyncAction';


const { TabPane } = Tabs;
const CheckboxGroup = Checkbox.Group;

// AdminListTable
class AdminListTable extends React.Component {
  componentDidMount() {
    const gameTypeAsyncAction = new AsyncAction('api/admins.json', 'get', 'AdminListReducer', 'adminList', 'adminList');
    const { dispatch } = this.props;
    dispatch(gameTypeAsyncAction.fetchDataIfNeed());
  }
  render() {
    const status = this.props.adminList.status;
    const adminListData = this.props.adminList.data;
    console.log(adminListData);
    if (status === 'WAIT_FOR_FETCHING') {
      return (
        <div className="gameadminListLoading">
          <Spin />
        </div>
      );
    }
    const dataSource = this.props.adminList.data;
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
    data.dataSource = dataSource;
    const extrasConditionsadminList = {
      action: {
        render: (text, record) => {
          const menuUnit = record.action.map((value, index) =>
            <Menu.Item key={value + index}><span
              onClick={() => console.log(record.id)}
            >{value}</span></Menu.Item>);
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
    return MakeTable(data, 'adminList_columns', 'adminList_datasource', extrasConditionsadminList, { bordered: true });
  }
}
AdminListTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  adminList: PropTypes.shape({
    status: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

const AdminListTableContainer = connect(state =>
  ({ adminList: state.AdminListReducer.adminList }))(AdminListTable);


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

class AdminsWithTabs extends React.Component {
  constructor(props) {
    super(props);
    const history = props.history;
    this.state = {
      panes: [
        {
          title: '角色管理',
          content: <AdminListTableContainer />,
        },
        {
          title: '添加角色',
          content: <NewForm history={history} />,
        },
      ],
    };
  }
  render() {
    const panes = this.state.panes;
    const tp = panes.map((pane, index) =>
      <TabPane tab={pane.title} key={index + 1}>{pane.content}</TabPane>);
    return (
      <Tabs defaultActiveKey="1">
        {tp}
      </Tabs>
    );
  }
}

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
