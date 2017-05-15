import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Tabs, Menu, Dropdown, Form } from 'antd';
import MakeTable from '../../utils/TableMaker';

const { TabPane } = Tabs;
const FormItem = Form.Item;
const data = {};
data.title = {
  order: '排序',
  id: 'ID',
  application: '应用',
  menuName: '菜单名称',
  status: '状态',
  action: '操作',
};

data.dataSource = [
  {
    order: 0,
    id: 206,
    application: 'Content/Index/index',
    menuName: '内容管理',
    status: '显示',
    action: ['添加子菜单', '编辑', '删除'],
    children: [
      {
        order: 1,
        id: 206,
        application: 'Content/Index/index',
        menuName: '内容管理',
        status: '显示',
        action: ['添加子菜单', '编辑', '删除'],
      },
    ],
  },
  {
    order: 1,
    id: 206,
    application: 'Content/Index/index',
    menuName: '内容管理',
    status: '显示',
    action: ['添加子菜单', '编辑', '删除'],
  },
  {
    order: 2,
    id: 206,
    application: 'Content/Index/index',
    menuName: '内容管理',
    status: '显示',
    action: ['添加子菜单', '编辑', '删除'],
  },
];
const extrasConditions = {
  order: {
    sorter: (a, b) => a.order - b.order,
    render: (text, record) => <Input
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

const SettingMenu = function SettingMenu() {
  return (
    <div className="settingMenu" >
      {MakeTable(data, 'setting_menu_columns', 'setting_menu_datasource', extrasConditions, { bordered: true })}
    </div>
  );
};

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

const SettingWithTabs = function SettingWithTabs(props) {
  const { history } = props;
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="后台菜单" key="1">{<SettingMenu />}</TabPane>
      <TabPane tab="添加菜单" key="2">{<NewForm history={history} />}</TabPane>
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
