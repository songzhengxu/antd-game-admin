import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Tabs, Menu, Dropdown, Form, Select, Spin } from 'antd';
import { connect } from 'react-redux';
import MakeTable from '../../utils/TableMaker';
import AsyncAction from '../../utils/asyncAction';

const { TabPane } = Tabs;
const FormItem = Form.Item;
const Option = Select.Option;


// SettingMenuTable
class SettingMenuListTable extends React.Component {
  componentDidMount() {
    const gameTypeAsyncAction = new AsyncAction('api/settingMenu.json', 'get', 'SettingMenuListReducer', 'settingMenuList', 'settingMenuList');
    const { dispatch } = this.props;
    dispatch(gameTypeAsyncAction.fetchDataIfNeed());
  }
  render() {
    const status = this.props.settingMenuList.status;
    if (status === 'WAIT_FOR_FETCHING') {
      return (
        <div className="gamesettingMenuListLoading">
          <Spin />
        </div>
      );
    }
    const dataSource = this.props.settingMenuList.data;
    const data = {};
    data.title = {
      order: '排序',
      id: 'ID',
      application: '应用',
      menuName: '菜单名称',
      status: '状态',
      action: '操作',
    };
    data.dataSource = dataSource;
    const extrasConditionssettingMenuList = {
      order: {
        sorter: (a, b) => a.order - b.order,
        render: (text, record) => <Input
          className="orderInput"
          style={{ width: 50 }}
          defaultValue={record.order}
          onChange={(e) => {
            const newRecord = record;
            newRecord.order = e.target.value;
            return newRecord;
          }}
        />,
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
    return MakeTable(data, 'settingMenuList_columns', 'settingMenuList_datasource', extrasConditionssettingMenuList, { bordered: true });
  }
}
SettingMenuListTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  settingMenuList: PropTypes.shape({
    status: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

const SettingMenuListTableContainer = connect(state =>
  ({ settingMenuList: state.SettingMenuListReducer.settingMenuList }))(SettingMenuListTable);


// 添加菜单

class AddMenu extends React.Component {
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
    const { getFieldDecorator } = this.props.form;
    // const youximingchengError = isFieldTouched('userName') && getFieldError('userName');
    return (
      <Form className="addMenuForm" layout="horizontal" onSubmit={this.handleSubmit}>
        <FormItem label="上级" >
          {getFieldDecorator('addMenu_fatherMenu', {
            rules: [{ required: true, message: '请选择需要添加到的菜单' }],
          })(
            <Select defaultValue="levelOne" style={{ width: 120 }}>
              <Option value="levelOne">作为一级菜单</Option>
              <Option value="contentManagement">内容管理</Option>
              <Option value="moduleManagement">专题管理</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem label="名称" >
          {getFieldDecorator('AddMenu_name', {
            rules: [{ required: true, message: '请选择需要添加到的菜单' }],
          })(
            <span><Input style={{ width: 200 }} placeholder="请输入菜单名称" /> *</span>,
          )}
        </FormItem>
        <FormItem label="应用" >
          {getFieldDecorator('AddMenu_application', {
            rules: [{ required: true, message: '请选择应用' }],
          })(
            <span><Input style={{ width: 200 }} placeholder="请选择应用" /> *</span>,
          )}
        </FormItem>
        <FormItem label="控制器" >
          {getFieldDecorator('AddMenu_controller', {
            rules: [{ required: true, message: '请选择控制器' }],
          })(
            <span><Input style={{ width: 200 }} placeholder="请选择控制器" /> *</span>,
          )}
        </FormItem>
        <FormItem label="方法" >
          {getFieldDecorator('AddMenu_method', {
            rules: [{ required: true, message: '请选择方法' }],
          })(
            <span><Input style={{ width: 200 }} placeholder="请选择方法" /> *</span>,
          )}
        </FormItem>
        <FormItem label="参数" >
          {getFieldDecorator('AddMenu_param', {
            rules: [{ required: true, message: '请输入参数' }],
          })(
            <span><Input style={{ width: 200 }} placeholder="请输入参数" /> 例:id=3&p=3</span>,
          )}
        </FormItem>
        <FormItem label="图标" >
          {getFieldDecorator('AddMenu_icon', {
            rules: [{ required: true, message: '输入图标' }],
          })(
            <span><Input style={{ width: 200 }} placeholder="请输入图标" /> <a rel="noopener noreferrer" target="_blank" href="https://ant.design/components/icon-cn/">选择图标</a>如：user</span>,
          )}
        </FormItem>
        <FormItem label="备注" >
          {getFieldDecorator('AddMenu_remark', {
            rules: [{ required: true, message: '输入备注' }],
          })(
            <span><Input type="textarea" rows={4} /></span>,
          )}
        </FormItem>
        <FormItem label="状态" >
          {getFieldDecorator('AddMenu_status', {
            rules: [{ required: true, message: '请输入状态' }],
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder=" 请选择 "
              optionFilterProp="children"
              filterOption={(input, option) =>
              option.props.value.indexOf(input) >= 0}
            >
              <Option key="show" value="显示">显示</Option>
              <Option key="hide" value="隐藏">隐藏</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem label="状态" >
          {getFieldDecorator('AddMenu_type', {
            rules: [{ required: true, message: '请输入状态' }],
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder=" 请选择 "
              optionFilterProp="children"
              filterOption={(input, option) =>
              option.props.value.indexOf(input) >= 0}
            >
              <Option key="authentication_and_menu" value="权限认证+菜单">权限认证+菜单</Option>
              <Option key="just_as_menu" value="只作为菜单">只作为菜单</Option>
            </Select>,
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

AddMenu.propTypes = {
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

const NewForm = Form.create()(AddMenu);

// 所有菜单

// AllMenuTable
class AllMenuListTable extends React.Component {
  componentDidMount() {
    const gameTypeAsyncAction = new AsyncAction('api/allMenu.json', 'get', 'AllMenuListReducer', 'allMenuList', 'allMenuList');
    const { dispatch } = this.props;
    dispatch(gameTypeAsyncAction.fetchDataIfNeed());
  }
  render() {
    const status = this.props.allMenuList.status;
    if (status === 'WAIT_FOR_FETCHING') {
      return (
        <div className="gameallMenuListLoading">
          <Spin />
        </div>
      );
    }
    const dataSource = this.props.allMenuList.data;
    const data = {};
    data.title = {
      order: '排序',
      id: 'ID',
      englishName: '菜单英文名称',
      status: '状态',
      action: '操作',
    };
    data.dataSource = dataSource;
    const extrasConditionsallMenuList = {
      order: {
        sorter: (a, b) => a.order - b.order,
        render: (text, record) => <Input
          style={{ width: 50 }}
          className="orderInput"
          defaultValue={record.order}
          onChange={(e) => {
            const newRecord = record;
            newRecord.order = e.target.value;
            return newRecord;
          }}
        />,
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
    return MakeTable(data, 'allMenuList_columns', 'allMenuList_datasource', extrasConditionsallMenuList, { bordered: true });
  }
}
AllMenuListTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  allMenuList: PropTypes.shape({
    status: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

const AllMenuListTableContainer = connect(state =>
  ({ allMenuList: state.AllMenuListReducer.allMenuList }))(AllMenuListTable);

const SettingWithTabs = function SettingWithTabs(props) {
  const { history } = props;
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="后台菜单" key="1">{<SettingMenuListTableContainer />}</TabPane>
      <TabPane tab="添加菜单" key="2">{<NewForm history={history} />}</TabPane>
      <TabPane tab="所有菜单" key="3">{<AllMenuListTableContainer />}</TabPane>
    </Tabs>

  );
};
SettingWithTabs.propTypes = {
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
export default SettingWithTabs;
