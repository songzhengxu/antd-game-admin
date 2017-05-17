import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Menu, Dropdown, Form, Input, Button, Select, DatePicker, Spin } from 'antd';
import { connect } from 'react-redux';
import MakeTable from '../../utils/TableMaker';
import AsyncAction from '../../utils/asyncAction';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

// GiftListTable
class GiftListTabel extends React.Component {
  componentDidMount() {
    const gameTypeAsyncAction = new AsyncAction('api/gift.json', 'get', 'GiftListReducer', 'giftList', 'giftList');
    const { dispatch } = this.props;
    dispatch(gameTypeAsyncAction.fetchDataIfNeed());
  }
  render() {
    const status = this.props.giftList.status;
    if (status === 'WAIT_FOR_FETCHING') {
      return (
        <div className="gamegiftListLoading">
          <Spin />
        </div>
      );
    }
    const dataSource = this.props.giftList.data;
    const data = {};
    data.title = {
      order: '序号',
      gameName: '游戏名称',
      gameId: '游戏ID',
      giftTitle: '礼包标题',
      rest: '剩余',
      beginFrom: '开始时间',
      endAt: '结束时间',
      action: '操作管理',
    };
    data.dataSource = dataSource;
    const extrasConditionsgiftList = {
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
    return MakeTable(data, 'giftList_columns', 'giftList_datasource', extrasConditionsgiftList, { bordered: true });
  }
}
GiftListTabel.propTypes = {
  dispatch: PropTypes.func.isRequired,
  giftList: PropTypes.shape({
    status: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

const GiftListTabelContainer = connect(state =>
  ({ giftList: state.GiftListReducer.giftList }))(GiftListTabel);


const Gift = function Gift() {
  return (
    <div className="messages">
      <div className="searchBar" >
        <span >内容：<Input
          style={{ width: 200, marginRight: 20 }}
          placeholder="请输入搜索信息"
        /></span>
        <span >游戏：<Input
          style={{ width: 200, marginRight: 20 }}
          placeholder="请输入游戏名称"
        /><Button>搜索</Button></span>
      </div>
      <GiftListTabelContainer />
    </div>
  );
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
        <FormItem label="游戏" >
          {getFieldDecorator('gameName', {
            rules: [{ required: true, message: '请选择游戏' }],
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder=" 请选择 "
              optionFilterProp="children"
              filterOption={(input, option) =>
              option.props.value.indexOf(input) >= 0}
            >
              <Option key="pikachu" value="精灵皮卡丘">精灵皮卡丘</Option>
              <Option key="lengendSword" value="超神之刃">吉姆战棋</Option>
              <Option key="gimmy" value="吉姆战棋">吉姆战棋</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem label="礼包标题" >
          {getFieldDecorator('giftTitle', {
            rules: [{ required: true, message: '请输入礼包标题' }],
          })(
            <Input style={{ width: 200 }} placeholder="请输入礼包标题" />,
          )}
        </FormItem>
        <FormItem label="礼包码" >
          {getFieldDecorator('giftCode', {
            rules: [{ required: true, message: '请输入礼包码' }],
          })(
            <Input type="textarea" style={{ width: 500 }} rows={4} placeholder="请输入礼包码" />,
          )}
        </FormItem>
        <FormItem label="礼包内容" >
          {getFieldDecorator('giftContent', {
            rules: [{ required: true, message: '请输入礼包内容' }],
          })(
            <Input type="textarea" style={{ width: 500 }} rows={4} placeholder="请输入礼包内容" />,
          )}
        </FormItem>
        <FormItem label="兑换期限" >
          {getFieldDecorator('giftValidTime', {
            rules: [{ required: true, message: '请选择兑换期限' }],
          })(
            <RangePicker />,
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

const GiftMangementWithTabs = function GiftMangementWithTabs(props) {
  const { history } = props;
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="角色管理" key="1">{<Gift />}</TabPane>
      <TabPane tab="添加角色" key="2">{<NewForm history={history} />}</TabPane>
    </Tabs>

  );
};

GiftMangementWithTabs.propTypes = {
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

export default GiftMangementWithTabs;
